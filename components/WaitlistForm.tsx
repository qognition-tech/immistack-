import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, Loader2, User, Building2, Copy, Check, Gift } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { WaitlistFormData, CRMStatus, Persona } from '../types';

interface WaitlistFormProps {
  /** Lead source passed through to Zoho (set by whatever opened the form). */
  source?: string;
  defaultPersona?: Persona;
}

/** Deterministic short referral code from an email. */
function referralCodeFor(email: string): string {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = (hash << 5) - hash + email.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36).slice(0, 6).padEnd(6, '0');
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({ source = 'Website', defaultPersona }) => {
  const [persona, setPersona] = useState<Persona>(defaultPersona ?? 'Professional');
  const [formData, setFormData] = useState<WaitlistFormData>({
    email: '',
    firmName: '',
    firmSize: 'Small (1-5)',
  });
  const [status, setStatus] = useState<CRMStatus>(CRMStatus.IDLE);
  const [referralSource, setReferralSource] = useState<string | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (defaultPersona) setPersona(defaultPersona);
  }, [defaultPersona]);

  // Capture inbound referral code (?ref=) for the referral program.
  useEffect(() => {
    try {
      const ref = new URLSearchParams(window.location.search).get('ref');
      if (ref) setReferralSource(ref);
    } catch {
      /* ignore */
    }
  }, []);

  const submitToCRM = async (data: WaitlistFormData) => {
    const response = await fetch('/api/create-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create lead');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(CRMStatus.SUBMITTING);

    const payload: WaitlistFormData = {
      ...formData,
      persona,
      source,
      referralSource,
      // For individuals there is no firm; keep the API's required fields valid.
      firmName: formData.firmName || (persona === 'Individual' ? 'Individual' : ''),
      firmSize: persona === 'Individual' ? 'Solo' : formData.firmSize,
    };

    try {
      await submitToCRM(payload);
      setStatus(CRMStatus.SUCCESS);
    } catch (error) {
      console.error('Form submission failed:', error);
      setStatus(CRMStatus.ERROR);
    }
  };

  // ---- Success + referral step -------------------------------------------
  if (status === CRMStatus.SUCCESS) {
    const code = referralCodeFor(formData.email || 'immistack');
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://immistack.com';
    const shareUrl = `${origin}/?ref=${code}`;
    const shareText = encodeURIComponent(
      'I just joined the Immistack early-access waitlist — the immigration CRM with a tamper-evident audit log. Jump the line:',
    );

    const copy = async () => {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        /* ignore */
      }
    };

    return (
      <div className="bg-white p-6 sm:p-8 text-center flex flex-col items-center justify-center min-h-[320px] sm:min-h-[400px]">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-growth/10 mb-5">
          <CheckCircle className="h-9 w-9 text-growth" />
        </div>
        <h3 className="text-xl sm:text-2xl font-heading font-bold text-navy mb-2">You’re on the list!</h3>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">
          We’ll email <span className="font-semibold text-navy">{formData.email}</span> with your founding-member
          access and 50%-off launch offer.
        </p>

        <div className="w-full min-w-0 bg-slate rounded-xl p-4 sm:p-5 border border-gray-100">
          <div className="inline-flex items-center gap-2 text-goldDark text-xs font-bold uppercase tracking-widest mb-2">
            <Gift className="h-4 w-4" /> Jump the line
          </div>
          <p className="text-sm text-navy font-medium mb-4">
            Refer 3 friends for priority access + a secret founding bonus.
          </p>

          <div className="flex items-stretch gap-2 mb-3">
            <input
              readOnly
              value={shareUrl}
              aria-label="Your referral link"
              className="min-w-0 flex-1 min-h-[44px] px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-600 truncate"
            />
            <button
              onClick={copy}
              className="shrink-0 min-h-[44px] px-3.5 rounded-lg bg-navy text-white flex items-center justify-center gap-1.5 text-xs font-medium hover:bg-navyLight transition-colors"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <a
              href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center justify-center rounded-lg bg-white border border-gray-200 px-1 text-center text-xs font-medium text-navy hover:border-gold transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={`https://x.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center justify-center rounded-lg bg-white border border-gray-200 px-1 text-center text-xs font-medium text-navy hover:border-gold transition-colors"
            >
              Share on X
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent('Check out Immistack')}&body=${shareText}%20${encodeURIComponent(shareUrl)}`}
              className="flex min-h-[44px] items-center justify-center rounded-lg bg-white border border-gray-200 px-1 text-center text-xs font-medium text-navy hover:border-gold transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ---- Capture form -------------------------------------------------------
  const personaTab = (value: Persona, label: string, Icon: React.ElementType) => (
    <button
      type="button"
      onClick={() => setPersona(value)}
      className={`flex-1 flex min-h-[44px] items-center justify-center gap-2 px-2 py-2.5 rounded-lg text-center text-sm font-semibold border transition-all ${
        persona === value
          ? 'bg-navy text-white border-navy shadow-md'
          : 'bg-white text-navy/70 border-gray-200 hover:border-gray-300'
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" /> {label}
    </button>
  );

  return (
    <div className="bg-white p-6 sm:p-8 md:p-10">
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-heading font-bold text-navy mb-2">Get Early Access</h3>
        <p className="text-gray-500 text-sm">
          Be first to simplify your immigration journey.
          <br />
          Founding members get <span className="font-semibold text-navy">50% off</span> at launch.
        </p>
      </div>

      {/* Persona segmentation */}
      <div className="flex flex-col xs:flex-row gap-2 mb-5">
        {personaTab('Individual', 'I’m an individual', User)}
        {personaTab('Professional', 'I’m a lawyer / consultant', Building2)}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Work Email"
          type="email"
          required
          placeholder="name@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        {persona === 'Professional' ? (
          <>
            <Input
              label="Firm Name"
              type="text"
              required
              placeholder="Global Migration Partners"
              value={formData.firmName}
              onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
            />
            <div className="w-full">
              <label className="block text-sm font-medium text-navy/70 mb-1 pl-1">Firm Size</label>
              <select
                className="block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold sm:text-sm bg-white"
                value={formData.firmSize}
                onChange={(e) => setFormData({ ...formData, firmSize: e.target.value as any })}
              >
                <option value="Solo">Solo Practitioner</option>
                <option value="Small (1-5)">Boutique Firm (1-5)</option>
                <option value="Medium (6-25)">Mid-Sized (6-25)</option>
                <option value="Enterprise (25+)">Enterprise / Network (25+)</option>
              </select>
            </div>
          </>
        ) : (
          <Input
            label="Full Name"
            type="text"
            required
            placeholder="Alex Nguyen"
            value={formData.firmName}
            onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
          />
        )}

        {referralSource && (
          <p className="text-xs text-growth flex items-center gap-1.5">
            <Gift className="h-3.5 w-3.5" /> Referral applied — you’ll get priority access.
          </p>
        )}

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
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Joining…
            </>
          ) : (
            <>
              Get Early Access <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
      <div className="text-center mt-4 text-[10px] text-gray-400">
        No credit card required • Unsubscribe anytime
      </div>
    </div>
  );
};
