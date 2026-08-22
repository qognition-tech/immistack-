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
  [/trust[- ]account/i, "trust accounting does not exist"],
  [/commission[- ]track/i, "commission tracking does not exist"],
  [/\bXero\b/, "no Xero integration"],
  [/\bQuickBooks\b/, "no QuickBooks integration"],
  [/\bLEAP\b/, "no LEAP integration"],
  [/\bVEVO\b/, "VEVO is reachable only via a commercial gateway; the adapter is sandbox"],
  [/connects? directly to/i, "all regulator adapters are sandbox"],
  [/\d+\+?\s*(partner )?firms\b/i, "customer counts — none exist"],
  [/\d+M\+?\s*visas/i, "processed-visa counts — none exist"],
  [/100%\s*(accuracy|verified|compliance)/i, "unsupported accuracy claim"],
  [/SLA uptime guarantee/i, "no SLA"],
];

function* files(p) {
  const s = statSync(p);
  if (s.isDirectory()) for (const n of readdirSync(p)) yield* files(join(p, n));
  else if (/\.(tsx?|html)$/.test(p)) yield p;
}

let hits = 0;
for (const root of ROOTS) {
  let list; try { list = [...files(root)]; } catch { continue; }
  for (const f of list) {
    const lines = readFileSync(f, "utf8").split("\n");
    lines.forEach((line, i) => {
      for (const [re, why] of BANNED) {
        if (re.test(line)) { hits++; console.log(`${f}:${i + 1}: ${why}\n    ${line.trim().slice(0, 120)}`); }
      }
    });
  }
}
if (hits) { console.error(`\n✗ ${hits} banned claim(s). The product cannot back these. Remove them; do not soften them.`); process.exit(1); }
console.log("✓ check:claims — no banned claims in source");
