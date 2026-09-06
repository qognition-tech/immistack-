/**
 * Form render token — same scheme as ../govx-marketing/api/_lib/hmac.ts:
 * `${issuedAtMs}.${hmac}`. The server checks the token was issued at least
 * MIN_FILL_MS ago (a human takes longer than a bot filling the form
 * programmatically) and no more than MAX_AGE_MS ago (a stale tab).
 *
 * One deliberate divergence from govx: govx treats an unset secret as
 * "check disabled, warn once" so its site still accepts leads. Here
 * `create-lead.ts` treats an unset LEAD_FORM_SECRET as fail-closed (503) —
 * see api/form-token.ts — so a submission can never arrive with a token this
 * file was not able to verify.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

export function hmacHex(secret: string, data: string): string {
  return createHmac('sha256', secret).update(data).digest('hex');
}

/** Constant-time compare of two hex digests; false on length or alphabet mismatch. */
export function safeEqualHex(a: string, b: string): boolean {
  // Buffer.from(.., 'hex') silently truncates at the first non-hex character,
  // which would let "<sig>x" pass length-unchecked. Validate the alphabet first.
  if (!/^[0-9a-f]+$/i.test(a) || !/^[0-9a-f]+$/i.test(b) || a.length !== b.length) return false;
  const ab = Buffer.from(a, 'hex');
  const bb = Buffer.from(b, 'hex');
  if (ab.length === 0 || ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export const MIN_FILL_MS = 3_000;
export const MAX_AGE_MS = 6 * 60 * 60 * 1000;

export function issueFormToken(secret: string, now = Date.now()): string {
  return `${now}.${hmacHex(secret, String(now))}`;
}

export type TokenCheck = 'ok' | 'too-fast' | 'invalid' | 'expired';

/** Caller must have already confirmed `secret` is set — see form-token.ts / create-lead.ts. */
export function checkFormToken(secret: string, token: string | undefined, now = Date.now()): TokenCheck {
  if (!token) return 'invalid';
  const [ts, sig] = token.split('.');
  if (!/^\d+$/.test(ts ?? '') || !sig) return 'invalid';
  if (!safeEqualHex(sig, hmacHex(secret, ts))) return 'invalid';
  const age = now - Number(ts);
  if (age < MIN_FILL_MS) return 'too-fast';
  if (age > MAX_AGE_MS) return 'expired';
  return 'ok';
}
