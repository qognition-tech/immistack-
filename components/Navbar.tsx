import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { BookCallButton } from './BookCallButton';
import { Menu, X } from 'lucide-react';

// Matches the live site's nav exactly (recovered from git HEAD
// components/Navbar.tsx) — Security stays reachable from the footer.
const navItems = [
  { label: 'Features', to: '/features' },
  { label: 'Solutions', to: '/solution' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Resources', to: '/blog' },
  { label: 'Affiliates', to: '/affiliate' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // The panel is absolutely positioned over the page, so it has to close when
  // the route changes or it covers the page it just navigated to.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Escape closes it, and crossing into the `lg` layout drops it entirely so it
  // cannot be left mounted-but-hidden behind the desktop nav.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (mq.matches) setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onChange);
    };
  }, [mobileMenuOpen]);

  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? 'var(--s-ink)' : 'var(--s-body)',
    fontWeight: isActive ? 600 : 500,
    borderBottom: isActive ? '2px solid var(--s-accent)' : '2px solid transparent',
  });

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        // Opaque always — this used to fade to 80% at rest, which let the
        // hero mock and feature cards show through while scrolling (a grey
        // block behind "Affiliates"). A sticky nav's surface is never
        // translucent, in either colour scheme; `--s-bg` is already the
        // correct token for both.
        background: 'var(--s-bg)',
        borderBottom: '1px solid var(--s-line)',
        boxShadow: scrolled ? '0 1px 0 var(--s-line)' : 'none',
      }}
    >
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="wrap flex items-center justify-between gap-3" style={{ paddingBlock: scrolled ? '0.75rem' : '1.1rem' }}>
        <Link to="/" aria-label="ImmiStack home" className="shrink-0">
          <Logo size="medium" />
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <NavLink key={item.label} to={item.to} style={linkStyle} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <a href="https://app.immistack.com/login" className="text-sm" style={{ color: 'var(--s-body)' }}>
            Log in
          </a>
          <BookCallButton position="nav" />
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center"
            style={{ color: 'var(--s-ink)' }}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="absolute top-full left-0 w-full max-h-[calc(100dvh_-_6rem)] overflow-y-auto overscroll-contain lg:hidden p-4 flex flex-col gap-1 reveal-1"
          style={{ background: 'var(--s-bg)', borderBottom: '1px solid var(--s-line)' }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center py-3 px-2"
              style={{ color: 'var(--s-ink)', fontWeight: 500 }}
            >
              {item.label}
            </NavLink>
          ))}
          <a href="https://app.immistack.com/login" className="flex min-h-[44px] items-center py-3 px-2" style={{ color: 'var(--s-body)' }}>
            Log in
          </a>
          <div style={{ borderTop: '1px solid var(--s-line)', margin: '0.5rem 0' }} />
          <BookCallButton position="mobile-nav" className="w-full" />
        </div>
      )}
    </nav>
  );
};
