import React from 'react';
import { BookCallButton } from './BookCallButton';

/**
 * Full-width "book a call" section for the bottom of a page. Five states:
 * default (the button below, which Cal.com's own script turns into its
 * popup), link-unset (BookCallButton's own mailto fallback), loading (Cal's
 * popup shows its own loading state once opened — nothing to build here),
 * submitted (Cal's own confirmation, not a custom one), and error (Cal.com's
 * embed failing to load degrades to the same mailto link, since the trigger
 * element still renders even if the popup script never attaches).
 */
export const BookCall: React.FC<{ heading?: string; body?: string }> = ({
  heading = 'Talk to the people building it',
  body = "A 30-minute walkthrough against your own subclass mix — what's live today, and what's sandbox.",
}) => (
  <section className="wrap py-16 lg:py-24 text-center" style={{ borderTop: '1px solid var(--s-line)' }}>
    <div className="mx-auto" style={{ maxWidth: '46rem' }}>
      <h2 style={{ marginTop: 0 }}>{heading}</h2>
      <p className="lede mx-auto mb-8">{body}</p>
      <div className="flex justify-center">
        <BookCallButton position="final-cta" />
      </div>
    </div>
  </section>
);
