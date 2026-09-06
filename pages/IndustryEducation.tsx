import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { BookCall } from '../components/BookCall';

/** Secondary priority per Nadia. No researched pain points exist for this
 *  persona — the page stays deliberately thin rather than inventing one. */
export const IndustryEducation: React.FC = () => (
  <div>
    <Hero
      eyebrow="For education consultants"
      h1="The same record architecture, shaped for education casework."
      primaryPosition="education-hero"
    />
    <section className="wrap pb-16 lg:pb-20">
      {/* RUTH: subhead and body opened with literal '[NEEDS DATA: ...]'
          brackets — replaced with an honest sentence. No pain point invented;
          the page still states only the structural fact. */}
      <p className="lede">
        This page states the architecture fact below because no researched pain point for this persona exists yet.
      </p>
      <p>
        This page states only what's structurally true: the config-pack architecture that drives{' '}
        <Link to="/migration-agents">the migration-agent product</Link> (per-subclass checklists,
        payment-gated workflow, client portal, audit log) is not migration-specific by design —
        it's driven by whatever entity types and workflows a pack declares. What an
        education-consultant pack would declare is not yet written; nothing on this page implies
        it already is.
      </p>
    </section>
    <BookCall heading="Tell us what your practice actually needs." />
  </div>
);
