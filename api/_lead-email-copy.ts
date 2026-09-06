/**
 * Copy for the two lead emails sent by api/create-lead.ts and
 * api/cal-webhook.ts, kept out of the request handlers so Ruth can edit
 * wording without touching the CRM/email wiring logic.
 *
 * Rules for anything added here, same bar as the site's check:claims gate
 * (scripts/check-claims.mjs) even though api/ is outside its scan roots:
 * no numbers, no superlatives, no certifications, no "trusted by", no claim
 * about live regulator connectivity. State only what is true today — early
 * access, sandbox regulator integrations, a person replies.
 */

export type LeadEmailKind = 'form' | 'booking';

export interface LeadConfirmationInput {
  name?: string;
  firmName?: string;
  /** 'form' — waitlist / affiliate / lead-magnet / contact submission.
   *  'booking' — a Cal.com call booking. */
  kind: LeadEmailKind;
}

export interface LeadEmailCopy {
  subject: string;
  text: string;
}

export function leadConfirmationEmail({ name, firmName, kind }: LeadConfirmationInput): LeadEmailCopy {
  const greeting = name ? `Hi ${name},` : 'Hi,';

  const submitted = [name ? `Name: ${name}` : null, firmName ? `Firm: ${firmName}` : null]
    .filter((line): line is string => line !== null)
    .join('\n');

  const subject =
    kind === 'booking'
      ? "We've received your ImmiStack walkthrough booking"
      : "We've received your ImmiStack early-access request";

  const whatHappensNext =
    kind === 'booking'
      ? 'A person from the ImmiStack team will confirm your booking and meet you for a 30-minute walkthrough of the sandbox at the time you selected.'
      : 'A person from the ImmiStack team will reply within one business day to arrange a 30-minute walkthrough of the sandbox.';

  const intro =
    kind === 'booking'
      ? "This confirms we've received your booking for a walkthrough call."
      : "This confirms we've received your early-access request.";

  const recordedInCrm =
    kind === 'booking'
      ? "We've recorded your booking details in our CRM to arrange this."
      : "We've recorded the details above in our CRM to arrange your walkthrough.";

  const text = [
    greeting,
    '',
    intro,
    submitted ? `\nWhat you submitted:\n${submitted}` : null,
    '',
    whatHappensNext,
    '',
    'ImmiStack is in early access. Regulator integrations run against sandbox environments today, not live government systems.',
    '',
    recordedInCrm,
    '',
    'Questions in the meantime? Reply to this email or write to hello@immistack.com.',
    '',
    "If this wasn't you, or you'd rather not hear from us, reply and let us know and we'll remove your details.",
  ]
    .filter((line): line is string => line !== null)
    .join('\n');

  return { subject, text };
}

export interface LeadNotificationInput {
  email: string;
  name?: string;
  firmName?: string;
  phone?: string;
  /** The capture-point tag/source, e.g. "waitlist", "affiliate", "book_call". */
  source: string;
  /** Any other fields worth a human seeing, e.g. persona, website, message. */
  extra?: Record<string, string | undefined>;
}

export function leadNotificationEmail({
  email,
  name,
  firmName,
  phone,
  source,
  extra,
}: LeadNotificationInput): LeadEmailCopy {
  const lines = [
    `Source: ${source}`,
    `Email: ${email}`,
    name ? `Name: ${name}` : null,
    firmName ? `Firm: ${firmName}` : null,
    phone ? `Phone: ${phone}` : null,
    ...(extra
      ? Object.entries(extra)
          .filter((entry): entry is [string, string] => Boolean(entry[1]))
          .map(([key, value]) => `${key}: ${value}`)
      : []),
  ].filter((line): line is string => line !== null);

  return {
    subject: `New ImmiStack lead — ${source}`,
    text: lines.join('\n'),
  };
}
