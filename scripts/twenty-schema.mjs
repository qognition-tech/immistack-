#!/usr/bin/env node
/**
 * Ensures the custom fields this site writes to exist in Twenty CRM.
 *
 * Twenty has no built-in "tag" primitive — there is no `tag` object and no tags
 * field on `person`. So the tag every form submission carries has to be created
 * as a MULTI_SELECT field before anything can write to it. This script does that,
 * idempotently: it is safe to re-run, and it never edits or deletes existing data.
 *
 * The workspace is shared across several clients, so the field is ADDITIVE and the
 * option values are namespaced `immistack*`. Nothing here touches another client's
 * records.
 *
 *   node scripts/twenty-schema.mjs          # create what is missing, report the rest
 *   node scripts/twenty-schema.mjs --dry    # report only, change nothing
 *
 * Reads TWENTY_API_KEY and TWENTY_API_URL from the environment (or .env).
 */
import fs from 'node:fs';
import path from 'node:path';

const DRY = process.argv.includes('--dry');

/** Load .env without a dependency. Values may contain `=`, so split on the first only. */
function loadEnv() {
  const p = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i === -1) continue;
    const k = t.slice(0, i);
    if (!process.env[k]) process.env[k] = t.slice(i + 1);
  }
}
loadEnv();

const API_URL = (process.env.TWENTY_API_URL || 'https://api.twenty.com').replace(/\/$/, '');
const API_KEY = process.env.TWENTY_API_KEY;

if (!API_KEY) {
  console.error('TWENTY_API_KEY is not set. Add it to .env (which is gitignored) or the environment.');
  process.exit(1);
}

const TAG_FIELD = 'leadTags';

/** Every tag this site can apply. `immistack` is on every record; the rest say where it came from. */
/* Twenty requires option `value` to be UPPER_CASE snake_case; `label` is what humans see. */
const TAG_OPTIONS = [
  { value: 'IMMISTACK',             label: 'ImmiStack',                  color: 'blue'      },
  { value: 'IMMISTACK_MARKETING',   label: 'ImmiStack — Marketing Site', color: 'purple'    },
  { value: 'IMMISTACK_WAITLIST',    label: 'ImmiStack — Waitlist',       color: 'green'     },
  { value: 'IMMISTACK_AFFILIATE',   label: 'ImmiStack — Affiliate',      color: 'orange'    },
  { value: 'IMMISTACK_LEAD_MAGNET', label: 'ImmiStack — Lead Magnet',    color: 'yellow'    },
  { value: 'IMMISTACK_BOOK_CALL',   label: 'ImmiStack — Book a Call',    color: 'red'       },
  { value: 'IMMISTACK_CONTACT',     label: 'ImmiStack — Contact',        color: 'turquoise' },
];

async function api(pathname, init = {}) {
  const res = await fetch(`${API_URL}${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  let body;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!res.ok) {
    const msg = typeof body === 'object' && body ? JSON.stringify(body) : String(body);
    throw new Error(`${init.method || 'GET'} ${pathname} -> ${res.status}: ${msg}`);
  }
  return body;
}

/** The metadata list endpoint has returned more than one envelope shape; normalise defensively. */
function asList(payload, key) {
  let d = payload;
  if (d && typeof d === 'object' && 'data' in d) d = d.data;
  if (Array.isArray(d)) return d;
  if (d && typeof d === 'object' && key && Array.isArray(d[key])) return d[key];
  if (d && typeof d === 'object') {
    for (const v of Object.values(d)) if (Array.isArray(v)) return v;
  }
  return [];
}

async function main() {
  console.log(`Twenty schema check — ${API_URL}${DRY ? ' (dry run)' : ''}`);

  const objects = asList(await api('/rest/metadata/objects?limit=100'), 'objects');
  if (!objects.length) throw new Error('No objects returned from the metadata API.');

  let created = 0;
  let already = 0;

  for (const target of ['person', 'company']) {
    const obj = objects.find((o) => o && o.nameSingular === target);
    if (!obj) {
      console.log(`  ! object "${target}" not found — skipping`);
      continue;
    }

    const existing = (obj.fields || []).find((f) => f && f.name === TAG_FIELD);
    if (existing) {
      const have = new Set((existing.options || []).map((o) => o.value));
      const missing = TAG_OPTIONS.filter((o) => !have.has(o.value));
      already++;
      console.log(`  = ${target}.${TAG_FIELD} exists (${have.size} options)` +
        (missing.length ? ` — missing: ${missing.map((m) => m.value).join(', ')}` : ' — all options present'));
      if (missing.length && !DRY) {
        // Twenty replaces the option list wholesale, so send existing + missing together.
        const merged = [...(existing.options || []), ...missing].map((o, i) => ({
          label: o.label, value: o.value, color: o.color || 'blue', position: i,
        }));
        await api(`/rest/metadata/fields/${existing.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ options: merged }),
        });
        console.log(`    + added ${missing.length} option(s)`);
      }
      continue;
    }

    console.log(`  + ${target}.${TAG_FIELD} missing — creating MULTI_SELECT`);
    if (DRY) continue;

    await api('/rest/metadata/fields', {
      method: 'POST',
      body: JSON.stringify({
        name: TAG_FIELD,
        label: 'Lead Tags',
        type: 'MULTI_SELECT',
        description:
          'Which product and capture point this record came from. Written by the ImmiStack marketing site; namespaced so it never collides with another client in this workspace.',
        icon: 'IconTag',
        objectMetadataId: obj.id,
        options: TAG_OPTIONS.map((o, i) => ({ ...o, position: i })),
      }),
    });
    created++;
    console.log(`    created with ${TAG_OPTIONS.length} options`);
  }

  console.log(`\nDone. created=${created} already-present=${already}`);
  if (DRY) console.log('Dry run — nothing was changed.');
}

main().catch((err) => {
  console.error('\nSchema check FAILED:', err.message);
  process.exit(1);
});
