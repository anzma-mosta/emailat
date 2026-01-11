export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: string[];
  storage: string;
  emailAccounts: number;
  popular?: boolean;
}

export interface SubscriptionData {
  planId?: string;
  domain?: string;
  emailAccounts?: number;
  storage?: string;
  phone?: string;
  countryCode?: string;
  userDetails?: {
    name: string;
    email: string;
    password: string;
  };
  paymentMethod?: 'card' | 'paypal' | 'bank';
}

