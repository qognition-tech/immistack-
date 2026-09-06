/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public Cal.com booking link, e.g. "immistack/intro". Safe in the browser. */
  readonly VITE_CALCOM_LINK?: string;
  /** GTM container id. GA4/GTM event plan (lib/analytics.ts) no-ops when unset. */
  readonly VITE_GTM_ID?: string;
}
