import React from 'react';
import { Link } from 'react-router-dom';
import { BookCallButton } from '../components/BookCallButton';

/**
 * Gut and rebuild per Nadia — the four unbacked historical claims (a partner-
 * firm count, an aggregate visas-processed figure, a global-office count, and
 * an unnamed-practitioner credential claim) do not appear anywhere below, and
 * nothing invented replaces them.
 */
export const About: React.FC = () => (
  <div>
    <section className="wrap pt-10 pb-10 lg:pt-16 lg:pb-12">
      <h1 className="reveal-1" style={{ marginTop: 0 }}>What ImmiStack actually is.</h1>
      <p className="lede reveal-2">Immigration CRM and case management for registered migration agents.</p>
    </section>

    <section className="wrap pb-10 lg:pb-12">
      <p>
        ImmiStack is built on Meru, a shared regulatory-operations platform — the same core
        engine that runs ImmiStack also runs a separate banking-compliance product. Adding a
        country to ImmiStack is a config-pack update, not a platform rewrite.
      </p>
      {/* RUTH: the trailing '[NEEDS DATA: ...]' bracket was rendering as
          visible page copy after a sentence that's already complete and
          honest on its own. Removed the bracket; the sentence stands. */}
      <p>
        ImmiStack is in <strong>private beta with founding firms.</strong>
      </p>

      <h2>What does not appear on this page, and why</h2>
      <ul>
        {/* claims-ok: explicit negative disclosure — naming a removed, unbacked claim to say it does not appear */}
        <li>No "500+ Partner Firms" — unbacked, and roughly one in ten of every registered migration agent in Australia; no data source supports it.</li>
        {/* claims-ok: explicit negative disclosure — naming a removed, unbacked claim to say it does not appear */}
        <li>No "1M+ Visas Processed" — unbacked.</li>
        <li>No "4 Global Offices" — the historical page contradicted itself on the count.</li>
        <li>
          {/* claims-ok: explicit negative disclosure — naming a removed, unbacked claim to say it does not appear */}
          {/* RUTH: trailing '[NEEDS DATA: ...]' bracket removed — sentence stands alone. */}
          No "Built by migration lawyers for migration lawyers" — no named individual, no
          published MARN, behind this claim as it stood.
        </li>
      </ul>

      <h2>Regulator status</h2>
      <p>Sandbox integrations for eight regulators, production wiring pending accreditation.</p>

      <h2>Markets</h2>
      <p>Australia (primary), Canada, the United Kingdom and New Zealand.</p>
    </section>

    <section className="wrap py-16 lg:py-20 text-center" style={{ borderTop: '1px solid var(--s-line)' }}>
      <h2 style={{ marginTop: 0 }}>See what's actually built.</h2>
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        <BookCallButton position="about-cta" />
        <Link to="/security" className="btn btn-secondary">Read the security page</Link>
      </div>
    </section>
  </div>
);
