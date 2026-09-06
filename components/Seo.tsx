import React from 'react';
import { Head } from 'vite-react-ssg';
import { SITE_ORIGIN } from '../seo/site';

interface SeoProps {
  title: string;
  description: string;
  /** Path beginning with "/", e.g. "/features". */
  path: string;
  /** Optional social share image (absolute or root-relative). */
  image?: string;
  type?: 'website' | 'article';
  /** When true, emit robots "noindex, follow" (e.g. the 404 page). */
  noindex?: boolean;
  /** Extra <head> children (e.g. JSON-LD schema). */
  children?: React.ReactNode;
}

const DEFAULT_IMAGE = `${SITE_ORIGIN}/og-default.png`;

/**
 * Renders per-page <head> tags via vite-react-ssg's <Head> so they are
 * baked into the prerendered HTML and updated on client navigation.
 *
 * No hreflang: Nadia's audit found all four locale tags pointing at the
 * identical canonical URL (no locale-routed content exists behind any of
 * them, unlike govx's real `/ar` mirror) — a like-for-like audit decision,
 * not an oversight. Multi-market relevance is signalled through on-page copy
 * and `Organization.areaServed` instead.
 */
export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  path,
  image,
  type = 'website',
  noindex = false,
  children,
}) => {
  const canonical = `${SITE_ORIGIN}${path === '/' ? '' : path}`;
  const ogImage = image
    ? image.startsWith('http')
      ? image
      : `${SITE_ORIGIN}${image}`
    : DEFAULT_IMAGE;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:site_name" content="ImmiStack" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {children}
    </Head>
  );
};
