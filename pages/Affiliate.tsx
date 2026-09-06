import React from 'react';
import { AffiliateForm } from '../components/AffiliateForm';

/**
 * No commission figure appears anywhere on this page —
 * `[NEEDS DATA: commission structure/terms]`, per Theo's copy. RUTH: the
 * literal bracket placeholder was shipping to production (H1, subhead, meta
 * description) instead of staying in the internal brief — fixed to an honest,
 * non-broken-looking sentence that still commits to no invented figure. This
 * page's own form is the conversion action; no secondary CTA is needed.
 */
export const Affiliate: React.FC = () => (
  <div>
    <section className="wrap pt-10 pb-10 lg:pt-16 lg:pb-12">
      <h1 className="reveal-1" style={{ marginTop: 0 }}>
        Refer a firm to ImmiStack.
      </h1>
      <p className="lede reveal-2">
        Tell us about the firm below and we'll follow up directly with commission and payout terms — nothing's published on this page yet.
      </p>
    </section>

    <section className="wrap pb-16 lg:pb-20" style={{ maxWidth: '32rem' }}>
      <AffiliateForm />
    </section>
  </div>
);
