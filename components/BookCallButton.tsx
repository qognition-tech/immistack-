import React, { useEffect } from 'react';
import { CalendarClock, Mail } from 'lucide-react';
import { CONTACT_EMAIL } from '../seo/site';
import { track, trackCtaClick } from '../lib/analytics';

/**
 * The single "Book a 30-minute walkthrough" trigger — reused in the nav and
 * every page's bottom CTA section. Cal.com's embed script attaches its own
 * click handler to any element carrying `data-cal-link` once initialised, so
 * this component IS the button; there is no separate modal to build, and no
 * custom "submitted" state (Cal's own confirmation renders inside the popup
 * it opens — building a parallel one risks drifting from what actually
 * happened, per Elena's brief).
 *
 * `initCalApi()` runs once, lazily, from whichever instance mounts first —
 * safe to place any number of these on one page.
 */
const CAL_LINK = import.meta.env.VITE_CALCOM_LINK as string | undefined;
const NAMESPACE = 'immistack';
let calApiInitPromise: Promise<void> | null = null;

function initCalApi() {
  if (!CAL_LINK) return;
  if (!calApiInitPromise) {
    calApiInitPromise = (async () => {
      const { getCalApi } = await import('@calcom/embed-react');
      const cal = await getCalApi({ namespace: NAMESPACE });
      cal('ui', {
        theme: 'light',
        hideEventTypeDetails: false,
        layout: 'month_view',
        cssVarsPerTheme: { light: { 'cal-brand': '#171B21' }, dark: { 'cal-brand': '#E2896B' } },
      });
      // Best-effort only — see the module doc comment. The Cal.com webhook
      // (api/cal-webhook.ts) is the record of truth for this event.
      cal('on', { action: 'bookingSuccessful', callback: () => track('demo_booked', {}) });
    })();
  }
  return calApiInitPromise;
}

interface BookCallButtonProps {
  variant?: 'primary' | 'secondary';
  className?: string;
  label?: string;
  /** Nav / hero / pricing / final-cta — for the `cta_click` event. */
  position: string;
}

export const BookCallButton: React.FC<BookCallButtonProps> = ({ variant = 'primary', className = '', label = 'Book a 30-minute walkthrough', position }) => {
  useEffect(() => {
    initCalApi();
  }, []);

  const btnClass = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} max-w-full text-center ${className}`;
  const onClick = () => trackCtaClick(label, position);

  if (!CAL_LINK) {
    return (
      <a href={`mailto:${CONTACT_EMAIL}?subject=Book%20a%2030-minute%20walkthrough`} className={btnClass} onClick={onClick}>
        <Mail className="h-4 w-4 shrink-0" aria-hidden="true" /> {label}
      </a>
    );
  }

  return (
    <a
      href={`https://cal.com/${CAL_LINK}`}
      data-cal-namespace={NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
      className={btnClass}
      onClick={onClick}
    >
      <CalendarClock className="h-4 w-4 shrink-0" aria-hidden="true" /> {label}
    </a>
  );
};
