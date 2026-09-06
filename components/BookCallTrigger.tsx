import React, { useEffect } from 'react';
import { buttonBaseStyles, buttonVariants, ButtonVariant } from './Button';

/**
 * A `<Button>`-styled link that opens the real demo-booking flow (Cal.com),
 * for every "Book a Demo" / "Talk to Sales" CTA outside the full `<BookCall>`
 * section (see components/BookCall.tsx for the mechanism notes — same
 * VITE_CALCOM_LINK env var, same mailto fallback, same webhook on the way in).
 *
 * Exists because `<Button>` only renders a `<button>` (no `href`), and every
 * primary CTA on the site needs to look identical whether it opens a
 * waitlist modal, a mailto link, or — after this env var is set in
 * production — the Cal.com embed. Sharing `buttonBaseStyles`/`buttonVariants`
 * keeps that true without forking the class string per caller.
 */
const CAL_LINK = import.meta.env.VITE_CALCOM_LINK as string | undefined;
const NAMESPACE = 'immistack';

interface BookCallTriggerProps {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const BookCallTrigger: React.FC<BookCallTriggerProps> = ({
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
}) => {
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
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const classes = `${buttonBaseStyles} ${buttonVariants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  // VITE_CALCOM_LINK is unset in production today (see CLAUDE.md / .env.example).
  // Rather than silently do nothing, or pretend to book, every trigger falls
  // back to a real mailto — never a fake "Booked" confirmation.
  if (!CAL_LINK) {
    return (
      <a href="mailto:hello@immistack.com?subject=Immistack%20demo" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={`https://cal.com/${CAL_LINK}`}
      data-cal-namespace={NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
      className={classes}
    >
      {children}
    </a>
  );
};
