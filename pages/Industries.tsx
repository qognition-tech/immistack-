import React from 'react';
import { Link } from 'react-router-dom';
import { BookCallButton } from '../components/BookCallButton';

const CARDS = [
  { title: 'Migration agents', body: 'Registered agents (MARN holders) running 1–10 person practices.', to: '/migration-agents', label: 'See the migration-agent page' },
  // RUTH: card bodies were literal '[NEEDS DATA: ...]' brackets — replaced
  // with an honest, non-broken-looking sentence. Still no invented pain point.
  { title: 'Education consultants', body: 'Built on the same config-pack platform as the migration-agent product.', to: '/education-consultants', label: 'See the education-consultant page' },
  { title: 'Corporate HR', body: 'Built on the same config-pack platform as the migration-agent product.', to: '/corporate-hr', label: 'See the corporate-HR page' },
];

export const Industries: React.FC = () => (
  <div>
    <section className="wrap pt-10 pb-14 lg:pt-16 lg:pb-16">
      <h1 className="reveal-1" style={{ marginTop: 0 }}>One platform. Three practice types.</h1>
      <p className="lede reveal-2">
        Migration agents, education consultants and corporate HR teams work from the same
        config-pack architecture, shaped to what each one actually does.
      </p>
    </section>

    <section className="wrap pb-16 lg:pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
      {CARDS.map((c) => (
        <div key={c.title} className="panel">
          <h2 style={{ marginTop: 0 }}>{c.title}</h2>
          <p style={{ color: c.body.startsWith('[NEEDS DATA') ? 'var(--s-muted)' : 'var(--s-body)' }}>{c.body}</p>
          <Link to={c.to} className="btn btn-secondary">{c.label}</Link>
        </div>
      ))}
    </section>

    <section className="wrap py-16 lg:py-20 text-center" style={{ borderTop: '1px solid var(--s-line)' }}>
      <h2 style={{ marginTop: 0 }}>Not sure which fits? Ask in the walkthrough.</h2>
      <div className="flex justify-center mt-6">
        <BookCallButton position="solutions-cta" />
      </div>
    </section>
  </div>
);
