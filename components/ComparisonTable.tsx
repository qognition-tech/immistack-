import React from 'react';
import { Check, Minus } from 'lucide-react';
import { Button } from './Button';

type Cell = true | string;

/**
 * Immistack vs. a generic CRM. Every Immistack cell is a verifiable platform
 * behaviour; the generic column describes what a horizontal CRM does by
 * default, not a named competitor.
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

export const ComparisonTable: React.FC<{ onOpenWaitlist: () => void }> = ({ onOpenWaitlist }) => {
  return (
    <section className="py-24 bg-slate" aria-labelledby="compare-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="compare-heading" className="text-4xl font-heading font-bold text-navy mb-4">
            Immistack versus a generic CRM
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A horizontal CRM can hold immigration data. It cannot enforce immigration rules. Here is what is built in.
          </p>
        </div>

        <div className="overflow-x-auto shadow-xl rounded-2xl border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th scope="col" className="p-6 bg-white border-b-2 border-gray-200 min-w-[200px]">
                  <span className="sr-only">Capability</span>
                </th>
                <th scope="col" className="p-6 border-b-2 border-gold bg-navy text-white min-w-[260px]">
                  <div className="text-2xl font-bold">Immistack</div>
                  <div className="text-xs text-gold mt-1 font-bold uppercase tracking-wide">Early access</div>
                </th>
                <th scope="col" className="p-6 border-b-2 border-gray-200 bg-gray-50 min-w-[200px]">
                  <div className="text-lg font-bold text-gray-600">Generic CRM</div>
                  <div className="text-xs text-gray-600 mt-1">Horizontal sales CRM, configured for immigration</div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {ROWS.map((row) => (
                <tr key={row.feature} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <th scope="row" className="p-5 font-bold text-navy text-sm border-r border-gray-100 text-left">
                    {row.feature}
                  </th>
                  <td className="p-5 bg-navy/5 border-r border-navy/10 font-medium text-navy text-sm">
                    {row.immi === true ? (
                      <span className="flex items-center gap-2">
                        <span className="bg-growth/10 p-1 rounded-full"><Check className="w-4 h-4 text-growth" aria-hidden="true" /></span>
                        <span>Included</span>
                      </span>
                    ) : (
                      row.immi
                    )}
                  </td>
                  <td className="p-5 text-gray-600 text-sm">
                    {row.generic === true ? <Check className="w-5 h-5 text-gray-600" aria-label="Included" /> : (
                      <span className="flex items-center gap-2"><Minus className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />{row.generic}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 text-center">
          <Button onClick={onOpenWaitlist} variant="gold" className="px-10 py-4 text-lg shadow-xl shadow-gold/20">
            Request early access
          </Button>
        </div>
      </div>
    </section>
  );
};
