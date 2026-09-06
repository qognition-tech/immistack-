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

const ROOTS = ["pages", "components", "seo", "routes.tsx", "App.tsx", "index.html", "api"];
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
  // "Bank-level encryption" says nothing checkable. Name the control instead:
  // TLS in transit, per-tenant row-level isolation.
  [/bank[- ]level/i, "'bank-level' — name the actual control instead"],
  // Every AI surface is gated on OPENAI_API_KEY, which is unset. Nothing AI is "live".
  [/live[:\s-]+ai\b/i, "AI is gated on OPENAI_API_KEY — it is not live"],
  [/\bAI[- ](powered|driven)\b/i, "AI is not connected; do not claim it as a shipped capability"],
  [/SLA uptime guarantee/i, "no SLA"],
  // The product has NO client-facing payment processor. /billing/checkout is
  // Meru billing the tenant; client settlement is out-of-band and staff record
  // it via PATCH /payments/:id/settle. This is a deliberate design, not a gap.
  [/\b(Square|PayPal|Authorize\.net|Wise)\b/, "no payment-processor integration exists"],
  [/(direct|native) integration with Stripe/i, "no client-facing Stripe integration"],

  // Added for the 2026-09 rebuild — Nadia's may-not-claim list + the pricing
  // decision memo §4 (scratchpad/reports/nadia-seo-geo-architecture.md,
  // marcus-packaging-cro.md). SOC/ISO/AI already covered above.
  [/500\+/, "'500+' — the exact shape of the removed 'Partner Firms' claim"],
  [/1M\+/, "'1M+' — the exact shape of the removed 'Visas Processed' claim"],
  [/migration lawyers/i, "no named lawyer, no published MARN behind this claim"],
  // OMARA/OISC/CICC may be *named* only inside an explicit negative disclosure
  // (there is no software-approval category) — never as a badge or an implied
  // endorsement. Waive each disclosure line with claims-ok, same pattern as SOC 2.
  [/\bOMARA\b/, "OMARA — name only inside an explicit 'no such approval exists' disclosure"],
  [/\bOISC\b/, "OISC — no accreditation exists for software in this category"],
  [/\bCICC\b/, "CICC — no accreditation exists for software in this category"],
  [/AES-256/i, "AES-256 — an infrastructure default, not a differentiator to assert; name RLS/audit-log instead"],
  [/Multi-Currency/i, "no multi-currency invoicing capability exists"],
  [/Data Sovereignty/i, "the vertical-database split is scaffolding, not routed — no residency choice exists"],
  [/Start Free Trial/i, "no self-serve trial-provisioning flow exists; CTA is 'Book a 30-minute walkthrough'"],
  [/cancel anytime/i, "not a confirmed term — do not state it"],
  [/Dedicated Success Manager/i, "not staffed"],
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
