'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PLANS } from '@/lib/constants';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';

export default function PricingPage() {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const { t } = useLocale();

  const handleSelectPlan = (planId: string) => {
    localStorage.setItem('selectedPlan', planId);
    localStorage.setItem('billingPeriod', billingPeriod);
    router.push('/subscribe/domain');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0c121d] dark:text-white">
      <main className="min-h-screen">
        <section className="py-20 px-4 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="text-center space-y-6 mb-16">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                {t('header.pricing')}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {t('plans.subtitle')}
              </p>
              
              <div className="flex items-center justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                  <button
                    onClick={() => setBillingPeriod('monthly')}
                    className={`px-6 py-2 text-sm font-bold rounded-full transition-all ${
                      billingPeriod === 'monthly'
                        ? 'bg-primary text-white shadow-md'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {t('plans.toggle.monthly')}
                  </button>
                  <button
                    onClick={() => setBillingPeriod('yearly')}
                    className={`px-6 py-2 text-sm font-bold rounded-full transition-all flex items-center gap-2 ${
                      billingPeriod === 'yearly'
                        ? 'bg-primary text-white shadow-md'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {t('plans.toggle.yearly')}
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase">
                      {t('plans.toggle.save20')}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PLANS.map((plan) => {
                const price = billingPeriod === 'yearly' ? Math.round(plan.price * 12 * 0.8) : plan.price;
                return (
                  <div
                    key={plan.id}
                    className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-300 ${
                      plan.popular
                        ? 'border-primary border-2 bg-white dark:bg-slate-800 shadow-2xl scale-105 z-10'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="bg-primary text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                          {t('plans.popular')}
                        </span>
                      </div>
                    )}
                    <div className="mb-8">
                      <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black">${price}</span>
                        <span className="text-gray-500">
                          {billingPeriod === 'yearly' ? t('plans.perYear') : t('plans.perMonth')}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-4 mb-10 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Icon name="check_circle" className="text-primary text-xl" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleSelectPlan(plan.id)}
                      className={`w-full py-4 rounded-xl font-bold transition-all ${
                        plan.popular
                          ? 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {t('plans.selectPlan')}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        </main>
      </div>
    
  );
}
