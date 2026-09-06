import React from 'react';
import { BookCallButton } from './BookCallButton';

interface HeroProps {
  eyebrow?: string;
  /** The home page gets the larger, clamp-sized `.h-hero` treatment; every
   *  other page uses the standard `<h1>` (Elena's brief §1). */
  size?: 'home' | 'page';
  h1: string;
  subhead?: string;
  primaryPosition: string;
  primaryLabel?: string;
  secondary?: { label: string; href?: string; onClick?: () => void };
  children?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({ eyebrow, size = 'page', h1, subhead, primaryPosition, primaryLabel, secondary, children }) => {
  return (
    <section className="wrap pt-10 pb-14 lg:pt-16 lg:pb-20">
      <div style={{ maxWidth: '46rem' }}>
        {eyebrow && (
          <span className="kicker reveal-1" style={{ color: 'var(--s-accent)' }}>
            {eyebrow}
          </span>
        )}
        {size === 'home' ? (
          <h1 className="h-hero reveal-2" style={{ marginTop: 0 }}>
            {h1}
          </h1>
        ) : (
          <h1 className="reveal-2" style={{ marginTop: 0 }}>
            {h1}
          </h1>
        )}
        {subhead && (
          <p className="lede reveal-3" style={{ maxWidth: '58ch' }}>
            {subhead}
          </p>
        )}
        <div className="flex flex-wrap gap-3 reveal-4" style={{ marginTop: '1.5rem' }}>
          <BookCallButton position={primaryPosition} label={primaryLabel} />
          {secondary &&
            (secondary.href ? (
              <a href={secondary.href} className="btn btn-secondary">
                {secondary.label}
              </a>
            ) : (
              <button type="button" onClick={secondary.onClick} className="btn btn-secondary">
                {secondary.label}
              </button>
            ))}
        </div>
      </div>
      {children}
    </section>
  );
};
