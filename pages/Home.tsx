import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, GraduationCap, Building2, CheckCircle2 } from 'lucide-react';
import { BookCallButton } from '../components/BookCallButton';
import { DashboardMock } from '../components/DashboardMock';
import { TrustedBy } from '../components/TrustedBy';
import { FeatureSection } from '../components/FeatureSection';
import {
  WorkflowEditorIllustration,
  DocumentChecklistIllustration,
  PaymentsIllustration,
  ClientPortalIllustration,
  AnalyticsBand,
} from '../components/FeatureIllustrations';
import { ComparisonTable } from '../components/ComparisonTable';
import { ObjectionAccordion } from '../components/ObjectionAccordion';

const HOME_FAQ = [
  {
    question: "We're already on Migration Manager. Why switch?",
    answer:
      "Migration Manager charges per licence, adds an A$900 setup fee and locks firms into 12-, 24- or 36-month terms. ImmiStack has no setup fee and no lock-in. We'll export your Migration Manager data at no charge when you switch.",
  },
  {
    question: 'LodgeHQ is A$99 a month. Why does ImmiStack cost more?',
    answer:
      "ImmiStack prices per registered agent, with staff and clients unlimited and free — and it costs more than LodgeHQ's headline rate. The difference buys row-level tenant isolation, a hash-chained audit log, and a screening engine that won't report 'clean' when its lists are empty. See the security page for what that means in practice.",
  },
  {
    // claims-ok: explicit negative disclosure — no such regulatory approval category exists
    question: 'Is ImmiStack OMARA-approved software?',
    // claims-ok: explicit negative disclosure — no such regulatory approval category exists
    answer: "There's no such approval category. OMARA's remit doesn't cover case-management software, and no vendor in this category holds any OMARA approval for their product.",
  },
  {
    question: 'Can ImmiStack lodge to ImmiAccount for me?',
    answer:
      'No. No government publishes a lodgement API — ImmiAccount is a human portal, and agents lodge by hand. ImmiStack prepares the file: the subclass checklist, the client\'s document status and their payment position. You still lodge yourself.',
  },
];

interface HomeProps {
  onOpenWaitlist: () => void;
}

/**
 * Home — reskinned to the operator's product-led direction (2026-09-06):
 * the live site's dashboard-mock hero and illustrated alternating feature
 * sections, with the honest copy, real prices and honesty gates from the
 * rebuild underneath. See scratchpad/reports/mira-reskin-*.png.
 */
