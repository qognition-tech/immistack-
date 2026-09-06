import React from 'react';

/**
 * Verbatim from Theo's copy (scratchpad/reports/theo-immistack-site-copy.md,
 * "PRIVACY POLICY" section, appended after Ruth's change log). Scope: the
 * marketing site (immistack.com) — lead-capture forms, Cal.com bookings,
 * cookies/analytics — and the sub-processors those flows use. Not the
 * product's own in-app privacy notice for a provisioned tenant's client data.
 *
 * Every `[NEEDS DATA: …]` below is left exactly as Theo wrote it — an
 * unfilled token is a build failure by design (scripts/check-placeholders.mjs),
 * not a display bug, and only the operator resolves them. Do not paraphrase
 * or remove one while "fixing" a failing build.
 *
 * Two rows the operator has ruled on already (kept, tokens intact regardless):
 * Supabase Storage stays in the sub-processor table — the operator confirmed
 * it is still live; the internal note about moving away from it is stale.
 * DeepSeek stays listed with its processing-region/legal-review token.
 */
export const Privacy: React.FC = () => (
  <div className="wrap py-16" style={{ maxWidth: '68ch' }}>
    <h1 style={{ marginTop: 0 }}>ImmiStack Privacy Policy</h1>
    <p className="text-sm mb-8" style={{ color: 'var(--s-muted)' }}>
      Effective date: [NEEDS DATA: effective date]
    </p>

    <h2>1. Who we are</h2>
    <p>
      This policy is issued by [NEEDS DATA: legal entity name] (ABN [NEEDS DATA: ABN]), trading
      as ImmiStack (<code>immistack.com</code>), registered address [NEEDS DATA: registered
      business address] ("ImmiStack", "we", "us"). We are bound by the Australian Privacy
      Principles (APPs) in Schedule 1 of the <em>Privacy Act 1988</em> (Cth) and manage personal
      information openly, as APP 1 requires — this policy is that open statement, and we review
      it whenever what we actually collect, use or disclose changes.
    </p>
    <p>
      Questions about this policy, or about how we handle personal information, go to our privacy
      officer: [NEEDS DATA: privacy officer contact — name and email].
    </p>

    <h2>2. What we collect, and how (APP 3, APP 5)</h2>
    <p>
      We collect personal information directly from you, at the point you give it to us. We do
      not buy personal information from a third party or infer it from other sources.
    </p>
    <div className="t-wrap" role="region" aria-label="What we collect" tabIndex={0}>
      <table className="dt">
        <thead>
          <tr>
            <th scope="col">Where</th>
            <th scope="col">What we collect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Lead-capture and waitlist forms on the marketing site</th>
            <td>Name, work email, firm name, phone number</td>
          </tr>
          <tr>
            <th scope="row">A Cal.com booking ("Book a 30-minute walkthrough")</th>
            <td>Name, email, phone number, and whatever booking notes you enter</td>
          </tr>
          <tr>
            <th scope="row">Browsing the marketing site, only if analytics is active (§6)</th>
            <td>Device and usage data via Google Analytics 4</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      We collect this at the time you submit a form or book a call — this notice is our APP 5
      collection notice, given at or as soon as practicable after that point. If a field is
      marked required and you don't provide it, we may not be able to respond to your enquiry or
      confirm a booking.
    </p>

    <h2>3. Why we collect it, and how we use it (APP 6)</h2>
    <p>We use the personal information above only to:</p>
    <ul>
      <li>respond to an enquiry you've raised through a form;</li>
      <li>confirm and prepare for a walkthrough you've booked;</li>
      <li>contact you about the ImmiStack early-access program, if you've asked to join it;</li>
      <li>
        understand, in aggregate, how the marketing site is used, if analytics is active (§6).
      </li>
    </ul>
    <p>We do not use it to make an automated decision that affects you, and we do not sell it.</p>

    <h2>4. Who we disclose personal information to</h2>
    <p>
      We use a small number of service providers ("sub-processors") to run the marketing site and
      the early-access program. Each is disclosed the minimum personal information needed to do
      its job, under a contract that requires it to protect that information at least as well as
      we do.
    </p>
    <div className="t-wrap" role="region" aria-label="Sub-processors" tabIndex={0}>
      <table className="dt">
        <thead>
          <tr>
            <th scope="col">Sub-processor</th>
            <th scope="col">What it does</th>
            <th scope="col">Personal information it receives</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Twenty CRM</th>
            <td>Stores and manages leads captured through marketing-site forms</td>
            <td>Name, email, firm name, phone</td>
          </tr>
          <tr>
            <th scope="row">Upstash (Redis)</th>
            <td>
              Short-term cache for form submissions, <strong>automatically deleted after 90 days</strong>
            </td>
            <td>Name, email, firm name, phone</td>
          </tr>
          <tr>
            <th scope="row">Cal.com</th>
            <td>Runs the walkthrough-booking calendar</td>
            <td>Name, email, phone, booking notes</td>
          </tr>
          <tr>
            <th scope="row">Resend</th>
            <td>Sends transactional and notification email (confirmations, walkthrough reminders)</td>
            <td>Name, email</td>
          </tr>
          <tr>
            <th scope="row">Vercel</th>
            <td>Hosts the marketing site itself</td>
            <td>Standard web request data (IP address, browser/device)</td>
          </tr>
          <tr>
            <th scope="row">Neon</th>
            <td>Hosts the ImmiStack product database</td>
            <td>Product-account data, once you're a customer — see §5</td>
          </tr>
          <tr>
            <th scope="row">Supabase Storage</th>
            <td>Object storage referenced in our sub-processor list</td>
            <td>
              [NEEDS DATA: confirm this is still a live sub-processor before publishing — internal
              engineering documentation records object storage moving away from Supabase; do not
              ship this row unresolved]
            </td>
          </tr>
          <tr>
            <th scope="row">DeepSeek</th>
            <td>Powers in-product AI features</td>
            <td>
              [NEEDS DATA: exactly what is sent to DeepSeek, and whether it includes any personal
              information from marketing-site leads at all, before this row ships]
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      Beyond this list, we disclose personal information only where the law requires it, or with
      your consent.
    </p>

    <h2>5. Sending personal information overseas (APP 8)</h2>
    <p>
      Some of the sub-processors above store or process personal information outside Australia.
      Before we disclose personal information to an overseas recipient, we take reasonable steps
      to satisfy ourselves it will be handled consistently with the APPs.
    </p>
    <p>
      <strong>Confirmed:</strong> the ImmiStack product database runs on Neon, hosted in{' '}
      <strong>Singapore (AWS ap-southeast-1)</strong>. If you become a customer, your firm's
      product data is stored there, not in Australia.
    </p>
    <p>
      <strong>Not yet confirmed — do not publish this section until each row is resolved:</strong>
    </p>
    <div className="t-wrap" role="region" aria-label="Overseas processing regions" tabIndex={0}>
      <table className="dt">
        <thead>
          <tr>
            <th scope="col">Sub-processor</th>
            <th scope="col">Country/region of processing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Vercel</th>
            <td>[NEEDS DATA: confirm processing region]</td>
          </tr>
          <tr>
            <th scope="row">Twenty CRM</th>
            <td>[NEEDS DATA: confirm processing region]</td>
          </tr>
          <tr>
            <th scope="row">Upstash</th>
            <td>[NEEDS DATA: confirm processing region]</td>
          </tr>
          <tr>
            <th scope="row">Cal.com</th>
            <td>[NEEDS DATA: confirm processing region]</td>
          </tr>
          <tr>
            <th scope="row">Resend</th>
            <td>[NEEDS DATA: confirm processing region]</td>
          </tr>
          <tr>
            <th scope="row">DeepSeek</th>
            <td>
              [NEEDS DATA: confirm processing region — flag for legal review specifically; if
              this is a China-domiciled processor, that is a materially different APP 8.1 risk
              profile than a US or EU one and may need its own disclosure and consent language,
              not the generic sentence above]
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>6. Cookies and analytics</h2>
    <p>
      We use Google Analytics 4, loaded through Google Tag Manager,{' '}
      <strong>only when the site is built with <code>VITE_GTM_ID</code> set.</strong> When it's
      not set, no analytics cookie is loaded and no usage data is sent to Google, for anyone.
    </p>
    <p>
      When it is active: GA4 sets cookies to distinguish returning visitors and measure which
      pages are read. You can opt out at any time using your browser's cookie controls, or the
      Google Analytics opt-out add-on.
    </p>
    <p>
      We do not use advertising cookies or run paid ad remarketing — <code>context.md</code>{' '}
      marks paid advertising as an inactive channel; there's nothing to track for it.
    </p>

    <h2>7. How long we keep it</h2>
    <div className="t-wrap" role="region" aria-label="Retention" tabIndex={0}>
      <table className="dt">
        <thead>
          <tr>
            <th scope="col">Data</th>
            <th scope="col">Retention</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Form submissions cached in Upstash Redis</th>
            <td>90 days, then automatically deleted</td>
          </tr>
          <tr>
            <th scope="row">Lead records in Twenty CRM</th>
            <td>
              [NEEDS DATA: retention/deletion policy — no automatic deletion period is confirmed
              for Twenty CRM records]
            </td>
          </tr>
          <tr>
            <th scope="row">Cal.com booking records</th>
            <td>[NEEDS DATA: retention/deletion policy]</td>
          </tr>
          <tr>
            <th scope="row">Product data (once you're a customer)</th>
            <td>Governed by your ImmiStack customer agreement, not this policy</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>8. Security (APP 11)</h2>
    <p>
      We take reasonable steps to protect the personal information we hold from misuse,
      interference, loss, unauthorised access, modification or disclosure. The product database
      itself runs on Postgres with row-level security enforced on every tenant table (
      <code>FORCE</code>, non-<code>BYPASSRLS</code> application role) — see <code>/security</code>{' '}
      for the full, exact description of what that means. This marketing-site policy does not
      restate that page; it exists so a firm considering ImmiStack can check the mechanism, not
      the adjective.
    </p>

    <h2>9. Access and correction (APP 12, APP 13)</h2>
    <p>
      You can ask us what personal information we hold about you, and ask us to correct it if
      it's wrong, by contacting our privacy officer ([NEEDS DATA: privacy officer contact]).
      We'll respond within a reasonable time — [NEEDS DATA: stated response-time commitment, e.g.
      30 days, if the operator wants one] — and we won't charge you to ask.
    </p>

    <h2>10. Complaints</h2>
    <p>
      If you think we've mishandled your personal information, tell us first, at [NEEDS DATA:
      privacy officer contact], so we can try to fix it directly.
    </p>
    <p>
      If you're not satisfied with our response, you can complain to the Office of the Australian
      Information Commissioner (OAIC): [NEEDS DATA: confirm current OAIC contact details before
      publishing — oaic.gov.au / 1300 363 992 as of this document's drafting, but verify currency
      rather than trust this draft].
    </p>

    <h2>11. Changes to this policy</h2>
    <p>
      We'll update this page when what we actually collect, use or disclose changes, and update
      the effective date at the top. We won't backdate a change that reduces your rights.
    </p>

    <h2>12. Contact</h2>
    <p>
      [NEEDS DATA: legal entity name]
      <br />
      [NEEDS DATA: registered business address]
      <br />
      [NEEDS DATA: privacy officer contact — name and email]
    </p>
  </div>
);
