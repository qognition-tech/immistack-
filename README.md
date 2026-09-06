# ImmiStack marketing site

Marketing / lead-capture site for ImmiStack, an immigration CRM and case-management product
for registered migration agents in AU/CA/UK/NZ. Public, static, must build and deploy even
when the product backend is down. See `CLAUDE.md` for the full architecture, conventions and
env vars — this file is just how to run it.

**Stack:** React 19 + Vite 6 + `vite-react-ssg` (prerendered static HTML), Tailwind CSS v4,
TypeScript, pnpm. Not Next.js.

## Run locally

```bash
pnpm install
cp .env.example .env        # fill in what you need — see CLAUDE.md "Env vars"
pnpm dev                    # http://localhost:5173
```

## Build

```bash
pnpm run build       # check:claims → SSG build → verify-prerender → check:placeholders
pnpm run build:spa   # plain SPA build, no prerender, no gates — for quick local checks only
pnpm preview         # serve the built dist/
```

`pnpm run build` is the one that ships. It fails the build if a page renders a banned claim, a
literal `[NEEDS DATA: …]`/`[COPY NEEDED]` token, or an unresolved `{{PRICE_*}}` slot — see
`CLAUDE.md` for what each gate checks and how to add a waiver.

## Deploy

Vercel, CLI-driven — pushing to GitHub does not deploy. `--prod` updates the live public site
(`www.immistack.com`); confirm before running it.

```bash
vercel deploy --prod --yes --scope qognitionagencys-projects
```

## More

- `CLAUDE.md` — architecture, the lead-capture pipeline, env vars, conventions.
- `DESIGN.md` — typography, colour tokens, layout and motion.
