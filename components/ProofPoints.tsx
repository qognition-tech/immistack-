import React from 'react';
import { Database, Link2, ShieldAlert, FileSearch, Quote, FolderPlus, FlaskConical } from 'lucide-react';

/**
 * Engineering guarantees we can actually stand behind. Each line maps to a
 * verified behaviour of the platform; nothing here is aspirational. This
 * section replaced a block of fabricated customer testimonials.
 */
const POINTS = [
  {
    icon: Database,
    title: 'Tenant isolation enforced by the database',
    body:
      'Every table runs Postgres row-level security with FORCE, and the application connects as a role without BYPASSRLS. Isolation is verified over HTTP in the test suite, not assumed.',
  },
  {
    icon: Link2,
    title: 'Hash-chained, append-only audit log',
    body:
      'Audit entries are written by database triggers and chained by hash, so a record cannot be edited or deleted after the fact — not even by the application.',
  },
  {
    icon: ShieldAlert,
    title: 'Screening that refuses to bluff',
    body:
      'If sanctions or watch lists are not loaded, screening reports "lists not loaded" and blocks the run. It never returns "no hits" on an empty list.',
  },
  {
    icon: FileSearch,
    title: 'Provenance on every regulator response',
    body:
      'Each response carries the adapter, regulator, request id, timestamp and a sandbox flag, so a sandbox result can never be mistaken for live regulator data.',
  },
  {
    icon: Quote,
    title: 'Citations or silence',
    body:
      'AI answers about regulation must cite official sources. An uncited answer is suppressed rather than shown.',
  },
  {
    icon: FolderPlus,
    title: 'Adding a country is a JSON file',
    body:
      'Regulators, locales, thresholds and country workflows live in a config overlay — no new backend for a new jurisdiction.',
  },
];

export const ProofPoints: React.FC = () => (
  <section className="py-16 sm:py-20 lg:py-24 bg-navy relative overflow-hidden" aria-labelledby="proof-heading">
    <div className="absolute top-0 right-0 w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[600px] lg:h-[600px] max-w-full bg-techBlue/5 rounded-full blur-[100px]" aria-hidden="true"></div>
    <div className="absolute bottom-0 left-0 w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[600px] lg:h-[600px] max-w-full bg-gold/5 rounded-full blur-[100px]" aria-hidden="true"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-10 sm:mb-14 lg:mb-16">
        <h2 id="proof-heading" className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-6">
          What we can <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold">prove.</span>
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto">
          Immistack is in early access. We do not publish testimonials or certifications we do not have. These are the
          guarantees built into the platform today.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {POINTS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 lg:p-7 hover:bg-white/10 hover:border-gold/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
              <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 sm:mt-10 flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 sm:p-5 text-sm text-amber-100">
        <FlaskConical className="h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
        <p>
          <strong className="text-amber-200">Integration status:</strong> sandbox integrations for eight regulators — AU
          Department of Home Affairs, Canada IRCC, UK Home Office, Immigration New Zealand and four central banks —
          with production wiring pending accreditation. Nothing on this site is live regulator data.
        </p>
      </div>
    </div>
  </section>
);
