import React from 'react';
import { ArrowRight } from 'lucide-react';
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
            {/* Blog Card 1 — the one article that exists. Two more cards used to
                sit here ("2025 TSMIT Changes Explained" and a "Global Migrate"
                case study) — neither had a page: both "Read Article" links
                pointed at this same article, and the case study named a
                customer that does not exist (guardrails.md bans named
                customers/case studies outright). Removed rather than stubbed;
                add real cards back only when the article behind them exists. */}
            <div className="group cursor-pointer" onClick={() => onNavigate('RESOURCE_ARTICLE')}>
               <div className="overflow-hidden rounded-xl mb-4">
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="The future of AI in visa processing — Immistack trend report" loading="lazy" width="800" height="480" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500" />
               </div>
               <div className="text-xs font-bold text-goldDark uppercase mb-2">Trend Report</div>
               <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-techBlue transition-colors">The Future of AI in Visa Processing</h3>
               <p className="text-gray-600 text-sm mb-4">What AI-assisted checking does today in an immigration practice, and where the vendor claims outrun it.</p>
               <div className="text-techBlue text-sm font-bold flex items-center gap-1">Read Article <ArrowRight className="h-4 w-4" /></div>
            </div>
         </div>

         <p className="text-gray-500 text-sm mt-12 max-w-md">More resources are on the way. This is the one article we have published — we would rather show one honest piece than pad the page with more.</p>
      </div>

    </div>
  );
};