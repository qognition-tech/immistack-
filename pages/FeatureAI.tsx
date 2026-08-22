import React from 'react';
import { ArrowRight, Bot, Sparkles, Zap, Mail, FileSearch } from 'lucide-react';
import { Button } from '../components/Button';
import { SandboxBadge } from '../components/SandboxBadge';

export const FeatureAI: React.FC<{onOpenWaitlist: () => void}> = ({onOpenWaitlist}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Immistack AI Automation Engine",
    "provider": {
      "@type": "Organization",
      "name": "Immistack"
    },
    "description": "AI-powered immigration case management automation, including document extraction and personalized client communication.",
    "serviceType": "Legal Technology",
    "areaServed": "Global"
  };

  return (
    <div className="pt-24 pb-24 animate-fade-in bg-slate">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
         <div className="bg-gradient-to-br from-navy to-slate-900 rounded-3xl p-8 md:p-16 border border-gray-800 shadow-2xl relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-techBlue/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px]"></div>
            
            <div className="relative z-10 max-w-3xl">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-md">
                 <Sparkles className="h-4 w-4 text-gold" />
                 <span className="text-xs font-bold uppercase tracking-wide text-gold">Immistack Intelligence™</span>
               </div>
               <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
                 Your smartest employee <br/>never sleeps.
               </h1>
               <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
                 From drafting personalized emails to extracting data from passports, our AI Automation Engine handles the repetitive tasks so you can focus on strategy.
               </p>
               <Button onClick={onOpenWaitlist} variant="gold" className="px-8 py-4 text-navy">
                  See AI in Action
               </Button>
            </div>
         </div>
      </div>

      {/* Feature Breakdown */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         
         {/* Feature 1: Email Generation */}
         <div className="grid md:grid-cols-2 gap-16 mb-24 items-center">
            <div>
               <div className="w-12 h-12 bg-techBlue/10 rounded-xl flex items-center justify-center mb-6">
                  <Mail className="h-6 w-6 text-techBlue" />
               </div>
               <h3 className="text-3xl font-bold text-navy mb-4">Hyper-Personalized Communication</h3>
               <p className="text-lg text-gray-600 mb-6">
                  Generic templates get ignored. Our AI analyzes the client's case stage and writes contextual updates that sound like they came from you.
               </p>
               <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                     <div className="mt-1 bg-green-100 p-1 rounded-full"><Zap className="h-3 w-3 text-growth" /></div>
                     <div>
                        <strong className="text-navy block">Payment Reminders</strong>
                        <span className="text-sm text-gray-600">Polite but firm nudges when installments are due.</span>
                     </div>
                  </li>
                  <li className="flex items-start gap-3">
                     <div className="mt-1 bg-green-100 p-1 rounded-full"><Zap className="h-3 w-3 text-growth" /></div>
                     <div>
                        <strong className="text-navy block">Status Updates</strong>
                        <span className="text-sm text-gray-600">Explains complex visa stages in plain English.</span>
                     </div>
                  </li>
               </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 relative">
               <div className="absolute -top-3 -right-3 bg-gold text-navy text-xs font-bold px-3 py-1 rounded shadow-lg">AI Generated</div>
               <div className="space-y-4">
                  <div className="text-xs text-gray-400 font-mono border-b border-gray-100 pb-2">Subject: Update regarding your Subclass 482 Nomination</div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                     <p className="mb-2">Dear Sarah,</p>
                     <p className="mb-2">Great news! We have received the approval for the Standard Business Sponsorship (SBS) for TechCorp.</p>
                     <p className="mb-2 bg-yellow-50 p-2 rounded border border-yellow-100">
                        The next step is to lodge your Nomination application. Since your police checks are already uploaded, we can proceed immediately.
                     </p>
                     <p>Best,<br/>Global Migration Team</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Feature 2: Document Extraction */}
         <div className="grid md:grid-cols-2 gap-16 mb-24 items-center">
            <div className="order-2 md:order-1 bg-slate-100 p-8 rounded-2xl border border-gray-200">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-20 bg-white shadow-sm border border-gray-300 rounded flex items-center justify-center text-xs text-gray-400">Passport.pdf</div>
                  <ArrowRight className="text-gray-400" />
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1">
                     <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-500">First Name</span>
                        <span className="font-mono text-navy font-bold">JONATHAN</span>
                     </div>
                     <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-500">Passport No</span>
                        <span className="font-mono text-navy font-bold">P4920211</span>
                     </div>
                     <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Expiry</span>
                        <span className="font-mono text-navy font-bold">12/04/2029</span>
                     </div>
                  </div>
               </div>
               <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
                  <SandboxBadge /> <span>Extracted fields are queued for staff review before they touch a matter.</span>
               </div>
            </div>
            
            <div className="order-1 md:order-2">
               <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <FileSearch className="h-6 w-6 text-purple-600" />
               </div>
               <h3 className="text-3xl font-bold text-navy mb-4">Intelligent Document Processing</h3>
               <p className="text-lg text-gray-600 mb-6">
                  Stop manually typing passport numbers. Drag and drop any identity document, and our AI instantly populates the fields in the case file.
               </p>
               <Button onClick={onOpenWaitlist} variant="outline">
                  Try Document Parser
               </Button>
            </div>
         </div>

         {/* Integration Banner */}
         <div className="bg-navy rounded-2xl p-8 text-center">
             <Bot className="h-12 w-12 text-white mx-auto mb-4" />
             <h3 className="text-2xl font-bold text-white mb-2">Human in the loop</h3>
             <p className="text-slate-400 max-w-2xl mx-auto">
                AI drafts the work, but you always have the final say. Approve, edit, or reject any AI action with one click before it is sent to a client or government body.
             </p>
         </div>

      </div>
    </div>
  );
};

// Helper component
const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
);