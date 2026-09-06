/**
 * POST /api/create-lead — the single inbound capture endpoint for this site.
 *
 * Every form (waitlist, affiliate) posts here. Segmentation comes from
 * `source`, which maps to a tag; it does not come from separate endpoints.
 *
 * Records land in Twenty CRM tagged `IMMISTACK` + `IMMISTACK_MARKETING` + a
 * capture-point tag. See api/_twenty.ts — unchanged by this pass, same CRM
 * destination and tags.
 *
 * Order is deliberate and must not be reordered (matches
 * ../govx-marketing/api/lead.ts):
 *   1. CORS + method + rate limit — cheap rejects first
 *   2. zod strict            — reject anything that is not exactly a lead shape
 *   3. honeypot              — filled ⇒ pretend success, do nothing
 *   4. min-time HMAC token   — too fast ⇒ 425, invalid/expired ⇒ 400
 *   5. durable write         — the lead exists in Upstash before any CRM call
 *   6. Twenty push           — upsert by email; company dedupe is Twenty's own
 *                              domain-matching (never create companies — see
 *                              api/_twenty.ts and CLAUDE.md rule #2)
 *   7. Resend fallback email — only when the Twenty push failed or is unconfigured
 *
 * Once a lead has a durable copy (step 5) or a fallback email has been
 * attempted (step 7), the visitor sees success — an infrastructure problem on
 * our side is not their failure to recover from. Only steps 1-4 can produce
 * `{ ok: false }`.
 */
import { randomUUID } from 'node:crypto';
import {
  upsertLead,
  isTwentyConfigured,
  TwentyNotConfiguredError,
  SOURCE_TAGS,
  redactForLog,
} from './_twenty.js';
import { applyCors, pickOrigin } from './_cors.js';
import { checkFormToken } from './_hmac.js';
import { leadStore, leadKey, LEAD_TTL_SECONDS } from './_store.js';
import { sendFallbackEmail } from './_email.js';
import { LeadSchema } from './_lead-schema.js';

/** Crude in-memory throttle. Serverless instances are short-lived, so this only blunts
 *  a burst from one warm instance — it is a speed bump, not a security control. */
const RECENT = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (RECENT.get(key) || []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  RECENT.set(key, hits);
  if (RECENT.size > 500) RECENT.clear(); // bound memory
  return hits.length > MAX_PER_WINDOW;
}

/** Empty string → undefined. zod already trims/caps length; this just matches the
 *  original handler's "blank means not provided" behaviour. */
function orUndef(v: string | undefined): string | undefined {
  return v && v.length > 0 ? v : undefined;
}

