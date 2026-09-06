import React from 'react';
import { BookCallButton } from '../components/BookCallButton';

/**
 * Template article for the one slug currently prerendered
 * (`seo/site.ts` ARTICLE_SLUG). No invented statistics, no fabricated quote,
 * no stock photography — the previous build's "reduces refusal rates by 30%"
 * and a made-up client quote are gone; nothing here claims a number this
 * product's own docs don't back.
 */
export const ResourceArticle: React.FC<{ onOpenWaitlist: () => void }> = () => (
  <div className="wrap py-16" style={{ maxWidth: '48rem' }}>
    <p className="kicker">Trend report</p>
    <h1 style={{ marginTop: 0 }}>The State of Immigration Tech 2026</h1>
    {/* RUTH: byline was a literal '[NEEDS DATA: named, credentialed author]'
        bracket. No author exists yet — omit the attribution rather than
        fabricate one or leave a broken-looking placeholder. */}
    <p className="text-sm mb-8" style={{ color: 'var(--s-muted)' }}>
      <time dateTime="2026-09-05">5 September 2026</time>
    </p>

    <p className="lede">
      AI tooling is being marketed hard into migration practices this year. What follows is what
      is real, what is hype, and what to check before you believe either.
    </p>

    <h2>The mechanism is plausible. The numbers usually aren't.</h2>
    <p>
      The most common pitch is fewer Request for Information notices, on the theory that an
      automated check catches a missing or unreadable document before lodgement rather than
      after. That mechanism is reasonable on its face. The specific percentages vendors attach to
      it are a different matter — treat any refusal-rate or time-saved figure in this market as a
      vendor claim until the vendor shows you the method behind it, ImmiStack's own included.
    </p>

    <h2>What a checklist can and can't tell you</h2>
    <p>
      A per-subclass document checklist can tell a client, correctly, which documents a subclass
      requires and which it does not — that's a fact about the config pack, not a prediction. It
      cannot tell you whether a case will be approved, and any tool that implies otherwise is
      selling a probability it hasn't measured.
    </p>

    <h2>What to ask a vendor before you believe a claim</h2>
    <p>
      Ask what the number is measured against, over what period, and whether it's been checked by
      anyone outside the vendor. If the answer is a demo rather than a method, the number is
      marketing, not data.
    </p>

    <div className="panel-soft mt-8 mb-8 text-center">
      <p className="mb-4">See what ImmiStack's checklist actually does, without a percentage attached to it.</p>
      <BookCallButton position="article-cta" />
    </div>
  </div>
);
