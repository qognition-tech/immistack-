import { Page } from '../types';

// Canonical production origin. Used for canonical tags, OG urls and the sitemap.
export const SITE_ORIGIN = 'https://immistack.com';

// Markets the product serves (used for hreflang alternates).
export const HREFLANG_LOCALES = ['en-AU', 'en-CA', 'en-GB', 'en-NZ'];

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
 * Single source of truth for routing + on-page SEO.
 * Titles are trimmed to ~55-60 chars and descriptions to ~150-160 chars,
 * following the meta recommendations from the SEO audit.
 */
export const PAGES: PageMeta[] = [
  {
    page: 'HOME',
    path: '/',
    title: 'Immistack | Immigration CRM & Case Management Software',
    description:
      'Streamline your immigration practice with Immistack: the all-in-one CRM for document checklists, client intake, and compliance across AU, CA, UK & NZ.',
    keyword: 'immigration CRM software',
  },
  {
    page: 'FEATURES',
    path: '/features',
    title: 'Features | Immigration CRM & Automation – Immistack',
    description:
      "Explore Immistack's features: per-subclass document checklists, smart client intake, workflow automation, expiry alerts and global case management.",
    keyword: 'immigration case management features',
  },
  {
    page: 'PRICING',
    path: '/pricing',
    title: 'Pricing Plans | Immistack Immigration Software',
    description:
      'Flexible pricing for immigration professionals. From solo practitioners to large agencies, choose a plan that fits your team size and workflow.',
    keyword: 'immigration software pricing',
  },
  {
    page: 'ABOUT',
    path: '/about',
    title: 'About Immistack | Built for Immigration Professionals',
    description:
      "Immistack was built by migration agents and technologists to simplify global mobility. Learn our story and how we're transforming practice management.",
    keyword: 'about immistack immigration',
  },
  {
    page: 'RESOURCES',
    path: '/blog',
    title: 'Immigration Practice Resources & Guides | Immistack Blog',
    description:
      'Expert guides, tips and updates on immigration case management, compliance, record-keeping and practice growth from the Immistack team.',
    keyword: 'immigration practice guides',
  },
  {
    page: 'FEATURE_COMPLIANCE',
    path: '/compliance-vevo',
    title: 'Compliance, Checklists & Audit Trail | Immistack',
    description:
      'Per-subclass document checklists, visa expiry alerts, CPD and insurance records and a tamper-evident audit log for migration agents. Built for the 2026 Regulations.',
    keyword: 'migration agent compliance software Australia',
  },
  {
    page: 'FEATURE_CRM',
    path: '/crm-intake',
    title: 'Immigration CRM & Client Intake Software | Immistack',
    description:
      'Capture, qualify and onboard clients faster with Immistack’s immigration CRM and smart intake forms. Turn enquiries into matters automatically.',
    keyword: 'client intake forms immigration',
  },
  {
    page: 'FEATURE_AI',
    path: '/ai-automation',
    title: 'AI Immigration Workflow Automation | Immistack',
    description:
      'Automate document parsing, data entry and case workflows with Immistack AI. Cut admin time and focus on advising clients, not paperwork.',
    keyword: 'immigration workflow automation',
  },
  {
    page: 'FEATURE_PORTAL',
    path: '/client-portal',
    title: 'Secure Client Portal for Immigration Firms | Immistack',
    description:
      'Give clients a branded, secure portal to upload documents, track case progress and message your team — reducing back-and-forth email.',
    keyword: 'immigration client portal',
  },
  {
    page: 'FEATURE_TASKS',
    path: '/task-management',
    title: 'Immigration Case & Task Management | Immistack',
    description:
      'Keep every matter on track with deadlines, reminders and team task management built for immigration caseloads. Never miss a lodgement date.',
    keyword: 'immigration case management software',
  },
  {
    page: 'FEATURE_FORMS',
    path: '/form-automation',
    title: 'Immigration Form Automation Software | Immistack',
    description:
      'Auto-populate visa forms from client data, eliminate re-keying and reduce errors with Immistack’s immigration form automation.',
    keyword: 'immigration form automation',
  },
  {
    page: 'FEATURE_BILLING',
    path: '/billings-and-invoicing',
    title: 'Billing & Invoicing for Migration Agents | Immistack',
    description:
      'Create invoices, take payments and track receivables without leaving your case files. Billing built for immigration and migration practices.',
    keyword: 'migration agent billing software',
  },
  {
    page: 'FEATURE_MULTIOFFICE',
    path: '/multi-office',
    title: 'Multi-Office Immigration Practice Software | Immistack',
    description:
      'Run multiple offices and countries from one platform with shared workflows, role-based access and consolidated reporting across locations.',
    keyword: 'multi office immigration software',
  },
  {
    page: 'FEATURE_STAFF_PORTAL',
    path: '/staff-portal',
    title: 'Staff Portal for Immigration Teams | Immistack',
    description:
      'Give caseworkers a focused workspace for their matters, tasks and clients, with permissions that keep sensitive data secure.',
    keyword: 'immigration staff portal',
  },
  {
    page: 'FEATURE_ADMIN_PORTAL',
    path: '/admin-portal',
    title: 'Admin Portal & Practice Oversight | Immistack',
    description:
      'Oversee your whole practice from one admin portal: users, compliance, billing and performance reporting for immigration firms.',
    keyword: 'immigration practice admin software',
  },
  {
    page: 'INDUSTRIES',
    path: '/solution',
    title: 'Immigration Software Solutions by Industry | Immistack',
    description:
      'Tailored workflows for migration agents, education consultants and corporate HR teams. See how Immistack fits your immigration practice.',
    keyword: 'immigration software solutions',
  },
  {
    page: 'INDUSTRY_AGENTS',
    path: '/migration-agents',
    title: 'Software for Migration Agents (AU/CA/UK/NZ) | Immistack',
    description:
      'Purpose-built immigration software for migration agents and registered consultants across Australia, Canada, the UK and New Zealand.',
    keyword: 'migration agent software',
  },
  {
    page: 'INDUSTRY_EDUCATION',
    path: '/education-consultants',
    title: 'Software for Education Agents & Consultants | Immistack',
    description:
      'Manage student enquiries, applications, commissions and visa support in one platform built for education agents and consultants.',
    keyword: 'education agent software',
  },
  {
    page: 'INDUSTRY_CORPORATE',
    path: '/corporate-hr',
    title: 'Global Mobility Software for Corporate HR | Immistack',
    description:
      'Coordinate visas, compliance and relocations for your workforce with Immistack’s global mobility platform built for corporate HR teams.',
    keyword: 'global mobility platform',
  },
  {
    page: 'AFFILIATE',
    path: '/affiliate',
    title: 'Affiliate Program | Earn 30% Recurring – Immistack',
    description:
      'Join the Immistack Affiliate Program and earn 30% recurring commission for every immigration firm you refer. Free to join, monthly payouts.',
    keyword: 'immigration software affiliate program',
  },
];

// Article route is dynamic; provide one concrete slug for prerendering.
export const ARTICLE_SLUG = 'state-of-immigration-tech-2026';

export const ARTICLE_META = {
  path: `/blog/${ARTICLE_SLUG}`,
  title: 'The State of Immigration Tech 2026 | Immistack',
  description:
    'How 500+ migration agents are adopting AI-driven compliance and automation in 2026 — benchmarks, trends and what it means for your firm.',
};

export const NOT_FOUND_META = {
  title: 'Page Not Found | Immistack',
  description: 'The page you are looking for could not be found. Explore Immistack’s immigration CRM and case management platform.',
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

/** All concrete paths to prerender (real pages + the demo article). */
export function allStaticPaths(): string[] {
  return [...PAGES.map((p) => p.path), ARTICLE_META.path];
}
