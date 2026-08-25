import React from 'react';
import { Handshake, DollarSign, LineChart, Clock, Users, Gift } from 'lucide-react';
import { AffiliateForm } from '../components/AffiliateForm';

const benefits = [
  {
    icon: DollarSign,
    color: 'text-growth',
    title: '30% recurring commission',
    body: 'Earn a generous recurring share of every subscription, for the lifetime of every firm you refer — not just the first month.',
  },
  {
    icon: Clock,
    color: 'text-techBlue',
    title: '90-day cookie window',
    body: 'A long attribution window means you still get paid even when prospects take their time deciding.',
  },
  {
    icon: LineChart,
    color: 'text-goldDark',
    title: 'Real-time dashboard',
    body: 'Track clicks, signups and payouts live from your partner dashboard. Full transparency, no guesswork.',
  },
  {
    icon: Gift,
    color: 'text-growth',
    title: 'Co-marketing support',
    body: 'Get ready-made assets, landing pages and launch support from our team to help you convert your audience.',
  },
];

const steps = [
  { n: '01', title: 'Apply', body: 'Tell us about your audience. Approval usually takes one business day.' },
  { n: '02', title: 'Share', body: 'Get your unique referral link and a library of conversion-tested assets.' },
  { n: '03', title: 'Earn', body: 'Get paid monthly for every firm that subscribes through your link.' },
];

export const Affiliate: React.FC = () => {
  return (
    <div className="pt-24 pb-24 animate-fade-in bg-slate">
      {/* Hero + application form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <span>Partners</span>
          <span>/</span>
          <span className="text-navy font-bold">Affiliate Program</span>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="lg:pt-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-6">
              <Handshake className="h-4 w-4 text-goldDark" />
              <span className="text-xs font-bold uppercase tracking-wide text-goldDark">Partner Program</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-navy mb-6">
              Earn recurring revenue referring immigration firms.
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join the Immistack Affiliate Program and earn <span className="font-semibold text-navy">30% recurring
              commission</span> for every migration agent, education consultant or HR team you bring on board.
            </p>
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-navy">30%</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Recurring</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-navy">90-day</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Cookie</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-navy">Monthly</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Payouts</div>
              </div>
            </div>
          </div>

          <div id="apply">
            <AffiliateForm source="Affiliate Program" />
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-navy mb-3">Why partner with Immistack</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            One of the most rewarding affiliate programs in legal &amp; immigration tech.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b) => (
            <div key={b.title} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <b.icon className={`h-8 w-8 ${b.color} mb-4`} />
              <h3 className="font-bold text-navy text-lg mb-2">{b.title}</h3>
              <p className="text-gray-600 text-sm">{b.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-navy mb-3">How it works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Three steps to your first payout.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.n} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-gold-gradient text-4xl font-heading font-bold mb-3">{s.n}</div>
              <h3 className="font-bold text-navy text-lg mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-navy rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
          <div className="relative z-10">
            <Users className="h-10 w-10 text-gold mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3">Ready to start earning?</h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-8">
              Applications are reviewed within one business day. It’s free to join.
            </p>
            <a
              href="#apply"
              className="inline-flex items-center justify-center px-8 py-4 rounded-md font-bold text-navy bg-gold hover:bg-yellow-500 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-gold/20"
            >
              Apply to Join
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
