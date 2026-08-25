import React from 'react';
import {
  ShieldCheck,
  DatabaseZap,
  FileLock2,
  Lock,
  FlaskConical,
  CreditCard,
  AlertTriangle,
  Mail,
} from 'lucide-react';
import { Button } from '../components/Button';

/**
 * /security — the first URL a compliance buyer tries. It used to 404.
 *
 * Rules for this page: every statement is something the product can be shown
 * doing, and the things we do NOT have are stated here rather than left for
 * the buyer to discover in week six of a pilot. Do not add a certification,
 * an attestation or a live regulator connection to this page. All eight
 * regulator adapters are sandbox.
 */

interface SecurityProps {
  onOpenWaitlist?: () => void;
}

const CONTROLS = [
  {
    icon: DatabaseZap,
    heading: 'Tenant isolation, enforced by the database',
    points: [
      'Every tenant-scoped table has Postgres row-level security switched on with both ENABLE and FORCE, so the policy applies to the table owner as well as to ordinary callers.',
      'The application connects as a dedicated role that does not hold BYPASSRLS. A query that tries to read across a firm boundary returns nothing, whatever the application code intended.',
      'The tenant identity is bound to the same pooled connection that runs the query. If it cannot be set, the connection is released and the request fails rather than proceeding unscoped.',
      'Isolation is verified the way an attacker would test it — one firm’s credentials pointed at another firm’s records, over HTTP, against a running system.',
    ],
  },
  {
    icon: FileLock2,
    heading: 'An audit log that cannot be quietly rewritten',
    points: [
      'The audit log is append-only, enforced by database triggers rather than by application code that could be bypassed.',
      'Entries are hash-chained: altering or removing one breaks the chain, and the break is visible.',
      'Any cross-tenant access by platform staff writes a CRITICAL entry before the work begins.',
      'That write is fail-closed. If the audit entry cannot be recorded, the access does not happen — there is no path that performs the work and skips the record.',
    ],
  },
  {
    icon: Lock,
    heading: 'How your data is handled',
    points: [
      'TLS for all data in transit, between your browser and the platform and between the platform and its own services.',
      'AES-256 encryption at rest for the database and for stored documents.',
      'Per-tenant row-level isolation at the storage layer, not merely a tenant column that the application promises to filter on.',
      'Document and file access is decided by a single access-control service shared by every read path. A document you may not read returns "not found" rather than "forbidden", so the existence of another client’s file is not disclosed.',
    ],
  },
];

export const Security: React.FC<SecurityProps> = ({ onOpenWaitlist }) => {
  return (
    <div className="pt-24 pb-24 animate-fade-in bg-slate">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 sm:mb-20">
        <div className="bg-navy rounded-3xl p-6 sm:p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-growth/10 rounded-full blur-[100px]"></div>
          <div className="relative z-10 max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-growth/10 border border-growth/20 mb-6">
              <ShieldCheck className="h-4 w-4 text-growth" />
              <span className="text-xs font-bold uppercase tracking-wide text-growth">Security &amp; Trust</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
              Security you can check, <br className="hidden sm:block" />not security you have to believe.
            </h1>
            <p className="text-base sm:text-xl text-slate-300 leading-relaxed">
              Immistack holds passports, police checks, medical records and the correspondence that
              decides whether someone can stay in a country. This page states what protects that data,
              and what does not exist yet. Both halves matter when you are the one signing.
            </p>
          </div>
        </div>
      </div>

      {/* The honesty block, first — before anything that reads like a boast */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 sm:mb-20">
        <div className="bg-white border-l-4 border-gold rounded-2xl shadow-sm p-6 sm:p-8 md:p-10">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-12 h-12 shrink-0 bg-gold/10 rounded-xl flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-goldDark" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-navy mb-4">
                What we do not have
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {/* claims-ok: explicit negative disclosure — states we do NOT hold these, not a claim that we do */}
                Immistack holds no SOC 2 report and no ISO 27001 certification today. There is no
                independent audit to send you and no attestation letter behind this page. If a formal
                certification is a hard requirement in your procurement process, we do not meet it, and
                you should know that here rather than at the end of a pilot.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                What exists instead is architectural, and it is the part a certification would examine:
                isolation enforced by the database rather than by application code, an append-only
                hash-chained audit trail, and a fail-closed rule that no privileged access happens
                unless it can first be recorded. Those are described in full below and we will walk a
                reviewer through them.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Likewise, no regulator integration is live. Every one of them is sandbox. That is a
                licensing position, not a technical one, and we say so on every response the platform
                returns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 lg:space-y-8 mb-14 sm:mb-20">
        {CONTROLS.map(({ icon: Icon, heading, points }) => (
          <div
            key={heading}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 md:p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              <div className="md:col-span-1">
                <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="h-6 w-6 text-navy" />
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-navy leading-snug">
                  {heading}
                </h2>
              </div>
              <ul className="md:col-span-2 space-y-4">
                {points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"></span>
                    <span className="text-gray-600 text-sm sm:text-base leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Regulator integrations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 sm:mb-20">
        <div className="bg-navy rounded-3xl p-6 sm:p-8 md:p-12 text-white">
          <div className="flex flex-col sm:flex-row gap-5 mb-8">
            <div className="w-12 h-12 shrink-0 bg-white/10 rounded-xl flex items-center justify-center">
              <FlaskConical className="h-6 w-6 text-gold" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold mb-3">
                Regulator integrations are sandbox
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                All eight regulator adapters ship in sandbox mode. Production wiring is pending
                accreditation with each authority, which is a licensing process rather than an
                engineering one.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-bold text-white mb-2 text-sm uppercase tracking-wide">
                Sandbox unless proven otherwise
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                An adapter goes live only when a live mode is deliberately requested and real
                credentials are present. Either one alone leaves it in sandbox, on purpose: a missing
                credential can only ever mean "not licensed yet", and the safe reading of that is never
                to aim a real request at a government system.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-bold text-white mb-2 text-sm uppercase tracking-wide">
                Every response says where it came from
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Each regulator response carries provenance — a sandbox flag, the adapter, the authority,
                a request id, latency and the time it was retrieved. A sandbox result cannot be mistaken
                for a live one in the interface or in an export, and a failed lookup is returned as a
                failure rather than as an empty success.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card data */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 sm:mb-20">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 md:p-10">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-12 h-12 shrink-0 bg-growth/10 rounded-xl flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-growth" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-navy mb-3">
                Payment card data never touches us
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Immistack does not store, transmit or log a card number, a CVV or an expiry date.
                Nothing in the product accepts one. Firms record what a client has settled against a
                matter; the settlement itself happens outside the platform. There is no card field to
                leak, and no card record to subpoena.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-navy mb-4">
          Reviewing us for your firm?
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Send us your security questionnaire. We would rather answer "no, not yet" in writing than have
          you find it out later. Report a suspected vulnerability to the same address and we will
          acknowledge it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="mailto:hello@immistack.com?subject=Security%20review"
            className="inline-flex items-center gap-2 font-bold text-navy hover:text-goldDark transition-colors"
          >
            <Mail className="h-4 w-4" /> hello@immistack.com
          </a>
          {onOpenWaitlist && (
            <Button onClick={onOpenWaitlist} variant="gold" className="px-8 py-4">
              Join the Waitlist
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
