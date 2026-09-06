// Post-build honesty gate: no unresolved placeholder ships as visible copy.
//
// Ruth's second pass on dist/ found literal `[NEEDS DATA: ...]` and
// `[COPY NEEDED]` shipped as visible text AND inside FAQPage JSON-LD. Both
// are the same defect shape meru-core/CLAUDE.md §7.3 already bans elsewhere:
// missing data presented as a clean result. A placeholder bracket rendered
// as body copy — or serialized into structured data a crawler will read
// as a real answer — is exactly that, just in prose instead of a stat.
//
// This runs against dist/**/*.html, AFTER prerender:
//   check:claims (source) → SSG build → verify-prerender → THIS.
// Checking source .tsx isn't enough — a placeholder correctly gated behind a
// real data source can still leak into rendered output through a template
// string, a JSON-LD serialization, or a conditional that evaluated wrong.
// This is the check that would have caught what Ruth found by hand.
//
// Attribute values are exempt by construction: tag markup (`<...>`) is
// stripped before scanning, so a `data-*` attribute never reaches the check —
// but the same literal string appearing as VISIBLE text, or inside a JSON-LD
// `<script>` body (which survives stripping, because only the `<script ...>`
// tag itself is markup, not its inner text), fails it.
//
// PREVIEW EXCEPTION: on a Vercel Preview deploy (`VERCEL_ENV === 'preview'`),
// pages like /privacy and /terms are *expected* to still carry `[NEEDS DATA:
// …]` tokens — that is how a reviewer sees the legal copy's shape before the
// operator has filled every fact in it. Failing the build there would mean
// nobody could preview the page at all. So on `preview` this script prints
// every finding as a warning and exits 0; Production (`VERCEL_ENV ===
// 'production'`) and every local/CI build (`VERCEL_ENV` unset) still fail
// exactly as before. Do not widen this to also cover Production.
//
// PRICES ARE NOW REAL (2026-09-06, operator-accepted Model B pricing) —
// the `A$—` placeholder em-dash price is retired, not merely discouraged:
// what used to be the opt-in `REQUIRE_PRICES=1` behaviour is now the only
// behaviour. An `A$—` in rendered output means a price regressed to the
// placeholder, and that fails the build exactly like `[NEEDS DATA` does.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const IS_PREVIEW = process.env.VERCEL_ENV === 'preview';

const PATTERNS = [
  ['[NEEDS DATA', '[NEEDS DATA: …] shipped as rendered output'],
  ['[COPY NEEDED', '[COPY NEEDED] shipped as rendered output'],
  ['{{PRICE_', 'an unresolved {{PRICE_*}} template slot shipped as rendered output'],
  ['A$—', "a placeholder 'A$—' price shipped as rendered output — prices are real now, see components/PricingCards.tsx"],
];

function* files(p) {
  const s = statSync(p);
  if (s.isDirectory()) for (const n of readdirSync(p)) yield* files(join(p, n));
  else if (/\.html$/.test(p)) yield p;
}

/** Strip tag markup (`<...>`, including every attribute) but keep everything
 *  between tags — which is exactly a <script> or <style> body too, since
 *  only the opening `<script type="...">` tag itself is markup. */
function renderedText(html) {
  return html.replace(/<[^>]*>/g, ' ');
}

let fileList;
try {
  fileList = [...files(DIST)];
} catch {
  console.error(`✗ check:placeholders — ${DIST}/ does not exist. Run the build first.`);
  process.exit(1);
}

let hits = 0;
const log = IS_PREVIEW ? console.warn : console.error;
for (const f of fileList) {
  const text = renderedText(readFileSync(f, 'utf8'));
  for (const [needle, why] of PATTERNS) {
    let from = 0;
    let idx;
    while ((idx = text.indexOf(needle, from)) !== -1) {
      hits++;
      const context = text.slice(Math.max(0, idx - 40), idx + needle.length + 40).replace(/\s+/g, ' ').trim();
      log(`${f}: ${why}\n    …${context}…`);
      from = idx + needle.length;
    }
  }
}

if (hits) {
  if (IS_PREVIEW) {
    console.warn(
      `\n⚠ check:placeholders — ${hits} unresolved placeholder(s) shipped as rendered output. ` +
        `Allowed on a Vercel Preview deploy (VERCEL_ENV=preview) so reviewers can see the page; ` +
        `this would fail Production or a local build.`,
    );
    process.exit(0);
  }
  console.error(`\n✗ check:placeholders — ${hits} unresolved placeholder(s) shipped as rendered output. Fix the copy at source, do not soften the check.`);
  process.exit(1);
}
console.log(`✓ check:placeholders — no unresolved placeholders in ${fileList.length} rendered file(s)`);
