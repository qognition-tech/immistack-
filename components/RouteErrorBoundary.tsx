import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

/**
 * Catches router-level errors and, in one specific case, recovers from them.
 *
 * THE CASE THIS EXISTS FOR
 *
 * `vite-react-ssg` fetches its loader data from
 * `static-loader-data-manifest-${window.__VITE_REACT_SSG_HASH__}.json`, and that hash is
 * regenerated on EVERY build. So the moment a new build goes live, any browser tab still
 * holding the previous HTML asks for a manifest that no longer exists. Vercel answers a
 * missing `.json` with a 404 **HTML** page (`content-type: text/html`), the library calls
 * `.json()` on it, and the visitor gets:
 *
 *     Unexpected Application Error!
 *     SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
 *
 * That is not a transient glitch — it happens on every deploy to anyone with the site
 * open, and before this component existed there was no errorElement at all, so react-router
 * rendered its raw default screen.
 *
 * The right recovery is a single hard reload: the tab picks up the new HTML, the new hash,
 * and the manifest that actually exists.
 *
 * WHY THE RELOAD IS GUARDED
 *
 * If the manifest were genuinely broken rather than merely stale, reloading on sight would
 * spin forever. So we reload at most once per RELOAD_WINDOW_MS and record it in
 * sessionStorage. If the same error survives a reload, we stop trying and show the fallback
 * — a visitor seeing an honest error beats a tab thrashing in a loop.
 */

const RELOAD_KEY = 'immistack:stale-deploy-reload-at';
const RELOAD_WINDOW_MS = 30_000;

/** The signature of "we were handed HTML where JSON was expected". */
function isStaleDeployError(error: unknown): boolean {
  const message =
    error instanceof Error ? error.message : typeof error === 'string' ? error : '';
  if (!message) return false;
  return (
    /Unexpected token '?</.test(message) ||
    /is not valid JSON/i.test(message) ||
    /<!DOCTYPE/i.test(message) ||
    // Safari and Firefox word the same failure differently.
    /JSON Parse error/i.test(message) ||
    /unexpected character at line 1/i.test(message)
  );
}

/** sessionStorage throws in some privacy modes — never let the guard itself break recovery. */
function readLastReload(): number {
  try {
    return Number(window.sessionStorage.getItem(RELOAD_KEY)) || 0;
  } catch {
    return 0;
  }
}

function markReload(): void {
  try {
    window.sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    /* ignore — we simply lose the loop guard, and the window check below still applies */
  }
}

export const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError();
  const [recovering, setRecovering] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isStaleDeployError(error)) return;

    const since = Date.now() - readLastReload();
    if (since < RELOAD_WINDOW_MS) return; // already tried — fall through to the UI

    markReload();
    setRecovering(true);
    window.location.reload();
  }, [error]);

  if (recovering) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <p style={{ color: 'var(--s-muted)' }}>Updating to the latest version…</p>
      </div>
    );
  }

  const message =
    error instanceof Error ? error.message : typeof error === 'string' ? error : '';

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center" style={{ maxWidth: '32rem' }}>
        <h1 style={{ marginTop: 0 }}>Something went wrong on our side</h1>
        <p className="lede mx-auto mb-8">
          This page failed to load. Reloading usually fixes it. If it keeps happening we would
          genuinely like to know — email{' '}
          <a href="mailto:hello@immistack.com">hello@immistack.com</a> and tell us what you were doing.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button type="button" onClick={() => window.location.reload()} className="btn btn-primary">
            Reload the page
          </button>
          <Link to="/" className="btn btn-secondary">
            Go to the homepage
          </Link>
        </div>
        {message ? (
          // Shown, not hidden: a visitor reporting a fault should be able to quote it.
          <p className="u-mono mt-8 break-words text-xs" style={{ color: 'var(--s-muted)' }}>{message}</p>
        ) : null}
      </div>
    </div>
  );
};
