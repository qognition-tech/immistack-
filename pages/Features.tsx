import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { CapabilityTable } from '../components/CapabilityTable';
import { ObjectionAccordion } from '../components/ObjectionAccordion';
import { BookCall } from '../components/BookCall';
import type { CapabilityRow } from '../types';

const CAPABILITIES: CapabilityRow[] = [
  { capability: 'CRM, leads, intake', status: 'live', tier: 'Practice+', detail: 'One universal record type, no separate lead database' },
  { capability: 'Per-subclass document checklists', status: 'pack', tier: 'Practice+', detail: 'Adding a subclass or a country is a JSON file, not a rebuild' },
  { capability: 'Payment-gated workflow', status: 'live', tier: 'Practice+', detail: 'Core behaviour, not a paid upsell' },
  { capability: 'Client portal', status: 'live', tier: 'Practice+', detail: 'Client sees their own matter, documents and thread only' },
  { capability: 'Hash-chained audit log', status: 'live', tier: 'Practice+', detail: 'Always-on for every tenant, every tier' },
  { capability: 'Row-level tenant isolation', status: 'live', tier: 'Practice+', detail: 'RLS with FORCE, fails closed on boot' },
  { capability: 'Screening engine', status: 'live', tier: 'Practice+', detail: "Refuses 'no hits' on an empty list" },
  { capability: 'Regulator adapters (8 markets)', status: 'sandbox', tier: 'Practice+', detail: 'Sandbox integrations for eight regulators, production wiring pending accreditation' },
  { capability: 'AI assistant, citation-enforced', status: 'pack', tier: 'Practice Pro+', detail: 'Suppresses an answer rather than showing it uncited' },
  { capability: 'Analytics dashboards', status: 'live', tier: 'Practice Pro+' },
  { capability: 'Read API access', status: 'live', tier: 'Practice Pro+' },
  { capability: 'Full API access', status: 'live', tier: 'Firm' },
  { capability: 'Single sign-on (SSO)', status: 'live', tier: 'Firm' },
  { capability: 'White-label client portal', status: 'live', tier: 'Firm' },
  { capability: 'Visa expiry alerts', status: 'caution', tier: 'Practice+', detail: 'Computed from pack rules; needs practitioner sign-off before a firm relies on the date' },
];

const FEATURES_FAQ = [
  {
    question: 'Is the AI assistant always on?',
    answer: "It's part of the Practice Pro and Firm tiers. On Practice, it's not included.",
  },
  {
    question: 'Does the checklist cover every visa subclass?',
    answer: 'It covers whatever subclasses exist in the active config pack for your country. Adding a subclass is a pack update, not a platform rebuild.',
  },
  {
    question: 'Do the regulator adapters connect live to Home Affairs, IRCC or the Home Office?',
    answer: 'Not yet. Sandbox integrations for eight regulators, production wiring pending accreditation.',
  },
  {
    question: 'Can I export my data if I leave?',
    // RUTH: was a literal '[NEEDS DATA: ...]' bracket shipping into both the
    // visible accordion and the FAQPage JSON-LD — an internal brief note
    // leaking into a Google rich result, not a real answer. Replaced with an
    // honest sentence that names the same gap without looking broken.
    answer: "Not published yet — ask in the walkthrough and we'll tell you what's planned.",
  },
];

const DEEP_DIVES = [
  {
    title: 'Config-pack document checklists',
    lede: 'One checklist per subclass, not one checklist for everyone.',
    body: "The checklist a client sees resolves from a versioned config pack matched to their subclass — a document marked not required for that subclass never appears as a task. See it in detail on the compliance and CRM & intake pages.",
    links: [
      { to: '/compliance-vevo', label: 'Compliance' },
      { to: '/crm-intake', label: 'CRM & intake' },
    ],
  },
  {
    title: 'Task and matter workflow',
    lede: 'A blocked stage stays blocked, on purpose.',
    body: 'Progression from one matter stage to the next can be gated on a condition — an unpaid invoice, a missing document — enforced by the workflow engine itself, not left to memory.',
    links: [],
  },
  {
    title: 'Multi-office, and staff and admin portals',
    lede: 'One codebase, more than one office.',
    body: 'A firm running matters across more than one office or jurisdiction works from the same record set — no per-office export-and-reconcile. Staff and admin users get their own portal views, scoped to their role.',
    links: [],
  },
  {
    title: 'AI assistant, citation-enforced',
    lede: "An answer with no source doesn't ship.",
    body: "The assistant answers questions against a matter's own documents and the applicable config pack. If it can't cite what it's answering from, it says so instead of guessing.",
    links: [],
  },
];

export const Features: React.FC = () => (
  <div>
    <Hero
      eyebrow="Capability, not feature-soup"
      h1="Everything the platform does, in one honest table."
      subhead="Built for registered migration agents running a 1–10 person practice."
      primaryPosition="features-hero"
    />

    <section className="wrap pb-16 lg:pb-20">
      <CapabilityTable rows={CAPABILITIES} caption="Full capability table" />
    </section>

    <section className="wrap pb-16 lg:pb-20 grid sm:grid-cols-2 gap-6">
      {DEEP_DIVES.map((d) => (
        <div key={d.title} className="card p-6">
          <h2 style={{ marginTop: 0 }}>{d.title}</h2>
          <p style={{ fontWeight: 600, color: 'var(--s-ink)' }}>{d.lede}</p>
          <p>{d.body}</p>
          {d.links.length > 0 && (
            <p className="mb-0">
              {d.links.map((l, i) => (
                <React.Fragment key={l.to}>
                  {i > 0 && ' · '}
                  <Link to={l.to}>{l.label}</Link>
                </React.Fragment>
              ))}
            </p>
          )}
        </div>
      ))}
    </section>

    <section className="wrap pb-16 lg:pb-20">
      <h2 style={{ marginTop: 0 }}>Questions</h2>
      <ObjectionAccordion items={FEATURES_FAQ} />
    </section>

    <BookCall heading="Walk through your own subclass mix." />
  </div>
);
