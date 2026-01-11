import { Plan } from './types';

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for freelancers.',
    price: 5,
    period: 'monthly',
    features: [
      '5 Email Accounts',
      '10GB Storage',
      'Basic Support',
      'Spam Protection',
    ],
    storage: '10GB',
    emailAccounts: 5,
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'For expanding teams.',
    price: 15,
    period: 'monthly',
    features: [
      '20 Email Accounts',
      '50GB Storage',
      'Free Domain (1 year)',
      'Priority Support',
      'Daily Backups',
    ],
    storage: '50GB',
    emailAccounts: 20,
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Maximum power and scale.',
    price: 45,
    period: 'monthly',
    features: [
      'Unlimited Accounts',
      '1TB Storage',
      'Advanced Security',
      'Dedicated Account Manager',
      '99.9% Uptime Guarantee',
    ],
    storage: '1TB',
    emailAccounts: -1, // unlimited
  },
];

