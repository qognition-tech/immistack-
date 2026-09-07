import React, { useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { WaitlistProvider } from './context/WaitlistContext';
import { OrganizationSchema } from './components/Schema';
import { Shield, MapPin, Mail } from 'lucide-react';
import { Page } from './types';
import { pathForPage } from './seo/site';

/** Footer link that routes via react-router. */
const FooterLink: React.FC<{ page: Page; className?: string; children: React.ReactNode }> = ({
  page,
  className,
  children,
}) => (
  <Link to={pathForPage(page)} className={className}>
    {children}
  </Link>
);

const App: React.FC = () => {
  const location = useLocation();

  // Scroll to top on route change.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <WaitlistProvider>
      <div className="min-h-screen flex flex-col font-sans text-navy overflow-x-hidden bg-slate selection:bg-gold/30">
        {/* Site-wide structured data */}
        <OrganizationSchema />

        <Navbar />

        <main className="flex-grow">
          <Outlet />
        </main>

        {/* Comprehensive Sitemap Footer */}
        <footer className="bg-white border-t border-gray-100 py-12 sm:py-16 text-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10 mb-12 sm:mb-16">
              <div className="xs:col-span-2 md:pr-8">
                <Link to="/" className="flex items-center gap-2 mb-6">
                  <div className="relative w-6 h-6 flex items-end justify-between">
                    <div className="w-1.5 bg-navy rounded-t-sm h-[40%]"></div>
                    <div className="w-1.5 bg-navy rounded-t-sm h-[70%]"></div>
                    <div className="w-1.5 bg-gold rounded-t-sm h-[100%]"></div>
                  </div>
                  <span className="font-heading font-bold text-lg text-navy">Immistack</span>
                </Link>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  The operating system for modern global mobility. Multi-tenant by
                  design, with row-level data isolation and a hash-chained audit trail.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="h-4 w-4" /> Sydney • London • Toronto
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Mail className="h-4 w-4" /> hello@immistack.com
                  </div>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/company/immistack"
                    aria-label="Immistack on LinkedIn"
                    className="w-11 h-11 shrink-0 rounded-full bg-gray-100 hover:bg-gold hover:text-navy transition-colors flex items-center justify-center"
                  >
                    in
                  </a>
                  <a
                    href="https://x.com/immistack"
                    aria-label="Immistack on X"
                    className="w-11 h-11 shrink-0 rounded-full bg-gray-100 hover:bg-gold hover:text-navy transition-colors flex items-center justify-center"
                  >
                    X
                  </a>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-navy mb-5 tracking-wide">Solutions</h5>
                <ul className="space-y-1 text-gray-500">
                  <li><FooterLink page="INDUSTRY_AGENTS" className="hover:text-goldDark transition-all inline-flex min-h-[36px] items-center">Migration Agents</FooterLink></li>
                  <li><FooterLink page="INDUSTRY_EDUCATION" className="hover:text-techBlue transition-all inline-flex min-h-[36px] items-center">Education Consultants</FooterLink></li>
                  <li><FooterLink page="INDUSTRY_CORPORATE" className="hover:text-navy transition-all inline-flex min-h-[36px] items-center">Corporate HR</FooterLink></li>
                  <li className="pt-2"><FooterLink page="INDUSTRIES" className="font-bold text-navy hover:underline">View All Industries</FooterLink></li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-navy mb-5 tracking-wide">Platform</h5>
                <ul className="space-y-1 text-gray-500">
                  <li><FooterLink page="FEATURE_CRM" className="hover:text-goldDark transition-colors inline-flex min-h-[36px] items-center">CRM &amp; Intake</FooterLink></li>
                  <li><FooterLink page="FEATURE_COMPLIANCE" className="hover:text-goldDark transition-colors inline-flex min-h-[36px] items-center">Compliance &amp; Audit Trail</FooterLink></li>
                  <li><FooterLink page="FEATURE_AI" className="hover:text-goldDark transition-colors inline-flex min-h-[36px] items-center">AI Automation</FooterLink></li>
                  <li><FooterLink page="FEATURE_PORTAL" className="hover:text-goldDark transition-colors inline-flex min-h-[36px] items-center">Client Portal</FooterLink></li>
                  <li><FooterLink page="FEATURE_TASKS" className="hover:text-goldDark transition-colors inline-flex min-h-[36px] items-center">Task Management</FooterLink></li>
                  <li><FooterLink page="FEATURE_FORMS" className="hover:text-goldDark transition-colors inline-flex min-h-[36px] items-center">Form Automation</FooterLink></li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-navy mb-5 tracking-wide">Advanced Modules</h5>
                <ul className="space-y-1 text-gray-500">
                  <li><FooterLink page="FEATURE_BILLING" className="hover:text-goldDark transition-colors inline-flex min-h-[36px] items-center">Billing &amp; Invoicing</FooterLink></li>
                  <li><FooterLink page="FEATURE_MULTIOFFICE" className="hover:text-goldDark transition-colors inline-flex min-h-[36px] items-center">Multi-Office</FooterLink></li>
                  <li><FooterLink page="FEATURE_STAFF_PORTAL" className="hover:text-goldDark transition-colors inline-flex min-h-[36px] items-center">Staff Portal</FooterLink></li>
                  <li><FooterLink page="FEATURE_ADMIN_PORTAL" className="hover:text-goldDark transition-colors inline-flex min-h-[36px] items-center">Admin Portal</FooterLink></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
                {/* The Affiliate Program link is gone while `/affiliate` is
                    unregistered — see the block comment in `seo/site.ts`. The
                    page made a revenue-share offer to registered migration
                    agents with no s.34 conflict artifact and nothing built
                    behind it. */}
                <Link to="/security" className="text-gray-400 hover:text-navy">Security</Link>
                {/* These were dead `<span>`s — footer text styled like links
                    that went nowhere, on a site collecting lead PII. */}
                <Link to="/privacy" className="text-gray-400 hover:text-navy">Privacy Policy</Link>
                <Link to="/terms" className="text-gray-400 hover:text-navy">Terms of Service</Link>
                <a href="/sitemap.xml" className="text-gray-400 hover:text-navy">Sitemap</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="h-4 w-4 text-growth" />
                <span className="text-xs font-semibold">Sandbox integrations for eight regulators &middot; production wiring pending accreditation</span>
              </div>
              <p className="text-gray-400">© {new Date().getFullYear()} Immistack Inc.</p>
            </div>
          </div>
        </footer>

        {/* Exit-intent + weekly countdown promo */}
      </div>
    </WaitlistProvider>
  );
};

export default App;
