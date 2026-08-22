import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { Button } from './Button';
import { Menu, X } from 'lucide-react';
import { useWaitlist } from '../context/WaitlistContext';

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
  const { openWaitlist } = useWaitlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-goldDark ${
      isActive ? 'text-navy font-bold' : 'text-navy/70'
    }`;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-gray-200/50 py-3 shadow-lg shadow-navy/5'
          : 'bg-white/50 backdrop-blur-sm border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" aria-label="Immistack home">
          <Logo size="medium" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink key={item.label} to={item.to} className={linkClass} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="/login" className="text-sm font-medium text-navy hover:text-goldDark transition-colors">
            Log in
          </a>
          <Button
            variant="primary"
            onClick={() => openWaitlist({ source: 'Navbar CTA' })}
            className="text-sm px-6 py-2.5 shadow-xl shadow-gold/20 hover:shadow-gold/30 bg-gradient-to-r from-navy to-navyLight border border-navy/10"
          >
            Start Free Trial
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-navy"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl lg:hidden p-4 flex flex-col gap-4 animate-fade-in">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className="text-left py-3 px-4 rounded-lg hover:bg-slate text-navy font-medium"
            >
              {item.label}
            </NavLink>
          ))}
          <div className="h-px bg-gray-100 my-2"></div>
          <Button
            onClick={() => {
              setMobileMenuOpen(false);
              openWaitlist({ source: 'Mobile Nav CTA' });
            }}
            fullWidth
          >
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};
