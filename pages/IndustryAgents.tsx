import React from 'react';
import { Hero } from '../components/Hero';
import { BookCall } from '../components/BookCall';

const PAIN_POINTS = [
  {
    title: 'No audit trail across five tools.',
    pain: "A firm's client file lives in an inbox, a shared drive and a CRM that don't talk to each other — nothing shows who saw what, when.",
    how: 'One record per matter. Every status change, document upload and payment sits in a hash-chained, append-only audit log, not four separate histories.',
  },
  {
    title: 'Chasing documents a subclass never required.',
    pain: 'A generic checklist asks every client for every document, subclass or not — hours spent chasing paperwork nobody needed.',
    how: "The checklist resolves from a versioned config pack per subclass. A document marked 'not required' for this subclass is never asked for.",
  },
  {
    title: 'Payment follow-up by hand.',
    pain: 'Chasing an unpaid invoice before the next filing step is a manual task somebody has to remember.',
    how: "Stage progression is payment-gated — a matter can't move to the next stage while an invoice attached to it is unpaid. Nobody has to remember to check.",
  },
];

/** The money page — absorbs most of /features' internal-link equity per Nadia. */
export const IndustryAgents: React.FC = () => (
  <div>
    <Hero
      eyebrow="For registered migration agents (MARN holders)"
      h1="Run a 1–10 person practice on one record, not five tools."
      subhead="HubSpot for leads, PandaDoc for engagement letters, Drive for documents, email for the rest — and no audit trail connecting any of it. ImmiStack is the one record."
      primaryPosition="agents-hero"
    />

    <section className="wrap pb-16 lg:pb-20">
      {PAIN_POINTS.map((p) => (
        <div key={p.title} className="mb-10">
          <h2>{p.title}</h2>
          <p><em>Pain:</em> {p.pain}</p>
          <p><em>How ImmiStack addresses it:</em> {p.how}</p>
        </div>
      ))}
    </section>

    <BookCall heading="See it against your own subclass mix." />
  </div>
);
