import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { RouteRecord } from 'vite-react-ssg';
import App from './App';
import { Seo } from './components/Seo';
import { RouteErrorBoundary } from './components/RouteErrorBoundary';
import { BreadcrumbSchema, FaqSchema, FaqItem } from './components/Schema';
import { useWaitlist } from './context/WaitlistContext';
import { Page } from './types';
import { PAGES, PageMeta, ARTICLE_META, SECURITY_META, NOT_FOUND_META, PRIVACY_META, TERMS_META, pathForPage } from './seo/site';

// Pages
import { Home } from './pages/Home';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
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
import { Security } from './pages/Security';
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
};

// These render as FAQPage JSON-LD, so they reach Google rich results. A claim
// in structured data is still a claim — `check:claims` scans this file for that
// reason, but three entries below slipped past its patterns on wording alone.
// The patterns have since been widened to match the claim, not the phrasing.
const PRICING_FAQ: FaqItem[] = [
  {
    question: 'Can I try Immistack before committing?',
    // The old answer promised a launch discount and extended access. Neither
    // exists, and there is no self-serve path to either: `RESEND_API_KEY` is
    // unset so an invite never arrives, and `STRIPE_SECRET_KEY` is unset so
    // `/billing/checkout` answers 503.
    answer:
      'Not yet — there is no self-serve trial. You can join the early-access waitlist, and we will walk you through the product directly.',
  },
  {
    question: 'Which countries does Immistack support?',
    answer:
      'Immistack is built for immigration and migration practices across Australia, Canada, the United Kingdom and New Zealand. Regulator integrations for all four are sandbox today, with production wiring pending accreditation.',
  },
  {
    question: 'Can I change plans as my firm grows?',
    // Was "Plans scale by team size", which contradicts per-registered-agent
    // billing stated on the same page — support staff seats are free.
    answer:
      'Yes. Pricing is per registered agent, so you add or remove agent seats as the practice changes. Support and admin staff are unlimited and free on every plan.',
  },
];

const FEATURES_FAQ: FaqItem[] = [
  {
    question: 'Does Immistack connect to government visa systems?',
    answer:
      'Not yet. Immistack ships sandbox integrations for eight regulators, with production wiring pending accreditation. Every regulator response carries its own provenance and a sandbox flag, so a sandbox result can never be mistaken for live data.',
  },
  {
    question: 'Does Immistack automate immigration forms?',
    // Was an unqualified "Yes. Client and case data flows into immigration
    // forms automatically." BUSINESS.md §1 names that "the one claim to stop
    // making now", and §2 puts AI form pre-fill under "not safe to claim".
    // What actually ships is PDF generation from config-pack templates —
    // real, but narrower than the sentence it replaced. Departmental forms
    // (956, 956A) are not generated at all.
    answer:
      'Partly. Immistack generates documents from your firm’s own templates with case data merged in — cost agreements today, more as templates are added. It does not yet fill Department of Home Affairs forms such as 956 or 956A, and it does not lodge on your behalf.',
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
      <Seo
        title={SECURITY_META.title}
        description={SECURITY_META.description}
        path={SECURITY_META.path}
      />
      <BreadcrumbSchema trail={[{ name: 'Security', path: SECURITY_META.path }]} />
      <Security onOpenWaitlist={() => openWaitlist({ source: 'CTA: Security' })} />
    </>
  );
};

/**
 * Legal pages. Static, no CTA and no waitlist hook — someone reading a privacy
 * policy is checking whether to trust us, not being sold to, and a conversion
 * prompt in the middle of one reads badly. `scripts/check-legal.mjs` blocks the
 * build while the entity behind them is unfilled, so these routes cannot ship
 * naming a blank company.
 */
const PrivacyRoute: React.FC = () => (
  <>
    <Seo title={PRIVACY_META.title} description={PRIVACY_META.description} path={PRIVACY_META.path} />
    <BreadcrumbSchema trail={[{ name: 'Privacy', path: PRIVACY_META.path }]} />
    <Privacy />
  </>
);

const TermsRoute: React.FC = () => (
  <>
    <Seo title={TERMS_META.title} description={TERMS_META.description} path={TERMS_META.path} />
    <BreadcrumbSchema trail={[{ name: 'Terms', path: TERMS_META.path }]} />
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
  ...(meta.path === '/'
    ? { index: true }
    : { path: meta.path.replace(/^\//, '') }),
  element: <PageShell meta={meta} />,
}));

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App />,
    // Without this, react-router renders its raw default screen. The case that actually
    // fires here is a stale deploy: vite-react-ssg's loader-data manifest is keyed by a
    // per-build hash, so a tab holding the previous HTML requests a manifest that no longer
    // exists, Vercel answers 404 with an HTML body, and `.json()` throws. The boundary
    // reloads once to pick up the new build. See components/RouteErrorBoundary.tsx.
    errorElement: <RouteErrorBoundary />,
    children: [
      ...pageChildren,
      { path: SECURITY_META.path.replace(/^\//, ''), element: <SecurityRoute /> },
      { path: ARTICLE_META.path.replace(/^\//, ''), element: <ArticleRoute /> },
      { path: PRIVACY_META.path.replace(/^\//, ''), element: <PrivacyRoute /> },
      { path: TERMS_META.path.replace(/^\//, ''), element: <TermsRoute /> },
      // Param fallback so any /blog/<slug> resolves client-side.
      { path: 'blog/:slug', element: <ArticleRoute /> },
      // Concrete path so vite-react-ssg prerenders dist/404.html for hosting.
      { path: '404', element: <NotFoundRoute /> },
      { path: '*', element: <NotFoundRoute /> },
    ],
  },
];
