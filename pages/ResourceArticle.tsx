import React from 'react';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { Button } from '../components/Button';

export const ResourceArticle: React.FC<{onOpenWaitlist: () => void}> = ({onOpenWaitlist}) => {
  return (
    <div className="pt-24 pb-24 animate-fade-in bg-white">
       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
             <div className="inline-flex items-center gap-2 text-goldDark text-xs font-bold uppercase tracking-widest mb-4">
                Trend Report
             </div>
             <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-navy mb-6 leading-tight">
                The Future of AI in Visa Processing: Reducing Refusals by 30%
             </h1>
             <div className="flex items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-8">
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Oct 24, 2024</div>
                <div className="flex items-center gap-2"><User className="h-4 w-4" /> Immistack Research Team</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min read</div>
             </div>
          </div>

          <div className="prose prose-lg prose-navy max-w-none text-gray-600">
             <p className="lead text-xl text-navy font-medium mb-6">
                Artificial Intelligence is no longer a buzzword in the immigration sector, but the gap between what gets demonstrated and what actually runs in a practice is still wide. This is a look at what the tooling does today, and where the claims outrun it.
             </p>
             <p className="mb-6">
                The benefit most often claimed is fewer Request for Information (RFI) notices, on the theory that an automated check catches a missing or unreadable document before lodgement rather than after. The mechanism is plausible. The numbers attached to it usually are not: we have run no study of our own, and we are not going to repeat someone else’s figure as though we had. Treat any specific percentage in this market as a vendor claim until someone shows you the method.
             </p>
             <h3 className="text-2xl font-bold text-navy mb-4">The "Perfect Application" Hypothesis</h3>
             <p className="mb-6">
                The goal of any migration agent is the "decision-ready" application. Historically, achieving this required hours of meticulous manual checking. Human error is inevitable. Fatigue sets in.
             </p>
             <p className="mb-8">
                Immistack's AI Engine doesn't get tired. It cross-references the client's passport expiry date against the visa subclass requirements instantly. It scans police checks for relevant convictions. It highlights gaps in address history that would otherwise trigger a Section 56 request.
             </p>
             
             <div className="bg-slate-50 border-l-4 border-gold p-6 my-8 italic text-navy font-medium">
                "We used to spend 4 hours checking a Partner Visa application. Now the AI does the first pass in 3 seconds. We just review the flags."
             </div>

             <h3 className="text-2xl font-bold text-navy mb-4">What's Next?</h3>
             <p className="mb-6">
                We are moving towards predictive analytics. Based on historical data, the system will soon be able to give a "Success Probability Score" for each case before it is lodged, allowing agents to manage client expectations with data-backed confidence.
             </p>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-100 text-center">
             <h4 className="font-bold text-navy mb-4">Ready to modernize your firm?</h4>
             <Button onClick={onOpenWaitlist} variant="primary">Start Free Trial</Button>
          </div>
       </div>
    </div>
  );
};