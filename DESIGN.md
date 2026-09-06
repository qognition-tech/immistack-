# DESIGN.md — Immistack Design System

The visual language for the Immistack marketing site. Source of truth for tokens is `tailwind.config.js`. Add or change tokens there.

## Brand

- **Product**: Immistack — the operating system for modern global mobility, built for registered migration agents, education consultants, and corporate HR teams. (Not migration lawyers — see `~/qognition-ops/clients/immistack/context.md`, primary persona.)
- **Logo**: an ascending three-bar "stack" mark — two navy bars and one taller gold bar (see `components/Logo.tsx`, the footer in `App.tsx`, and the SVG favicon in `index.html`).
- **Tone**: premium, trustworthy, professional-fintech. Navy authority + gold accent + green for growth/success.

> Brand copy in this file — the product line above, any headline or tagline quoted elsewhere in this doc — is a style reference, not a cleared claim. It is subject to `~/qognition-ops/clients/immistack/guardrails.md` and `brand-voice.md` like any other client-facing copy; verify before reusing verbatim on a page.

## Color tokens

| Token | Hex | Use |
| --- | --- | --- |
| `navy` | `#0B1120` | Primary dark — headings, primary buttons, dark sections |
| `navyLight` | `#1E293B` | Hover/gradient partner for navy |
| `techBlue` | `#3B82F6` | Secondary accent, links, secondary buttons |
| `gold` | `#FBBF24` | Primary accent / CTA highlight (Amber 400) |
| `goldLight` | `#FEF3C7` | Soft gold backgrounds (Amber 100) |
| `goldDark` | `#B45309` | Gold text / hover, icon accents (Amber 700 — was Amber 600 `#D97706`, which fails WCAG AA at 3.19:1 on white; `#B45309` is 5.02:1) |
| `goldVivid` | `#FFD700` | Rich gold highlights |
| `slate` | `#F8FAFC` | Default page background |
| `growth` | `#10B981` | Success, money, positive states |

Common roles: page bg `bg-slate`; cards `bg-white border border-gray-200 shadow-sm` (or `shadow-xl` for hero cards); body copy `text-gray-600`; muted `text-gray-500/400`; dark CTA sections `bg-navy` with `text-white`.

## Typography

- **Headings** — `font-heading` → **Inter** (`400–800`). Use `font-bold`, `text-navy`.
- **Body** — `font-sans` → **Source Sans 3** (`300–600`). Default `#0F172A`.
- Scale in use: hero `text-4xl md:text-5xl`, section `text-3xl`, card title `text-lg font-bold`, body `text-xl` (hero lede) / base / `text-sm` (cards) / `text-xs`–`text-[10px]` (meta).
- Eyebrows: `text-xs font-bold uppercase tracking-wide` inside a pill `inline-flex items-center gap-2 px-3 py-1 rounded-full bg-<accent>/10 border border-<accent>/20`.

## Components

- **Button** (`components/Button.tsx`) — variants `primary` (navy), `secondary` (techBlue), `gold`, `outline`; `fullWidth`. Base includes `hover:scale-105 active:scale-95`, rounded-md, focus ring.
- **Input** (`components/Input.tsx`) — labelled text input; focus ring `focus:ring-gold/50 focus:border-gold`. `<select>` elements reuse the same class string for visual consistency (see `WaitlistForm`/`AffiliateForm`).
- **Cards** — `bg-white p-8 rounded-xl border border-gray-200 shadow-sm`; icon (lucide, `h-8 w-8`, accent color) → `font-bold text-navy text-lg` title → `text-gray-600 text-sm` body.
- **Forms** — white panel `rounded-2xl shadow-xl border border-gray-200 p-8 md:p-10`, centered heading + sub, `space-y-4` fields, full-width primary submit, tiny reassurance line beneath. Submit shows a `Loader2` spinner while submitting and a `CheckCircle` success state. All forms POST to `/api/create-lead` (see `CLAUDE.md`).

## Layout

- Page wrapper: `<div className="pt-24 pb-24 animate-fade-in bg-slate">` — `pt-24` clears the fixed navbar.
- Content width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Heroes: `grid md:grid-cols-2` (or `lg:grid-cols-2`) with copy on the left, a visual/form card on the right.
- Sections separated by `mb-16`/`mb-20`; feature grids `grid md:grid-cols-3 gap-8` (or `lg:grid-cols-4`).
- Breadcrumb row at the top of inner pages: `flex items-center gap-2 text-sm text-gray-500`.

## Effects & motion

- Animations (defined in `index.html`): `animate-float`, `animate-float-delayed`, `animate-pulse-slow`, `animate-shimmer`, `animate-fade-in` (default page entrance).
- Utility classes: `.text-gold-gradient` (shimmering gold text), `.glass-panel` (glassmorphism), `.perspective-1000` + `.rotate-y-12` (3D tilt), `.no-scrollbar`.
- Shadows are tinted to the element color, e.g. `shadow-xl shadow-navy/20`, `shadow-gold/20`.
- Rounding: inputs/small `rounded-lg`, cards `rounded-xl`, panels/CTA blocks `rounded-2xl`, buttons `rounded-md`.

## Accessibility & SEO

- `selection:bg-gold/30`; focus rings on interactive elements; `aria-label` on icon-only links/buttons.
- hreflang locales: `en-AU`, `en-CA`, `en-GB`, `en-NZ`. Canonical origin `https://immistack.com`. Per-page titles ~55–60 chars, descriptions ~150–160 chars (managed in `seo/site.ts`).
