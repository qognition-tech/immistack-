import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, ArrowRight } from 'lucide-react';

const POPULAR = [
  { label: 'Features', path: '/features' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Compliance & Audit Trail', path: '/compliance-vevo' },
  { label: 'For Migration Agents', path: '/migration-agents' },
  { label: 'Blog', path: '/blog' },
];

export const NotFound: React.FC = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 pt-32 pb-20">
      <div className="max-w-xl text-center">
        <p className="text-7xl font-heading font-bold text-gold-gradient mb-4">404</p>
        <h1 className="text-3xl font-heading font-bold text-navy mb-3">Page not found</h1>
        <p className="text-gray-500 mb-8">
          The page you’re looking for doesn’t exist or has moved. Here are some popular destinations instead.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {POPULAR.map((p) => (
            <Link
              key={p.path}
              to={p.path}
              className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-navy text-sm font-medium hover:border-gold hover:text-goldDark transition-colors"
            >
              {p.label}
            </Link>
          ))}
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-navy text-white font-medium hover:bg-navyLight transition-colors"
        >
          <HomeIcon className="h-4 w-4" /> Back to home <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};
