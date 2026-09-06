/**
 * POST /api/cal-webhook — Cal.com booking webhook → Twenty CRM.
 *
 * `components/BookCall.tsx` has documented this endpoint since June; it did not exist.
 * A booked call is the highest-intent event on the site, so it was also the most
 * expensive thing to be dropping on the floor.
 *
 * Security: Cal.com signs each delivery with HMAC-SHA256 over the RAW body using the
 * webhook secret. We verify it. Without CALCOM_WEBHOOK_SECRET set we refuse the request
 * rather than accepting unsigned writes into a shared CRM — an unauthenticated endpoint
 * that creates records is an open invitation.
 *
 * Vercel parses JSON bodies by default, which destroys the exact bytes the signature was
 * computed over, so `config.api.bodyParser` is disabled below and we read the raw stream.
 */
import crypto from 'node:crypto';
import { upsertLead, isTwentyConfigured, redactForLog } from './_twenty.js';
import { sendEmail, LEAD_NOTIFY_TO } from './_email.js';
import { leadConfirmationEmail, leadNotificationEmail } from './_lead-email-copy.js';

export const config = {
  api: {
    bodyParser: false, // raw body required for signature verification
  },
};

function readRawBody(req: any): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk: any) => {
      data += chunk;
      if (data.length > 1_000_000) {
        reject(new Error('Payload too large'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function timingSafeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, 'utf8');
  const bb = Buffer.from(b, 'utf8');
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

function verify(raw: string, header: string | undefined, secret: string): boolean {
  if (!header) return false;
  const expected = crypto.createHmac('sha256', secret).update(raw).digest('hex');
  // Cal.com sends the bare hex digest; tolerate a `sha256=` prefix defensively.
  const provided = header.startsWith('sha256=') ? header.slice(7) : header;
  return timingSafeEqual(expected, provided.toLowerCase());
}

/** Cal.com nests the interesting parts under `payload`; shapes vary by trigger. */
function firstAttendee(payload: any): { name?: string; email?: string; phone?: string } {
  const a = Array.isArray(payload?.attendees) ? payload.attendees[0] : undefined;
  if (a) return { name: a.name, email: a.email, phone: a.phoneNumber };
  const r = payload?.responses;
  return {
    name: r?.name?.value ?? r?.name,
    email: r?.email?.value ?? r?.email,
    phone: r?.attendeePhoneNumber?.value,
  };
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const secret = process.env.CALCOM_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[cal-webhook] CALCOM_WEBHOOK_SECRET is not set — refusing unsigned webhook');
    return res.status(503).json({ message: 'Webhook not configured' });
  }

  let raw: string;
  try {
    raw = await readRawBody(req);
  } catch (err) {
    return res.status(413).json({ message: 'Payload too large' });
  }

  const sig = req.headers?.['x-cal-signature-256'] as string | undefined;
  if (!verify(raw, sig, secret)) {
    console.error('[cal-webhook] signature verification failed');
    return res.status(401).json({ message: 'Invalid signature' });
  }

  let event: any;
  try {
    event = JSON.parse(raw);
  } catch {
    return res.status(400).json({ message: 'Malformed JSON' });
  }

  const trigger = event?.triggerEvent;
  // Acknowledge everything else so Cal.com does not retry events we deliberately ignore.
  if (trigger !== 'BOOKING_CREATED' && trigger !== 'BOOKING_RESCHEDULED') {
    return res.status(200).json({ message: `Ignored ${trigger || 'unknown trigger'}` });
  }

  const payload = event?.payload || {};
  const attendee = firstAttendee(payload);
  const email = (attendee.email || '').trim().toLowerCase();

  if (!email) {
    console.error('[cal-webhook] no attendee email on', trigger);
    return res.status(200).json({ message: 'No attendee email; nothing recorded' });
  }

  if (!isTwentyConfigured()) {
    console.error('[cal-webhook] TWENTY_API_KEY is not set — booking not recorded');
    return res.status(503).json({ message: 'CRM not configured' });
  }

  const when = payload.startTime || payload.startsAt;
  const noteLines = [
    `**Booking:** ${payload.title || 'Intro call'}`,
    `**Trigger:** ${trigger}`,
    when ? `**Starts:** ${when}` : null,
    payload.endTime ? `**Ends:** ${payload.endTime}` : null,
    payload.location ? `**Location:** ${payload.location}` : null,
    payload.uid ? `**Cal.com UID:** ${payload.uid}` : null,
    attendee.phone ? `**Phone:** ${attendee.phone}` : null,
    payload.additionalNotes ? `\n**Notes from attendee:**\n${payload.additionalNotes}` : null,
    `\n_Recorded automatically from a Cal.com booking._`,
  ].filter(Boolean) as string[];

  // Same rule as create-lead.ts: attempt the CRM write, remember whether it
  // worked, but send the email leg regardless — the durable Twenty record
  // and the team-notification email are independent trails on the same
  // booking, and a CRM hiccup should not also lose the notification.
  let result: Awaited<ReturnType<typeof upsertLead>> | null = null;
  let crmError: unknown = null;
  try {
    result = await upsertLead({
      email,
      name: attendee.name,
      phone: attendee.phone,
      source: 'book_call',
      noteTitle: `ImmiStack — call booked (${payload.title || 'intro'})`,
      noteLines,
    });
    console.log(
      `[cal-webhook] ok personId=${result.personId} created=${result.created} trigger=${trigger}`,
    );
  } catch (err) {
    crmError = err;
    console.error('[cal-webhook] CRM upsert failed:', err instanceof Error ? redactForLog(err.message) : err);
  }

  const confirmation = leadConfirmationEmail({ name: attendee.name, kind: 'booking' });
  await sendEmail({ to: email, subject: confirmation.subject, text: confirmation.text });

  const notification = leadNotificationEmail({
    email,
    name: attendee.name,
    phone: attendee.phone,
    source: 'book_call',
    extra: { Trigger: trigger, Starts: when, Title: payload.title },
  });
  await sendEmail({ to: LEAD_NOTIFY_TO, subject: notification.subject, text: notification.text });

  if (crmError) {
    // 500 so Cal.com retries — a dropped booking is worth retrying for.
    return res.status(500).json({ message: 'Failed to record booking' });
  }
  return res.status(200).json({ message: 'Booking recorded', created: result!.created });
}
