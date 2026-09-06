/**
 * Last-resort notification when the Twenty push permanently fails, or Twenty
 * is not configured at all. Uses Resend if RESEND_API_KEY + LEAD_FALLBACK_TO
 * are both set; otherwise logs that a lead needs manual follow-up.
 *
 * PII (name, email, firm) goes ONLY into the email body sent to
 * LEAD_FALLBACK_TO — never into a console log. When there is no working
 * email path, the log references the durable-store key
 * (see api/_store.ts) so a human can look the record up directly in Redis,
 * rather than the applicant's details ending up in Vercel's function logs.
 *
 * Modeled on ../govx-marketing/api/_lib/email.ts, with that one PII-in-logs
 * behaviour deliberately removed. Never throws — this runs in the failure
 * path and must not turn a recorded-but-unsent lead into an unhandled
 * exception.
 */
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const LEAD_FALLBACK_TO = process.env.LEAD_FALLBACK_TO || '';
// Optional override — Resend requires the sending domain to be verified on
// the account. Default assumes immistack.com is verified there; if it is
// not, set LEAD_FALLBACK_FROM to a domain that is, rather than silently
// failing every send.
const LEAD_FALLBACK_FROM = process.env.LEAD_FALLBACK_FROM || 'ImmiStack leads <leads@immistack.com>';

export interface FallbackEmailInput {
  /** Short, PII-free reason shown in the subject, e.g. "CRM push failed". */
  reason: string;
  /** The full note body — may contain name/email/firm. Sent only, never logged. */
  text: string;
  /** api/_store.ts key for this lead, so a log line can point at the record without repeating it. */
  storeKey: string;
}

export async function sendFallbackEmail({ reason, text, storeKey }: FallbackEmailInput): Promise<'sent' | 'logged'> {
  if (!LEAD_FALLBACK_TO || !RESEND_API_KEY) {
    console.error(
      `[lead-fallback] ${!LEAD_FALLBACK_TO ? 'LEAD_FALLBACK_TO' : 'RESEND_API_KEY'} not set — lead needs manual follow-up. reason="${reason}" key=${storeKey}`,
    );
    return 'logged';
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: LEAD_FALLBACK_FROM,
        to: [LEAD_FALLBACK_TO],
        subject: `[immistack-marketing] ${reason}`,
        text,
      }),
    });
    if (!res.ok) throw new Error(`resend ${res.status}`);
    return 'sent';
  } catch (error) {
    console.error(
      `[lead-fallback] Resend send failed (${error instanceof Error ? error.message : error}) — lead needs manual follow-up. key=${storeKey}`,
    );
    return 'logged';
  }
}
