import path from 'node:path';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { SITE_ORIGIN, sitemapEntries, robotsTxt, allStaticPaths } from './seo/site';

// Note: a plain config object (not `defineConfig`) is used so the
// `ssgOptions` field consumed by vite-react-ssg type-checks cleanly.
export default ({ mode }: { mode: string }) => {
  loadEnv(mode, '.', '');
  // See CLAUDE.md "Legal pages readiness flag" — read here from `process.env`
  // (populated by the `loadEnv` call above), not `import.meta.env`: this file
  // runs in vite-react-ssg's own Node config-loading context, not through
  // Vite's normal client-bundle transform, so `import.meta.env` is not the
  // right read here even though it is in routes.tsx/App.tsx.
  const legalPagesReady = process.env.VITE_LEGAL_PAGES_READY === 'true';
  return {
    base: '/',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    // Consumed by `vite-react-ssg` (see the "build" script in package.json).
    ssgOptions: {
      entry: 'index.tsx',
      script: 'async',
      formatting: 'minify',
      // sitemap.xml + robots.txt are generated from seo/site.ts — the single
      // source of truth — never hand-maintained. This is also how the two
      // killed routes (/trust-accounting, /commission-tracking) disappear
      // automatically: they are not in PAGES[], so a generated sitemap never
      // emits them.
      onFinished(dir: string) {
        if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
        const entries = sitemapEntries(legalPagesReady);
        const xml =
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          entries.map((e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </url>`).join('\n') +
          '\n</urlset>\n';
        writeFileSync(path.join(dir, 'sitemap.xml'), xml);
        writeFileSync(path.join(dir, 'robots.txt'), robotsTxt());
        writeFileSync(
          path.join(dir, '_prerender-manifest.json'),
          JSON.stringify({ origin: SITE_ORIGIN, paths: allStaticPaths(legalPagesReady) }, null, 2),
        );
      },
    },
  };
};
