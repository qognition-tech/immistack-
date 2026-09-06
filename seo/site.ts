import { Page } from '../types';

/**
 * Single source of truth for routes + per-page SEO metadata.
 *
 * Everything that needs the route list reads it from here: routes.tsx (React
 * Router records), vite.config.ts (sitemap.xml, robots.txt, prerender
 * manifest), components/Seo.tsx (canonical), scripts/verify-prerender.mjs
 * (post-build gate). Adding a page anywhere else is a bug.
 *
 * This file must stay free of React/JSX: it is imported by vite.config.ts.
 */

/** Canonical production origin. Confirmed live: the apex 307s to `www` — the
 *  canonical must point at the resolved URL, not the redirecting one. */
export const SITE_ORIGIN = 'https://www.immistack.com';
export const SITE_NAME = 'ImmiStack';
export const CONTACT_EMAIL = 'hello@immistack.com';

/** ISO date stamped into <lastmod>. Bump when content changes materially. */
export const CONTENT_UPDATED = '2026-09-05';

export interface PageMeta {
  /** Internal Page identifier (kept for backwards-compat with the old useState router). */
  page: Page;
  /** Real URL path, e.g. "/features". */
  path: string;
  title: string;
  description: string;
  /** Optional keyword target, mostly for documentation/reference. */
  keyword?: string;
}

/**
 * The rebuilt route set — see `scratchpad/reports/nadia-seo-geo-architecture.md`
 * §1. 22 routes collapsed to these 15 (+ the security route, + one article
 * template), each with a distinct query and full internal-link weight.
 *
 * Killed with no redirect target (never had a `PAGES[]` entry to begin with):
 * the two legal/finance-feature slugs `check:claims`' banned-term list already covers.
 *
 * Merged into /features, 301'd in vercel.json: /ai-automation,
 * /task-management, /form-automation, /multi-office, /staff-portal,
 * /admin-portal.
 */
export const PAGES: PageMeta[] = [
  {
    page: 'HOME',
    path: '/',
    title: 'ImmiStack — Immigration CRM for Registered Migration Agents',
    description:
      'One system of record for leads, clients, visa matters, documents, payments and compliance — built for registered migration agents.',
    keyword: 'immigration CRM software',
  },
  {
    page: 'FEATURES',
    path: '/features',
    title: 'Features | ImmiStack Immigration Case Management',
    description:
      "Every capability in ImmiStack's case-management platform, what's live today and what's still sandbox, in one table.",
    keyword: 'immigration case management features',
  },
  {
    page: 'PRICING',
    path: '/pricing',
    title: 'Pricing | ImmiStack Immigration Case Management',
    description:
      'Three tiers, priced per registered agent, ex GST. Staff and clients are unlimited and free in every tier. No setup fee, no lock-in.',
    keyword: 'immigration software pricing',
  },
  {
    page: 'ABOUT',
    path: '/about',
    title: 'About ImmiStack',
    description:
      'ImmiStack is the immigration vertical of Meru, a regulatory operating system. Sandbox regulator integrations, honestly labelled.',
    keyword: 'about immistack immigration',
  },
  {
    page: 'RESOURCES',
    path: '/blog',
    title: 'Blog | ImmiStack — Immigration Practice Guides',
    description:
      'Guides on running a migration practice: compliance, case management and the regulations that changed this year.',
    keyword: 'immigration practice guides',
  },
  {
    page: 'FEATURE_COMPLIANCE',
    path: '/compliance-vevo',
    title: 'Migration Agents Regulations 2026 — Compliance Software',
    description:
      'CPD, PI insurance and file records for the Migration Agents Regulations 2026 (deadline 31 Mar 2027), tracked against one matter record.',
    keyword: 'migration agent compliance software Australia',
  },
  {
    page: 'FEATURE_CRM',
    path: '/crm-intake',
    title: 'Client Intake & CRM for Migration Agents | ImmiStack',
    description:
      'Capture a lead once, convert it to a matter without re-entering the file, and keep the checklist attached from day one.',
    keyword: 'client intake forms immigration',
  },
  {
    page: 'FEATURE_PORTAL',
    path: '/client-portal',
    title: 'Client Portal for Immigration Firms | ImmiStack',
    description:
      "Clients see their own matter, documents and message thread — nothing that belongs to another client, ever.",
    keyword: 'immigration client portal',
  },
  {
    page: 'FEATURE_BILLING',
    path: '/billings-and-invoicing',
    title: 'Billing & Invoicing for Migration Agents | ImmiStack',
    description:
      'Invoice against a matter and gate the next stage on payment — no chasing an overdue invoice by hand.',
    keyword: 'migration agent billing software',
  },
  {
    page: 'INDUSTRIES',
    path: '/solution',
    title: 'Solutions by Practice Type | ImmiStack',
    description:
      'ImmiStack for registered migration agents, education consultants and corporate HR — three practices, one config-pack platform.',
    keyword: 'immigration software solutions',
  },
  {
    page: 'INDUSTRY_AGENTS',
    path: '/migration-agents',
    title: 'Software for Registered Migration Agents | ImmiStack',
    description:
      "Built for 1–10 person migration practices: one record of leads, matters, documents and payments, with an audit trail Migration Manager doesn't keep.",
    keyword: 'migration agent software',
  },
  {
    page: 'INDUSTRY_EDUCATION',
    path: '/education-consultants',
    title: 'Software for Education Consultants | ImmiStack',
    description:
      "Case management for education agents, built on the same config-pack platform as ImmiStack's migration-agent product.",
    keyword: 'education agent software',
  },
  {
    page: 'INDUSTRY_CORPORATE',
    path: '/corporate-hr',
    title: 'Global Mobility Software for Corporate HR | ImmiStack',
    description:
      "Case management for corporate HR teams managing sponsored visas, built on ImmiStack's config-pack platform.",
    keyword: 'global mobility platform',
  },
  {
    page: 'AFFILIATE',
    path: '/affiliate',
    title: 'Affiliate Program | ImmiStack',
    description:
      'Refer a firm to ImmiStack. Commission structure and terms to be confirmed.',
    keyword: 'immigration software affiliate program',
  },
];

