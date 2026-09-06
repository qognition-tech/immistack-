import React from 'react';
import { PricingCards } from '../components/PricingCards';
import { ObjectionAccordion } from '../components/ObjectionAccordion';
import { BookCall } from '../components/BookCall';

const PRICING_FAQ = [
  {
    question: 'Is GST included in the price shown?',
    answer: 'No. Every price on this page is ex GST, stated on the same line.',
  },
  {
    question: 'Is there a minimum term?',
    answer: 'No. No setup fee, no lock-in, on any tier.',
  },
  {
    question: 'What do I get for choosing annual billing?',
    answer: 'Two months free, on any tier.',
  },
  {
    question: 'Are admin and paralegal staff billed as users?',
    answer: 'No. Only registered agents (MARN holders) are billed. Staff and clients are unlimited and free.',
  },
  {
    question: "I'm moving from Migration Manager. What does that cost?",
    // RUTH: was an unqualified "we'll export your data at no charge" promise,
    // shipped into FAQPage JSON-LD with no confirmed staffing or SLA behind
    // it (pricing memo: [NEEDS DATA: who performs migrations and within what
    // SLA]). Replaced with a true, unstaffed-safe answer.
    answer: "We haven't published a migration fee or timeline yet — ask in the walkthrough.",
  },
];

export const Pricing: React.FC = () => (
  <div>
    <section className="wrap pt-10 pb-14 lg:pt-16 lg:pb-16">
      <h1 className="reveal-1" style={{ marginTop: 0 }}>Pricing</h1>
      <p className="lede reveal-2">Per registered agent, per month, ex GST. Staff and clients are unlimited and free.</p>
    </section>

    <section className="wrap pb-16 lg:pb-20">
      <PricingCards />
    </section>

    <section className="wrap pb-16 lg:pb-20">
      <h2 style={{ marginTop: 0 }}>Questions</h2>
      <ObjectionAccordion items={PRICING_FAQ} />
    </section>

    <BookCall heading="Talk through your firm's own agent count." />
  </div>
);
