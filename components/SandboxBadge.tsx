import React from 'react';
import { FlaskConical } from 'lucide-react';

/**
 * Marks every product mockup on the site as an illustrative, non-live preview.
 * All eight regulator adapters are sandbox until accreditation, and the figures
 * inside mockups are sample data — this badge says so in-frame so a screenshot
 * can never be mistaken for live regulator data.
 */
export const SandboxBadge: React.FC<{ className?: string; dark?: boolean }> = ({ className = '', dark = false }) => (
  <span
    className={`inline-flex max-w-full shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
      dark ? 'border-amber-400/40 bg-amber-400/10 text-amber-300' : 'border-amber-300 bg-amber-50 text-amber-800'
    } ${className}`}
  >
    <FlaskConical className="h-3 w-3 shrink-0" aria-hidden="true" />
    {/* Full disclosure at >=400px; below that (a tight mockup toolbar on a
        phone) the short form still says "sandbox" rather than disappearing
        or wrapping the row it sits in. */}
    <span className="hidden xs:inline">Sandbox preview · sample data</span>
    <span className="xs:hidden">Sandbox</span>
  </span>
);

/** Non-interactive stand-in for a button inside a mockup (nothing to click). */
export const MockButton: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <span aria-hidden="true" className={`inline-flex items-center justify-center select-none ${className}`}>
    {children}
  </span>
);
