import React from 'react';
import { CheckCircle2, FileText, Send, Paperclip, BarChart3, Globe, MessageSquare, Briefcase, BellRing, Settings, Users, ChevronRight } from 'lucide-react';
import { Button } from './Button';

export const FeaturePillars: React.FC = () => {
  return (
    <div className="flex flex-col gap-0">
      
      {/* PILLAR 1: STREAMLINED INTAKE */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                 {/* Visual: Clean Form Builder - High Fidelity */}
                 <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 shadow-inner">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                       <div className="border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap justify-between items-center gap-2 bg-gray-50">
                          <div className="flex items-center gap-2">
                             <Settings className="h-4 w-4 text-gray-400" />
                             <h4 className="font-bold text-navy text-sm">Workflow Editor: Intake</h4>
                          </div>
                          <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full border border-green-200">Active</span>
                       </div>
                       <div className="p-4 sm:p-6 space-y-4">
                          <div className="p-3 border border-techBlue rounded bg-blue-50/50 flex flex-wrap justify-between items-center gap-x-2 gap-y-1">
                             <span className="text-sm font-bold text-navy">1. Citizenship Assessment</span>
                             <span className="text-xs text-gray-400">Conditional</span>
                          </div>
                          <div className="flex justify-center">
                             <div className="h-4 w-0.5 bg-gray-300"></div>
                          </div>
                          <div className="p-3 border border-gray-200 rounded bg-white flex flex-wrap justify-between items-center gap-x-2 gap-y-1 shadow-sm">
                             <span className="text-sm font-bold text-navy">2. Upload Passport</span>
                             <span className="text-xs text-gray-400">Required</span>
                          </div>
                          <div className="flex justify-center">
                             <div className="h-4 w-0.5 bg-gray-300"></div>
                          </div>
                          <div className="p-3 border border-dashed border-gray-300 rounded bg-gray-50 text-center text-xs text-gray-500">
                             + Add Step (e.g., Payment, Sign Contract)
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-block px-3 py-1 mb-6 border border-techBlue/30 rounded-full bg-techBlue/10">
                   <span className="text-techBlue text-xs font-bold uppercase tracking-wider">Lead Capture</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-navy mb-6">Capture more leads, with less effort.</h3>
                <p className="text-base sm:text-lg text-gray-600 mb-6">
                  Replace clunky PDF intake forms with smart, mobile-friendly questionnaires. Automatically qualify leads and sync them directly to your case pipeline.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-techBlue/10 p-1 rounded-full"><CheckCircle2 className="h-4 w-4 text-techBlue" /></div>
                    <span className="text-gray-600"><strong>Embed on your website:</strong> Capture leads 24/7.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-techBlue/10 p-1 rounded-full"><CheckCircle2 className="h-4 w-4 text-techBlue" /></div>
                    <span className="text-gray-600"><strong>Auto-Qualification:</strong> System flags high-value prospects instantly.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-techBlue/10 p-1 rounded-full"><CheckCircle2 className="h-4 w-4 text-techBlue" /></div>
                    <span className="text-gray-600"><strong>WhatsApp Integration:</strong> Capture conversations directly into client files.</span>
                  </li>
                </ul>
              </div>
           </div>
        </div>
      </section>

      {/* PILLAR 2: CLIENT EXPERIENCE */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
              <div>
                <div className="inline-block px-3 py-1 mb-6 border border-gold/30 rounded-full bg-gold/10">
                   <span className="text-goldDark text-xs font-bold uppercase tracking-wider">Client Portal</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-navy mb-6">Give your clients the premium experience they pay for.</h3>
                <p className="text-base sm:text-lg text-gray-600 mb-6">
                   Reduce "update me" emails by 80%. Give your clients a secure, branded portal to track their application status, upload documents, and pay invoices.
                </p>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                   <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <Briefcase className="h-6 w-6 text-navy mb-2" />
                      <h5 className="font-bold text-navy text-sm">Secure Uploads</h5>
                      <p className="text-xs text-gray-500">TLS in transit, AES-256 at rest, per-tenant isolation.</p>
                   </div>
                   <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <BellRing className="h-6 w-6 text-navy mb-2" />
                      <h5 className="font-bold text-navy text-sm">Real-time Updates</h5>
                      <p className="text-xs text-gray-500">Auto-notifications on status changes.</p>
                   </div>
                </div>
              </div>

              <div className="relative">
                  {/* Mock UI: Client Portal - High Fidelity */}
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transform hover:-translate-y-1 transition-transform duration-500">
                     <div className="bg-navy px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                           <div className="w-8 h-8 shrink-0 rounded bg-white/10 flex items-center justify-center font-serif text-white font-bold border border-white/20">L</div>
                           <div className="leading-tight">
                              <div className="text-white font-bold text-sm">LegalCorp Portal</div>
                              <div className="text-[10px] text-gray-400">Powered by Immistack</div>
                           </div>
                        </div>
                        <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-r from-gold to-goldDark text-navy flex items-center justify-center font-bold text-xs border border-white/50">JD</div>
                     </div>
                     <div className="p-4 sm:p-6 bg-slate-50">
                        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 shadow-sm mb-4">
                           <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                              <div>
                                 <h4 className="font-bold text-navy text-base sm:text-lg">Subclass 482 Visa</h4>
                                 <div className="text-xs text-gray-500">Application ID: #992812</div>
                              </div>
                              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">On Track</span>
                           </div>
                           <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                              <div className="bg-growth h-2 rounded-full relative" style={{width: '75%'}}>
                                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-growth rounded-full shadow"></div>
                              </div>
                           </div>
                           <div className="flex justify-between gap-1 text-[9px] sm:text-[10px] text-gray-500 uppercase font-bold tracking-tight sm:tracking-wide">
                              <span>Intake</span>
                              <span>Preparation</span>
                              <span className="text-growth">Lodgement</span>
                              <span>Decision</span>
                           </div>
                        </div>
                        
                        <div className="space-y-3">
                           <div className="flex items-center justify-between gap-2 p-3 sm:p-4 bg-white border border-gray-200 rounded-lg hover:border-navy cursor-pointer transition-colors shadow-sm">
                              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                 <div className="p-2 bg-red-50 rounded-lg"><Paperclip className="h-4 w-4 text-red-500" /></div>
                                 <div>
                                    <div className="text-sm font-bold text-navy">Action Required</div>
                                    <div className="text-xs text-gray-500">Please upload Police Certificate</div>
                                 </div>
                              </div>
                              <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
                           </div>
                        </div>
                     </div>
                  </div>
              </div>
           </div>
        </div>
      </section>

      {/* PILLAR 3: AGENCY INSIGHTS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-navy overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
              
              <div className="order-2 lg:order-1 relative">
                 <div className="bg-navyLight rounded-2xl border border-gray-700 shadow-2xl p-5 sm:p-6 lg:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-6 sm:mb-8 pb-4 border-b border-gray-700">
                       <h4 className="text-white font-bold flex items-center gap-2 text-base sm:text-lg"><BarChart3 className="h-5 w-5 text-gold" /> Firm Performance</h4>
                       <div className="flex gap-2">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide px-2 py-1 rounded bg-gray-800">Q3 2024</span>
                       </div>
                    </div>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                       <div className="bg-gray-800/50 p-4 sm:p-5 rounded-xl border border-gray-700">
                          <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-bold">Revenue</div>
                          <div className="text-2xl sm:text-3xl font-bold text-white">$142k</div>
                          <div className="text-xs text-growth mt-2 flex items-center gap-1">↑ 12% <span className="text-gray-500">vs last month</span></div>
                       </div>
                       <div className="bg-gray-800/50 p-4 sm:p-5 rounded-xl border border-gray-700">
                          <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-bold">Success Rate</div>
                          <div className="text-2xl sm:text-3xl font-bold text-gold">98.2%</div>
                          <div className="text-xs text-gray-500 mt-2">Based on 124 decisions</div>
                       </div>
                    </div>
                    <div>
                       <div className="flex flex-wrap justify-between gap-x-2 text-sm text-gray-400 mb-2 font-medium">
                          <span>Team Utilization</span>
                          <span className="text-white">85% (Optimal)</span>
                       </div>
                       <div className="w-full bg-gray-800 rounded-full h-2 mb-1">
                          <div className="bg-gradient-to-r from-blue-500 to-techBlue h-2 rounded-full" style={{width: '85%'}}></div>
                       </div>
                       <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                          <span>0%</span>
                          <span>100%</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-block px-3 py-1 mb-6 border border-white/20 rounded-full bg-white/5">
                   <span className="text-gold text-xs font-bold uppercase tracking-wider">Business Intelligence</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-6">Know exactly how your business is performing.</h3>
                <p className="text-base sm:text-lg text-slate-300 mb-6 font-light leading-relaxed">
                  No more guessing. Track staff productivity, visa success rates, and revenue forecasts in one dashboard. Make data-driven decisions to scale your firm.
                </p>
                <div className="space-y-4">
                   <div className="flex gap-4 group cursor-pointer">
                      <div className="p-3 bg-white/5 rounded-xl h-fit border border-white/10 group-hover:bg-gold/10 group-hover:border-gold/30 transition-all"><BarChart3 className="h-6 w-6 text-gold" /></div>
                      <div>
                        <h4 className="text-white font-bold text-base group-hover:text-gold transition-colors">Revenue Forecasting</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">See upcoming cash flow based on installment schedules.</p>
                      </div>
                   </div>
                   <div className="flex gap-4 group cursor-pointer">
                      <div className="p-3 bg-white/5 rounded-xl h-fit border border-white/10 group-hover:bg-techBlue/10 group-hover:border-techBlue/30 transition-all"><Users className="h-6 w-6 text-techBlue" /></div>
                      <div>
                        <h4 className="text-white font-bold text-base group-hover:text-techBlue transition-colors">Staff Productivity</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">Identify bottlenecks in your processing team.</p>
                      </div>
                   </div>
                </div>
              </div>

           </div>
        </div>
      </section>

    </div>
  );
};