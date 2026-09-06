import React from 'react';

/**
 * Rebuilt route set (Nadia's SEO architecture, 2026-09-05): 22 routes collapsed
 * to the ones with a distinct query and full internal-link weight. Six former
 * feature pages (AI, tasks, forms, multi-office, staff portal, admin portal)
 * merged into FEATURES; /trust-accounting and /commission-tracking killed with
 * no redirect (never had a `Page` id, never in `PAGES[]`).
 */
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
  | 'FEATURE_BILLING'
  | 'AFFILIATE';

export type Persona = 'Individual' | 'Professional';

export interface WaitlistFormData {
  email: string;
  firmName: string;
  firmSize: 'Solo' | 'Small (1-5)' | 'Medium (6-25)' | 'Enterprise (25+)';
  /** Day-one list segmentation: an individual vs. a lawyer/consultant/agency. */
  persona?: Persona;
  /** Where the lead was captured, e.g. "Pricing CTA", "Nav CTA". */
  source?: string;
  /** Affiliate's website or social profile (Affiliate Program form). */
  website?: string;
  /** Affiliate's audience / promotion channel (Affiliate Program form). */
  audience?: string;
  /** Honeypot — a real visitor never fills this. Never rendered visibly. */
  company_website?: string;
}

export interface NavItem {
  label: string;
  page: Page;
}

export enum CRMStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/** Capability-table status vocabulary — maps 1:1 to a `.t-*` CSS class. */
export type CapabilityStatus = 'live' | 'pack' | 'sandbox' | 'caution' | 'not-integrated';

export interface CapabilityRow {
  capability: string;
  status: CapabilityStatus;
  /** Optional tier gate shown as a second, neutral tag (e.g. "Practice Pro+"). */
  tier?: string;
  detail?: string;
}
