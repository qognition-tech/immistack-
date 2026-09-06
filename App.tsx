import React, { useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Logo } from './components/Logo';
import { WaitlistProvider } from './context/WaitlistContext';
import { OrganizationSchema } from './components/Schema';
import { GtmScript, GtmNoscript } from './components/Gtm';

/**
 * Root layout. Footer link groups and the standing regulator-status line are
 * Theo's copy verbatim (§1, Global elements) — do not add a partner-firm
 * count, visa-processed count, badge row or newsletter signup here; all four
 * are on Elena's kill list.
 */
const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <WaitlistProvider>
      <GtmScript />
      <GtmNoscript />
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--s-bg)' }}>
        <OrganizationSchema />
        <Navbar />

        <main id="main" className="flex-grow" style={{ paddingTop: '5.5rem' }}>
          <Outlet />
        </main>

        <footer style={{ borderTop: '1px solid var(--s-line)', background: 'var(--s-soft)' }}>
          <div className="wrap py-12 sm:py-16 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10 mb-10">
              <div className="md:col-span-1">
                <Link to="/" className="inline-block mb-4">
                  <Logo variant="mark" size="medium" />
                </Link>
                <p style={{ color: 'var(--s-muted)', maxWidth: '28ch' }}>
                  Immigration CRM and case management for registered migration agents.
                </p>
              </div>

              <div>
                <h2 className="kicker" style={{ marginTop: 0 }}>Product</h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li><Link to="/features" className="inline-flex min-h-[36px] items-center" style={{ color: 'var(--s-body)' }}>Features</Link></li>
                  <li><Link to="/pricing" className="inline-flex min-h-[36px] items-center" style={{ color: 'var(--s-body)' }}>Pricing</Link></li>
                  <li><Link to="/security" className="inline-flex min-h-[36px] items-center" style={{ color: 'var(--s-body)' }}>Security</Link></li>
                  <li><Link to="/client-portal" className="inline-flex min-h-[36px] items-center" style={{ color: 'var(--s-body)' }}>Client portal</Link></li>
                </ul>
              </div>

              <div>
                <h2 className="kicker" style={{ marginTop: 0 }}>Solutions</h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li><Link to="/migration-agents" className="inline-flex min-h-[36px] items-center" style={{ color: 'var(--s-body)' }}>Migration agents</Link></li>
                  <li><Link to="/education-consultants" className="inline-flex min-h-[36px] items-center" style={{ color: 'var(--s-body)' }}>Education consultants</Link></li>
                  <li><Link to="/corporate-hr" className="inline-flex min-h-[36px] items-center" style={{ color: 'var(--s-body)' }}>Corporate HR</Link></li>
                </ul>
              </div>

              <div>
                <h2 className="kicker" style={{ marginTop: 0 }}>Company</h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li><Link to="/about" className="inline-flex min-h-[36px] items-center" style={{ color: 'var(--s-body)' }}>About</Link></li>
                  <li><Link to="/affiliate" className="inline-flex min-h-[36px] items-center" style={{ color: 'var(--s-body)' }}>Affiliate program</Link></li>
                  <li><Link to="/blog" className="inline-flex min-h-[36px] items-center" style={{ color: 'var(--s-body)' }}>Blog</Link></li>
                </ul>
              </div>

              <div>
                <h2 className="kicker" style={{ marginTop: 0 }}>Legal</h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li><Link to="/privacy" className="inline-flex min-h-[36px] items-center" style={{ color: 'var(--s-body)' }}>Privacy</Link></li>
                  <li><Link to="/terms" className="inline-flex min-h-[36px] items-center" style={{ color: 'var(--s-body)' }}>Terms</Link></li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" style={{ borderTop: '1px solid var(--s-line)', paddingTop: '1.5rem' }}>
              <p className="mb-0" style={{ color: 'var(--s-muted)' }}>
                Sandbox integrations for eight regulators, production wiring pending accreditation.
              </p>
              <p className="mb-0" style={{ color: 'var(--s-muted)' }}>© {new Date().getFullYear()} ImmiStack</p>
            </div>
          </div>
        </footer>
      </div>
    </WaitlistProvider>
  );
};

export default App;
