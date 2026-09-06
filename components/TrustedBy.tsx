import React from 'react';
import { FlaskConical } from 'lucide-react';

const REGULATORS = [
  { code: 'AU', name: 'Department of Home Affairs', country: 'Australia' },
  { code: 'CA', name: 'IRCC', country: 'Canada' },
  { code: 'UK', name: 'Home Office', country: 'United Kingdom' },
  { code: 'NZ', name: 'Immigration New Zealand', country: 'New Zealand' },
];

/**
 * Regulator integrations row — recovered from the live site (git HEAD
 * `components/TrustedBy.tsx`), ported onto Tailwind 4 tokens. Already honest:
 * every adapter is tagged sandbox in the row itself, not in a legend
 * elsewhere on the page.
 */
export const TrustedBy: React.FC = () => (
  <section className="py-8 sm:py-10" style={{ borderBottom: '1px solid var(--s-line)' }} aria-labelledby="integrations-heading">
    <div className="wrap">
      <p id="integrations-heading" className="kicker text-center" style={{ marginBottom: '0.5rem' }}>
        Regulator integrations
      </p>
      <p className="text-sm text-center mb-8 mx-auto" style={{ color: 'var(--s-muted)', maxWidth: '46rem' }}>
        Sandbox adapters for eight regulators, including the four immigration authorities below.
        Production wiring is pending accreditation with each regulator.
      </p>
      <ul className="flex flex-wrap justify-center items-center gap-x-6 gap-y-5 sm:gap-8 md:gap-14" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {REGULATORS.map((r) => (
          <li key={r.code} className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ border: '2px solid var(--s-ink)', color: 'var(--s-ink)', fontFamily: 'var(--font-serif)' }}
            >
              {r.code}
            </div>
            <div className="text-start leading-tight">
              <div className="font-bold text-sm" style={{ color: 'var(--s-ink)' }}>{r.name}</div>
              <div className="text-[10px] uppercase tracking-wider flex items-center gap-1" style={{ color: 'var(--s-muted)' }}>
                <FlaskConical className="h-3 w-3 shrink-0" style={{ color: 'var(--s-warning)' }} aria-hidden="true" /> Sandbox · {r.country}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
