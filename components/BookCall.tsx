import React, { useEffect, useState } from 'react';
import { CalendarClock, Mail } from 'lucide-react';

/**
 * "Book a call" via the official Cal.com embed (@calcom/embed-react).
 *
 * - Only the PUBLIC booking link (e.g. "immistack/intro") reaches the browser,
 *   via VITE_CALCOM_LINK. No API key is ever shipped client-side; CALCOM_API_KEY
 *   and CALCOM_WEBHOOK_SECRET are read only by api/cal-webhook.ts.
 * - When a booking completes, Cal.com calls /api/cal-webhook (BOOKING_CREATED),
 *   which upserts the lead into Twenty CRM tagged `immistack`.
 * - The embed script is loaded lazily on mount (client only) so prerendering
 *   and LCP are unaffected.
 */
const CAL_LINK = import.meta.env.VITE_CALCOM_LINK as string | undefined;
const NAMESPACE = 'immistack';

export const BookCall: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    if (!CAL_LINK) return;
    let cancelled = false;
    (async () => {
      const { getCalApi } = await import('@calcom/embed-react');
      const cal = await getCalApi({ namespace: NAMESPACE });
      if (cancelled) return;
      cal('ui', {
        theme: 'light',
        hideEventTypeDetails: false,
        layout: 'month_view',
        cssVarsPerTheme: { light: { 'cal-brand': '#0B1120' }, dark: { 'cal-brand': '#FBBF24' } },
      });
      cal('on', { action: 'bookingSuccessful', callback: () => setBooked(true) });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const trigger = CAL_LINK ? (
    <button
      type="button"
      data-cal-namespace={NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
      className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-md bg-gold text-navy font-bold shadow-lg shadow-gold/20 hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
    >
      <CalendarClock className="h-5 w-5" aria-hidden="true" /> Book a call
    </button>
  ) : (
    <a
      href="mailto:hello@immistack.com?subject=Immistack%20intro%20call"
      className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-md bg-gold text-navy font-bold shadow-lg shadow-gold/20 hover:bg-yellow-600 transition-colors"
    >
      <Mail className="h-5 w-5" aria-hidden="true" /> Email us to book a call
    </a>
  );

  if (compact) return trigger;

  return (
    <section className="py-20 bg-white border-t border-gray-100" aria-labelledby="book-heading">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 id="book-heading" className="text-3xl font-heading font-bold text-navy mb-4">
          Talk to the people building it
        </h2>
        <p className="text-gray-600 mb-8">
          A 30-minute walkthrough of the sandbox, what is live today, and what is gated behind regulator accreditation.
        </p>
        {booked ? (
          <p role="status" className="text-growth font-semibold">
            Booked. A calendar invite is on its way.
          </p>
        ) : (
          trigger
        )}
      </div>
    </section>
  );
};
