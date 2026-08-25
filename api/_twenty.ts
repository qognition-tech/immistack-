/**
 * Twenty CRM client — shared by every inbound capture point on this site.
 *
 * Design notes that are load-bearing:
 *
 * - The workspace is SHARED across several of the agency's clients. Everything written
 *   here is namespaced with the `IMMISTACK` tag so ImmiStack leads are separable from
 *   everyone else's. Never write a field that is not namespaced, and never bulk-edit.
 * - Twenty has no tag primitive. `leadTags` is a custom MULTI_SELECT created by
 *   `scripts/twenty-schema.mjs`. Run that script before this code can tag anything.
 * - Upsert by email, never blind-create. A person who fills two forms is one record with
 *   two tags, not two records.
 * - The API key is server-side only. It must never reach the browser bundle, which is why
 *   this file lives in `api/` and is imported only by serverless handlers.
 */

const RAW_URL = process.env.TWENTY_API_URL || 'https://api.twenty.com';
export const TWENTY_API_URL = RAW_URL.replace(/\/$/, '');
const TWENTY_API_KEY = process.env.TWENTY_API_KEY || '';

export const TAG_BASE = 'IMMISTACK';
export const TAG_SITE = 'IMMISTACK_MARKETING';

/** Capture point → tag. Anything unrecognised falls back to the site tag alone. */
export const SOURCE_TAGS: Record<string, string> = {
  waitlist: 'IMMISTACK_WAITLIST',
  affiliate: 'IMMISTACK_AFFILIATE',
  lead_magnet: 'IMMISTACK_LEAD_MAGNET',
  book_call: 'IMMISTACK_BOOK_CALL',
  contact: 'IMMISTACK_CONTACT',
};

export class TwentyNotConfiguredError extends Error {
  constructor() {
    super('TWENTY_API_KEY is not set');
    this.name = 'TwentyNotConfiguredError';
  }
}

export function isTwentyConfigured(): boolean {
  return Boolean(TWENTY_API_KEY);
}

