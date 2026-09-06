import React from 'react';
import { Head } from 'vite-react-ssg';
import { SITE_ORIGIN } from '../seo/site';

/** Renders a JSON-LD <script> into <head> for prerender + client. */
const JsonLd: React.FC<{ data: Record<string, unknown> }> = ({ data }) => (
  <Head>
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  </Head>
);

/**
 * Model B pricing, operator-accepted 2026-09-06 — same figures as
 * `components/PricingCards.tsx`'s `annual` column. Schema price must equal a
 * visible on-page price exactly; do not let this drift from the component.
 */
const OFFERS: { name: string; price: number }[] = [
  { name: 'Practice', price: 129 },
  { name: 'Practice Pro', price: 209 },
  { name: 'Firm', price: 319 },
];

/**
 * Organization + SoftwareApplication. Rendered once site-wide in App.tsx.
 *
 * Per Nadia's GEO brief: no `award`, `foundingDate`, `numberOfEmployees` or
 * `sameAs` until the underlying data exists — an invented value in structured
 * data is a claim too, and worse than an absent field. No `aggregateRating`/
 * `review` — none exist. `offers` carries the three real, operator-accepted
 * tier prices (see `OFFERS` above); each `price` is the annual-billed figure,
 * matching the number `/pricing` shows with the Annual toggle selected — the
 * defect this schema must never repeat is a hidden price with no visible
 * match.
 */
export const OrganizationSchema: React.FC = () => {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_ORIGIN}/#organization`,
        name: 'ImmiStack',
        url: SITE_ORIGIN,
        logo: `${SITE_ORIGIN}/logo.png`,
        description: 'Immigration CRM and case management for registered migration agents.',
        areaServed: ['AU', 'CA', 'GB', 'NZ'],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_ORIGIN}/#software`,
        name: 'ImmiStack',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: SITE_ORIGIN,
        publisher: { '@id': `${SITE_ORIGIN}/#organization` },
        description:
          'Immigration CRM and case management software with per-subclass document checklists, client intake, payment-gated workflow and a hash-chained audit log.',
        offers: OFFERS.map((o) => ({
          '@type': 'Offer',
          name: o.name,
          price: String(o.price),
          priceCurrency: 'AUD',
          url: `${SITE_ORIGIN}/pricing`,
          description: 'Per registered agent, per month, billed annually, ex GST. Monthly billing is also available at a higher rate — see /pricing.',
        })),
      },
    ],
  };
  return <JsonLd data={data} />;
};

export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQPage schema — pass the same items rendered by <ObjectionAccordion>. */
export const FaqSchema: React.FC<{ items: FaqItem[] }> = ({ items }) => {
  if (items.length === 0) return null;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  };
  return <JsonLd data={data} />;
};

/** BreadcrumbList schema for inner pages. */
export const BreadcrumbSchema: React.FC<{
  trail: { name: string; path: string }[];
}> = ({ trail }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((c, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: c.name,
      item: `${SITE_ORIGIN}${c.path === '/' ? '' : c.path}`,
    })),
  };
  return <JsonLd data={data} />;
};
