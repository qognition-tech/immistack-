import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { WaitlistFormData, CRMStatus } from '../types';
import { CONTACT_EMAIL } from '../seo/site';
import { fetchFormToken, submitLead } from '../lib/leadForm';

/**
 * Affiliate referral form. Fields per Theo's copy: firm name, work email,
 * referring firm/individual name, hidden honeypot. Submits to the same
 * `/api/create-lead` endpoint as every other form on the site, tagged
 * `affiliate`. No commission figure is shown anywhere on this form —
 * `[NEEDS DATA: commission structure/terms]`, per the site rule that an
 * unconfirmed number renders as nothing, never a placeholder.
 *
 * Fetches a min-time HMAC token from `/api/form-token` on mount, same as
 * `WaitlistForm.tsx` — see `lib/leadForm.ts`.
 */
export const AffiliateForm: React.FC = () => {
  const [firmName, setFirmName] = useState('');
  const [email, setEmail] = useState('');
  const [referredBy, setReferredBy] = useState('');
  const [honeypot, setHoneypot] = useState('');
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

    const payload: WaitlistFormData & { referralSource?: string; token: string } = {
      email,
      firmName,
      firmSize: 'Solo',
      source: 'affiliate',
      referralSource: referredBy || undefined,
      company_website: honeypot || undefined,
      token,
    };

    const result = await submitLead(payload, CONTACT_EMAIL);
    if (result.ok === false) {
      setErrorMessage(result.message);
      setStatus(CRMStatus.ERROR);
      return;
    }
    setStatus(CRMStatus.SUCCESS);
  };

  if (status === CRMStatus.SUCCESS) {
    return (
      <div className="panel text-center">
        <CheckCircle2 className="mx-auto mb-4 h-10 w-10" style={{ color: 'var(--s-success)' }} aria-hidden="true" />
        <h3 style={{ marginTop: 0 }}>Referral received</h3>
        <p className="mb-0" style={{ color: 'var(--s-muted)' }}>
          We'll follow up with <strong>{firmName}</strong> and confirm terms with you at <strong>{email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="panel">
      <form onSubmit={handleSubmit}>
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
          <label htmlFor="affiliate-company_website">Leave this field blank</label>
          <input id="affiliate-company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>

        <Input label="Firm name" type="text" required value={firmName} onChange={(e) => setFirmName(e.target.value)} />
        <Input label="Work email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input label="Referring firm or individual" type="text" value={referredBy} onChange={(e) => setReferredBy(e.target.value)} />

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
            'Submit referral'
          )}
        </Button>
      </form>
    </div>
  );
};
