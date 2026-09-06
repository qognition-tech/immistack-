# DESIGN.md — ImmiStack Design System

**Replaced 2026-09-05** with Elena's rebuild brief, as implemented by Mira in the Tailwind 4
migration. Source of truth for tokens is `styles/globals.css`'s `@theme` block plus the `--s-*`
semantic surface variables — there is no `tailwind.config.js` (deleted in the migration). Add
or change a token there, not in this file. Conventions (price-slot pattern, `claims-ok:`
waivers) live in `CLAUDE.md`, not here — this file is visual language only.

Audience: Australian registered migration agents (MARN holders), 1–10 person firms, buying a
tool their OMARA file depends on. Trained to distrust a claim — the design's job is to read as
precise and checkable, not as premium-fintech decoration.

## Typography

- **Headings — Fraunces** (variable, optical-size axis, self-hosted, SIL OFL). Ship weights
  400/500 at `opsz 72`, 600 at `opsz 144` (headline only). Never below `opsz 36` or above `144`.
- **Body, UI, nav, buttons, labels — IBM Plex Sans** (400/500/600, self-hosted). Never Plex
  Serif.
- **Data, IDs, timestamps, hashes, MARNs — IBM Plex Mono** (400/500). Used only where the
  content genuinely is a code value — never decorative.
- **Scale**, ratio 1.25, base 17px: `text-xs` 13px (meta) · `text-sm` 15px (captions, table
  cells) · `text-base` 17px (body) · `text-lg` 21px (lede) · `text-xl` 27px (h3/h4) ·
  `text-2xl` 34px (h2) · `text-3xl` 42px (inner-page h1) · `text-hero`
  `clamp(34px, 3.4rem + 2vw, 53px)` (home hero h1 only).
- **Measure:** body copy max `66ch`, ledes max `58ch`. Never let a paragraph run the full
  content width.
- **AU-English, enforced in every string:** single quotes for speech; en dash for ranges
  (`1–10`, `A$129–319`), hyphen for compound modifiers (`36-month lock-in`); `A$` prefix, no
  decimal unless cents matter, `ex GST` on the same line as any price; `-ise`/`-our` spelling
  (CSS custom-property names stay `color` — that's code, not copy); dates as `DD Month YYYY`.

## Colour

Ink + warm paper + a rust/terracotta accent — deliberately not navy/gold (too close to generic
"fintech premium") and not GovX's blue/teal (the two products should read as siblings on one
platform, not reskins of one template). Light is default; dark is an independently designed
second palette, not `invert()`.

### Light
| Token | Hex | Contrast on `--bg` | Use |
|---|---|---|---|
| `--ink` | `#171B21` | 17.3:1 | headings, high-emphasis text |
| `--body` | `#38414D` | 10.4:1 | body copy |
| `--muted` | `#5B6472` | 6.0:1 | captions, meta |
| `--line` | `#DCE1E7` | — | borders, dividers (non-text) |
| `--bg` | `#FFFFFF` | — | page background |
| `--soft` | `#F5F2EE` | — | warm paper — section backgrounds, cards |
| `--accent` | `#A63D26` | 6.3:1 | links, primary CTA fill, active states |
| `--success` | `#1E7A46` | 5.3:1 | verified / live / paid states |
| `--warning` | `#8A5A00` on `#FBF2DF` | 5.3:1 | non-blocking caution |
| `--danger` | `#A6291F` | 7.1:1 | blocked / error / overdue |
| `--sandbox-amber` | same as `--warning`/`#FBF2DF` | 5.3:1 | mandatory on every regulator-adapter mockup |

### Dark (independently designed)
| Token | Hex | Contrast on dark `--bg` |
|---|---|---|
| `--bg` | `#14171C` | — |
| `--soft` | `#1B1F26` | — |
| `--ink` | `#EDEEEF` | ~16.7:1 |
| `--body` | `#C7CBD1` | ~11.0:1 |
| `--muted` | `#8C939D` | ~5.4:1 |
| `--line` | `#2B3038` | structural |
| `--accent` | `#E2896B` | ~6.9:1 |
| `--success` | `#6BC48F` | ~7.8:1 |
| `--sandbox-amber` | `#E5B968` on `#2B2113` | ~5.9:1 — same hex GovX ships, so the badge reads identically across both sites |
| `--danger` | `#F2949A` | ~8.5:1 |

Ratios computed by WCAG relative luminance, same method as `govx-marketing`. `prefers-color-scheme:
dark` is respected; a manual toggle lives in the footer, not the nav. **The marketing site never
reads a tenant's brand colour** — this is ImmiStack's own site selling to firms who have not
signed up yet; the only palette on `immistack.com` is the one in this section.

## Layout and motion

8px base unit; spacing scale `4 8 12 16 24 32 48 64 96 128`. Content width `max-w-7xl`
(`px-4 sm:px-6 lg:px-8`). Vertical rhythm `py-24` desktop / `py-16` mobile, consistently.

Single CSS-only reveal on the hero (`fadeInUp`, staggered `.reveal-1`…`.reveal-5` at
0/80/160/240/320ms); nothing else animates on load. Primary CTA: `translateY(-1px)` + shadow
deepen on hover, flatten on `:active`. Pricing toggle: slide the selection indicator via
`transform`, never fade the labels. Accordion: chevron rotates 180° over 150ms,
`grid-template-rows: 0fr → 1fr`, no `height: auto` snap. `prefers-reduced-motion: reduce` zeroes
every duration — same rule as `govx-marketing/styles/globals.css`.

## Component states (five each, per no-slop.md)

- **Capability table** ("What's built today") reuses GovX's exact `.tag` colour values
  (`t-live`, `t-pack`, `t-code`, `t-block`, `t-cont`, `t-neutral`) — do not reinvent them.
  Empty state: `"Capability data unavailable"`, never a blank table shell. Every regulator-row
  carries its sandbox tag inline, not in a legend.
- **Pricing cards:** price always **in A$, `ex GST` on the same line**; "Recommended" tier is a
  border colour change, not a floating badge that clips at narrow viewports; hover deepens the
  border, never scales the card.
- **Hero screenshot:** explicit skeleton while loading (aspect-ratio locked), a labelled
  `Screenshot unavailable` fallback on error — never a broken-image icon and never a fabricated
  dashboard mockup (see kill list below).
- **Proof block:** a named, attributed customer quote, or the section is omitted entirely for
  that page — never a placeholder testimonial.

## What was killed in the rebuild

The fake hero dashboard (`$142,390` "Monthly Revenue", invented client names "TechCorp Inc." /
"Sarah Connor" dressed as records), the wrong per-user price ladder, OMARA/OISC/CICC
accreditation badges, an "AES-256" trust bar, "Start Free Trial" (no self-serve trial flow
exists), a dead "Watch Demo" button, decorative gradients and glassmorphism. Replaced with a
real screenshot of the document-checklist screen, labelled `Illustrative — sample checklist,
not a live regulator response`, and copy that leads with `Book a demo`.

## Accessibility & SEO

Focus rings on every interactive element; `aria-label` on icon-only controls; axe-core WCAG
2.x A/AA via `tools/sweep/a11y.mjs`. hreflang `en-AU en-CA en-GB en-NZ`; canonical origin
`https://www.immistack.com`. Per-page titles/descriptions come from `seo/site.ts`, never a page
component.