// Article route is dynamic; provide one concrete slug for prerendering.
export const ARTICLE_SLUG = 'state-of-immigration-tech-2026';

export const ARTICLE_META = {
  path: `/blog/${ARTICLE_SLUG}`,
  title: 'The State of Immigration Tech 2026 | ImmiStack',
  // claims-ok: editorial description of industry-wide adoption, explicitly framing "what is
  // hype" — this describes the market, not a capability of this product
  description: 'How migration practices are adopting AI-driven compliance and automation in 2026 — what is changing, what is hype, and what it means for your firm.',
};

/**
 * /security is a standalone route (not a PAGES entry) because the `Page` union
 * lives in types.ts, which this change does not own. It is registered directly
 * in routes.tsx and prerendered from there.
 */
export const SECURITY_META = {
  path: '/security',
  title: 'Security & Data Isolation | ImmiStack',
  description:
    "Row-level tenant isolation, a hash-chained audit log, and a screening engine that won't bluff — stated with the exact mechanism, not a badge.",
};

export const NOT_FOUND_META = {
  title: 'Page Not Found | ImmiStack',
  description: 'The page you are looking for could not be found.',
};

/**
 * /privacy and /terms — standalone routes for the same reason /security is
 * (see SECURITY_META above). Gated on `VITE_LEGAL_PAGES_READY` (default off,
 * see CLAUDE.md): the operator has not supplied the entity name, ABN,
 * registered address or privacy officer these pages need, so
 * `allStaticPaths`/`sitemapEntries` below only include them when the caller
 * (vite.config.ts) passes `includeLegalPages: true`. This file stays
 * env-free on purpose — it is imported from both the Node config context and
 * the client bundle, and `import.meta.env` is only safe to read in the
 * latter (see routes.tsx / App.tsx for the actual flag read).
 */
export const PRIVACY_META = {
  path: '/privacy',
  title: 'Privacy policy | ImmiStack',
  description: "ImmiStack's privacy policy.",
};

export const TERMS_META = {
  path: '/terms',
  title: 'Terms of service | ImmiStack',
  description: "ImmiStack's terms of service.",
};

// Lookup helpers ------------------------------------------------------------
const PAGE_TO_PATH: Record<string, string> = PAGES.reduce(
  (acc, p) => {
    acc[p.page] = p.path;
    return acc;
  },
  { RESOURCE_ARTICLE: ARTICLE_META.path } as Record<string, string>,
);

/** Map an internal Page id to its real URL path (defaults to home). */
export function pathForPage(page: Page): string {
  return PAGE_TO_PATH[page] ?? '/';
}

export function absUrl(path: string): string {
  return `${SITE_ORIGIN}${path === '/' ? '' : path}`;
}

/**
 * All concrete paths to prerender (real pages + the security route + the demo
 * article). `includeLegalPages` defaults to false so a caller that forgets to
 * pass it gets the safe (excluded) behaviour, matching `VITE_LEGAL_PAGES_READY`
 * default-off.
 */
export function allStaticPaths(includeLegalPages = false): string[] {
  const legal = includeLegalPages ? [PRIVACY_META.path, TERMS_META.path] : [];
  return [...PAGES.map((p) => p.path), SECURITY_META.path, ARTICLE_META.path, ...legal];
}

/**
 * Sitemap rows. No hreflang alternates: Nadia's audit found all four
 * HREFLANG_LOCALES pointing at the identical canonical (no locale-routed
 * content exists behind any of them, unlike govx's real `/ar` mirror) — the
 * documented pattern needs distinct per-locale paths, which this site does
 * not have. Multi-market relevance is signalled instead through on-page copy
 * and `Organization.areaServed`.
 */
export function sitemapEntries(includeLegalPages = false) {
  return allStaticPaths(includeLegalPages).map((path) => ({
    path,
    loc: absUrl(path),
    lastmod: CONTENT_UPDATED,
  }));
}

export function robotsTxt(): string {
  return ['User-agent: *', 'Allow: /', 'Disallow: /api/', '', `Sitemap: ${SITE_ORIGIN}/sitemap.xml`, ''].join('\n');
}
