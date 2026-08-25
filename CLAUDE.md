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

**Every lead form POSTs to `/api/create-lead`.** One integration, segmented by the `source`
field — never a second endpoint per form:

- `components/WaitlistForm.tsx` — main early-access form (modal via `WaitlistContext`)
- `components/LeadMagnet.tsx` — inline email-only capture
- `components/AffiliateForm.tsx` — Affiliate Program sign-up (`/affiliate`)
- `components/BookCall.tsx` — Cal.com embed; the booking arrives at `/api/cal-webhook`

### Where records land

**Twenty CRM** (`api/_twenty.ts`), not Zoho. The previous Zoho implementation was replaced on
2026-08-26 — it had never worked in production (its `ZOHO_*` values were literal placeholder
strings) and it hard-required `firmName` + `firmSize`, so affiliate submissions would have
400'd regardless.

Every record is tagged on a custom `leadTags` MULTI_SELECT field:

| Tag | Applied when |
|---|---|
| `IMMISTACK` | always — separates this client from others in the shared workspace |
| `IMMISTACK_MARKETING` | always — the record came from this site |
| `IMMISTACK_WAITLIST` / `_AFFILIATE` / `_LEAD_MAGNET` / `_BOOK_CALL` / `_CONTACT` | the capture point |

**`leadTags` does not exist in a fresh Twenty workspace** — Twenty has no tag primitive and
no `tag` object. Run **`npm run twenty:schema`** to create it. The script is idempotent and
additive; it never edits or deletes existing data.

### Four rules this integration follows, and why

1. **Upsert by email, never blind-create.** Someone who fills two forms is one record with
   two tags. `api/_twenty.ts` looks the person up first and only fills blank fields on
   update — it never overwrites something a human corrected by hand.
2. **Never create companies.** Twenty associates a person with a company derived from their
   email domain, and it does so **asynchronously** — reading back immediately after creating
   the person often still shows `null`. An earlier version treated that as "no company" and
   created one from the typed firm name, producing orphan company records in a workspace
   shared with other clients. We now tag whatever Twenty picks and record the typed firm name
   on the note instead, so nothing is lost.
3. **The endpoint is origin-locked.** `ALLOWED_ORIGINS` in `api/create-lead.ts`. The old
   handler sent `Access-Control-Allow-Origin: *` on a public endpoint that writes to a CRM.
   There is also a honeypot field and a per-IP throttle.
4. **The webhook verifies its signature.** `api/cal-webhook.ts` checks the Cal.com
   HMAC-SHA256 over the raw body and **refuses to run at all** without
   `CALCOM_WEBHOOK_SECRET`. `bodyParser` is disabled there because Vercel's JSON parsing
   destroys the exact bytes the signature covers.

When adding a form field, add it to the `WaitlistFormData` type (`types.ts`), the handler's
destructuring in `api/create-lead.ts`, and the note lines — otherwise it is silently dropped.

### Env vars

Server-side only, set in `.env` locally (gitignored) and in the Vercel project. **The Twenty
key must never reach the browser bundle** — that is why it has no `VITE_` prefix; Vite only
exposes `VITE_*` to the client.

| Var | Required for | Behaviour when unset |
|---|---|---|
| `TWENTY_API_KEY` | all forms | endpoint returns a clean **503** telling the visitor to email instead — it never pretends to have saved |
| `TWENTY_API_URL` | optional | defaults to `https://api.twenty.com` |
| `CALCOM_WEBHOOK_SECRET` | booking webhook | webhook returns 503 and records nothing rather than accepting unsigned writes |
| `VITE_CALCOM_LINK` | Book-a-call embed | the CTA falls back to a mailto link |

See `.env.example`. The `ZOHO_*` vars are dead and can be removed from the Vercel project.

## Conventions## Conventions

- Components are `export const Name: React.FC<Props>` (named exports), Tailwind utility classes only, no CSS modules / component library.
- Brand tokens and the full design system are documented in `DESIGN.md`.
