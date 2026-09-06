import React from 'react';
import { Hero } from '../components/Hero';
import { CapabilityTable } from '../components/CapabilityTable';
import { BookCall } from '../components/BookCall';
import type { CapabilityRow } from '../types';

const CAPABILITIES: CapabilityRow[] = [
  { capability: 'Client-scoped matter view', status: 'live' },
  { capability: 'Document status (uploaded / not required / missing)', status: 'live', detail: 'Never rendered as a false positive' },
  { capability: 'Message thread', status: 'live' },
  { capability: 'Acceptance record (engagement letters, disclosures)', status: 'live', detail: 'Records assent, not a signature — see below' },
];

export const FeaturePortal: React.FC = () => (
  <div>
    <Hero
      eyebrow="Client portal"
      h1="Your client sees their matter. Nothing else."
      subhead="Document status, checklist progress and a message thread — scoped to the one matter that's theirs."
      primaryPosition="portal-hero"
    />

    <section className="wrap pb-16 lg:pb-20">
      <CapabilityTable rows={CAPABILITIES} />
    </section>

    <section className="wrap pb-16 lg:pb-20">
      <p style={{ fontWeight: 600, color: 'var(--s-ink)' }}>
        ImmiStack records assent, not a signature — every acceptance carries <code>isSignature: false</code>, by design.
      </p>
      <p>
        It's the right tool for a client acknowledging a disclosure or approving a draft. It is
        not a substitute for a real e-signature provider on a cost agreement or a Form 956 — use
        one of those for anything that needs to be a signed instrument.
      </p>
    </section>

    <BookCall heading="See what your client would see." />
  </div>
);
