/**
 * GET /api/form-token — signed render timestamp for the min-time check.
 *
 * `components/WaitlistForm.tsx` and `components/AffiliateForm.tsx` fetch this
 * on mount and echo the token back on submit; `api/create-lead.ts` rejects a
 * submission with no valid token. See api/_hmac.ts for the scheme (same as
 * ../govx-marketing/api/form-token.ts).
 *
 * Fail closed: without LEAD_FORM_SECRET this returns 503 rather than an empty
 * token. govx's sibling endpoint hands out an empty token and disables the
 * check when its secret is unset — that is wrong for a form whose submit
 * handler treats a missing/invalid token as a hard rejection, so here an
 * unset secret must stop the form working rather than silently accept
 * anything.
 */
import { applyCors } from './_cors.js';
import { issueFormToken } from './_hmac.js';

export default async function handler(req: any, res: any) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const secret = process.env.LEAD_FORM_SECRET;
  if (!secret) {
    console.error('[form-token] LEAD_FORM_SECRET is not set — refusing to issue a token');
    return res.status(503).json({ message: 'Form is not configured on this deployment.' });
  }

  return res.status(200).json({ token: issueFormToken(secret) });
}
