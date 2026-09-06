/**
 * zod strict schema for POST /api/create-lead.
 *
 * `.strict()` rejects any key not listed here — that is what stops a bot (or
 * a future form nobody documented) from smuggling arbitrary fields into a
 * shared Twenty workspace. The field set matches what `WaitlistForm.tsx` and
 * `AffiliateForm.tsx` send today, plus the wider "accept both shapes" set
 * `create-lead.ts` already tolerated before this change (`name`/`fullName`,
 * `firmName`/`company`) — narrowing it further would silently 400 a caller
 * this file was not looking at.
 *
 * Per CLAUDE.md: "When adding a form field, add it to the WaitlistFormData
 * type, the handler's destructuring, and the note lines — otherwise it is
 * silently dropped." Add it here too, or zod strict rejects the whole
 * submission with a 400 instead of silently dropping the one field.
 */
import { z } from 'zod';

const trimmed = (max: number) => z.string().trim().max(max);

export const LeadSchema = z
  .object({
    email: z.string().trim().toLowerCase().email().max(320),
    name: trimmed(200).optional(),
    fullName: trimmed(200).optional(),
    firmName: trimmed(200).optional(),
    company: trimmed(200).optional(),
    firmSize: trimmed(80).optional(),
    persona: trimmed(80).optional(),
    website: trimmed(500).optional(),
    audience: trimmed(500).optional(),
    referralSource: trimmed(200).optional(),
    message: trimmed(4000).optional(),
    phone: trimmed(60).optional(),
    source: trimmed(80).optional(),
    /** HMAC min-time token from GET /api/form-token. See api/_hmac.ts. */
    token: z.string().max(200).optional(),
    /** Honeypot. A real visitor never fills either — both hidden, both accepted historically. */
    company_website: trimmed(500).optional(),
    hp: trimmed(500).optional(),
  })
  .strict();

export type ValidLead = z.infer<typeof LeadSchema>;