export default async function handler(req: any, res: any) {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, reason: 'method_not_allowed' });

  // A request from an origin not on the allowlist is refused outright — the old
  // behaviour only skipped setting CORS headers, which a non-browser client would
  // not notice. See CLAUDE.md rule #3.
  if (!pickOrigin(req) && req.headers?.origin) {
    return res.status(403).json({ ok: false, reason: 'origin_not_allowed' });
  }

  const ip =
    (req.headers?.['x-forwarded-for'] || '').toString().split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, reason: 'rate_limited' });
  }

  let raw: unknown;
  try {
    raw = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  } catch {
    return res.status(400).json({ ok: false, reason: 'invalid_json' });
  }

  const parsed = LeadSchema.safeParse(raw);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, reason: 'invalid' });
  }
  const lead = parsed.data;

  // Honeypot: a real person never fills a field they cannot see. Answer as if
  // accepted so a bot learns nothing from the response.
  if (lead.company_website || lead.hp) {
    return res.status(200).json({ ok: true });
  }

  const secret = process.env.LEAD_FORM_SECRET;
  if (secret) {
    const check = checkFormToken(secret, lead.token);
    if (check === 'too-fast') return res.status(425).json({ ok: false, reason: 'too_fast' });
    if (check === 'invalid' || check === 'expired') {
      return res.status(400).json({ ok: false, reason: 'invalid_token' });
    }
  } else {
    // Same fail-open-on-honeypot-only posture as before this change existed —
    // but say so loudly, since api/form-token.ts refuses to issue a token in
    // this state and a form built against it will never send a valid one.
    console.error('[create-lead] LEAD_FORM_SECRET is not set — min-time token check skipped');
  }

  const id = randomUUID();
  const key = leadKey(id);

  const name = orUndef(lead.name) || orUndef(lead.fullName);
  const firmName = orUndef(lead.firmName) || orUndef(lead.company);
  const firmSize = orUndef(lead.firmSize);
  const persona = orUndef(lead.persona);
  const website = orUndef(lead.website);
  const audience = orUndef(lead.audience);
  const referralSource = orUndef(lead.referralSource);
  const message = orUndef(lead.message);
  const phone = orUndef(lead.phone);

  const rawSource = orUndef(lead.source) || '';
  const sourceKey = rawSource.toLowerCase().replace(/[\s-]+/g, '_');
  const source = sourceKey in SOURCE_TAGS ? sourceKey : (website || audience) ? 'affiliate' : 'waitlist';

  // Never log the email or name themselves — the store key is enough to find the record.
  const record = {
    email: lead.email,
    name,
    firmName,
    firmSize,
    persona,
    website,
    audience,
    referralSource,
    message,
    phone,
    source,
    rawSource: rawSource || source,
  };

  const stored = await leadStore.put(key, { ...record, receivedAt: new Date().toISOString(), crm: 'pending' }, LEAD_TTL_SECONDS);

  const noteLines = [
    `**Captured:** ${new Date().toISOString()}`,
    `**Capture point:** ${rawSource || source}`,
    persona ? `**Persona:** ${persona}` : null,
    firmName ? `**Firm:** ${firmName}` : null,
    firmSize ? `**Firm size:** ${firmSize}` : null,
    website ? `**Website / profile:** ${website}` : null,
    audience ? `**Audience / channel:** ${audience}` : null,
    referralSource ? `**Referred by:** ${referralSource}` : null,
    message ? `\n**Message:**\n${message}` : null,
    `\n_Recorded automatically from immistack.com. Tags are applied by the site, not by a human._`,
  ].filter(Boolean) as string[];

  if (!isTwentyConfigured()) {
    console.error('[create-lead] TWENTY_API_KEY is not set on this deployment — lead kept in store only', key);
    await sendFallbackEmail({
      reason: 'CRM unconfigured',
      storeKey: key,
      text: `A lead arrived but TWENTY_API_KEY is not set on this deployment.\n\nEmail: ${lead.email}\nName: ${name || '—'}\nFirm: ${firmName || '—'}\nStore key: ${key}\n\n${noteLines.join('\n')}`,
    });
    await leadStore.put(key, { ...record, receivedAt: new Date().toISOString(), crm: 'unconfigured' }, LEAD_TTL_SECONDS);
    return res.status(200).json({ ok: true, id });
  }

  try {
    const result = await upsertLead({
      email: lead.email,
      name,
      companyName: firmName,
      phone,
      websiteUrl: website,
      source,
      noteTitle: `ImmiStack — ${rawSource || source} submission`,
      noteLines,
    });

    console.log(
      `[create-lead] ok key=${key} personId=${result.personId} created=${result.created} tags=${result.tags.join('+')} note=${result.noteAttached}`,
    );
    await leadStore.put(key, { ...record, receivedAt: new Date().toISOString(), crm: 'ok', personId: result.personId }, LEAD_TTL_SECONDS);

    return res.status(200).json({ ok: true, id });
  } catch (error) {
    if (error instanceof TwentyNotConfiguredError) {
      // Raced with isTwentyConfigured() above (env changed mid-request) — same handling.
      await leadStore.put(key, { ...record, receivedAt: new Date().toISOString(), crm: 'unconfigured' }, LEAD_TTL_SECONDS);
      await sendFallbackEmail({
        reason: 'CRM unconfigured',
        storeKey: key,
        text: `A lead arrived but Twenty is not configured.\n\nEmail: ${lead.email}\nName: ${name || '—'}\nFirm: ${firmName || '—'}\nStore key: ${key}`,
      });
      return res.status(200).json({ ok: true, id });
    }

    const message2 = error instanceof Error ? error.message : String(error);
    console.error('[create-lead] Twenty push failed:', key, redactForLog(message2));
    await leadStore.put(key, { ...record, receivedAt: new Date().toISOString(), crm: 'failed', error: message2 }, LEAD_TTL_SECONDS);
    await sendFallbackEmail({
      reason: 'CRM push failed',
      storeKey: key,
      text: `The Twenty push failed for this lead.\n\nEmail: ${lead.email}\nName: ${name || '—'}\nFirm: ${firmName || '—'}\nStore key: ${key}\nError: ${message2}\n\n${noteLines.join('\n')}`,
    });
    // The lead is safe (store and/or fallback email) — the visitor should not see a failure.
    return res.status(200).json({ ok: true, id, stored });
  }
}
