import React from 'react';

/**
 * Verbatim from Theo's copy (scratchpad/reports/theo-immistack-site-copy.md,
 * "TERMS" section, appended after Ruth's change log). Scope: use of the
 * marketing site and the early-access/waitlist program only — the ImmiStack
 * product itself is governed by a separate customer agreement entered at
 * onboarding, stated explicitly in §1 rather than conflated with this page.
 *
 * Every `[NEEDS DATA: …]` below is left exactly as Theo wrote it — an
 * unfilled token is a build failure by design (scripts/check-placeholders.mjs),
 * not a display bug, and only the operator resolves them.
 */
export const Terms: React.FC = () => (
  <div className="wrap py-16" style={{ maxWidth: '68ch' }}>
    <h1 style={{ marginTop: 0 }}>ImmiStack Terms of Service — marketing site and early-access program</h1>
    <p className="text-sm mb-8" style={{ color: 'var(--s-muted)' }}>
      Effective date: [NEEDS DATA: effective date]
    </p>

    <h2>1. What these terms cover</h2>
    <p>
      These terms apply to your use of <code>immistack.com</code> (the "site") and to the
      ImmiStack early-access / waitlist program you may join through it.{' '}
      <strong>They do not cover the ImmiStack product.</strong> If you become an ImmiStack
      customer, your use of the product is governed by a separate customer agreement you enter
      into at onboarding — ask us for a copy before you sign up if you want to read it first.
    </p>
    <p>
      By using the site or submitting a form on it, you agree to these terms. If you don't agree,
      don't use the site.
    </p>

    <h2>2. Who we are</h2>
    <p>
      [NEEDS DATA: legal entity name] (ABN [NEEDS DATA: ABN]), registered address [NEEDS DATA:
      registered business address], trading as ImmiStack ("we", "us").
    </p>

    <h2>3. The early-access program</h2>
    <p>
      Joining the early-access waitlist, or booking a walkthrough, is an expression of interest —
      it is <strong>not</strong> a contract for us to provide the ImmiStack product, and it
      doesn't guarantee you a place, a particular price, or a particular start date. Pricing shown
      on the site is subject to change until it's confirmed in a signed customer agreement.
    </p>

    <h2>4. Acceptable use</h2>
    <p>You agree not to:</p>
    <ul>
      <li>submit a form with information you know to be false;</li>
      <li>attempt to access another visitor's or another firm's data through the site;</li>
      <li>
        interfere with the site's operation (including its forms, booking embed, or hosting
        infrastructure);
      </li>
      <li>use the site to send unsolicited commercial communications to us.</li>
    </ul>

    <h2>5. Third-party services on this site</h2>
    <p>
      Booking a walkthrough uses Cal.com's embedded scheduler. Submitting a form sends your
      details to Twenty CRM (and, for 90 days, a Upstash Redis cache) and triggers email through
      Resend. Each of those providers has its own terms; ours don't override theirs, and using
      our site doesn't make us a party to your relationship with them.
    </p>

    <h2>6. Intellectual property</h2>
    <p>
      The site's content — text, design, the ImmiStack name and logo — belongs to [NEEDS DATA:
      legal entity name] or its licensors. Nothing in these terms gives you a licence to reproduce
      it beyond ordinary browser viewing and sharing a link.
    </p>

    <h2>7. No warranty beyond what the law requires</h2>
    <p>
      We provide the site on an <strong>available basis</strong> — we don't promise it will be
      uninterrupted or error-free, and we may change or withdraw any part of it at any time.
    </p>
    <p>
      <strong>
        This does not exclude, restrict or modify any guarantee, right or remedy you have under
        the Australian Consumer Law (ACL) or any other law that cannot lawfully be excluded.
      </strong>{' '}
      Where our services are subject to a guarantee under the ACL, nothing in these terms limits
      your rights under it. Where the law permits us to limit our liability, our liability for a
      failure to comply with a consumer guarantee is limited, at our option, to resupplying the
      services or paying the cost of having them resupplied.
    </p>
    <p>
      To the extent the law allows, we aren't liable for indirect or consequential loss arising
      from your use of the site. Nothing in this clause limits liability that cannot be limited by
      law.
    </p>

    <h2>8. Changes to these terms</h2>
    <p>
      We may update these terms; the effective date at the top will change when we do. Continuing
      to use the site after an update means you accept the new terms.
    </p>

    <h2>9. Governing law</h2>
    <p>
      These terms are governed by the law of [NEEDS DATA: governing state/territory of
      Australia], and you submit to the non-exclusive jurisdiction of its courts.
    </p>

    <h2>10. Contact</h2>
    <p>
      [NEEDS DATA: legal entity name]
      <br />
      [NEEDS DATA: registered business address]
      <br />
      [NEEDS DATA: contact email for legal/terms enquiries]
    </p>
  </div>
);
