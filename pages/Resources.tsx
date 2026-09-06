import React from 'react';
import { Link } from 'react-router-dom';
import { ARTICLE_META, ARTICLE_SLUG } from '../seo/site';

/**
 * Blog hub. Per Nadia: "the only durable answer-engine asset on the site, if
 * it publishes original, dated, credentialed content" — and per Theo, this is
 * currently one demo article; the template is for the format, not a specific
 * new post. No fabricated stats, no invented author, no stock photography —
 * the previous build's three cards (fake refusal-rate percentage, fake case
 * study, unsplash stock photos) are gone.
 */
export const Resources: React.FC = () => (
  <div className="wrap py-16">
    <h1 style={{ marginTop: 0 }}>Guides for running a migration practice.</h1>
    <p className="lede mb-10">Compliance, case management and the regulations that changed this year.</p>

    <ul style={{ listStyle: 'none', padding: 0 }}>
      <li className="panel mb-4">
        {/* RUTH: byline was a literal '[NEEDS DATA: named, credentialed
            author]' bracket. No author exists yet — omit the attribution
            rather than fabricate one or leave a broken-looking placeholder. */}
        <p className="text-sm mb-1" style={{ color: 'var(--s-muted)' }}>
          <time dateTime="2026-09-05">5 September 2026</time>
        </p>
        <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>
          <Link to={`/blog/${ARTICLE_SLUG}`}>{ARTICLE_META.title.split('|')[0].trim()}</Link>
        </h2>
        <p className="mb-0">{ARTICLE_META.description}</p>
      </li>
    </ul>
  </div>
);
