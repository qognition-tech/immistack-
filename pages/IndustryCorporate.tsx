import React from 'react';
import { Hero } from '../components/Hero';
import { BookCall } from '../components/BookCall';

/** Secondary priority per Nadia — same treatment as education consultants. */
export const IndustryCorporate: React.FC = () => (
  <div>
    <Hero
      eyebrow="For corporate HR and global mobility teams"
      h1="One record for every sponsored employee's visa matter."
      primaryPosition="corporate-hero"
    />
    <section className="wrap pb-16 lg:pb-20">
      {/* RUTH: subhead and body opened with literal '[NEEDS DATA: ...]'
          brackets — replaced with an honest sentence. No pain point invented. */}
      <p className="lede">
        This page states the architecture fact below because no researched pain point for this persona exists yet.
      </p>
      <p>
        As with education consultants, this page states only the structural fact — the
        config-pack architecture is vertical-agnostic by design — and does not invent
        HR-specific pain points that haven't been researched.
      </p>
    </section>
    <BookCall heading="Tell us what your team actually needs." />
  </div>
);
