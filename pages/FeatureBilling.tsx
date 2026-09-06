import React from 'react';
import { Hero } from '../components/Hero';
import { CapabilityTable } from '../components/CapabilityTable';
import { BookCall } from '../components/BookCall';
import type { CapabilityRow } from '../types';

const CAPABILITIES: CapabilityRow[] = [
  { capability: 'Invoicing against a matter', status: 'live' },
  { capability: 'Payment-gated stage progression', status: 'live', detail: 'Core, not a Practice Pro upsell' },
  // RUTH: was a literal '[NEEDS DATA: ...]' bracket in a visible table cell.
  { capability: 'Payment plans', status: 'live', detail: 'Specific plan types not yet named on this page' },
];

export const FeatureBilling: React.FC = () => (
  <div>
    <Hero
      eyebrow="Billing"
      h1="An unpaid invoice blocks the next stage on its own."
      subhead="Payment-gated workflow means nobody has to remember to chase a client before the file moves."
      primaryPosition="billing-hero"
    />

    <section className="wrap pb-16 lg:pb-20">
      <CapabilityTable rows={CAPABILITIES} />
      <p className="text-sm" style={{ color: 'var(--s-muted)' }}>
        {/* claims-ok: explicit negative disclosure — none of these has a backing route */}
        Not claimed anywhere on this page: trust accounting, commission tracking, Xero, LEAP,
        {/* claims-ok: explicit negative disclosure — none of these has a backing route */}
        QuickBooks, Stripe/Square/Wise integration — none has a backing route.
      </p>
    </section>

    <BookCall heading="See a payment-gated matter move." />
  </div>
);
