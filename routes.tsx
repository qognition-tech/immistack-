import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { RouteRecord } from 'vite-react-ssg';
import App from './App';
import { Seo } from './components/Seo';
import { RouteErrorBoundary } from './components/RouteErrorBoundary';
import { BreadcrumbSchema } from './components/Schema';
import { useWaitlist } from './context/WaitlistContext';
import { Page } from './types';
import { PAGES, PageMeta, ARTICLE_META, SECURITY_META, NOT_FOUND_META, pathForPage } from './seo/site';

// Pages
import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { FeatureCRM } from './pages/FeatureCRM';
import { FeatureCompliance } from './pages/FeatureCompliance';
import { FeaturePortal } from './pages/FeaturePortal';
import { FeatureBilling } from './pages/FeatureBilling';
import { Pricing } from './pages/Pricing';
import { About } from './pages/About';
import { Industries } from './pages/Industries';
import { IndustryAgents } from './pages/IndustryAgents';
import { IndustryEducation } from './pages/IndustryEducation';
import { IndustryCorporate } from './pages/IndustryCorporate';
import { Resources } from './pages/Resources';
import { ResourceArticle } from './pages/ResourceArticle';
import { Affiliate } from './pages/Affiliate';
import { Security } from './pages/Security';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
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
  FEATURE_BILLING: FeatureBilling,
  AFFILIATE: Affiliate,
};

/** Friendly breadcrumb label = title before the first "|". */
function crumbName(meta: PageMeta): string {
  return meta.title.split('|')[0].trim();
}

/**
 * Per-route wrapper: emits SEO head tags + breadcrumb schema, and injects the
 * onOpenWaitlist / onNavigate props the existing page components expect.
 * FAQPage schema is emitted per-page by <ObjectionAccordion>, not here.
 */
const PageShell: React.FC<{ meta: PageMeta }> = ({ meta }) => {
  const navigate = useNavigate();
  const { openWaitlist } = useWaitlist();
  const Component = PAGE_COMPONENTS[meta.page];
  const injected = {
    onOpenWaitlist: () => openWaitlist({ source: `CTA: ${crumbName(meta)}` }),
    onNavigate: (page: Page) => navigate(pathForPage(page)),
  };

  return (
    <>
      <Seo title={meta.title} description={meta.description} path={meta.path} />
      {meta.path !== '/' && <BreadcrumbSchema trail={[{ name: crumbName(meta), path: meta.path }]} />}
      {/* Existing pages have varying prop shapes; extra props are ignored. */}
      <Component {...(injected as any)} />
    </>
  );
};

const ArticleRoute: React.FC = () => {
  const { openWaitlist } = useWaitlist();
  return (
    <>
      <Seo title={ARTICLE_META.title} description={ARTICLE_META.description} path={ARTICLE_META.path} type="article" />
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

/**
 * /security is registered directly rather than through PAGES, because a PAGES
 * entry needs an id in the `Page` union in types.ts. It still gets the same
 * <Seo> head tags and breadcrumb schema every other page gets, and
 * vite-react-ssg prerenders it from this route table.
 */
const SecurityRoute: React.FC = () => {
  const { openWaitlist } = useWaitlist();
  return (
    <>
      <Seo title={SECURITY_META.title} description={SECURITY_META.description} path={SECURITY_META.path} />
      <BreadcrumbSchema trail={[{ name: 'Security', path: SECURITY_META.path }]} />
      <Security onOpenWaitlist={() => openWaitlist({ source: 'CTA: Security' })} />
    </>
  );
};

const PrivacyRoute: React.FC = () => (
  <>
    <Seo title="Privacy policy | ImmiStack" description="ImmiStack's privacy policy." path="/privacy" noindex />
    <Privacy />
  </>
);

const TermsRoute: React.FC = () => (
  <>
    <Seo title="Terms of service | ImmiStack" description="ImmiStack's terms of service." path="/terms" noindex />
    <Terms />
  </>
);

const NotFoundRoute: React.FC = () => (
  <>
    <Seo title={NOT_FOUND_META.title} description={NOT_FOUND_META.description} path="/404" noindex />
    <NotFound />
  </>
);

const pageChildren: RouteRecord[] = PAGES.map((meta) => ({
  // react-router child paths are relative (no leading slash); home is the index.
  ...(meta.path === '/' ? { index: true } : { path: meta.path.replace(/^\//, '') }),
  element: <PageShell meta={meta} />,
}));

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App />,
    // Without this, react-router renders its raw default screen. See
    // components/RouteErrorBoundary.tsx for the stale-deploy case this exists for.
    errorElement: <RouteErrorBoundary />,
    children: [
      ...pageChildren,
      { path: SECURITY_META.path.replace(/^\//, ''), element: <SecurityRoute /> },
      { path: ARTICLE_META.path.replace(/^\//, ''), element: <ArticleRoute /> },
      // Param fallback so any /blog/<slug> resolves client-side.
      { path: 'blog/:slug', element: <ArticleRoute /> },
      { path: 'privacy', element: <PrivacyRoute /> },
      { path: 'terms', element: <TermsRoute /> },
      // Concrete path so vite-react-ssg prerenders dist/404.html for hosting.
      { path: '404', element: <NotFoundRoute /> },
      { path: '*', element: <NotFoundRoute /> },
    ],
  },
];
