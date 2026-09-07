/**
 * The legal entity behind this site, and the sub-processors it discloses.
 *
 * This file exists because `/privacy` and `/terms` did not, on a live
 * commercial site that collects lead PII into a CRM. Under the Australian
 * Privacy Act an APP entity must have a clearly expressed, up-to-date privacy
 * policy and must say what it collects and who it discloses to (APP 1, APP 5),
 * and you cannot take card payments without terms.
 *
 * Five of these fields are facts only the operator holds. They are `null`
 * rather than plausible-looking placeholders on purpose: a privacy policy
 * naming the wrong entity is worse than one that does not exist, because it
 * reads as a commitment somebody made. `scripts/check-legal.mjs` fails the
 * build while any of them is null, so a half-filled policy cannot ship.
 *
 * The sub-processor list is NOT a guess — every row is a service this codebase
 * actually calls. Add a row when you add a vendor, or the disclosure goes
 * stale silently.
 */

export interface LegalEntity {
  /** Registered company name, exactly as on the ASIC record. */
  legalName: string | null;
  /** Australian Business Number, digits and spaces as normally written. */
  abn: string | null;
  /** Registered address for service. */
  registeredAddress: string | null;
  /** Where a privacy complaint or access request is sent. */
  privacyContactEmail: string | null;
  /** ISO date these documents take effect, e.g. "2026-09-08". */
  effectiveDate: string | null;
}

export const ENTITY: LegalEntity = {
  legalName: null,
  abn: null,
  registeredAddress: null,
  privacyContactEmail: null,
  effectiveDate: null,
};

export interface SubProcessor {
  name: string;
  purpose: string;
  /** Where the data physically sits, as far as this codebase can determine. */
  location: string;
}

/**
 * Verified against the code, not assumed:
 *  - Vercel serves every app and runs the API function (region `sin1`).
 *  - Neon is the Postgres host for the control plane and both vertical DBs.
 *  - Twenty receives every marketing form submission (`api/create-lead.ts`).
 *  - Resend sends lead confirmations and product invites (`api/_email.ts`,
 *    `meru-core/src/core/mail/mail.service.ts`).
 *  - Supabase Storage is the chosen document driver (`src/storage/providers/`).
 *  - Stripe bills the firm for its own subscription (`src/billing/`).
 *  - Cal.com receives bookings via a signed webhook (`api/cal-webhook.ts`).
 * Anything not on this list is not called by this product today.
 */
export const SUB_PROCESSORS: SubProcessor[] = [
  { name: 'Vercel', purpose: 'Application and API hosting', location: 'Singapore (sin1) and global edge' },
  { name: 'Neon', purpose: 'Database hosting', location: 'As configured on the Neon project' },
  { name: 'Supabase', purpose: 'Document and file storage', location: 'As configured on the Supabase project' },
  { name: 'Resend', purpose: 'Transactional email delivery', location: 'United States' },
  { name: 'Twenty', purpose: 'CRM for enquiries submitted through this site', location: 'As configured on the Twenty workspace' },
  { name: 'Stripe', purpose: 'Subscription billing for firms', location: 'United States' },
  { name: 'Cal.com', purpose: 'Demo scheduling', location: 'United States' },
];

/** True only when every operator-supplied field is present. */
export function entityIsComplete(entity: LegalEntity = ENTITY): boolean {
  return Object.values(entity).every(
    (v) => typeof v === 'string' && v.trim().length > 0,
  );
}

/** Which fields are still missing — used by the build gate and in dev. */
export function missingEntityFields(entity: LegalEntity = ENTITY): string[] {
  return Object.entries(entity)
    .filter(([, v]) => typeof v !== 'string' || v.trim().length === 0)
    .map(([k]) => k);
}
