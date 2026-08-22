import React from 'react';
import { FlaskConical } from 'lucide-react';

const REGULATORS = [
  { code: 'AU', name: 'Department of Home Affairs', country: 'Australia' },
  { code: 'CA', name: 'IRCC', country: 'Canada' },
  { code: 'UK', name: 'Home Office', country: 'United Kingdom' },
  { code: 'NZ', name: 'Immigration New Zealand', country: 'New Zealand' },
];

/**
 * Integration status strip. Replaces a "Directly integrated with government
 * portals" banner that named integrations which do not exist. All adapters are
 * sandbox until accreditation; say so in the strip itself.
 */
export const TrustedBy: React.FC = () => {
  return (
    <section className="py-10 border-b border-gray-100 bg-white" aria-labelledby="integrations-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p id="integrations-heading" className="text-center text-sm font-semibold text-gray-600 uppercase tracking-widest mb-2">
          Regulator integrations
        </p>
        <p className="text-center text-sm text-gray-600 mb-8 max-w-2xl mx-auto">
          Sandbox adapters for eight regulators, including the four immigration authorities below. Production wiring
          is pending accreditation with each regulator.
        </p>
        <ul className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
          {REGULATORS.map((r) => (
            <li key={r.code} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border-2 border-navy flex items-center justify-center font-serif font-bold text-navy text-sm">
                {r.code}
              </div>
              <div className="text-left leading-tight">
                <div className="font-bold text-navy text-sm">{r.name}</div>
                <div className="text-[10px] text-gray-600 uppercase tracking-wider flex items-center gap-1">
                  <FlaskConical className="h-3 w-3 text-amber-700" aria-hidden="true" /> Sandbox · {r.country}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