export const Home: React.FC<HomeProps> = ({ onOpenWaitlist }) => {
  return (
    <div>
      {/* HERO */}
      <section className="pt-10 pb-14 lg:pt-16 lg:pb-20" style={{ borderBottom: '1px solid var(--s-line)' }}>
        <div className="wrap">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 w-full min-w-0" style={{ maxWidth: '36rem' }}>
              <span className="eyebrow-pill reveal-1">
                <span className="eyebrow-dot" aria-hidden="true" />
                Config-pack checklists: one per visa subclass
              </span>

              <h1 className="h-hero-sans reveal-2" style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
                The system of record{' '}
                <span style={{ color: 'var(--s-accent)' }}>your compliance audit is missing.</span>
              </h1>

              <p className="lede reveal-3" style={{ maxWidth: '52ch' }}>
                Leads, clients, visa matters, documents, payments and compliance in one place, with a per-subclass
                checklist that never asks for a document a subclass doesn't require.
              </p>

              <div className="flex flex-wrap gap-3 reveal-4" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <BookCallButton position="hero" />
                <a href="#capability" className="btn btn-secondary">See the checklist</a>
              </div>

              <div className="flex flex-wrap gap-3 reveal-4" style={{ marginBottom: '1.5rem' }}>
                <span className="audience-chip"><Scale className="h-4 w-4" style={{ color: 'var(--s-accent)' }} aria-hidden="true" /> Migration agents</span>
                <span className="audience-chip"><GraduationCap className="h-4 w-4" style={{ color: 'var(--s-accent)' }} aria-hidden="true" /> Education</span>
                <span className="audience-chip"><Building2 className="h-4 w-4" style={{ color: 'var(--s-accent)' }} aria-hidden="true" /> Corporate</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-x-6 text-sm reveal-5" style={{ borderTop: '1px solid var(--s-line)', paddingTop: '1.25rem', color: 'var(--s-muted)' }}>
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: 'var(--s-success)' }} aria-hidden="true" /> Row-level security enforced by Postgres</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: 'var(--s-success)' }} aria-hidden="true" /> Hash-chained audit log</span>
              </div>
            </div>

            <div className="flex-1 w-full min-w-0 reveal-5">
              <DashboardMock />
            </div>
          </div>
        </div>
      </section>

      <TrustedBy />

      <FeatureSection
        eyebrow="Intake and CRM"
        title="Capture a lead once. Never re-type it into a matter."
        body="A lead converts into a matter on the same record — the same file, the same history, no second data entry."
        bullets={['One record, not two: converting a lead never creates a second file to keep in sync.', 'The subclass checklist attaches the moment a matter exists, not after a staff member builds one by hand.']}
        illustration={<WorkflowEditorIllustration />}
      />

      <FeatureSection
        id="capability"
        eyebrow="Per-subclass checklists"
        title="One checklist per subclass, not one checklist for everyone."
        body="The checklist a client sees resolves from a versioned config pack matched to their subclass — a document marked not required for that subclass never appears as a task."
        illustration={<DocumentChecklistIllustration />}
        reverse
      />

      <FeatureSection
        eyebrow="Billing"
        title="An unpaid invoice blocks the next stage on its own."
        body="Payment-gated workflow means nobody has to remember to chase a client before the file moves. It's core behaviour, included at every tier — not a paid upsell."
        illustration={<PaymentsIllustration />}
      />

      <FeatureSection
        eyebrow="Client portal"
        title="Your client sees their matter. Nothing else."
        body="Document status, checklist progress and a message thread — scoped to the one matter that's theirs."
        illustration={<ClientPortalIllustration />}
        reverse
      />

      <AnalyticsBand />

      <ComparisonTable primaryPosition="comparison" />

      <section className="wrap py-16 lg:py-20">
        <h2 style={{ marginTop: 0 }}>Objections we hear</h2>
        <ObjectionAccordion items={HOME_FAQ} />
      </section>

      <section className="py-16 lg:py-20" style={{ background: 'var(--s-soft)', borderTop: '1px solid var(--s-line)' }}>
        <div className="wrap">
          <h2 style={{ marginTop: 0 }}>Three tiers, priced per registered agent</h2>
          <p className="lede mb-4">
            Staff and clients are unlimited and free in every tier. Pay for registered agents, not for the paralegal who does the filing.
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="tag t-neutral">A$155 / registered agent / month ex GST</span>
            <span className="tag t-neutral">A$251</span>
            <span className="tag t-neutral">A$383</span>
          </div>
          <p className="text-sm mb-4" style={{ color: 'var(--s-muted)' }}>
            Billed monthly. Annual billing gets two months free — see pricing for the annual rate.
          </p>
          <Link to="/pricing" className="btn btn-secondary">See what's in each tier</Link>
        </div>
      </section>

      <section className="wrap py-16 lg:py-20 text-center" style={{ borderTop: '1px solid var(--s-line)' }}>
        <div className="mx-auto" style={{ maxWidth: '46rem' }}>
          <h2 style={{ marginTop: 0 }}>See your own first matter in the walkthrough, not a demo tenant.</h2>
          <p className="lede mx-auto mb-2">No credit card. No self-serve trial yet — every walkthrough is run by a person.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <BookCallButton position="final-cta" />
            <button type="button" onClick={onOpenWaitlist} className="btn btn-secondary">
              Join early access
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
