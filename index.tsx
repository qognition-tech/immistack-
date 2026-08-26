import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './styles/index.css';

/**
 * Disable vite-react-ssg's static-loader-data fetching. It is dead weight here, and it
 * crashes the site on every deploy.
 *
 * WHAT IT DOES BY DEFAULT
 *
 * On a prerendered page, vite-react-ssg attaches its own `loader` to every route. On the
 * first client-side navigation that loader fetches
 * `static-loader-data-manifest-${window.__VITE_REACT_SSG_HASH__}.json`, unguarded — no
 * `res.ok` check, no try/catch (node_modules/vite-react-ssg/dist/index.mjs:179, and again
 * at :196 for the per-route file).
 *
 * WHY THAT BREAKS
 *
 * That hash is `Math.random().toString(36).substring(2, 12)`, regenerated on EVERY build.
 * So the moment a new build ships, any tab still holding the previous HTML asks for a
 * manifest filename that no longer exists. Vercel serves a missing static path as
 * `dist/404.html` with `content-type: text/html`, the library calls `.json()` on
 * `<!DOCTYPE html>…`, and the throw happens inside a react-router loader — which blanks the
 * whole app on the first link click:
 *
 *     Unexpected Application Error!
 *     SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
 *
 * A hard refresh looks fine (prerendered HTML has its data inlined), so this only shows up
 * when someone navigates — which is why it reads as random.
 *
 * THE FIX
 *
 * Seeding the manifest with an empty object short-circuits both fetches. The library reads:
 *
 *     if (!window.__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__) { …fetch… }   // now skipped
 *     const dataFilePath = manifest?.[pathname];
 *     if (!dataFilePath) return null;                                       // clean exit
 *
 * so no request is made and the loader returns `null` — exactly what it returns today.
 *
 * ⚠️ THIS IS SAFE ONLY BECAUSE NOTHING IN THIS APP USES LOADER DATA. There are no `loader`
 * functions, no `useLoaderData`, and no `getStaticPaths` anywhere in `routes.tsx`, `pages/`
 * or `components/` — verified 2026-08-26. **If you ever add a real route loader, delete
 * this block**, or that loader will silently receive `null` forever. `components/
 * RouteErrorBoundary.tsx` remains as the safety net either way.
 */
if (typeof window !== 'undefined') {
  const w = window as unknown as Record<string, unknown>;
  if (!w.__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__) {
    w.__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__ = {};
  }
}

// vite-react-ssg controls hydration on the client and static rendering at build.
export const createRoot = ViteReactSSG({ routes });
