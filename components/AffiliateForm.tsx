import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { WaitlistFormData, CRMStatus } from '../types';

interface AffiliateFormProps {
  /** Lead source passed through to Zoho. */
  source?: string;
}

const AUDIENCE_OPTIONS = [
  'Migration agents / lawyers',
  'Education agents / consultants',
  'Corporate HR / global mobility',
  'Content / blog / newsletter',
  'Social media / community',
  'Other',
];

/**
 * Affiliate Program sign-up form. Submits to the same Zoho CRM endpoint
 * (`/api/create-lead`) as the waitlist and lead-magnet forms, tagged with
 * source "Affiliate Program" for segmentation.
 */
export const AffiliateForm: React.FC<AffiliateFormProps> = ({ source = 'Affiliate Program' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [audience, setAudience] = useState(AUDIENCE_OPTIONS[0]);
  const [status, setStatus] = useState<CRMStatus>(CRMStatus.IDLE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(CRMStatus.SUBMITTING);

    const payload: WaitlistFormData = {
      email,
      firmName: name,
      firmSize: 'Solo',
      persona: 'Professional',
      source,
      website: website || undefined,
      audience,
    };

    try {
      const response = await fetch('/api/create-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create lead');
      }
      setStatus(CRMStatus.SUCCESS);
    } catch (error) {
      console.error('Affiliate form submission failed:', error);
      setStatus(CRMStatus.ERROR);
    }
  };

  if (status === CRMStatus.SUCCESS) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-10 text-center flex flex-col items-center justify-center min-h-[420px]">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-growth/10 mb-5">
          <CheckCircle className="h-9 w-9 text-growth" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-navy mb-2">Application received!</h3>
        <p className="text-gray-500 max-w-sm mx-auto text-sm">
          Thanks for applying to the Immistack Partner Program. We’ll review your application and email{' '}
          <span className="font-semibold text-navy">{email}</span> with your affiliate dashboard and
          referral links shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-10">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-heading font-bold text-navy mb-2">Become an Affiliate</h3>
        <p className="text-gray-500 text-sm">
          Earn <span className="font-semibold text-navy">30% recurring commission</span> for every firm you refer.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          required
          placeholder="Alex Nguyen"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Work Email"
          type="email"
          required
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Website / Social Profile"
          type="text"
          placeholder="https://yoursite.com or @handle"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <div className="w-full">
          <label className="block text-sm font-medium text-navy/70 mb-1 pl-1">How will you promote Immistack?</label>
          <select
            className="block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold sm:text-sm bg-white"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          >
            {AUDIENCE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {status === CRMStatus.ERROR && (
          <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
        )}

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={status === CRMStatus.SUBMITTING}
          className="mt-2 shadow-xl shadow-navy/20"
        >
          {status === CRMStatus.SUBMITTING ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting…
            </>
          ) : (
            <>
              Apply to Join <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
      <div className="text-center mt-4 text-[10px] text-gray-400">
        Free to join • Paid monthly • Real-time tracking
      </div>
    </div>
  );
};
