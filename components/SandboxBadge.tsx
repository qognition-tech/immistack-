import React from 'react';
import { FlaskConical } from 'lucide-react';

/**
 * Marks every product mockup on the site as an illustrative, non-live preview.
 * All eight regulator adapters are sandbox until accreditation, and the figures
 * inside mockups are sample data — this badge says so in-frame so a screenshot
 * can never be mistaken for live regulator data.
 */
export const SandboxBadge: React.FC<{ className?: string; label?: string }> = ({
  className = '',
  label = 'Illustrative — sample checklist, not a live regulator response',
}) => (
  <span className={`sandbox-badge ${className}`}>
    <FlaskConical className="h-3 w-3 shrink-0" aria-hidden="true" />
    {label}
  </span>
);
