import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, Zap, Globe, Users, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/Button';

export const Pricing: React.FC<{onOpenWaitlist: () => void}> = ({onOpenWaitlist}) => {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Can I migrate data from my current practice-management system?",
      answer: "Yes. We offer a dedicated 'White-Glove Migration Service'. For annual plans, this service is complimentary. We transfer client profiles, active matters, notes, and documents with zero downtime."
    },
    {
      question: "Is there a setup fee?",
      answer: "No. All plans include standard onboarding. For Enterprise clients requiring custom API integrations or on-premise configuration, a one-time implementation fee may apply."
    },
    {
      question: "How does the 'Active Matter' limit work?",
      answer: "An active matter is any case currently in progress. Archived, finalized, or closed matters do not count towards your limit. You can store unlimited closed cases for compliance record-keeping."
    },
    {
      question: "Do you support multi-currency invoicing?",
      answer: "Yes. The Professional and Enterprise plans allow you to issue invoices in USD, AUD, GBP, CAD, and EUR, while maintaining a single base currency for your reporting."
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-slate animate-fade-in font-sans">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-6 tracking-tight">
          Pricing that scales with your firm.
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Replace your CRM, document checklists, and form filler with one platform. 
          <br className="hidden md:block"/> No hidden fees. Cancel anytime.
        </p>

        {/* Toggle */}
        <div className="flex justify-center mb-16">
          <div className="relative bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm inline-flex items-center gap-1">
            <button 
              onClick={() => setAnnual(false)}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${!annual ? 'bg-navy text-white shadow-md' : 'text-gray-500 hover:text-navy'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setAnnual(true)}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2 ${annual ? 'bg-navy text-white shadow-md' : 'text-gray-500 hover:text-navy'}`}
            >
              Yearly <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase ${annual ? 'bg-gold text-navy' : 'bg-green-100 text-green-700'}`}>Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto relative">
           
           {/* STARTER TIER */}
           <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 relative group z-10">
              <div className="mb-6 text-left">
                <h3 className="text-xl font-bold text-navy mb-2">Starter</h3>
                <p className="text-sm text-gray-500 min-h-[40px]">Essential tools for solo practitioners and boutique firms.</p>
              </div>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold text-navy tracking-tight">${annual ? '59' : '79'}</span>
                <span className="text-gray-500 text-sm font-medium">/user/mo</span>
              </div>

              <Button variant="outline" fullWidth onClick={onOpenWaitlist} className="mb-8 border-gray-300 hover:border-navy hover:bg-navy hover:text-white transition-all">
                Start Free Trial
              </Button>

              <div className="text-left space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Core Features</p>
                {[
                  'Up to 30 Active Matters',
                  'Client Portal (Standard)',
                  'Basic CRM & Intake Forms',
                  'Standard Form Automation',
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
           <div className="bg-navy rounded-3xl p-8 border border-navy shadow-2xl relative z-20 transform lg:-translate-y-4 ring-4 ring-navy/5">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                 <span className="bg-gold text-navy text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">Most Popular</span>
              </div>
              
              <div className="mb-6 text-left">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                   Professional <Zap className="h-4 w-4 text-gold fill-gold" />
                </h3>
                <p className="text-slate-300 text-sm min-h-[40px]">Full automation suite for growing teams requiring compliance & speed.</p>
              </div>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-bold text-white tracking-tight">${annual ? '129' : '159'}</span>
                <span className="text-slate-400 text-sm font-medium">/user/mo</span>
              </div>

              <Button variant="gold" fullWidth onClick={onOpenWaitlist} className="mb-8 font-bold shadow-xl shadow-gold/20">
                Start 14-Day Free Trial
              </Button>

              <div className="text-left space-y-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Everything in Starter, plus:</p>
                {[
                  'Unlimited Active Matters',
                  'AI Document Parsing',
                  'Payment-Gated Workflow',
                  'Visa Expiry Alerts',
                  'Multi-Currency Invoicing',
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
           <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 relative z-10">
              <div className="mb-6 text-left">
                <h3 className="text-xl font-bold text-navy mb-2">Enterprise</h3>
                <p className="text-sm text-gray-500 min-h-[40px]">Custom solutions for global networks and large agencies.</p>
              </div>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold text-navy tracking-tight">Custom</span>
              </div>

              <Button variant="outline" fullWidth onClick={onOpenWaitlist} className="mb-8 border-gray-300 hover:border-navy hover:bg-navy hover:text-white transition-all">
                Contact Sales
              </Button>

              <div className="text-left space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Professional Plus:</p>
                {[
                  'Dedicated Success Manager',
                  'Custom API Integrations',
                  'Single Sign-On (SSO)',
                  'Audit Logs & Advanced Security',
                  'Data Sovereignty Choice (AU/UK/CA)'
                ].map((feature, i) => (
                  <div key={i} className="flex gap-3 text-sm text-navy/80">
                    <Check className="w-5 h-5 text-navy shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
           </div>

        </div>

        {/* Feature Comparison / Trust Bar */}
        <div className="max-w-7xl mx-auto mt-20 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12">
           <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="px-4 py-2">
                 <ShieldCheck className="h-8 w-8 text-growth mx-auto mb-4" />
                 <h4 className="font-bold text-navy mb-2">Isolation Enforced by the Database</h4>
                 <p className="text-sm text-gray-500">Postgres row-level security with FORCE, a non-BYPASSRLS app role, and a hash-chained audit log. AES-256 encryption at rest and in transit.</p>
              </div>
              <div className="px-4 py-2">
                 <Globe className="h-8 w-8 text-techBlue mx-auto mb-4" />
                 <h4 className="font-bold text-navy mb-2">Global Compliance</h4>
                 <p className="text-sm text-gray-500">Built for OMARA (AU), OISC (UK), and CICC (CA) regulatory standards.</p>
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
           <h2 className="text-3xl font-heading font-bold text-navy text-center mb-10">Frequently Asked Questions</h2>
           <div className="space-y-4">
              {faqs.map((faq, index) => (
                 <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:border-gray-300">
                    <button 
                       onClick={() => toggleFaq(index)}
                       className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
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
           
           <div className="mt-12 text-center p-8 bg-navy/5 rounded-2xl border border-navy/10">
              <h4 className="font-bold text-navy mb-2">Still have questions?</h4>
              <p className="text-gray-600 mb-6 text-sm">Our enterprise sales team is ready to help you build a custom package.</p>
              <Button variant="outline" onClick={onOpenWaitlist} className="bg-white hover:bg-gray-50">
                 Book a Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
           </div>
        </div>

      </div>
    </div>
  );
};