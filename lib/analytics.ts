/**
 * GA4/GTM event plan per Marcus's conversion-architecture brief
 * (scratchpad/reports/marcus-packaging-cro.md §4). Reads `VITE_GTM_ID` and
 * no-ops when it is unset, so this never throws in a build or a preview with
 * no analytics wired. The consumer is `components/Gtm.tsx` (`<GtmScript>`,
 * rendered in `App.tsx`) — it initialises `window.dataLayer` and loads the
 * GTM container script, both gated on the same env var; without it these
 * `push()` calls had nothing listening (Owen's finding #2, fixed).
 *
 * `trial_tenant_provisioned` (the primary conversion event) and `trial_to_paid`
 * are explicitly NOT here — Marcus flags both as back-office actions with no
 * defined client-side mechanism (`[NEEDS DATA]`). `demo_booked` is the nearest
 * GA4 key event this site can actually fire, best-effort, from the Cal.com
 * embed's own `bookingSuccessful` callback — the authoritative record is still
 * the Cal.com webhook (`api/cal-webhook.ts`), not this push.
 */
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined;

export function track(event: string, params: Record<string, unknown> = {}): void {
  if (!GTM_ID) return;
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, page_path: window.location.pathname, ...params });
}

export function trackCtaClick(ctaLabel: string, ctaPosition: string): void {
  track('cta_click', { cta_label: ctaLabel, cta_position: ctaPosition });
}
