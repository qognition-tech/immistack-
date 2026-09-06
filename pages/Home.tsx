import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { TrustedBy } from '../components/TrustedBy';
import { FeaturePillars } from '../components/FeaturePillars';
import { ComparisonTable } from '../components/ComparisonTable';
import { ProofPoints } from '../components/ProofPoints';
import { BookCall } from '../components/BookCall';
import { Page } from '../types';

interface HomeProps {
  onOpenWaitlist: () => void;
  onNavigate: (page: Page) => void;
}

/**
 * Home. Site-wide Organization/SoftwareApplication JSON-LD lives in
 * components/Schema.tsx (rendered once in App.tsx); do not duplicate it here.
 */
export const Home: React.FC<HomeProps> = ({ onOpenWaitlist }) => {
  return (
    <div className="animate-fade-in">
      <HeroSection onOpenWaitlist={onOpenWaitlist} />
      <TrustedBy />
      <FeaturePillars />
      <ComparisonTable onOpenWaitlist={onOpenWaitlist} />
      <ProofPoints />
      <BookCall />
    </div>
  );
};
