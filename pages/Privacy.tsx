import React from 'react';
import { ENTITY, SUB_PROCESSORS } from '../legal/entity';

/**
 * Privacy policy.
 *
 * Everything factual here is drawn from `legal/entity.ts` or from what this
 * codebase demonstrably does. Nothing is aspirational: the site collects a
 * name, email, firm and message through one form and writes them to Twenty,
 * and that is what this says. Claims about certifications, retention regimes
 * or controls that do not exist are exactly what `scripts/check-claims.mjs`
 * blocks elsewhere, and a privacy policy is the last place to start making
 * them.
 *
 * `scripts/check-legal.mjs` fails the build unless every operator-supplied
 * field is filled, so this page cannot ship naming a blank entity.
 */
export const Privacy: React.FC = () => {
  const updated = ENTITY.effectiveDate ?? '';
  return (
    <div className="pt-24 animate-fade-in bg-white">
      <div className="bg-navy py-16 text-center text-white">
        <h1 className="text-4xl font-heading font-bold mb-4">Privacy Policy</h1>
        <p className="text-slate-300">
          {updated ? `Effective ${updated}` : ''}
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 prose prose-slate">
        <h2>Who we are</h2>
        <p>
          This site is operated by {ENTITY.legalName} (ABN {ENTITY.abn}),
          registered at {ENTITY.registeredAddress}. We are an APP entity under
          the <em>Privacy Act 1988</em> (Cth) and handle personal information in
          accordance with the Australian Privacy Principles.
        </p>
        <p>
          Immistack is software for immigration practices. We are not a law
          firm and not a registered migration agent, and we do not give
          immigration assistance.
        </p>

        <h2>What we collect through this website</h2>
        <p>
          One thing: what you type into our enquiry form — your name, email
          address, firm name, and whatever you put in the message field — plus
          the fact and time of the submission. We do not run advertising
          trackers or third-party analytics on this site.
        </p>
        <p>
          Separately, firms who use the Immistack product store their own
          clients&rsquo; information in it. In that case the firm is the entity
          responsible for that information and we handle it on their
          instructions, under our agreement with them.
        </p>

        <h2>Why we collect it</h2>
        <p>
          To reply to your enquiry, to arrange a demonstration if you ask for
          one, and to keep a record of that correspondence. We do not sell
          personal information, and we do not disclose it overseas except to the
          service providers listed below.
        </p>

        <h2>Who we share it with</h2>
        <p>
          These are the service providers we use to run this site and the
          product. Each one only receives what it needs for the purpose named.
        </p>
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {SUB_PROCESSORS.map((p) => (
              <tr key={p.name}>
                <td>{p.name}</td>
                <td>{p.purpose}</td>
                <td>{p.location}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Automated decision-making</h2>
        <p>
          Nothing on this website makes an automated decision about you. Where
          the Immistack product offers AI-assisted features to a firm, those
          features draft and check work for a person to review; they do not
          decide anything on their own, and no immigration advice reaches a
          client without a registered migration agent signing off on it.
        </p>

        <h2>Access, correction and complaints</h2>
        <p>
          You can ask us what personal information we hold about you, ask us to
          correct it, or complain about how we have handled it, by writing to{' '}
          <a href={`mailto:${ENTITY.privacyContactEmail}`}>
            {ENTITY.privacyContactEmail}
          </a>
          . We will respond within a reasonable period. If you are not satisfied
          with our response you can complain to the Office of the Australian
          Information Commissioner at oaic.gov.au.
        </p>

        <h2>Changes</h2>
        <p>
          If we change this policy we will change the effective date at the top
          of this page.
        </p>
      </div>
    </div>
  );
};
