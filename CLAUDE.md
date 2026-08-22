# CLAUDE.md

Guidance for working in this repository.

## What this is

Marketing / lead-capture website for **Immistack** — an immigration CRM & case-management SaaS for migration agents, education consultants and corporate HR teams across AU, CA, UK and NZ. The site's job is to explain the product and capture leads into **Zoho CRM**.

## Tech stack

- **React 19 + Vite 6**, TypeScript (ESM, `"type": "module"`). **Not Next.js.**
- **`vite-react-ssg`** prerenders every route to static HTML (`npm run build`). `npm run build:spa` is the plain SPA fallback.
- **`react-router-dom` v6** (data-router `RouteRecord[]` in `routes.tsx`).
- **Tailwind CSS via CDN** — config is inlined in `index.html` (`tailwind.config = {…}`). There is **no** `tailwind.config.js` and no PostCSS build step. New design tokens (colors/fonts/animations) go in `index.html`.
- `framer-motion` (animation), `lucide-react` (icons), `@google/genai` (Gemini, in `services/geminiService.ts`).
- Deployed on **Vercel** — `dist/` output, `cleanUrls`, serverless functions in `api/`.
- Path alias `@/*` → project root (in `tsconfig.json` and `vite.config.ts`).

## Commands

```bash
npm run dev      # local dev server (Vite)
npm run build    # SSG build → dist/  (use this for production)
npm run preview  # preview the built site
```

Requires a `.env` with `GEMINI_API_KEY` (AI features) and the Zoho vars below.

## Project layout

| Path | Purpose |
| --- | --- |
| `index.tsx` | App entry |
| `App.tsx` | Root layout — `WaitlistProvider`, `Navbar`, `<Outlet/>`, footer, `ExitIntentPopup` |
| `routes.tsx` | Central route table; `PageShell` injects SEO + `onOpenWaitlist`/`onNavigate` into pages |
| `seo/site.ts` | **Single source of truth** for routes + per-page SEO metadata (`PAGES[]`) |
| `pages/` | One component per route (plain presentational React) |
| `components/` | Shared UI — `Button`, `Input`, `Navbar`, `Logo`, `Seo`, `Schema`, `WaitlistForm`, `AffiliateForm`, `LeadMagnet`, `ExitIntentPopup`, etc. |
| `context/WaitlistContext.tsx` | Global waitlist-modal state (`useWaitlist().openWaitlist({ source, persona })`) |
| `api/create-lead.ts` | **The only backend** — Vercel serverless fn that creates a Zoho Lead |
| `public/robots.txt`, `public/sitemap.xml` | Hand-maintained SEO files |
| `types.ts` | Shared types (`Page`, `Persona`, `WaitlistFormData`, `CRMStatus`) |

## Adding a page (the established pattern)

1. Add the id to the `Page` union in `types.ts`.
2. Add a `PAGES[]` entry `{ page, path, title, description, keyword }` in `seo/site.ts`.
3. Create `pages/YourPage.tsx`. Pages start with `<div className="pt-24 pb-24 animate-fade-in bg-slate">` (the `pt-24` clears the fixed navbar). They receive `onOpenWaitlist`/`onNavigate` props from `PageShell` (extra props are ignored).
4. Register the component in the `PAGE_COMPONENTS` map in `routes.tsx`.
5. Add nav/footer links in `components/Navbar.tsx` and/or `App.tsx`.
6. Add the `<url>` entry to `public/sitemap.xml` (it is **not** auto-generated from `seo/site.ts`).

SEO/metadata lives in `seo/site.ts`, never inside the page component. The `<Seo>` component renders head tags via `vite-react-ssg`'s `<Head>`.

## Forms → CRM (single endpoint)

**All lead forms POST the same `WaitlistFormData` JSON to `/api/create-lead`** — there is one CRM integration, segmented by the `source` field:

- `components/WaitlistForm.tsx` — main early-access form (opened as a modal via `WaitlistContext`).
- `components/LeadMagnet.tsx` — inline email-only capture.
- `components/AffiliateForm.tsx` — Affiliate Program sign-up (`/affiliate`), `source: "Affiliate Program"`.

`api/create-lead.ts` refreshes a Zoho OAuth token and POSTs to `https://www.zohoapis.com/crm/v2/Leads`. Required body fields: `email`, `firmName`, `firmSize`. Optional `persona`, `source`, `referralSource`, `website`, `audience` are folded into the lead's `Industry`/`Website`/`Description`. **When adding a field to a form, also add it to both the `WaitlistFormData` type (`types.ts`), the handler's destructuring, and `createLead` in `api/create-lead.ts`** — otherwise it is silently dropped before reaching Zoho.

Env vars (set in `.env` locally and in the Vercel dashboard): `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN`. See `ZOHO_CRM_SETUP.md`. No validation library — client uses native HTML validation, the handler does a manual presence check.

## Conventions

- Components are `export const Name: React.FC<Props>` (named exports), Tailwind utility classes only, no CSS modules / component library.
- Brand tokens and the full design system are documented in `DESIGN.md`.
