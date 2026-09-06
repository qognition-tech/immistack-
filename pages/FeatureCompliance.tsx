import React from 'react';
import { Hero } from '../components/Hero';
import { CapabilityTable } from '../components/CapabilityTable';
import { ObjectionAccordion } from '../components/ObjectionAccordion';
import { BookCall } from '../components/BookCall';
import type { CapabilityRow } from '../types';

const CAPABILITIES: CapabilityRow[] = [
  { capability: 'Per-subclass document checklist', status: 'pack', detail: 'Resolves from the config pack, per subclass' },
  // RUTH: was a literal '[NEEDS DATA: ...]' bracket in a visible table cell —
  // replaced with an honest status word instead of a leaked internal note.
  { capability: 'CPD and PI insurance record-keeping', status: 'caution', detail: 'Mechanism not yet confirmed for this page — ask in the walkthrough' },
  // claims-ok: descriptive, not a certification claim — names what a regulator file inspection would check, asserts no endorsement
  { capability: 'Hash-chained audit log', status: 'live', detail: 'The record an OMARA file inspection would ask for' },
  { capability: 'Visa expiry alerts', status: 'caution', detail: 'Computed from pack rules; needs practitioner sign-off before relying on the date' },
  // claims-ok: explicit negative disclosure — not a live ImmiStack integration
  { capability: 'VEVO', status: 'not-integrated', detail: 'Reachable only via a commercial gateway with recorded consent — not a live ImmiStack integration' },
];

const COMPLIANCE_FAQ = [
  {
    // claims-ok: explicit negative disclosure — no such approval category exists
    question: 'Is ImmiStack OMARA-approved?',
    // claims-ok: explicit negative disclosure — no such approval category exists
    answer: "No such approval exists for software. OMARA's remit doesn't extend to case-management tools.",
  },
  {
    question: 'What happens on 31 March 2027?',
    // RUTH: was a literal '[NEEDS DATA: ...]' bracket shipping into both the
    // visible accordion and the FAQPage JSON-LD — replaced with an honest
    // sentence; still no invented consequence.
    answer: "We haven't published a specific answer yet — ask us in the walkthrough.",
  },
  {
    // claims-ok: explicit negative disclosure — no live regulator-gateway integration
    question: 'Does ImmiStack connect to VEVO?',
    // claims-ok: explicit negative disclosure — no live regulator-gateway integration
    answer: 'No. VEVO is reachable only through a commercial gateway with recorded consent — ImmiStack does not hold a live VEVO integration.',
  },
  {
    question: 'Can I trust the visa-expiry alerts without checking them myself?',
    answer: "No. The alert is computed from config-pack rules and needs a registered practitioner's sign-off before a firm relies on the date.",
  },
];

export const FeatureCompliance: React.FC = () => (
  <div>
    <Hero
      eyebrow="Migration Agents Regulations 2026 — deadline 31 Mar 2027"
      h1="The compliance deadline is real. The paperwork doesn't have to be manual."
      subhead="CPD hours and PI insurance record-keeping are now mandated. ImmiStack tracks both against the same matter record everything else lives in."
      primaryPosition="compliance-hero"
    />

    <section className="wrap pb-16 lg:pb-20">
      <CapabilityTable rows={CAPABILITIES} />
    </section>

    <section className="wrap pb-16 lg:pb-20">
      <p style={{ fontWeight: 600, color: 'var(--s-ink)' }}>
        {/* claims-ok: explicit negative disclosure — no such regulatory approval exists for software */}
        OMARA does not approve software.
      </p>
      <p>
        {/* claims-ok: explicit negative disclosure — no such regulatory approval exists for software */}
        No case-management tool — ImmiStack included — holds an OMARA approval, because the
        category doesn't exist. What ImmiStack does hold: a per-subclass checklist that resolves
        from the same config pack the Migration Agents Regulations 2026 changes will update, and
        an audit log that doesn't depend on anyone remembering to file something.
      </p>
      <p style={{ fontWeight: 600, color: 'var(--s-ink)' }}>The alert isn't the sign-off.</p>
      <p>
        A visa-expiry alert is computed from pack rules. No firm should rely on a deadline this
        product computes until a registered practitioner has checked it. ImmiStack states this on
        the alert itself, not only in this paragraph.
      </p>
    </section>

    <section className="wrap pb-16 lg:pb-20">
      <h2 style={{ marginTop: 0 }}>Questions</h2>
      <ObjectionAccordion items={COMPLIANCE_FAQ} />
    </section>

    <BookCall heading="See the checklist against the 2026 changes." />
  </div>
);
