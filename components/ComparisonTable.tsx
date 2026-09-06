import React from 'react';
import { Check, Minus } from 'lucide-react';
import { BookCallButton } from './BookCallButton';

type Cell = true | string;

/**
 * ImmiStack vs. a generic CRM — recovered from the live site (git HEAD
 * `components/ComparisonTable.tsx`), ported onto Tailwind 4 tokens. Already
 * honest: every ImmiStack cell is a verifiable platform behaviour; the
 * generic column describes what a horizontal CRM does by default, not a
 * named competitor.
 */
const ROWS: { feature: string; immi: Cell; generic: Cell }[] = [
  { feature: 'Tenant isolation', immi: 'Postgres row-level security with FORCE, non-BYPASSRLS app role, verified over HTTP', generic: 'Application-layer checks' },
  { feature: 'Audit trail', immi: 'Hash-chained, append-only via database triggers', generic: 'Editable activity log' },
  { feature: 'Regulator integrations', immi: 'Sandbox adapters for 8 regulators; live wiring pending accreditation', generic: 'Not immigration-aware' },
  { feature: 'Screening on an empty watch list', immi: 'Reports "lists not loaded" and blocks the run', generic: 'Not applicable' },
  { feature: 'AI answers about regulation', immi: 'Must cite official sources or are suppressed', generic: 'Uncited generation' },
  { feature: 'Adding a jurisdiction', immi: 'A JSON country overlay', generic: 'Custom build' },
  { feature: 'Immigration workflows, forms and portals', immi: true, generic: 'Built from scratch' },
];

export const ComparisonTable: React.FC<{ primaryPosition: string }> = ({ primaryPosition }) => (
  <section className="py-16 sm:py-20 lg:py-24" style={{ background: 'var(--s-soft)' }} aria-labelledby="compare-heading">
    <div className="wrap">
      <div className="text-center mb-10 sm:mb-14" style={{ maxWidth: '48rem', marginInline: 'auto' }}>
        <h2 id="compare-heading" style={{ marginTop: 0 }}>ImmiStack versus a generic CRM</h2>
        <p className="lede mx-auto">
          A horizontal CRM can hold immigration data. It cannot enforce immigration rules. Here is what is built in.
        </p>
      </div>

      <div className="t-wrap" role="region" aria-label="ImmiStack versus a generic CRM" tabIndex={0}>
        <table className="dt">
          <thead>
            <tr>
              <th scope="col"><span className="sr-only">Capability</span></th>
              <th scope="col" style={{ background: 'var(--s-ink)', color: '#fff' }}>
                <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>ImmiStack</div>
                <div className="text-xs mt-1 font-bold uppercase tracking-wide" style={{ color: 'var(--s-accent)' }}>Early access</div>
              </th>
              <th scope="col">
                <div style={{ fontWeight: 600 }}>Generic CRM</div>
                <div className="text-xs mt-1" style={{ color: 'var(--s-muted)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
                  Horizontal sales CRM, configured for immigration
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.feature}>
                <th scope="row">{row.feature}</th>
                <td>
                  {row.immi === true ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4" style={{ color: 'var(--s-success)' }} aria-hidden="true" /> Included
                    </span>
                  ) : (
                    row.immi
                  )}
                </td>
                <td style={{ color: 'var(--s-muted)' }}>
                  {row.generic === true ? (
                    <Check className="w-5 h-5" style={{ color: 'var(--s-muted)' }} aria-label="Included" />
                  ) : (
                    <span className="flex items-start gap-2">
                      <Minus className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--s-line)' }} aria-hidden="true" />
                      {row.generic}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 sm:mt-12 text-center">
        <BookCallButton position={primaryPosition} />
      </div>
    </div>
  </section>
);
