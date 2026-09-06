/**
 * POST /api/create-lead — the single inbound capture endpoint for this site.
 *
 * Every form (waitlist, lead magnet, affiliate, contact) posts here. Segmentation comes
 * from `source`, which maps to a tag; it does not come from separate endpoints.
 *
 * Replaces an earlier Zoho implementation. That version never worked in production —
 * its `ZOHO_*` values were placeholder strings — and it hard-required `firmName` and
 * `firmSize`, so affiliate submissions (which send neither) would have 400'd regardless.
 * Both problems are fixed here.
 *
 * Records land in Twenty CRM tagged `IMMISTACK` + `IMMISTACK_MARKETING` + a capture-point
 * tag. See api/_twenty.ts.
 */
import {
  upsertLead,
  isTwentyConfigured,
  TwentyNotConfiguredError,
  SOURCE_TAGS,
  redactForLog,
} from './_twenty.js';
import { sendEmail, LEAD_NOTIFY_TO } from './_email.js';
import { leadConfirmationEmail, leadNotificationEmail } from './_lead-email-copy.js';

/** Only this site may post here. An open CORS policy on a lead endpoint invites junk. */
const ALLOWED_ORIGINS = [
  'https://immistack.com',
  'https://www.immistack.com',
  'https://immistack-marketing.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function pickOrigin(req: any): string | null {
  const origin = req.headers?.origin;
  if (!origin) return null;
  return ALLOWED_ORIGINS.includes(origin) ? origin : null;
}

function str(v: unknown, max = 500): string | undefined {
  if (typeof v !== 'string') return undefined;
  const t = v.trim();
  if (!t) return undefined;
  return t.slice(0, max);
}

export default async function handler(req: any, res: any) {
  const origin = pickOrigin(req);
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

    // Honeypot: a real person never fills a field they cannot see. Answer 200 so a bot
    // learns nothing from the response.
    if (str(body.company_website) || str(body.hp)) {
      return res.status(200).json({ message: 'Thanks — you are on the list.' });
    }

    const email = str(body.email, 320)?.toLowerCase();
    if (!email || !EMAIL_RE.test(email)) {
      return res.status(400).json({ message: 'A valid email address is required.' });
    }

    const ip =
      (req.headers?.['x-forwarded-for'] || '').toString().split(',')[0].trim() ||
      req.socket?.remoteAddress ||
      'unknown';
    if (rateLimited(ip)) {
      return res.status(429).json({ message: 'Too many submissions. Please try again shortly.' });
    }

    if (!isTwentyConfigured()) {
      // Say what is actually wrong rather than pretending it worked.
      console.error('[create-lead] TWENTY_API_KEY is not set on this deployment');
      return res.status(503).json({
        message:
          'We could not record your details right now. Please email hello@immistack.com and we will add you by hand.',
      });
    }

    // Accept both shapes: the waitlist form sends firmName/firmSize, the affiliate form
    // sends name/website/audience. Neither is required beyond the email.
    const name = str(body.name) || str(body.fullName);
    const firmName = str(body.firmName) || str(body.company);
    const firmSize = str(body.firmSize, 80);
    const persona = str(body.persona, 80);
    const website = str(body.website, 500);
    const audience = str(body.audience, 500);
    const referralSource = str(body.referralSource, 200);
    const message = str(body.message, 4000);
    const phone = str(body.phone, 60);

    const rawSource = str(body.source, 80) || '';
    const key = rawSource.toLowerCase().replace(/[\s-]+/g, '_');
    const source = key in SOURCE_TAGS ? key : (website || audience) ? 'affiliate' : 'waitlist';

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

    // The CRM write is the durable record; attempt it and remember whether it
    // worked, but don't let its outcome block the email leg below — a lead
    // worth emailing about is worth emailing about even if Twenty rejected it,
    // and the team notification is then the only trace of the submission.
    let result: Awaited<ReturnType<typeof upsertLead>> | null = null;
    let crmError: unknown = null;
    try {
      result = await upsertLead({
        email,
        name,
        companyName: firmName,
        phone,
        websiteUrl: website,
        source,
        noteTitle: `ImmiStack — ${rawSource || source} submission`,
        noteLines,
      });
      // Never log the email itself; the id is enough to find the record.
      console.log(
        `[create-lead] ok personId=${result.personId} created=${result.created} tags=${result.tags.join('+')} note=${result.noteAttached}`,
      );
    } catch (err) {
      crmError = err;
      console.error(
        '[create-lead] CRM upsert failed:',
        err instanceof Error ? redactForLog(err.message) : err,
      );
    }

    // Email leg. Runs after the CRM attempt regardless of its outcome; a
    // failure here (unconfigured, timeout, Resend down) never changes the
    // response below — see api/_email.ts.
    const confirmation = leadConfirmationEmail({ name, firmName, kind: 'form' });
    const confirmationResult = await sendEmail({
      to: email,
      subject: confirmation.subject,
      text: confirmation.text,
    });

    const notification = leadNotificationEmail({
      email,
      name,
      firmName,
      phone,
      source: rawSource || source,
      extra: { Persona: persona, Website: website, Audience: audience, Referral: referralSource, Message: message },
    });
    await sendEmail({ to: LEAD_NOTIFY_TO, subject: notification.subject, text: notification.text });

    if (crmError) {
      if (crmError instanceof TwentyNotConfiguredError) {
        return res.status(503).json({
          message: 'CRM is not configured on this deployment.',
          emailSent: confirmationResult.sent,
        });
      }
      return res.status(500).json({
        message:
          'Something went wrong recording your details. Please email hello@immistack.com and we will sort it out.',
        emailSent: confirmationResult.sent,
      });
    }

    return res.status(200).json({
      message: 'Thanks — you are on the list.',
      created: result!.created,
      emailSent: confirmationResult.sent,
    });
  } catch (error) {
    console.error('[create-lead] failed:', error instanceof Error ? redactForLog(error.message) : error);
    return res.status(500).json({
      message:
        'Something went wrong recording your details. Please email hello@immistack.com and we will sort it out.',
    });
  }
}
