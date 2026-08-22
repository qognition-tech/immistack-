import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { RouteRecord } from 'vite-react-ssg';
import App from './App';
import { Seo } from './components/Seo';
import { BreadcrumbSchema, FaqSchema, FaqItem } from './components/Schema';
import { useWaitlist } from './context/WaitlistContext';
import { Page } from './types';
import { PAGES, PageMeta, ARTICLE_META, NOT_FOUND_META, pathForPage } from './seo/site';

// Pages
import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { FeatureCRM } from './pages/FeatureCRM';
import { FeatureCompliance } from './pages/FeatureCompliance';
import { FeaturePortal } from './pages/FeaturePortal';
import { FeatureStaffPortal } from './pages/FeatureStaffPortal';
import { FeatureAdminPortal } from './pages/FeatureAdminPortal';
import { FeatureAI } from './pages/FeatureAI';
import { FeatureBilling } from './pages/FeatureBilling';
import { FeatureTasks } from './pages/FeatureTasks';
import { FeatureForms } from './pages/FeatureForms';
import { FeatureMultiOffice } from './pages/FeatureMultiOffice';
import { Pricing } from './pages/Pricing';
import { About } from './pages/About';
import { Industries } from './pages/Industries';
import { IndustryAgents } from './pages/IndustryAgents';
import { IndustryEducation } from './pages/IndustryEducation';
import { IndustryCorporate } from './pages/IndustryCorporate';
import { Resources } from './pages/Resources';
import { ResourceArticle } from './pages/ResourceArticle';
import { Affiliate } from './pages/Affiliate';
import { NotFound } from './pages/NotFound';

const PAGE_COMPONENTS: Record<Page, React.ComponentType<any>> = {
  HOME: Home,
  FEATURES: Features,
  INDUSTRIES: Industries,
  INDUSTRY_AGENTS: IndustryAgents,
  INDUSTRY_EDUCATION: IndustryEducation,
  INDUSTRY_CORPORATE: IndustryCorporate,
  PRICING: Pricing,
  ABOUT: About,
  RESOURCES: Resources,
  RESOURCE_ARTICLE: ResourceArticle,
  FEATURE_CRM: FeatureCRM,
  FEATURE_COMPLIANCE: FeatureCompliance,
  FEATURE_PORTAL: FeaturePortal,
  FEATURE_STAFF_PORTAL: FeatureStaffPortal,
  FEATURE_ADMIN_PORTAL: FeatureAdminPortal,
  FEATURE_AI: FeatureAI,
  FEATURE_BILLING: FeatureBilling,
  FEATURE_TASKS: FeatureTasks,
  FEATURE_FORMS: FeatureForms,
  FEATURE_MULTIOFFICE: FeatureMultiOffice,
  AFFILIATE: Affiliate,
};

const PRICING_FAQ: FaqItem[] = [
  {
    question: 'Is there a free trial of Immistack?',
    answer:
      'Yes. You can join the early-access waitlist for free and founding members receive a launch discount plus extended trial access.',
  },
  {
    question: 'Which countries does Immistack support?',
    answer:
      'Immistack is built for immigration and migration practices across Australia, Canada, the United Kingdom and New Zealand, including automated VEVO checks for Australia.',
  },
  {
    question: 'Can I change plans as my firm grows?',
    answer:
      'Yes. Plans scale by team size and module, so solo practitioners through to multi-office networks can upgrade at any time.',
  },
];

const FEATURES_FAQ: FaqItem[] = [
  {
    question: 'What is automated VEVO checking?',
    answer:
      'Immistack connects to Australian visa entitlement verification (VEVO) so you can confirm client visa status and conditions automatically instead of checking manually.',
  },
  {
    question: 'Does Immistack automate immigration forms?',
    answer:
      'Yes. Client and case data flows into immigration forms automatically, reducing re-keying and errors across your matters.',
  },
];

const FAQ_BY_PAGE: Partial<Record<Page, FaqItem[]>> = {
  PRICING: PRICING_FAQ,
  FEATURES: FEATURES_FAQ,
};

/** Friendly breadcrumb label = title before the first "|". */
function crumbName(meta: PageMeta): string {
  return meta.title.split('|')[0].trim();
}

/**
 * Per-route wrapper: emits SEO head tags + schema, and injects the
 * onOpenWaitlist / onNavigate props the existing page components expect.
 */
const PageShell: React.FC<{ meta: PageMeta }> = ({ meta }) => {
  const navigate = useNavigate();
  const { openWaitlist } = useWaitlist();
  const Component = PAGE_COMPONENTS[meta.page];
  const faq = FAQ_BY_PAGE[meta.page];
  const injected = {
    onOpenWaitlist: () => openWaitlist({ source: `CTA: ${crumbName(meta)}` }),
    onNavigate: (page: Page) => navigate(pathForPage(page)),
  };

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} />
      {meta.path !== '/' && (
        <BreadcrumbSchema trail={[{ name: crumbName(meta), path: meta.path }]} />
      )}
      {faq && <FaqSchema items={faq} />}
      {/* Existing pages have varying prop shapes; extra props are ignored. */}
      <Component {...(injected as any)} />
    </>
  );
};

const ArticleRoute: React.FC = () => {
  const { openWaitlist } = useWaitlist();
  return (
    <>
      <Seo
        title={ARTICLE_META.title}
        description={ARTICLE_META.description}
        path={ARTICLE_META.path}
        type="article"
      />
      <BreadcrumbSchema
        trail={[
          { name: 'Blog', path: '/blog' },
          { name: 'The State of Immigration Tech 2026', path: ARTICLE_META.path },
        ]}
      />
      <ResourceArticle onOpenWaitlist={() => openWaitlist({ source: 'Blog Article' })} />
    </>
  );
};

const NotFoundRoute: React.FC = () => (
  <>
    <Seo title={NOT_FOUND_META.title} description={NOT_FOUND_META.description} path="/404" noindex />
    <NotFound />
  </>
);

const pageChildren: RouteRecord[] = PAGES.map((meta) => ({
  // react-router child paths are relative (no leading slash); home is the index.
  ...(meta.path === '/'
    ? { index: true }
    : { path: meta.path.replace(/^\//, '') }),
  element: <PageShell meta={meta} />,
}));

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App />,
    children: [
      ...pageChildren,
      { path: ARTICLE_META.path.replace(/^\//, ''), element: <ArticleRoute /> },
      // Param fallback so any /blog/<slug> resolves client-side.
      { path: 'blog/:slug', element: <ArticleRoute /> },
      // Concrete path so vite-react-ssg prerenders dist/404.html for hosting.
      { path: '404', element: <NotFoundRoute /> },
      { path: '*', element: <NotFoundRoute /> },
    ],
  },
];
