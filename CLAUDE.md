# CLAUDE.md

Guidance for working in this repository.

## What this is

Marketing / lead-capture website for **ImmiStack** — an immigration CRM & case-management SaaS for registered migration agents (and, secondarily, education consultants and corporate HR teams) across AU, CA, UK and NZ. The site's job is to explain the product honestly and capture leads into **Twenty CRM**.

## Tech stack

- **React 19 + Vite 6**, TypeScript (ESM, `"type": "module"`). **Not Next.js.**
- **`vite-react-ssg`** prerenders every route to static HTML (`pnpm run build`). `pnpm run build:spa` is the plain SPA fallback.
- **`react-router-dom` v6** (data-router `RouteRecord[]` in `routes.tsx`).
- **Tailwind CSS v4, compiled at build time** via `@tailwindcss/vite` — not the CDN, and there is no `tailwind.config.js`/PostCSS step. `styles/globals.css` declares `@import "tailwindcss" source(none)` plus explicit `@source` lines (a new source directory needs one or its classes are purged); tokens live in a `@theme` block plus `--s-*` semantic surface variables that swap for `prefers-color-scheme`/`[data-theme]` dark mode.
- **Fonts self-hosted** under `public/fonts/` (Fraunces Variable for headings, IBM Plex Sans for body/UI, IBM Plex Mono for provenance values), `font-display: swap`, no Google Fonts request. Regenerate favicons/logo lockups/OG image with `pnpm run generate:assets` (`scripts/generate-assets.mjs`, `sharp` as a devDependency only).
- `lucide-react` (icons), `@calcom/embed-react` (Book-a-call), `zod` (server-side validation, `api/_lead-schema.ts`), `@upstash/redis` (durable lead store, `api/_store.ts`).
- Deployed on **Vercel** — `dist/` output, `cleanUrls`, serverless functions in `api/`.
- Path alias `@/*` → project root (in `tsconfig.json` and `vite.config.ts`).

## Commands

```bash
pnpm dev              # local dev server (Vite)
pnpm run build        # the full gated build → dist/  (use this for production)
pnpm run build:spa    # plain SPA build, no prerender, no gates
pnpm preview          # preview the built site
pnpm run typecheck    # tsc --noEmit
pnpm run generate:assets   # regenerate favicons/logo lockups/og-default.png
```

No `GEMINI_API_KEY`/`@google/genai` — that was an earlier prototype's dependency and no longer exists in this tree. See the CRM env vars below for what a `.env` actually needs.

`pnpm run build` (see `package.json`) chains four gates: `check:claims` → the SSG build → `verify-prerender` →
**`check:placeholders`** (`scripts/check-placeholders.mjs`), which fails if any prerendered
`dist/**/*.html` renders a literal `[NEEDS DATA: …]`, `[COPY NEEDED]` or an unresolved
`{{PRICE_*}}` slot as visible text or inside JSON-LD (a `data-price-slot` attribute is exempt).
**Exception:** on a Vercel Preview deploy (`VERCEL_ENV=preview`) it prints the same findings as
warnings and exits 0, so a reviewer can see in-progress pages like `/privacy`/`/terms` before
every `[NEEDS DATA: …]` token in them is resolved — Production and local builds still fail.

## Project layout

| Path | Purpose |
| --- | --- |
| `index.tsx` | App entry — imports `styles/globals.css`, seeds the SSG static-loader-data shim |
| `App.tsx` | Root layout — `GtmScript`/`GtmNoscript`, `WaitlistProvider`, `OrganizationSchema`, `Navbar`, `<Outlet/>`, footer |
| `routes.tsx` | Central route table; `PageShell` injects SEO + `onOpenWaitlist`/`onNavigate` into pages |
| `seo/site.ts` | **Single source of truth** for routes + per-page SEO metadata (`PAGES[]`) — also feeds `vite.config.ts`'s `onFinished`, which generates `sitemap.xml`/`robots.txt`/`_prerender-manifest.json` at build time |
| `pages/` | One component per route (plain presentational React), plus `Privacy.tsx`/`Terms.tsx` (legal copy, `[NEEDS DATA: …]` tokens the operator fills — see `check:placeholders` above) |
| `components/` | Shared UI — `Hero`, `CapabilityTable`, `ObjectionAccordion`, `PricingCards`, `BookCallButton`/`BookCall`, `Modal`, `Navbar`, `Logo`, `Seo`, `Schema`, `Gtm`, `WaitlistForm`, `AffiliateForm`, etc. |
| `context/WaitlistContext.tsx` | Global waitlist-modal state (`useWaitlist().openWaitlist({ source })`) |
| `lib/analytics.ts` | GA4/GTM event helpers (`track`, `trackCtaClick`) — no-op without `VITE_GTM_ID`; consumed by `components/Gtm.tsx` |
| `lib/leadForm.ts` | `submitLead()` — fetches the min-time token, posts to `/api/create-lead`, translates the `{ok,reason}` envelope into a UI message |
| `api/` | Nine files, not one — see "Forms → CRM" below for the full list; there is no single "the backend" file anymore |
| `types.ts` | Shared types (`Page`, `Persona`, `WaitlistFormData`, `CRMStatus`, `CapabilityRow`) |

