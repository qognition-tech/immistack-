import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { WaitlistFormData, CRMStatus } from '../types';
import { CONTACT_EMAIL } from '../seo/site';
import { track } from '../lib/analytics';
import { fetchFormToken, submitLead } from '../lib/leadForm';

interface WaitlistFormProps {
  /** Lead source passed through to Twenty CRM (set by whatever opened the form). */
  source?: string;
}

/**
 * "Join early access" — the secondary CTA everywhere. Five states: default,
 * focus (Input's `.input:focus` token ring), submitting (spinner, disabled,
 * no double-submit), success (inline, no second modal), error (honest —
 * matches whatever `/api/create-lead` actually reported, never "we'll be in
 * touch" on a rejected submission).
 *
 * Fetches a min-time HMAC token from `/api/form-token` on mount and echoes it
 * back on submit — same scheme as the govx sibling site's `LeadForm.tsx`.
 * The honeypot (`company_website`) is unchanged.
 */
export const WaitlistForm: React.FC<WaitlistFormProps> = ({ source = 'Website' }) => {
  const [formData, setFormData] = useState<WaitlistFormData>({
    email: '',
    firmName: '',
    firmSize: 'Small (1-5)',
  });
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [status, setStatus] = useState<CRMStatus>(CRMStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchFormToken().then(setToken);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(CRMStatus.SUBMITTING);
    setErrorMessage(null);

    const payload: WaitlistFormData & { token: string } = { ...formData, source, token };
    if (role) payload.audience = role;

    const result = await submitLead(payload, CONTACT_EMAIL);
    if (result.ok === false) {
      setErrorMessage(result.message);
      setStatus(CRMStatus.ERROR);
      return;
    }
    setStatus(CRMStatus.SUCCESS);
    track('waitlist_form_submit', { source });
  };

  if (status === CRMStatus.SUCCESS) {
    return (
      <div className="p-6 sm:p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-10 w-10" style={{ color: 'var(--s-success)' }} aria-hidden="true" />
        <h3 id="waitlist-modal-heading" style={{ marginTop: 0 }}>
          You're on the list
        </h3>
        <p className="mb-0" style={{ color: 'var(--s-muted)' }}>
          We'll be in touch at <strong>{formData.email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      <h3 id="waitlist-modal-heading" style={{ marginTop: 0 }}>
        Join early access
      </h3>
      <p className="lede mb-6">ImmiStack is in private beta with founding firms. Tell us about yours.</p>

      <form onSubmit={handleSubmit}>
        {/* Honeypot — hidden from sighted and screen-reader users; a real visitor never fills it. */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
          <label htmlFor="company_website">Leave this field blank</label>
          <input
            id="company_website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.company_website ?? ''}
            onChange={(e) => setFormData({ ...formData, company_website: e.target.value })}
          />
        </div>

        <Input
          label="Work email"
          type="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          label="Firm name"
          type="text"
          required
          value={formData.firmName}
          onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
        />
        <Input label="Role" type="text" placeholder="Principal, registered agent, office manager…" value={role} onChange={(e) => setRole(e.target.value)} />

        {status === CRMStatus.ERROR && errorMessage && (
          <p className="err" role="alert">
            {errorMessage}
          </p>
        )}

        <Button type="submit" variant="primary" fullWidth disabled={status === CRMStatus.SUBMITTING}>
          {status === CRMStatus.SUBMITTING ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Submitting…
            </>
          ) : (
            'Join early access'
          )}
        </Button>
      </form>
    </div>
  );
};
