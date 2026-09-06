import React from 'react';

export type Page = 
  | 'HOME' 
  | 'FEATURES' 
  | 'INDUSTRIES' 
  | 'INDUSTRY_AGENTS'
  | 'INDUSTRY_EDUCATION'
  | 'INDUSTRY_CORPORATE'
  | 'PRICING' 
  | 'ABOUT' 
  | 'RESOURCES'
  | 'RESOURCE_ARTICLE'
  | 'FEATURE_CRM'
  | 'FEATURE_COMPLIANCE'
  | 'FEATURE_PORTAL'
  | 'FEATURE_STAFF_PORTAL'
  | 'FEATURE_ADMIN_PORTAL'
  | 'FEATURE_AI'
  | 'FEATURE_BILLING'
  | 'FEATURE_TASKS'
  | 'FEATURE_FORMS'
  | 'FEATURE_MULTIOFFICE'
  | 'AFFILIATE';

export type Persona = 'Individual' | 'Professional';

export interface WaitlistFormData {
  email: string;
  firmName: string;
  firmSize: 'Solo' | 'Small (1-5)' | 'Medium (6-25)' | 'Enterprise (25+)';
  /** Day-one list segmentation: an individual vs. a lawyer/consultant/agency. */
  persona?: Persona;
  /** Where the lead was captured, e.g. "Exit Intent Popup", "Lead Magnet". */
  source?: string;
  /** Optional referral code/source for the waitlist referral program. */
  referralSource?: string;
  /** Affiliate's website or social profile (Affiliate Program form). */
  website?: string;
  /** Affiliate's audience / promotion channel (Affiliate Program form). */
  audience?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  span?: string;
}

export interface NavItem {
  label: string;
  page: Page;
}

export enum CRMStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}