async function twenty<T = any>(pathname: string, init: RequestInit = {}): Promise<T> {
  if (!TWENTY_API_KEY) throw new TwentyNotConfiguredError();

  const res = await fetch(`${TWENTY_API_URL}${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TWENTY_API_KEY}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });

  const text = await res.text();
  let body: any = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }

  if (!res.ok) {
    // Surface Twenty's own message — it is specific and worth reading in logs.
    const detail = typeof body === 'object' && body ? JSON.stringify(body) : String(body);
    throw new Error(`Twenty ${init.method || 'GET'} ${pathname} -> ${res.status}: ${detail}`);
  }
  return body as T;
}

/** Twenty's REST envelopes vary by endpoint; pull the first array out defensively. */
function firstList(payload: any): any[] {
  let d = payload;
  if (d && typeof d === 'object' && 'data' in d) d = d.data;
  if (Array.isArray(d)) return d;
  if (d && typeof d === 'object') {
    for (const v of Object.values(d)) if (Array.isArray(v)) return v;
  }
  return [];
}

function firstRecord(payload: any): any {
  let d = payload;
  if (d && typeof d === 'object' && 'data' in d) d = d.data;
  if (d && typeof d === 'object' && !Array.isArray(d)) {
    // e.g. { createPerson: {...} } or { person: {...} }
    const keys = Object.keys(d);
    if (keys.length === 1 && d[keys[0]] && typeof d[keys[0]] === 'object') return d[keys[0]];
    return d;
  }
  return Array.isArray(d) ? d[0] : d;
}

/** Split "Jane Smith" into Twenty's FULL_NAME shape. A single token becomes the first name. */
export function splitName(full?: string): { firstName: string; lastName: string } {
  const t = (full || '').trim().replace(/\s+/g, ' ');
  if (!t) return { firstName: '', lastName: '' };
  const parts = t.split(' ');
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts.slice(0, -1).join(' '), lastName: parts[parts.length - 1] };
}

export function mergeTags(existing: unknown, add: string[]): string[] {
  const cur = Array.isArray(existing) ? existing.filter((x): x is string => typeof x === 'string') : [];
  return Array.from(new Set([...cur, ...add]));
}

export async function findPersonByEmail(email: string): Promise<any | null> {
  const q = encodeURIComponent(`emails.primaryEmail[eq]:${email}`);
  const list = firstList(await twenty(`/rest/people?filter=${q}&limit=1`));
  return list[0] || null;
}

export async function getPerson(id: string): Promise<any | null> {
  try { return firstRecord(await twenty(`/rest/people/${id}`)); } catch { return null; }
}

export async function getCompany(id: string): Promise<any | null> {
  try { return firstRecord(await twenty(`/rest/companies/${id}`)); } catch { return null; }
}

export async function createPerson(input: Record<string, unknown>): Promise<any> {
  return firstRecord(await twenty('/rest/people', { method: 'POST', body: JSON.stringify(input) }));
}

export async function updatePerson(id: string, input: Record<string, unknown>): Promise<any> {
  return firstRecord(await twenty(`/rest/people/${id}`, { method: 'PATCH', body: JSON.stringify(input) }));
}

export async function findCompanyByName(name: string): Promise<any | null> {
  const q = encodeURIComponent(`name[eq]:${name}`);
  const list = firstList(await twenty(`/rest/companies?filter=${q}&limit=1`));
  return list[0] || null;
}

export async function createCompany(input: Record<string, unknown>): Promise<any> {
  return firstRecord(await twenty('/rest/companies', { method: 'POST', body: JSON.stringify(input) }));
}

export async function updateCompany(id: string, input: Record<string, unknown>): Promise<any> {
  return firstRecord(await twenty(`/rest/companies/${id}`, { method: 'PATCH', body: JSON.stringify(input) }));
}

/**
 * Attach a note to a person. Twenty renamed the note body field between versions
 * (`body` → `bodyV2`), so try the newer shape and fall back rather than failing the
 * whole submission over a note. A lost note is recoverable; a lost lead is not.
 */
export async function attachNote(personId: string, title: string, markdown: string): Promise<boolean> {
  const attempts: Record<string, unknown>[] = [
    { title, bodyV2: { markdown } },
    { title, body: markdown },
    { title },
  ];

  let note: any = null;
  for (const payload of attempts) {
    try {
      note = firstRecord(await twenty('/rest/notes', { method: 'POST', body: JSON.stringify(payload) }));
      if (note?.id) break;
    } catch {
      note = null;
    }
  }
  if (!note?.id) return false;

  // This Twenty workspace models note targets as MORPH_RELATION (`targetPersonId`).
  // Older versions used a plain `personId`. Try both rather than assuming a version.
  const linkShapes = [
    { noteId: note.id, targetPersonId: personId },
    { noteId: note.id, personId },
  ];
  for (const link of linkShapes) {
    try {
      await twenty('/rest/noteTargets', { method: 'POST', body: JSON.stringify(link) });
      return true;
    } catch {
      /* try the next shape */
    }
  }
  console.error('[twenty] note created but could not be linked to person', personId);
  return false;
}

export interface UpsertResult {
  personId: string;
  created: boolean;
  companyId: string | null;
  tags: string[];
  noteAttached: boolean;
}

/**
 * The one entry point every capture point uses.
 * Upserts the person, optionally the company, applies tags, and records the raw
 * submission as a note so nothing the visitor typed is silently dropped.
 */
export async function upsertLead(params: {
  email: string;
  name?: string;
  companyName?: string;
  jobTitle?: string;
  phone?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  source?: string;
  noteTitle: string;
  noteLines: string[];
}): Promise<UpsertResult> {
  const email = params.email.trim().toLowerCase();
  const sourceTag = params.source ? SOURCE_TAGS[params.source] : undefined;
  const tags = [TAG_BASE, TAG_SITE, ...(sourceTag ? [sourceTag] : [])];

  // --- person first --------------------------------------------------------
  // Twenty auto-associates a person with a company derived from their email domain.
  // Creating our own company up front and passing companyId does NOT win that race —
  // it just leaves an orphan company nobody points at. So: create the person, let
  // Twenty do its matching, then read back what it decided.
  const existingPerson = await findPersonByEmail(email);
  let personId: string;
  let created: boolean;

  if (existingPerson?.id) {
    personId = existingPerson.id;
    created = false;
    const patch: Record<string, unknown> = { leadTags: mergeTags(existingPerson.leadTags, tags) };
    // Only fill blanks — never overwrite something a human may have corrected by hand.
    if (params.jobTitle && !existingPerson.jobTitle) patch.jobTitle = params.jobTitle;
    if (params.name && !existingPerson.name?.firstName) patch.name = splitName(params.name);
    if (params.phone && !existingPerson.phones?.primaryPhoneNumber) {
      patch.phones = { primaryPhoneNumber: params.phone };
    }
    await updatePerson(personId, patch);
  } else {
    created = true;
    const person = await createPerson({
      name: splitName(params.name),
      emails: { primaryEmail: email, additionalEmails: [] },
      leadTags: tags,
      ...(params.jobTitle ? { jobTitle: params.jobTitle } : {}),
      ...(params.phone ? { phones: { primaryPhoneNumber: params.phone } } : {}),
      ...(params.linkedinUrl
        ? { linkedinLink: { primaryLinkUrl: params.linkedinUrl, primaryLinkLabel: '' } }
        : {}),
    });
    if (!person?.id) throw new Error('Twenty returned no id when creating the person');
    personId = person.id;
  }

  // --- company -------------------------------------------------------------
  // Deliberately DO NOT create companies here.
  //
  // Twenty associates a person with a company derived from their email domain, and it
  // does so ASYNCHRONOUSLY — an immediate read-back after creating the person often still
  // shows null. An earlier version of this code took that null as "no company" and created
  // one from the firm name the visitor typed, which produced orphan company records in a
  // workspace shared with other clients.
  //
  // So: read back what Twenty decided, and if it picked a company, tag it (additive — we
  // never rename another client's record). If it has not decided yet, do nothing. The firm
  // name the visitor typed is always preserved on the note below, so nothing is lost, and
  // a human can attach the right company when the lead becomes real.
  let companyId: string | null = null;
  try {
    const fresh = await getPerson(personId);
    companyId = fresh?.companyId ?? null;
    if (companyId) {
      const company = await getCompany(companyId);
      const merged = mergeTags(company?.leadTags, tags);
      if (merged.length !== (company?.leadTags?.length ?? 0)) {
        await updateCompany(companyId, { leadTags: merged });
      }
    }
  } catch (err) {
    console.error('[twenty] company tagging failed:', (err as Error).message);
  }

  const companyName = (params.companyName || '').trim();
  const noteLines = [...params.noteLines];
  if (companyName) {
    // Always record what they typed. Twenty may have associated a different company from
    // the email domain, and losing the firm name they gave us would be a real data loss.
    noteLines.splice(1, 0, `**Firm as entered:** ${companyName}`);
  }
  const noteAttached = await attachNote(personId, params.noteTitle, noteLines.join('\n'));

  return { personId, created, companyId, tags, noteAttached };
}
