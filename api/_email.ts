/**
 * Resend REST client — the email leg alongside Twenty CRM (api/_twenty.ts).
 *
 * Ported from `reskin/2026-09-06:api/_email.ts` (a Resend REST helper already
 * written and reviewed there as `sendFallbackEmail`) and adapted to a generic
 * `sendEmail`, because both api/create-lead.ts and api/cal-webhook.ts need to
 * send two different emails each (a confirmation to the lead, a notification
 * to the team), not one fallback-only message.
 *
 * Design notes that carry over:
 * - Never throws into the caller. This runs after the CRM write, in the tail
 *   of a request that has already decided its outcome for the visitor —
 *   turning a missed email into an unhandled exception would make a working
 *   lead capture fail on a notification problem.
 * - When RESEND_API_KEY or RESEND_FROM is unset, this is a deployment
 *   configuration gap, not a per-request error: log it ONCE per cold start
 *   (not once per submission) and say so with no PII in the line.
 * - 5s timeout via AbortController — Resend down must not hang the request
 *   that is also waiting on the Twenty CRM upsert.
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const RESEND_FROM = process.env.RESEND_FROM || '';

/** Where the internal lead notification goes. Defaults to the address every
 *  other manual-fallback message on this site already points at. */
export const LEAD_NOTIFY_TO = process.env.LEAD_NOTIFY_TO || 'hello@immistack.com';

const TIMEOUT_MS = 5_000;

let warnedUnconfigured = false;

export interface SendEmailInput {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface SendEmailResult {
  sent: boolean;
  reason?: 'unconfigured' | 'timeout' | 'error' | `http_${number}`;
}

export async function sendEmail({ to, subject, text, html }: SendEmailInput): Promise<SendEmailResult> {
  if (!RESEND_API_KEY || !RESEND_FROM) {
    if (!warnedUnconfigured) {
      // No PII: no recipient, no subject, no body — just that the leg is off.
      console.warn(
        `[email] ${!RESEND_API_KEY ? 'RESEND_API_KEY' : 'RESEND_FROM'} not set — email leg disabled, CRM record is unaffected`,
      );
      warnedUnconfigured = true;
    }
    return { sent: false, reason: 'unconfigured' };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [to],
        subject,
        text,
        ...(html ? { html } : {}),
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      // Status only — Resend's error body can echo the request, which may
      // include the recipient address.
      console.warn(`[email] Resend responded ${res.status}`);
      return { sent: false, reason: `http_${res.status}` as SendEmailResult['reason'] };
    }
    return { sent: true };
  } catch (error) {
    const timedOut = error instanceof Error && error.name === 'AbortError';
    console.warn(`[email] send failed: ${timedOut ? 'timeout' : (error instanceof Error ? error.name : 'unknown_error')}`);
    return { sent: false, reason: timedOut ? 'timeout' : 'error' };
  } finally {
    clearTimeout(timer);
  }
}
