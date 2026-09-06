/**
 * Origin allowlist shared by every public endpoint in this directory
 * (`create-lead.ts`, `form-token.ts`). Kept in one place so the two do not
 * silently drift — an endpoint that answers a different origin set than the
 * one that hands out its token would either 425/400 real visitors or make the
 * token check pointless.
 *
 * `IMMISTACK_PREVIEW_ORIGIN_RE` matches Vercel's per-branch preview URLs for
 * this project (`immistack-marketing-<hash-or-branch>-<team>.vercel.app`),
 * which are unpredictable ahead of time and cannot live in a static list.
 */
const ALLOWED_ORIGINS = [
  'https://immistack.com',
  'https://www.immistack.com',
  'https://immistack-marketing.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173',
];

const PREVIEW_ORIGIN_RE = /^https:\/\/immistack-marketing-[a-z0-9-]+\.vercel\.app$/;

export function isAllowedOrigin(origin: string | undefined | null): origin is string {
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin) || PREVIEW_ORIGIN_RE.test(origin);
}

/** Reads the request's Origin header and returns it only if allowed. */
export function pickOrigin(req: any): string | null {
  const origin = req.headers?.origin;
  return isAllowedOrigin(origin) ? origin : null;
}

/** Sets CORS headers for a matched origin. Call before any early return, including OPTIONS. */
export function applyCors(req: any, res: any): void {
  const origin = pickOrigin(req);
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
