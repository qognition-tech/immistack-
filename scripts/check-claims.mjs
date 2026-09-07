// Fails the build if a claim the product cannot back appears in source.
//
// The backing product (meru-core, see /api-json) has NO SOC 2, ISO 27001,
// trust accounting, commission tracking, Xero/LEAP/QuickBooks integration,
// live VEVO/DHA/Home Office/IRCC connectivity (all eight regulator adapters
// are sandbox), named customers, or testimonials. This site once advertised
// every one of those — and emitted the VEVO claim into Google rich results
// as FAQ JSON-LD. A regulated buyer's job is to check; one caught claim ends
// the deal. So the check runs in CI, not in a reviewer's head.
//
// Comments are NOT exempt on purpose: a comment saying "we removed the SOC 2
// claim" is fine, but a commented-out claim is one uncomment from shipping.
// Document the removal in git history, not in the file.
//
// ONE escape hatch, deliberately narrow. Saying "we hold no SOC 2 certification"
// is the opposite of claiming one, and a security page that cannot say so is worse
// than one that can. So a line is exempt only if the line IMMEDIATELY BEFORE it
// carries `claims-ok:` plus a reason:
//
//     {/* claims-ok: explicit negative disclosure, not a claim */}
//     <p>Immistack holds no SOC 2 report and no ISO 27001 certification today.</p>
//
// Deliberately not automatic negation-detection — "no SOC 2 gaps" would sail
// through that. A human writes the marker, it shows up in the diff, and every use
// is counted and printed below so the exemptions cannot grow in silence.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["pages", "components", "seo", "routes.tsx", "App.tsx", "index.html"];
const BANNED = [
  [/SOC\s?2/i, "SOC 2 — no certificate exists"],
  [/ISO\s?27001/i, "ISO 27001 — no certificate exists"],
  [/\bcertified\b/i, "'certified' — nothing is"],
  [/\baccredited\b/i, "'accredited' — nothing is"],
  [/trusted by/i, "'trusted by' — no customers to name"],
  [/IRCC Direct Connect/i, "IRCC has no API"],
  [/Home Office API/i, "the Home Office has no public API"],
  // "Trust Acct" slipped past the long form once — match the abbreviation too.
  [/trust[- ]?acc(ount|t)\b/i, "trust accounting does not exist"],
  [/trust\s+a\/c\b/i, "trust accounting does not exist"],
  [/commission[- ]track/i, "commission tracking does not exist"],
  [/\bXero\b/, "no Xero integration"],
  [/\bQuickBooks\b/, "no QuickBooks integration"],
  [/\bLEAP\b/, "no LEAP integration"],
  [/\bVEVO\b/, "VEVO is reachable only via a commercial gateway; the adapter is sandbox"],
  [/connects? directly to/i, "all regulator adapters are sandbox"],
  [/\d+\+?\s*(partner )?firms\b/i, "customer counts — none exist"],
  [/\d+M\+?\s*visas/i, "processed-visa counts — none exist"],
  [/100%\s*(accuracy|verified|compliance)/i, "unsupported accuracy claim"],
  // "Bank-level encryption" says nothing checkable. Name a real, verified control
  // instead — TLS in transit and per-tenant row-level isolation are both true and
  // checkable in this codebase. Do NOT reach for a specific cipher (AES-256,
  // below) as the replacement — nobody has verified which cipher the managed
  // Postgres/storage provider actually uses, and a wrong specific is worse than
  // the vague claim it replaced.
  [/bank[- ]level/i, "'bank-level' — name a real, verified control instead"],
  [/500\+/, "500+ — no customer count exists"],
  [/1M\+/, "1M+ — no processed-visa count exists"],
  [/migration lawyers/i, "the persona is registered migration agents, not lawyers — see DESIGN.md"],
  [/\bDocuSign\b/i, "no e-signature integration exists; acceptance records are not signatures"],
  // These two were written narrowly and both were evaded in shipped copy, in
  // FAQPage JSON-LD that reaches Google rich results. "extended trial access"
  // sailed past `start free trial`; "cancel, at any time" sailed past
  // `cancel anytime` on a comma. Widened to the claim, not the phrasing —
  // guardrails.md is explicit that a claim inside JSON-LD is still a claim.
  [/free trial|trial access|start.{0,12}trial/i, "no self-serve trial exists — Resend and Stripe are both unset, so there is nothing to start"],
  [/cancel[,\s]+at any time|cancel anytime|cancel at any time/i, "no self-serve subscription to cancel — there is no billing portal"],
  // Sold to registered migration agents, whose Code of Conduct s.34 makes
  // commission disclosure two-sided. Nothing is built and /affiliate is
  // unregistered; the old ban was `commission[- ]track`, which "30% recurring
  // commission" walked straight past.
  [/recurring commission|% commission|commission for (every|each)/i, "no affiliate ledger, attribution or payout exists, and no s.34 conflict artifact — see seo/site.ts"],
  // Claimed on /agents with nothing behind either.
  [/conflict of interest (checker|check)/i, "no conflict-of-interest feature exists"],
  [/CPD (point )?(logbook|tracker|register)/i, "no CPD register exists — it is mandated by the 2026 Regulations and is on the backlog"],
  // AES-256 is a specific, checkable claim nobody has verified against the
  // actual managed database/storage provider. "Encryption at rest" (no cipher
  // named) is the honest version until someone confirms the cipher in use.
  [/AES-?256/i, "AES-256 — cipher not verified against the managed infra; say 'encryption at rest' instead"],
  [/multi-?currency/i, "multi-currency invoicing does not exist — payments are single-currency, minor-units only"],
  [/data sovereignty/i, "no per-region data-residency choice exists — see meru-core CLAUDE.md §8 (three-database split is unwired)"],
  [/dedicated success manager/i, "no named-account-manager program exists"],
  // The exact trust-bar phrasing this site once shipped on /pricing — a
  // regulator-acronym list dressed as a compliance certification, when OMARA,
  // OISC and CICC are the agents' regulators, not ours. Scoped to this phrase
  // rather than the acronyms themselves: OMARA/OISC are legitimately named
  // elsewhere to describe the audience (e.g. "registered agents (OMARA/OISC)")
  // and the config pack's per-branch rule flexibility, which is real.
  [/built for (omara|oisc|cicc)\b[^.]{0,80}regulatory standards/i, "regulator names presented as a compliance certification — the acronyms are real, this claim about them is not"],
  // Every AI surface is gated on OPENAI_API_KEY, which is unset. Nothing AI is "live".
  [/live[:\s-]+ai\b/i, "AI is gated on OPENAI_API_KEY — it is not live"],
  [/\bAI[- ](powered|driven)\b/i, "AI is not connected; do not claim it as a shipped capability"],
  [/SLA uptime guarantee/i, "no SLA"],
  // The product has NO client-facing payment processor. /billing/checkout is
  // Meru billing the tenant; client settlement is out-of-band and staff record
  // it via PATCH /payments/:id/settle. This is a deliberate design, not a gap.
  [/\b(Square|PayPal|Authorize\.net|Wise)\b/, "no payment-processor integration exists"],
  // Was only `/(direct|native) integration with Stripe/i`, which a bare
  // "Stripe Connected" label sails past — that exact miss shipped on
  // FeatureAdminPortal.tsx and in the HeroSection dashboard mockup. Match the
  // name outright; there is no client-facing Stripe integration in any form.
  [/\bStripe\b/i, "no client-facing Stripe integration exists"],
];

