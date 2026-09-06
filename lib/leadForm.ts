/**
 * Shared client-side helpers for `components/WaitlistForm.tsx` and
 * `components/AffiliateForm.tsx` — both post to the same `/api/create-lead`
 * and both need the same min-time token from `/api/form-token`.
 *
 * `fetchFormToken` fails silently (empty string) rather than surfacing an
 * error: a missing token only means `api/create-lead.ts`'s min-time check is
 * skipped when `LEAD_FORM_SECRET` is unset on the server too (see that
 * file) — the form still works, so there is nothing honest to tell the
 * visitor about it.
 */
export async function fetchFormToken(): Promise<string> {
  try {
    const r = await fetch('/api/form-token');
    if (!r.ok) return '';
    const body = await r.json().catch(() => null);
    return typeof body?.token === 'string' ? body.token : '';
  } catch {
    return '';
  }
}

export type LeadSubmitResult = { ok: true } | { ok: false; message: string };

/**
 * POSTs to /api/create-lead and translates its `{ ok, id }` / `{ ok:false,
 * reason }` envelope into a message worth showing a visitor. Never claims
 * success on a response that was not `{ ok: true }`.
 */
export async function submitLead<T extends object>(payload: T, contactEmail: string): Promise<LeadSubmitResult> {
  const fallback = `We couldn't save that — email ${contactEmail} instead.`;
  try {
    const response = await fetch('/api/create-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.status === 425) {
      return { ok: false, message: 'That was quick — please wait a few seconds and submit again.' };
    }
    if (response.status === 429) {
      return { ok: false, message: `Too many submissions from this connection. Please wait a minute, or email ${contactEmail}.` };
    }
    if (response.status === 503) {
      return { ok: false, message: `This form isn't available right now. Please email ${contactEmail} instead.` };
    }

    const body = await response.json().catch(() => null);
    if (!response.ok || body?.ok !== true) {
      return { ok: false, message: fallback };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: fallback };
  }
}
