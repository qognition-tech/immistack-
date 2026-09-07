// Fails the build if /privacy and /terms are routed but the legal entity
// behind them is not filled in.
//
// The failure mode this prevents is specific. A privacy policy that says
// "operated by null (ABN null)" still reads, to a visitor and to a regulator,
// as a document somebody published. It is worse than no page, because it looks
// like a commitment was made and then got the details wrong. The five fields
// are facts only the operator holds, so the honest options are "filled" or
// "not published" — never "published with holes".
//
// Sibling of check-claims.mjs and wired into the same `build` script, for the
// same reason: the check runs in CI, not in a reviewer's head.

import { readFileSync } from "node:fs";

const ENTITY_FILE = "legal/entity.ts";
const REQUIRED = [
  ["legalName", "registered company name, exactly as on the ASIC record"],
  ["abn", "Australian Business Number"],
  ["registeredAddress", "registered address for service"],
  ["privacyContactEmail", "where a privacy complaint or access request is sent"],
  ["effectiveDate", 'ISO date these documents take effect, e.g. "2026-09-08"'],
];

let src;
try {
  src = readFileSync(ENTITY_FILE, "utf8");
} catch {
  console.error(`check:legal — cannot read ${ENTITY_FILE}`);
  process.exit(1);
}

// Read only the ENTITY literal, so the interface declaration above it (which
// legitimately contains `string | null`) is not mistaken for an unset value.
const block = src.match(/export const ENTITY:\s*LegalEntity\s*=\s*\{([\s\S]*?)\};/);
if (!block) {
  console.error(`check:legal — could not find the ENTITY literal in ${ENTITY_FILE}`);
  process.exit(1);
}

const missing = [];
for (const [field, hint] of REQUIRED) {
  const m = block[1].match(new RegExp(`${field}\\s*:\\s*([^,\\n]+)`));
  const value = m?.[1]?.trim();
  const filled =
    value &&
    value !== "null" &&
    value !== "undefined" &&
    value !== '""' &&
    value !== "''";
  if (!filled) missing.push([field, hint]);
}

if (missing.length === 0) {
  console.log("check:legal — legal entity complete. /privacy and /terms are safe to publish.");
  process.exit(0);
}

console.error("");
console.error("check:legal FAILED — /privacy and /terms are routed but the entity is not filled in.");
console.error("");
console.error(`Fill these in ${ENTITY_FILE}:`);
for (const [field, hint] of missing) {
  console.error(`  • ${field.padEnd(22)} ${hint}`);
}
console.error("");
console.error("These are facts only you hold, so nothing can infer them. A policy naming a");
console.error("blank entity is worse than no policy — it reads as a commitment with the");
console.error("details wrong. Fill them, or unregister the two routes in routes.tsx.");
console.error("");
process.exit(1);
