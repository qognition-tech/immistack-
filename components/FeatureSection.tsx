import React from 'react';

interface FeatureSectionProps {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  illustration: React.ReactNode;
  /** Illustration on the left instead of the right. */
  reverse?: boolean;
  dark?: boolean;
  id?: string;
}

/**
 * Alternating illustrated feature block — the live site's pattern
 * (`components/FeaturePillars.tsx` at git HEAD), generalised so it can hold
 * any illustration. Copy always comes from an already-shipped, honest page
 * (Features/FeatureCRM/FeatureBilling/FeaturePortal) — never invented here.
 */
export const FeatureSection: React.FC<FeatureSectionProps> = ({ eyebrow, title, body, bullets, illustration, reverse, dark, id }) => (
  <section id={id} className={`py-16 sm:py-20 lg:py-24 ${dark ? 'band-dark' : ''}`} style={dark ? undefined : { borderTop: '1px solid var(--s-line)' }}>
    <div className="wrap">
      <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
        <div className={reverse ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}>{illustration}</div>
        <div className={reverse ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}>
          <span className="kicker">{eyebrow}</span>
          <h2 style={{ marginTop: 0 }}>{title}</h2>
          <p className="lede mb-6">{body}</p>
          {bullets && bullets.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 mb-2 text-sm">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--s-accent)' }} aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  </section>
);

/** Small "sample" tag every feature illustration carries, per the operator's
 *  reskin direction — never let an illustration be mistaken for a live screen. */
export const SampleTag: React.FC = () => (
  <span className="tag t-cont" style={{ position: 'absolute', top: '0.75rem', insetInlineEnd: '0.75rem', zIndex: 1 }}>
    Sample
  </span>
);