## Adding a page (the established pattern)

1. Add the id to the `Page` union in `types.ts`.
2. Add a `PAGES[]` entry `{ page, path, title, description, keyword }` in `seo/site.ts` — the sitemap, robots.txt and prerender manifest pick it up automatically at build; there is nothing to hand-edit.
3. Create `pages/YourPage.tsx`. They receive `onOpenWaitlist`/`onNavigate` props from `PageShell` (extra props are ignored).
4. Register the component in the `PAGE_COMPONENTS` map in `routes.tsx`.
5. Add nav/footer links in `components/Navbar.tsx` and/or `App.tsx`.
6. Run `pnpm run build` — `check:placeholders` fails if the new page ships a literal `[NEEDS DATA: …]`/`[COPY NEEDED]`/`{{PRICE_*}}` as visible text (see above).

SEO/metadata lives in `seo/site.ts`, never inside the page component. The `<Seo>` component renders head tags via `vite-react-ssg`'s `<Head>`; `components/Gtm.tsx` uses the same mechanism for the GTM container script.

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

### Five rules this integration follows, and why

1. **Upsert by email, never blind-create.** Someone who fills two forms is one record with
   two tags. `api/_twenty.ts` looks the person up first and only fills blank fields on
   update — it never overwrites something a human corrected by hand.
