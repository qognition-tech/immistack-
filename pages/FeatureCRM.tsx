import React from 'react';
import { Hero } from '../components/Hero';
import { CapabilityTable } from '../components/CapabilityTable';
import { BookCall } from '../components/BookCall';
import type { CapabilityRow } from '../types';

const CAPABILITIES: CapabilityRow[] = [
  { capability: 'Lead capture and intake forms', status: 'live' },
  { capability: 'Lead-to-matter conversion', status: 'live', detail: 'Same record, no re-entry' },
  { capability: 'Per-subclass checklist attached at conversion', status: 'pack' },
  { capability: 'Hash-chained audit log', status: 'live', detail: 'Every conversion is recorded' },
];

export const FeatureCRM: React.FC = () => (
  <div>
    <Hero
      eyebrow="Intake and CRM"
      h1="Capture a lead once. Never re-type it into a matter."
      subhead="A lead converts into a matter on the same record — the same file, the same history, no second data entry."
      primaryPosition="crm-hero"
    />

    <section className="wrap pb-16 lg:pb-20">
      <CapabilityTable rows={CAPABILITIES} />
    </section>

    <section className="wrap pb-16 lg:pb-20">
      <h2 style={{ marginTop: 0 }}>One record, not two</h2>
      <p style={{ fontWeight: 600, color: 'var(--s-ink)' }}>A lead and a matter are the same underlying record.</p>
      <p>Converting a lead doesn't create a second file to keep in sync — it's the same record, moved forward.</p>

      <h2>The checklist starts at intake</h2>
      <p>
        <strong>The subclass checklist attaches the moment a matter exists</strong>, not after a
        staff member remembers to build one by hand.
      </p>
    </section>

    <BookCall heading="See intake-to-matter in one pass." />
  </div>
);
