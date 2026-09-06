import React from 'react';
import { Head } from 'vite-react-ssg';

/**
 * The GTM container script + noscript fallback, rendered only when
 * `VITE_GTM_ID` is set — otherwise both are `null` and no request to
 * googletagmanager.com is ever made.
 *
 * Fixes Owen's finding #2: `lib/analytics.ts` was pushing every event to
 * `window.dataLayer`, but nothing ever loaded the GTM container script, so
 * those pushes had no consumer — setting `VITE_GTM_ID` on Vercel did not
 * actually make an event reach GA4/GTM. `window.dataLayer` is initialised
 * here, before the container script itself, exactly as Google's own snippet
 * requires (a push before the container loads must not be lost).
 *
 * Same mechanism `<Seo>` uses (`vite-react-ssg`'s `<Head>`) so this is baked
 * into the prerendered HTML, not injected only after client hydration.
 */
const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined;

export const GtmScript: React.FC = () => {
  if (!GTM_ID) return null;
  return (
    <Head>
      <script>{`window.dataLayer=window.dataLayer||[];(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}</script>
    </Head>
  );
};

/**
 * Google's documented placement is immediately after the opening `<body>`
 * tag. This SSG's body is `<div id="root">` with no server-side control over
 * anything before it, so this renders as the first child of the app tree
 * instead — as close to the top of `<body>` as the framework allows.
 */
export const GtmNoscript: React.FC = () => {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height={0}
        width={0}
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
};