2. **Never create companies.** Twenty associates a person with a company derived from their
   email domain, and it does so **asynchronously** — reading back immediately after creating
   the person often still shows `null`. An earlier version treated that as "no company" and
   created one from the typed firm name, producing orphan company records in a workspace
   shared with other clients. We now tag whatever Twenty picks and record the typed firm name
   on the note instead, so nothing is lost. (This is also the extent of "company dedupe" here —
   deliberately no active domain-matching create/search, unlike govx's `upsertCompany`.)
3. **The endpoint is origin-locked, rate-limited, honeypotted and token-gated.**
   `api/_cors.ts` holds the allowlist (a request from any other `Origin` is refused outright,
   not merely un-CORS'd). `api/create-lead.ts` also keeps a per-IP in-memory throttle (a speed
   bump, not a security control — see its comment), a honeypot field, and a signed min-time
   token from `GET /api/form-token` (`api/_hmac.ts`) that rejects a submission answered in
   under 3 seconds. Same scheme as `../govx-marketing/api/form-token.ts`, with one deliberate
   difference: an unset `LEAD_FORM_SECRET` makes `/api/form-token` **fail closed (503)** rather
   than hand out a disabled-check placeholder token.
4. **The lead is durably stored before any CRM call.** `api/_store.ts` writes every submission
   to Upstash Redis (`immistack:lead:<uuid>`, 90-day TTL) **before** the Twenty push, so a
   Twenty outage or a bad API key never loses a submission — and a Resend fallback email
   (`api/_email.ts`) goes to `LEAD_FALLBACK_TO` when the push fails or Twenty is unconfigured.
   Once the lead has a durable copy, the visitor sees success regardless of what happened
   downstream — see the order-of-operations comment atop `api/create-lead.ts`. This changed
   the visible contract from before 2026-09: **an unset `TWENTY_API_KEY` no longer 503s** the
   visitor: the lead is still safe (stored + emailed), just not yet in Twenty.
5. **The webhook verifies its signature.** `api/cal-webhook.ts` checks the Cal.com
   HMAC-SHA256 over the raw body and **refuses to run at all** without
   `CALCOM_WEBHOOK_SECRET`. `bodyParser` is disabled there because Vercel's JSON parsing
   destroys the exact bytes the signature covers.

When adding a form field, add it to the `WaitlistFormData` type (`types.ts`), the zod schema
in `api/_lead-schema.ts` (it is `.strict()` — an unlisted key 400s the whole submission), the
handler's destructuring in `api/create-lead.ts`, and the note lines — otherwise it is silently
dropped, or the submission is rejected outright.

### Response envelope

`POST /api/create-lead` never throws a raw error to the client. It answers `{ ok: true, id }`
on success (including the honeypot no-op, which omits `id`) or `{ ok: false, reason }` on a
real rejection — `invalid` (zod failed or unknown key), `invalid_token`, `too_fast` (425),
`rate_limited` (429), `origin_not_allowed` (403), `method_not_allowed` (405).
`components/WaitlistForm.tsx` and `components/AffiliateForm.tsx` fetch a token from
`GET /api/form-token` on mount and translate the envelope via `lib/leadForm.ts`'s
`submitLead()` — add a new UI-facing message there, not in the components, if a new `reason`
is added.

### Env vars

Server-side only, set in `.env` locally (gitignored) and in the Vercel project. **Secrets must
never reach the browser bundle** — that is why none of them carry a `VITE_` prefix; Vite only
exposes `VITE_*` to the client.

| Var | Required for | Behaviour when unset |
|---|---|---|
| `TWENTY_API_KEY` | pushing leads into Twenty | lead is still durably stored + fallback-emailed (see rule 4); visitor still sees success, but nothing lands in Twenty |
| `TWENTY_API_URL` | optional | defaults to `https://api.twenty.com` |
| `LEAD_FORM_SECRET` | the min-time token check | `GET /api/form-token` returns a clean **503**; `POST /api/create-lead` skips the token check entirely (honeypot still applies) — logged loudly either way |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | the durable lead store | every store write is a loud no-op (logged per call); the only surviving copy of a lead is Twenty (if configured) and/or the fallback email |
| `LEAD_FALLBACK_TO` | the fallback email destination | fallback is logged ("needs manual follow-up") instead of sent |
| `RESEND_API_KEY` | sending the fallback email | same as above |
| `LEAD_FALLBACK_FROM` | optional | defaults to `ImmiStack leads <leads@immistack.com>` — override only if that domain is not the one verified in the Resend account |
| `CALCOM_WEBHOOK_SECRET` | booking webhook | webhook returns 503 and records nothing rather than accepting unsigned writes |
| `VITE_CALCOM_LINK` | Book-a-call embed | the CTA falls back to a mailto link |

See `.env.example`. The `ZOHO_*` vars are dead and can be removed from the Vercel project.

## Conventions

- Components are `export const Name: React.FC<Props>` (named exports). Styling reads
  `styles/globals.css` tokens (`var(--s-ink)`, `.tag`, `.t-wrap`, `.btn-primary`, …) — no CSS
  modules, no component library, and no hex literal in a component (`no-slop.md`).
- **Pricing is real (2026-09-06).** Model B, per registered agent per month, ex GST — Practice
  A$129, Practice Pro A$209, Firm A$319 when billed annually (two months free); A$155/251/383
  when billed monthly. Figures live in `components/PricingCards.tsx`'s `PRICES` table and
  `components/Schema.tsx`'s `OFFERS` (the annual figure — must match what `/pricing` shows with
  the Annual toggle selected). **Never invent a number, and never reintroduce the retired
  `{{PRICE_*}}`/`A$—` placeholder convention** — `check:placeholders` now bans `A$—` in rendered
  output unconditionally (it used to be opt-in via `REQUIRE_PRICES=1`; that flag is gone, the
  strict behaviour is the only behaviour).
- **`claims-ok:` waiver convention.** `scripts/check-claims.mjs` bans banned-term regexes
  (SOC 2, OMARA, VEVO, "Start Free Trial", …) everywhere in `pages/`, `components/`, `seo/`,
  `routes.tsx`, `App.tsx`, `index.html` and `api/`. The **only** way a line containing a banned
  term ships is a comment reading `claims-ok: <why this is a negative disclosure, not a claim>`
  on the line *immediately* above it (walking back through blank/comment lines only — it does
  not reach through a real code line, so a `key:` / value split across two lines needs the
  marker directly above the line the banned term is actually on, not above the key). Every
  waiver is printed on every `check:claims` run, pass or fail, specifically so the exemption
  list stays visible rather than growing silently. Reword the term out of a *marker comment*
  itself if the comment happens to repeat the banned word — the comment is scanned too.
- Brand tokens and the full design system are documented in `DESIGN.md` (pre-rebuild; the
  self-hosted-fonts/Tailwind-4/dark-mode token system above supersedes anything there that
  disagrees with `styles/globals.css`).
