interface ZohoTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

interface ZohoLeadResponse {
  data: Array<{
    code: string;
    details: any;
    message: string;
    status: string;
  }>;
}

interface WaitlistFormData {
  email: string;
  firmName: string;
  firmSize: string;
  /** "Individual" or "Professional" — day-one list segmentation. */
  persona?: string;
  /** Capture point, e.g. "Exit Intent Popup", "Lead Magnet". */
  source?: string;
  /** Inbound referral code from the waitlist referral program. */
  referralSource?: string;
  /** Affiliate's website or social profile (Affiliate Program form). */
  website?: string;
  /** Affiliate's audience / promotion channel (Affiliate Program form). */
  audience?: string;
}

class ZohoCRMService {
  private clientId: string;
  private clientSecret: string;
  private refreshToken: string;
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;

  constructor() {
    this.clientId = process.env.ZOHO_CLIENT_ID || '';
    this.clientSecret = process.env.ZOHO_CLIENT_SECRET || '';
    this.refreshToken = process.env.ZOHO_REFRESH_TOKEN || '';
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const response = await fetch('https://accounts.zoho.com/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: this.refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    const data: ZohoTokenResponse = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // 1 minute buffer

    return this.accessToken;
  }

  async createLead(formData: WaitlistFormData): Promise<void> {
    if (!this.clientId || !this.clientSecret || !this.refreshToken) {
      throw new Error('Zoho CRM credentials not configured');
    }

    const accessToken = await this.getAccessToken();

    const persona = formData.persona || 'Professional';
    const captureSource = formData.source || 'Website';
    const descriptionParts = [
      `Persona: ${persona}`,
      `Firm Size: ${formData.firmSize}`,
      `Capture Source: ${captureSource}`,
    ];
    if (formData.audience) {
      descriptionParts.push(`Audience / Channel: ${formData.audience}`);
    }
    if (formData.referralSource) {
      descriptionParts.push(`Referred By: ${formData.referralSource}`);
    }

    const leadData = {
      data: [{
        Company: formData.firmName,
        Last_Name: formData.firmName,
        Email: formData.email,
        // Industry is a standard Zoho Leads picklist field, handy for segmentation.
        Industry: persona === 'Individual' ? 'Individual / Applicant' : 'Immigration Professional',
        // Optional standard Zoho field; affiliates submit a website/social profile.
        ...(formData.website ? { Website: formData.website } : {}),
        Description: descriptionParts.join(' | '),
        Lead_Source: 'Immistack Website',
        Lead_Status: 'Not Contacted'
      }]
    };

    const response = await fetch('https://www.zohoapis.com/crm/v2/Leads', {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create lead: ${errorData.message || response.statusText}`);
    }

    const result: ZohoLeadResponse = await response.json();

    if (result.data[0].status !== 'success') {
      throw new Error(`Zoho CRM error: ${result.data[0].message}`);
    }

    console.log('Lead created successfully:', result.data[0]);
  }
}

const zohoCRMService = new ZohoCRMService();

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      email,
      firmName,
      firmSize,
      persona,
      source,
      referralSource,
      website,
      audience,
    }: WaitlistFormData = req.body;

    // Validate required fields
    if (!email || !firmName || !firmSize) {
      return res.status(400).json({
        message: 'Missing required fields: email, firmName, firmSize'
      });
    }

    // Create lead in Zoho CRM. All forms (waitlist, lead magnet, affiliate)
    // submit to this single endpoint; segmentation comes from persona/source.
    await zohoCRMService.createLead({
      email,
      firmName,
      firmSize,
      persona,
      source,
      referralSource,
      website,
      audience,
    });

    res.status(200).json({
      message: 'Lead created successfully in Zoho CRM'
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({
      message: 'Failed to create lead in Zoho CRM',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}