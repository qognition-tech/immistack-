import React from 'react';
import { FileText, Video, Mic, ArrowRight } from 'lucide-react';
import { Page } from '../types';

export const Resources: React.FC<{onNavigate: (page: Page) => void}> = ({onNavigate}) => {
  return (
    <div className="pt-24 animate-fade-in bg-white">
      <div className="bg-navy py-16 text-center text-white">
         <h1 className="text-4xl font-heading font-bold mb-4">Resources & Insights</h1>
         <p className="text-slate-300">Stay updated with the latest in immigration tech and policy.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog Card 1 */}
            <div className="group cursor-pointer" onClick={() => onNavigate('RESOURCE_ARTICLE')}>
               <div className="overflow-hidden rounded-xl mb-4">
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="The future of AI in visa processing — Immistack trend report" loading="lazy" width="800" height="480" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500" />
               </div>
               <div className="text-xs font-bold text-goldDark uppercase mb-2">Trend Report</div>
               <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-techBlue transition-colors">The Future of AI in Visa Processing</h3>
               <p className="text-gray-600 text-sm mb-4">How large language models are reducing refusal rates by 30%.</p>
               <div className="text-techBlue text-sm font-bold flex items-center gap-1">Read Article <ArrowRight className="h-4 w-4" /></div>
            </div>

            {/* Blog Card 2 */}
            <div className="group cursor-pointer" onClick={() => onNavigate('RESOURCE_ARTICLE')}>
               <div className="overflow-hidden rounded-xl mb-4">
                  <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="2025 TSMIT salary threshold changes explained for immigration compliance" loading="lazy" width="800" height="480" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500" />
               </div>
               <div className="text-xs font-bold text-goldDark uppercase mb-2">Compliance</div>
               <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-techBlue transition-colors">2025 TSMIT Changes Explained</h3>
               <p className="text-gray-600 text-sm mb-4">What the new salary thresholds mean for your corporate clients.</p>
               <div className="text-techBlue text-sm font-bold flex items-center gap-1">Read Article <ArrowRight className="h-4 w-4" /></div>
            </div>

            {/* Blog Card 3 */}
            <div className="group cursor-pointer" onClick={() => onNavigate('RESOURCE_ARTICLE')}>
               <div className="overflow-hidden rounded-xl mb-4">
                  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" alt="Case study: how Global Migrate saved 20 hours a week with workflow automation" loading="lazy" width="800" height="480" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500" />
               </div>
               <div className="text-xs font-bold text-goldDark uppercase mb-2">Case Study</div>
               <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-techBlue transition-colors">How 'Global Migrate' Saved 20hrs/Week</h3>
               <p className="text-gray-600 text-sm mb-4">A deep dive into workflow automation for boutique firms.</p>
               <div className="text-techBlue text-sm font-bold flex items-center gap-1">Read Article <ArrowRight className="h-4 w-4" /></div>
            </div>
         </div>
      </div>

    </div>
  );
};