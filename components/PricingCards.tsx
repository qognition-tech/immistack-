import React, { useState } from 'react';
import { Check, Minus } from 'lucide-react';
import { BookCallButton } from './BookCallButton';

type Cell = boolean | string;

interface Tier {
  id: 'practice' | 'pro' | 'firm';
  name: string;
  recommended?: boolean;
}

const TIERS: Tier[] = [
  { id: 'practice', name: 'Practice' },
  { id: 'pro', name: 'Practice Pro', recommended: true },
  { id: 'firm', name: 'Firm' },
];

/**
 * Model B, per registered agent per month, ex GST — the recommended tiers in
 * `immistack/BUSINESS.md` §5.3. `annual` is the price when billed annually
 * (two months free); `monthly` is the published month-to-month figure —
 * A$155/249/379. These are BUSINESS.md's own numbers, not +20% arithmetic on
 * the annual price (that computation was wrong and has been retired). Do not
 * derive a different rounding — read §5.3 again if the tiers ever change.
 */
const PRICES: Record<Tier['id'], { annual: number; monthly: number }> = {
  practice: { annual: 129, monthly: 155 },
  pro: { annual: 209, monthly: 249 },
  firm: { annual: 319, monthly: 379 },
};

/** Row order and cell values are the memo's entitlement mapping, exactly —
 *  see Theo's copy §9. Do not reintroduce a killed claim from memo §4. */
const ROWS: { label: string; practice: Cell; pro: Cell; firm: Cell }[] = [
  { label: 'Staff and clients', practice: 'Unlimited, free', pro: 'Unlimited, free', firm: 'Unlimited, free' },
  { label: 'CRM, cases, tasks, documents, payments, communications', practice: true, pro: true, firm: true },
  { label: 'Client portal', practice: true, pro: true, firm: true },
  { label: 'Hash-chained audit log', practice: true, pro: true, firm: true },
  { label: 'Payment-gated workflow', practice: true, pro: true, firm: true },
  { label: 'Form automation', practice: true, pro: true, firm: true },
  { label: 'Custom branding', practice: true, pro: true, firm: true },
  { label: 'AI assistant, citation-enforced', practice: false, pro: true, firm: true },
  { label: 'Analytics dashboards', practice: false, pro: true, firm: true },
  { label: 'API access', practice: false, pro: 'Read', firm: 'Full' },
  { label: 'Single sign-on (SSO)', practice: false, pro: false, firm: true },
  { label: 'White-label client portal', practice: false, pro: false, firm: true },
];

function Cell({ value }: { value: Cell }) {
  if (value === true) return <Check className="h-4 w-4" style={{ color: 'var(--s-success)' }} aria-label="Included" />;
  if (value === false) return <Minus className="h-4 w-4" style={{ color: 'var(--s-line)' }} aria-label="Not included" />;
  return <span style={{ color: 'var(--s-body)' }}>{value}</span>;
}

export const PricingCards: React.FC = () => {
  const [annual, setAnnual] = useState(false);

  return (
    <div>
      <div className="flex justify-center mb-10">
        <div className="toggle-track" role="group" aria-label="Billing period">
          <div className="toggle-thumb" style={{ width: '50%', transform: annual ? 'translateX(100%)' : 'translateX(0%)' }} aria-hidden="true" />
          <button type="button" className="toggle-option" aria-pressed={!annual} onClick={() => setAnnual(false)}>
            Billed monthly
          </button>
          <button type="button" className="toggle-option" aria-pressed={annual} onClick={() => setAnnual(true)}>
            Billed annually — 2 months free
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {TIERS.map((tier) => (
          <div
            key={tier.id}
            className="panel flex flex-col"
            style={tier.recommended ? { borderColor: 'var(--s-accent)', borderWidth: 2 } : undefined}
          >
            {tier.recommended && (
              <span className="tag t-pack mb-3" style={{ alignSelf: 'flex-start' }}>
                Recommended
              </span>
            )}
            <h3 style={{ marginTop: 0 }}>{tier.name}</h3>
            <p className="mb-1">
              <span className="u-num" style={{ fontSize: 'var(--text-2xl)', fontWeight: 600, color: 'var(--s-ink)' }}>
                A${annual ? PRICES[tier.id].annual : PRICES[tier.id].monthly}
              </span>
              <span style={{ color: 'var(--s-muted)' }}> / registered agent / mo ex GST</span>
            </p>
            <p className="text-sm mb-4" style={{ color: 'var(--s-muted)' }}>
              {annual ? 'Billed annually — 2 months free' : 'Billed monthly'}
            </p>
            <ul className="mb-6" style={{ listStyle: 'none', padding: 0, flexGrow: 1 }}>
              {ROWS.filter((r) => r[tier.id] !== false).map((r) => (
                <li key={r.label} className="flex items-start gap-2 mb-2 text-sm">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" style={{ color: 'var(--s-success)' }} aria-hidden="true" />
                  <span>{r.label}{typeof r[tier.id] === 'string' && r[tier.id] !== 'Unlimited, free' ? ` — ${r[tier.id]}` : ''}</span>
                </li>
              ))}
            </ul>
            <BookCallButton position="pricing" />
          </div>
        ))}
      </div>

      <p className="text-sm mb-12" style={{ color: 'var(--s-muted)' }}>
        No setup fee. No lock-in. Annual billing gets two months free.
      </p>

      <div className="t-wrap" role="region" aria-label="Full capability comparison" tabIndex={0}>
        <table className="dt">
          <thead>
            <tr>
              <th scope="col">Capability</th>
              <th scope="col">Practice</th>
              <th scope="col">Practice Pro</th>
              <th scope="col">Firm</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                <td><Cell value={r.practice} /></td>
                <td><Cell value={r.pro} /></td>
                <td><Cell value={r.firm} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
