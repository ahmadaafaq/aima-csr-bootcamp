export interface Nominee {
  id: string;
  name: string;
  designation: string;
  email: string;
  mobile: string;
}

export interface FormData {
  // Section 01: Organisation
  orgName: string;
  authName: string;
  authDesignation: string;
  authEmail: string;
  authMobile: string;

  // Section 02: CSR Profile
  annualBudgetSlab: string;
  focusAreas: string[];
  executionChannels: string[];
  otherPriorities: string;

  // Section 03: Nominees
  nominees: Nominee[];

  // Section 04: Fee & Membership
  isAimaMember: boolean;
  aimaMembershipNo: string;

  // Section 05: Billing & Invoicing
  billingOrgName: string;
  billingAddress: string;
  billingState: string;
  billingPinCode: string;
  billingGstin: string;
  billingContactPerson: string;
  billingEmail: string;
  billingMobile: string;
  poNumber: string;

  // Payment Preference
  paymentPreference: 'pay_now' | 'pay_later';

  // Section 06: Management Authorisation
  execName: string;
  execDesignation: string;
  isAuthorized: boolean;
}

export interface PaymentDetails {
  method: 'upi' | 'card' | 'netbanking' | 'bank_transfer' | 'proforma_invoice';
  methodLabel: string;
  transactionId: string;
  timestamp: string;
  paidAmount: number;
  bankOrVpa?: string;
  cardLast4?: string;
  cardType?: string;
  status: 'Paid' | 'Pending / Pay Later';
}

export interface FeeCalculation {
  participantCount: number;
  ratePerPerson: number;
  tierLabel: string;
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  netSubtotal: number;
  gstRate: number;
  gstAmount: number;
  totalPayable: number;
}

export const BUDGET_SLABS = [
  'Below ₹2 Cr',
  '₹2 Cr – ₹5 Cr',
  '₹5 Cr – ₹10 Cr',
  '₹10 Cr – ₹50 Cr',
  '₹50 Cr – ₹100 Cr',
  'Above ₹100 Cr',
] as const;

export const FOCUS_AREAS = [
  'Education & Skilling',
  'Heritage, Art & Culture',
  'Healthcare & Sanitation',
  'Environment & Water',
  'Disaster Management & Relief',
  'Rural Infrastructure Development',
  'Gender Equality & Empowerment',
  'Technology Incubators & R&D',
  'Poverty & Hunger Alleviation',
  'Slum Area Development',
  'Other',
] as const;

export const EXECUTION_CHANNELS = [
  'Direct Corporate Delivery',
  'Public Sector / Government SPV',
  'Collaborative Co-investment with Corporates',
  'Enlisted NGO Partners (CSR-1 Registered)',
  'Internal Corporate Foundation',
  'Social Stock Exchange (ZCZP Instruments)',
  'Other',
] as const;

export const INDIAN_STATES = [
  'Delhi NCR',
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'Gujarat',
  'Uttar Pradesh',
  'Haryana',
  'West Bengal',
  'Telangana',
  'Andhra Pradesh',
  'Rajasthan',
  'Madhya Pradesh',
  'Kerala',
  'Punjab',
  'Odisha',
  'Bihar',
  'Assam',
  'Jharkhand',
  'Chhattisgarh',
  'Uttarakhand',
  'Goa',
  'Himachal Pradesh',
  'Other / Union Territory',
] as const;

export const INITIAL_FORM_DATA: FormData = {
  orgName: 'ABC Infrastructure Limited',
  authName: 'Rajiv Sharma',
  authDesignation: 'Vice President – Corporate Affairs',
  authEmail: 'rajiv.sharma@abcinfrastructure.com',
  authMobile: '9876543210',

  annualBudgetSlab: '₹10 Cr – ₹50 Cr',
  focusAreas: [
    'Education & Skilling',
    'Environment & Water',
    'Gender Equality & Empowerment',
  ],
  executionChannels: [
    'Direct Corporate Delivery',
    'Enlisted NGO Partners (CSR-1 Registered)',
  ],
  otherPriorities:
    'Development of sustainable community water management systems around manufacturing hubs and skill training workshops for rural youth.',

  nominees: [
    {
      id: 'nom-1',
      name: 'Ananya Mehta',
      designation: 'Head – CSR',
      email: 'ananya.mehta@abcinfrastructure.com',
      mobile: '9876543211',
    },
    {
      id: 'nom-2',
      name: 'Vikram Kapoor',
      designation: 'Senior Manager – Sustainability',
      email: 'vikram.kapoor@abcinfrastructure.com',
      mobile: '9876543212',
    },
    {
      id: 'nom-3',
      name: 'Priya Nair',
      designation: 'Manager – Corporate Affairs',
      email: 'priya.nair@abcinfrastructure.com',
      mobile: '9876543213',
    },
  ],

  isAimaMember: true,
  aimaMembershipNo: 'AIMA/CORP/2024/7821',

  billingOrgName: 'ABC Infrastructure Limited',
  billingAddress: '42, Institutional Area, Lodi Road Corridor',
  billingState: 'Delhi NCR',
  billingPinCode: '110003',
  billingGstin: '09AABCA1234A1Z5',
  billingContactPerson: 'Rajiv Sharma',
  billingEmail: 'rajiv.sharma@abcinfrastructure.com',
  billingMobile: '9876543210',
  poNumber: 'PO/CSR/2026/084',

  paymentPreference: 'pay_now',

  execName: 'Rajiv Sharma',
  execDesignation: 'Vice President – Corporate Affairs',
  isAuthorized: true,
};

export function calculateFee(count: number, isAimaMember: boolean): FeeCalculation {
  const safeCount = Math.max(1, count);
  let ratePerPerson = 14000;
  let tierLabel = 'Standard Rate (1–3 Participants)';

  if (safeCount >= 8) {
    ratePerPerson = 10000;
    tierLabel = 'Special Institutional Tier (8+ Participants)';
  } else if (safeCount >= 4) {
    ratePerPerson = 11500;
    tierLabel = 'Group Tier (4–7 Participants)';
  }

  const subtotal = safeCount * ratePerPerson;
  const discountPercent = isAimaMember ? 10 : 0;
  const discountAmount = isAimaMember ? Math.round(subtotal * 0.1) : 0;
  const netSubtotal = subtotal - discountAmount;
  const gstRate = 0.18;
  const gstAmount = Math.round(netSubtotal * gstRate);
  const totalPayable = netSubtotal + gstAmount;

  return {
    participantCount: safeCount,
    ratePerPerson,
    tierLabel,
    subtotal,
    discountPercent,
    discountAmount,
    netSubtotal,
    gstRate,
    gstAmount,
    totalPayable,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
