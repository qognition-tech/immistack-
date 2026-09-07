import React, { useState } from 'react';
import { Check, ShieldCheck, Globe, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { BookCallTrigger } from '../components/BookCallTrigger';
import { BookCall } from '../components/BookCall';

export const Pricing: React.FC<{onOpenWaitlist: () => void}> = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Can I migrate data from my current practice-management system?",
      answer: "Yes. We offer a dedicated 'White-Glove Migration Service', free of charge for new customers. We transfer client profiles, active matters, notes, and documents with zero downtime."
    },
    {
      question: "Is there a setup fee, or a lock-in term?",
      answer: "No setup fee and no lock-in term on any plan. Pricing is per registered agent, and you can add or remove agent seats or end your subscription by contacting us — there is no self-serve billing portal yet. For Enterprise clients requiring custom integration work, a one-time implementation fee may apply."
    },
    {
      question: "Do admin and support staff cost extra?",
      answer: "No. Only registered agent seats are billed. Admin, paralegal, and other support-staff seats are unlimited and free on every plan."
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-slate animate-fade-in font-sans">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-navy mb-6 tracking-tight">
          Pricing that scales with your firm.
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
          Billed per registered agent, in AUD. Admin and support-staff seats are unlimited and free — on every plan.
        </p>
        <p className="text-sm font-bold text-navy uppercase tracking-wide mb-16">
          No setup fee &middot; No lock-in
        </p>

        {/* Pricing Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto relative">

           {/* STARTER TIER */}
           <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 relative group z-10">
              <div className="mb-6 text-left">
                <h3 className="text-xl font-bold text-navy mb-2">Starter</h3>
                <p className="text-sm text-gray-500 min-h-[40px]">Essential tools for solo practitioners and boutique firms.</p>
              </div>

              <div className="flex items-baseline gap-1 mb-1 text-left">
                <span className="text-4xl font-bold text-navy tracking-tight">A$129</span>
                <span className="text-gray-500 text-sm font-medium">/ agent / mo</span>
              </div>
              <p className="text-xs text-gray-400 mb-8 text-left">+ GST, billed annually. Month-to-month is A$155 / agent / mo. Support staff free, unlimited.</p>

              <BookCallTrigger variant="outline" fullWidth className="mb-8 border-gray-300 hover:border-navy hover:bg-navy hover:text-white transition-all">
                Talk to Sales
              </BookCallTrigger>

              <div className="text-left space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Core Features</p>
                {[
                  'Client Portal (Standard)',
                  'Basic CRM & Intake Forms',
                  'Standard Form Automation',
                  'Payment-gated workflow',
                  'Audit log',
                  'Unlimited support-staff seats',
                  'No setup fee, no lock-in',
                  'Email Support'
                ].map((feature, i) => (
                  <div key={i} className="flex gap-3 text-sm text-navy/80">
                    <Check className="w-5 h-5 text-growth shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
           </div>

           {/* PROFESSIONAL TIER (Hero) */}
           <div className="bg-navy rounded-3xl p-6 sm:p-8 border border-navy shadow-2xl relative z-20 transform lg:-translate-y-4 ring-4 ring-navy/5">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                 <span className="bg-gold text-navy text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">Most Popular</span>
              </div>

              <div className="mb-6 text-left">
                <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
                <p className="text-slate-300 text-sm min-h-[40px]">Full automation suite for growing teams requiring compliance & speed.</p>
              </div>

              <div className="flex items-baseline gap-1 mb-1 text-left">
                <span className="text-5xl font-bold text-white tracking-tight">A$209</span>
                <span className="text-slate-400 text-sm font-medium">/ agent / mo</span>
              </div>
              <p className="text-xs text-slate-400 mb-8 text-left">+ GST, billed annually. Month-to-month is A$249 / agent / mo. Support staff free, unlimited.</p>

              <BookCallTrigger variant="gold" fullWidth className="mb-8 font-bold shadow-xl shadow-gold/20">
                Book a Demo
              </BookCallTrigger>

              <div className="text-left space-y-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Everything in Starter, plus:</p>
                {[
                  'AI Document Parsing',
                  'Visa expiry alerts (awaiting practitioner sign-off)',
                  'Priority Phone Support'
                ].map((feature, i) => (
                  <div key={i} className="flex gap-3 text-sm text-white">
                    <div className="bg-white/10 p-0.5 rounded-full h-fit"><Check className="w-4 h-4 text-gold shrink-0" /></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
           </div>

           {/* ENTERPRISE TIER */}
           <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 relative z-10">
              <div className="mb-6 text-left">
                <h3 className="text-xl font-bold text-navy mb-2">Enterprise</h3>
                <p className="text-sm text-gray-500 min-h-[40px]">Multi-branch and multi-country networks with dedicated support.</p>
              </div>

              <div className="flex items-baseline gap-1 mb-1 text-left">
                <span className="text-4xl font-bold text-navy tracking-tight">A$319</span>
                <span className="text-gray-500 text-sm font-medium">/ agent / mo</span>
              </div>
              <p className="text-xs text-gray-400 mb-8 text-left">+ GST, billed annually. Month-to-month is A$379 / agent / mo. Support staff free, unlimited.</p>

              <BookCallTrigger variant="outline" fullWidth className="mb-8 border-gray-300 hover:border-navy hover:bg-navy hover:text-white transition-all">
                Book a Demo
              </BookCallTrigger>

              <div className="text-left space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Professional Plus:</p>
                {[
                  'API access',
                  'Single Sign-On (SSO)',
                  'SSO and role-based access controls',
                  'Branch-scoped access across countries (RLS-enforced)'
                ].map((feature, i) => (
                  <div key={i} className="flex gap-3 text-sm text-navy/80">
                    <Check className="w-5 h-5 text-navy shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
           </div>

        </div>

        <p className="max-w-2xl mx-auto mt-8 text-sm text-gray-500">
          Running a larger or bespoke deployment than these three plans cover?{' '}
          <span className="inline-block">
            <BookCallTrigger variant="outline" className="ml-1 px-4 py-2 text-sm">
              Talk to Sales
            </BookCallTrigger>
          </span>
        </p>

        {/* Feature Comparison / Trust Bar */}
        <div className="max-w-7xl mx-auto mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12">
           <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="px-4 py-2">
                 <ShieldCheck className="h-8 w-8 text-growth mx-auto mb-4" />
                 <h4 className="font-bold text-navy mb-2">Isolation Enforced by the Database</h4>
                 <p className="text-sm text-gray-500">Postgres row-level security with FORCE, a non-BYPASSRLS app role, and a hash-chained audit log.</p>
              </div>
              <div className="px-4 py-2">
                 <Globe className="h-8 w-8 text-techBlue mx-auto mb-4" />
                 <h4 className="font-bold text-navy mb-2">Four Jurisdictions, One Codebase</h4>
                 <p className="text-sm text-gray-500">Australia, Canada, the UK and New Zealand are configuration, not forks.</p>
              </div>
              <div className="px-4 py-2">
                 <Users className="h-8 w-8 text-goldDark mx-auto mb-4" />
                 <h4 className="font-bold text-navy mb-2">Free Concierge Migration</h4>
                 <p className="text-sm text-gray-500">Moving from Migration Manager? We handle the data export and import for free.</p>
              </div>
           </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-24">
           <h2 className="text-2xl sm:text-3xl font-heading font-bold text-navy text-center mb-10">Frequently Asked Questions</h2>
           <div className="space-y-4">
              {faqs.map((faq, index) => (
                 <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:border-gray-300">
                    <button
                       onClick={() => toggleFaq(index)}
                       className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                       aria-expanded={openFaq === index}
                    >
                       <span className="font-bold text-navy pr-4">{faq.question}</span>
                       {openFaq === index ? <ChevronUp className="h-5 w-5 text-techBlue" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                    </button>
                    {openFaq === index && (
                       <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed animate-fade-in">
                          {faq.answer}
                       </div>
                    )}
                 </div>
              ))}
           </div>
        </div>

      </div>

      <BookCall />
    </div>
  );
};
