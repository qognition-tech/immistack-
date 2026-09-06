// Post-build gate: every path in the prerender manifest (written by
// vite.config.ts onFinished from seo/site.ts) must exist as dist/<path>/index.html
// with a real <title>, and the not-found page must exist for the host.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const manifest = JSON.parse(readFileSync(join(DIST, '_prerender-manifest.json'), 'utf8'));
const paths = [...manifest.paths, '/404'];
let bad = 0;
for (const p of paths) {
  const file = p === '/' ? join(DIST, 'index.html') : join(DIST, p, 'index.html');
  const alt = join(DIST, `${p.replace(/^\//, '')}.html`);
  const f = existsSync(file) ? file : existsSync(alt) ? alt : null;
  if (!f) {
    console.error(`✗ missing prerender: ${p}`);
    bad++;
    continue;
  }
  const html = readFileSync(f, 'utf8');
  if (!/<title[^>]*>[^<]+<\/title>/.test(html)) {
    console.error(`✗ no <title>: ${p}`);
    bad++;
  }
  if (!/<main/.test(html)) {
    console.error(`✗ no <main>: ${p}`);
    bad++;
  }
}
for (const f of ['sitemap.xml', 'robots.txt', 'og-default.png', 'logo.png']) {
  if (!existsSync(join(DIST, f))) {
    console.error(`✗ missing ${f}`);
    bad++;
  }
}
if (bad) {
  console.error(`\n✗ verify-prerender: ${bad} problem(s)`);
  process.exit(1);
}
console.log(`✓ verify-prerender — ${paths.length} routes prerendered`);
