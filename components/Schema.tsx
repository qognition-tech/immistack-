import React from 'react';
import { Head } from 'vite-react-ssg';
import { SITE_ORIGIN } from '../seo/site';

/** Renders a JSON-LD <script> into <head> for prerender + client. */
const JsonLd: React.FC<{ data: Record<string, unknown> }> = ({ data }) => (
  <Head>
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  </Head>
);

/** Organization + SoftwareApplication. Rendered once site-wide in the layout. */
export const OrganizationSchema: React.FC = () => {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_ORIGIN}/#organization`,
        name: 'Immistack',
        url: SITE_ORIGIN,
        logo: `${SITE_ORIGIN}/logo.png`,
        email: 'hello@immistack.com',
        description:
          'Immistack is the all-in-one immigration CRM and case management platform for migration agents, education consultants and corporate HR teams across AU, CA, UK and NZ.',
        areaServed: ['AU', 'CA', 'GB', 'NZ'],
        sameAs: [
          'https://www.linkedin.com/company/immistack',
          'https://x.com/immistack',
        ],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_ORIGIN}/#software`,
        name: 'Immistack',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: SITE_ORIGIN,
        publisher: { '@id': `${SITE_ORIGIN}/#organization` },
        description:
          'Immigration CRM and case management software with per-subclass document checklists, client intake, workflow automation and a hash-chained audit log.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'AUD',
          description: 'Start free — founding member pricing at launch.',
        },
      },
    ],
  };
  return <JsonLd data={data} />;
};

export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQPage schema — use on pricing / feature pages with a visible FAQ. */
export const FaqSchema: React.FC<{ items: FaqItem[] }> = ({ items }) => {
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
