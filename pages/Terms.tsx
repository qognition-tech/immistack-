import React from 'react';
import { ENTITY } from '../legal/entity';

/**
 * Terms of service.
 *
 * Deliberately describes only what the product actually does today. Two things
 * it must not do: imply Immistack provides immigration assistance (neither the
 * company nor the product is a registered migration agent, and saying
 * otherwise is a Code of Conduct problem for the firms using it), and promise
 * an availability level nobody has committed to — `check:claims` already bans
 * that class of phrase across this site, and the terms are the one place a
 * reader would take it as binding. (This comment deliberately does not quote
 * the banned wording: the gate does not exempt comments, because a
 * commented-out claim is one uncomment away from shipping.)
 */
export const Terms: React.FC = () => {
  const updated = ENTITY.effectiveDate ?? '';
  return (
    <div className="pt-24 animate-fade-in bg-white">
      <div className="bg-navy py-16 text-center text-white">
        <h1 className="text-4xl font-heading font-bold mb-4">Terms of Service</h1>
        <p className="text-slate-300">{updated ? `Effective ${updated}` : ''}</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 prose prose-slate">
        <h2>These terms</h2>
        <p>
          These terms govern your use of the Immistack website and, where you
          have a subscription, the Immistack product. They are between you and{' '}
          {ENTITY.legalName} (ABN {ENTITY.abn}), of {ENTITY.registeredAddress}.
        </p>

        <h2>What Immistack is, and is not</h2>
        <p>
          Immistack is case-management software for immigration practices. It
          stores records, tracks matters, collects documents and helps a firm
          organise its work.
        </p>
        <p>
          It is not immigration assistance and it is not legal advice.
          {' '}{ENTITY.legalName} is not a law firm and is not a registered
          migration agent. Responsibility for advice given to an applicant, and
          for compliance with the Migration Agents Code of Conduct, rests with
          the practitioner using the software.
        </p>
        <p>
          Where the product records a client&rsquo;s acceptance of something, that
          record is an audited record of assent — who agreed, when, and to
          exactly what bytes. It is not an electronic signature: there is no
          signatory certificate, no tamper-evident envelope and no independent
          timestamp authority. Do not rely on it as a signed instrument.
        </p>
        <p>
          Connections to government systems are, at the date above, test
          connections. The product labels them as such wherever it shows their
          output. Do not treat a labelled sandbox response as a departmental
          result.
        </p>

        <h2>Your account</h2>
        <p>
          You are responsible for who you invite into your workspace and for
          what they do in it. Tell us promptly if you think an account has been
          compromised.
        </p>

        <h2>Your data</h2>
        <p>
          Your firm&rsquo;s records remain yours. We hold them to provide the
          product and handle them under our Privacy Policy. You can export your
          data while your subscription is active. If your subscription ends, ask
          us and we will make an export available before the data is removed.
        </p>

        <h2>Fees</h2>
        <p>
          Subscription fees are as quoted to you in writing, in Australian
          dollars, plus GST. Government charges paid on behalf of an applicant
          are never our fees, are never marked up by us, and are handled by your
          firm.
        </p>

        <h2>Availability</h2>
        <p>
          We work to keep the product available and we will tell you about
          planned maintenance, but we do not currently offer a contractual
          uptime commitment or service credits. If you need one, ask us before
          you subscribe and we will tell you honestly whether we can give it.
        </p>

        <h2>Ending the agreement</h2>
        <p>
          Either of us may end the agreement on notice. If we end it other than
          for your breach, we refund the unused part of any prepaid period.
        </p>

        <h2>Liability</h2>
        <p>
          Nothing in these terms excludes rights you have under the Australian
          Consumer Law. Subject to that, our liability arising out of the
          product is limited to the fees you paid us in the twelve months before
          the claim.
        </p>

        <h2>Questions</h2>
        <p>
          Write to{' '}
          <a href={`mailto:${ENTITY.privacyContactEmail}`}>
            {ENTITY.privacyContactEmail}
          </a>
          .
        </p>
      </div>
    </div>
  );
};
