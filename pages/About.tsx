import React from 'react';
import { DatabaseZap, FileLock2, Globe2, ListChecks } from 'lucide-react';

/**
 * About.
 *
 * Every claim on this page has to survive a buyer checking it. The previous
 * version asserted a partner count, a processed-visa count and an office
 * count as hardcoded literals with no data source behind any of them — in a
 * market of roughly 5,000 registered agents who all know each other. They are
 * gone. What replaces them is the architecture, which is true today and
 * verifiable in the product. See scripts/check-claims.mjs for the guard.
 */

const PILLARS = [
  {
    icon: DatabaseZap,
    title: 'Isolation enforced by the database',
    body:
      'Every tenant-scoped table runs Postgres row-level security with ENABLE and FORCE. The application connects as a role that does not hold BYPASSRLS, so it cannot read across a firm boundary even when the code asks it to. We test it the way an attacker would — cross-tenant, over HTTP.',
  },
  {
    icon: FileLock2,
    title: 'An audit log that cannot be rewritten',
    body:
      'The audit trail is append-only and hash-chained, so a deleted or altered entry breaks the chain and shows. Any cross-tenant access writes a CRITICAL entry before the work happens — and if the audit write fails, the work does not happen.',
  },
  {
    icon: ListChecks,
    title: 'Checklists that come from a versioned pack',
    body:
      'Document requirements resolve per visa subclass from a versioned configuration pack, not from a list typed into the code. When the requirement changes, you can still see which version a matter was assessed against.',
  },
  {
    icon: Globe2,
    title: 'Four jurisdictions, one codebase',
    body:
      'Australia, Canada, the United Kingdom and New Zealand are configuration, not forks. A local rule change ships as a pack version, so a firm working across borders is working in one system rather than four.',
  },
];

export const About: React.FC = () => {
  return (
    <div className="pt-24 pb-24 bg-white animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 sm:mb-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-navy mb-6 sm:mb-8 leading-tight">
          The infrastructure layer for <br className="hidden sm:block" />
          <span className="text-gold-gradient">Global Mobility.</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
          Immigration practice runs on records that have to hold up years later — who was told what,
          which document was asked for, when it expired, and who could see it. Immistack is being built
          to hold those records properly, so the evidence exists without anyone having to remember to
          create it.
        </p>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wide text-goldDark">
          In private beta with founding firms
        </p>
      </div>

      {/* What is actually true about the platform */}
      <div className="bg-slate py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-navy mb-4">
              What we can show you today
            </h2>
            <p className="text-gray-600">
              Not a customer count. The parts of the system a compliance reviewer would actually ask about.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {PILLARS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm text-left h-full"
              >
                <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="h-6 w-6 text-navy" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-navy mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8 sm:mt-10 max-w-2xl mx-auto">
            Regulator integrations are sandbox today, with production wiring pending accreditation —{' '}
            <a href="/security" className="text-navy font-bold underline underline-offset-2 hover:text-goldDark">
              the full security posture is here
            </a>
            , including what we do not have.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute top-0 left-0 w-full h-full bg-gold/10 rounded-2xl transform -translate-x-3 -translate-y-3 sm:-translate-x-4 sm:-translate-y-4"></div>
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
              alt="Migration practitioners and technologists reviewing a case workflow together"
              loading="lazy"
              width={1632}
              height={1088}
              className="rounded-2xl shadow-xl relative z-10 w-full max-w-full h-auto"
            />
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-navy mb-6">Our Mission</h3>
            <p className="text-gray-600 mb-6 text-base sm:text-lg">
              To make the administrative half of migration work disappear, so the people who do it can
              spend their time on advice rather than on chasing paper.
            </p>
            <p className="text-gray-600 text-base sm:text-lg">
              Immigration is one of the few areas where a filing error changes someone's life. We would
              rather be the boring, well-audited system underneath that than the one with the most
              impressive numbers on its About page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
