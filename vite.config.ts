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
        const entries = sitemapEntries();
        const xml =
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          entries.map((e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </url>`).join('\n') +
          '\n</urlset>\n';
        writeFileSync(path.join(dir, 'sitemap.xml'), xml);
        writeFileSync(path.join(dir, 'robots.txt'), robotsTxt());
        writeFileSync(
          path.join(dir, '_prerender-manifest.json'),
          JSON.stringify({ origin: SITE_ORIGIN, paths: allStaticPaths() }, null, 2),
        );
      },
    },
  };
};