function* files(p) {
  const s = statSync(p);
  if (s.isDirectory()) for (const n of readdirSync(p)) yield* files(join(p, n));
  else if (/\.(tsx?|html)$/.test(p)) yield p;
}

const ALLOW = /claims-ok:/;
const COMMENTISH = /^\s*(\/\/|\*|\/\*|\{\s*\/\*)/;

/**
 * A line is waived if the comment block DIRECTLY above it carries `claims-ok:`.
 *
 * Deliberately a block, not a single line: values wrap (`description:` on one line, the
 * string on the next) and reasons run past 100 characters, so requiring the marker to sit
 * on exactly line i-1 made the escape hatch unusable and produced silent confusion rather
 * than safety. We walk back only through comment and blank lines, so the marker still has
 * to be attached to the thing it waives — it cannot drift in from elsewhere in the file.
 */
function waivedBy(lines, i) {
  for (let j = i - 1; j >= 0 && i - j <= 6; j--) {
    const line = lines[j];
    if (ALLOW.test(line)) return true;
    if (line.trim() === '' || COMMENTISH.test(line)) continue;
    return false; // hit real code — the comment block has ended
  }
  return false;
}

let hits = 0;
const exempt = [];
for (const root of ROOTS) {
  let list; try { list = [...files(root)]; } catch { continue; }
  for (const f of list) {
    const lines = readFileSync(f, "utf8").split("\n");
    lines.forEach((line, i) => {
      const waived = waivedBy(lines, i);
      for (const [re, why] of BANNED) {
        if (!re.test(line)) continue;
        if (waived) {
          exempt.push(`${f}:${i + 1}: ${why} — waived by a claims-ok marker above`);
          continue;
        }
        hits++;
        console.log(`${f}:${i + 1}: ${why}\n    ${line.trim().slice(0, 120)}`);
      }
    });
  }
}
// Always print the waivers, pass or fail. An exemption nobody sees is an exemption
// that grows.
if (exempt.length) {
  console.log(`\n${exempt.length} waived by an explicit claims-ok marker:`);
  for (const e of exempt) console.log(`  · ${e}`);
}

if (hits) {
  console.error(`\n✗ ${hits} banned claim(s). The product cannot back these. Remove them; do not soften them.`);
  process.exit(1);
}
console.log(`\n✓ check:claims — no banned claims in source${exempt.length ? ` (${exempt.length} waived)` : ""}`);
