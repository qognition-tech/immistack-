import React from 'react';
import { FileText, Wand2, Database, UploadCloud } from 'lucide-react';
import { Button } from '../components/Button';

export const FeatureForms: React.FC<{onOpenWaitlist: () => void}> = ({onOpenWaitlist}) => {
  return (
    <div className="pt-24 pb-24 animate-fade-in bg-slate">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
         <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span>Features</span>
            <span>/</span>
            <span className="text-navy font-bold">Form Automation</span>
         </div>
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-techBlue/10 border border-techBlue/20 mb-6">
                 <FileText className="h-4 w-4 text-techBlue" />
                 <span className="text-xs font-bold uppercase tracking-wide text-techBlue">PDF Automation</span>
               </div>
               <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-navy mb-6">
                 Fill complex forms in seconds.
               </h1>
               <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                 Don't re-type data. Immistack maps client profile data directly into government PDF forms (Form 80, 1221, 956, and more).
               </p>
               <Button onClick={onOpenWaitlist} variant="primary" className="px-8 py-4">
                  See Form Builder
               </Button>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 relative">
               <div className="absolute top-4 right-4 bg-techBlue text-white text-xs font-bold px-2 py-1 rounded">Auto-Filled</div>
               <div className="border border-gray-300 p-4 rounded bg-gray-50 font-mono text-xs text-gray-600 leading-loose">
                  <div className="border-b border-gray-200 pb-2 mb-2 font-bold text-navy">Form 80 - Personal Particulars</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                        <span className="block text-[10px] text-gray-400 uppercase">Family Name</span>
                        <div className="bg-yellow-100 px-2 py-1 border border-yellow-300 text-navy font-bold">SMITH</div>
                     </div>
                     <div>
                        <span className="block text-[10px] text-gray-400 uppercase">Given Names</span>
                        <div className="bg-yellow-100 px-2 py-1 border border-yellow-300 text-navy font-bold">JOHN JAMES</div>
                     </div>
                     <div className="sm:col-span-2">
                        <span className="block text-[10px] text-gray-400 uppercase">Address History (Last 10 Years)</span>
                        <div className="bg-yellow-100 px-2 py-1 border border-yellow-300 text-navy mb-1">123 Collins St, Melbourne VIC 3000 (2020-Present)</div>
                        <div className="bg-yellow-100 px-2 py-1 border border-yellow-300 text-navy">45 Queen St, Auckland NZ (2015-2020)</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <Database className="h-8 w-8 text-techBlue mb-4" />
               <h3 className="font-bold text-navy text-lg mb-2">Single Source of Truth</h3>
               <p className="text-gray-600 text-sm">Update a client's address once in their profile, and it updates across all 15 active forms instantly.</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <Wand2 className="h-8 w-8 text-goldDark mb-4" />
               <h3 className="font-bold text-navy text-lg mb-2">Smart Logic</h3>
               <p className="text-gray-600 text-sm">Handles complex history gaps. If there's a gap in address history &gt; 28 days, the system flags it before export.</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <UploadCloud className="h-8 w-8 text-growth mb-4" />
               <h3 className="font-bold text-navy text-lg mb-2">Client Signature</h3>
               <p className="text-gray-600 text-sm">Send completed forms to the Client Portal for one-click digital signature (DocuSign integrated).</p>
            </div>
         </div>
      </div>
    </div>
  );
};