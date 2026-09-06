import React from 'react';
import { BookCallButton } from '../components/BookCallButton';
import { CONTACT_EMAIL } from '../seo/site';


const CLAIMS = [
  {
    title: 'Row-level tenant isolation.',
    body: "Postgres row-level security with FORCE on every tenant table, a non-BYPASSRLS application role, verified over HTTP with real tenants. Boot refuses to start if the runtime role holds BYPASSRLS.",
  },
  {
    title: 'Hash-chained, append-only audit log.',
    body: 'Enforced by database triggers, not application code — not something a compromised API can quietly rewrite.',
  },
  {
    title: "A screening engine that won't bluff.",
    body: "It refuses to escalate on noise, and refuses to report 'no hits' when sanctions lists aren't loaded.",
  },
  {
    title: 'Regulator responses carry their own provenance.',
    body: 'Sandbox flag, adapter, request ID and timestamp, on every response.',
  },
  {
    title: 'AI answers are suppressed, not shown uncited.',
    body: "If the assistant can't cite what it's answering from, it says so instead of guessing.",
  },
];

export const Security: React.FC<{ onOpenWaitlist?: () => void }> = () => (
  <div>
    <section className="wrap pt-10 pb-10 lg:pt-16 lg:pb-12">
      <h1 className="reveal-1" style={{ marginTop: 0 }}>Five things that are true, stated exactly. Nothing rounded up.</h1>
    </section>

    <section className="wrap pb-16 lg:pb-20">
      <div className="t-wrap" role="region" aria-label="Permitted security claims" tabIndex={0}>
        <table className="dt">
          <thead>
            <tr>
              <th scope="col">Claim</th>
              <th scope="col">Mechanism</th>
            </tr>
          </thead>
          <tbody>
            {CLAIMS.map((c) => (
              <tr key={c.title}>
                <th scope="row">{c.title}</th>
                <td>{c.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section className="wrap pb-16 lg:pb-20">
      <h2 style={{ marginTop: 0 }}>What is not true yet — stated as plainly as what is</h2>
      {/* claims-ok: explicit negative disclosure — no certification exists */}
      <p>No SOC 2. No ISO 27001. No certification of any kind exists for this product today.</p>
      <p>
        Sandbox integrations for eight regulators, production wiring pending accreditation — AU,
        CA, UK, NZ, UAE, SA, QA, BH. Going live is a licensing step, not a code change, and no date
        is promised for it.
      </p>
      <p>
        The vertical-database split (a separate database per vertical) is designed, not routed —
        all tenant data sits in one control-plane database today, protected by row-level security
        alone. There is no "choice of residency" to select.
      </p>
      <p>
        The acceptance record is not an e-signature. ImmiStack records assent, not a signature —
        every acceptance carries <code>isSignature: false</code>, by design.
      </p>
    </section>

    <section className="wrap py-16 lg:py-20 text-center" style={{ borderTop: '1px solid var(--s-line)' }}>
      <h2 style={{ marginTop: 0 }}>Ask us what we haven't answered here.</h2>
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        <BookCallButton position="security-cta" />
        <a href={`mailto:${CONTACT_EMAIL}?subject=Security%20review`} className="btn btn-secondary">
          {CONTACT_EMAIL}
        </a>
      </div>
    </section>
  </div>
);
