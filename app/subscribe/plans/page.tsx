'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PLANS } from '@/lib/constants';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';

export default function PlansPage() {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const { t } = useLocale();

  const handleSelectPlan = (planId: string) => {
    // Store plan selection (in a real app, use context or localStorage)
    localStorage.setItem('selectedPlan', planId);
    localStorage.setItem('billingPeriod', billingPeriod);
    router.push('/subscribe/domain');
  };

  const getPrice = (plan: typeof PLANS[0]) => {
    if (billingPeriod === 'yearly') {
      return Math.round(plan.price * 12 * 0.8); // 20% discount
    }
    return plan.price;
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-20 px-4 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-2xl bg-primary/5 dark:bg-slate-800/50 p-8 md:p-12 text-center border border-slate-200 dark:border-slate-800">
              <div
                className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#0036a3 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />
              <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                  {t('plans.title')}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                  {t('plans.subtitle')}
                </p>
                <div className="flex items-center gap-4 mt-4 bg-white dark:bg-slate-900 p-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                  <button
                    onClick={() => setBillingPeriod('monthly')}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      billingPeriod === 'monthly'
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {t('plans.toggle.monthly')}
                  </button>
                  <button
                    onClick={() => setBillingPeriod('yearly')}
                    className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${
                      billingPeriod === 'yearly'
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {t('plans.toggle.yearly')}{' '}
                    {billingPeriod === 'yearly' && (
                      <span className="text-[10px] uppercase mr-1 opacity-90 font-normal">{t('plans.toggle.save20')}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full pb-20 px-4 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`flex flex-col rounded-2xl border ${
                    plan.popular
                      ? 'border-2 border-primary bg-white dark:bg-slate-800 p-8 shadow-xl relative md:-mt-4 md:mb-4'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 left-0 -mt-4 flex justify-center">
                      <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                        {t('plans.popular')}
                      </span>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {plan.description}
                    </p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                        ${billingPeriod === 'yearly' ? Math.round(getPrice(plan) / 12) : getPrice(plan)}
                      </span>
                      <span className="text-base font-medium text-slate-500 dark:text-slate-400">
                        {t('plans.perMonth')}
                      </span>
                    </div>
                    {billingPeriod === 'yearly' && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        ${getPrice(plan)}{t('plans.perYear')}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full py-3 px-4 rounded-lg font-bold transition-colors ${
                      plan.popular
                        ? 'bg-primary text-white hover:bg-blue-800 shadow-md hover:shadow-lg'
                        : 'border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-white hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary bg-transparent'
                    }`}
                  >
                    {plan.id === 'enterprise' ? t('plans.contactSales') : t('plans.selectPlan')}
                  </button>
                  <div className="mt-8 space-y-4">
                    {plan.features.map((feature, index) => (
                      <div
                        key={index}
                        className={`flex gap-3 text-sm ${
                          plan.popular
                            ? 'font-medium text-slate-900 dark:text-white'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <Icon name="check_circle" className="text-primary shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full pb-20 px-4 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-3 mb-8">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {t('plans.compare.title')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                {t('plans.compare.subtitle')}
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="grid grid-cols-4 md:grid-cols-4">
                <div className="p-4 md:p-6 text-sm font-bold text-slate-900 dark:text-white">
                  {t('plans.compare.feature')}
                </div>
                {PLANS.map((plan) => (
                  <div key={plan.id} className="p-4 md:p-6 text-sm font-bold text-slate-900 dark:text-white border-l border-slate-100 dark:border-slate-700">
                    {plan.name}
                  </div>
                ))}
              </div>
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                <div className="grid grid-cols-4 md:grid-cols-4">
                  <div className="p-4 md:p-6 text-sm text-slate-700 dark:text-slate-300">
                    {t('plans.compare.emailAccounts')}
                  </div>
                  {PLANS.map((plan) => (
                    <div key={plan.id} className="p-4 md:p-6 text-sm text-slate-900 dark:text-white border-l border-slate-100 dark:border-slate-700">
                      {plan.emailAccounts === -1 ? t('plans.compare.unlimited') : plan.emailAccounts}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-4 md:grid-cols-4">
                  <div className="p-4 md:p-6 text-sm text-slate-700 dark:text-slate-300">
                    {t('plans.compare.storage')}
                  </div>
                  {PLANS.map((plan) => (
                    <div key={plan.id} className="p-4 md:p-6 text-sm text-slate-900 dark:text-white border-l border-slate-100 dark:border-slate-700">
                      {plan.storage}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-4 md:grid-cols-4">
                  <div className="p-4 md:p-6 text-sm text-slate-700 dark:text-slate-300">
                    {t('plans.compare.support')}
                  </div>
                  {PLANS.map((plan) => {
                    const hasDedicated = plan.features.includes('Dedicated Account Manager');
                    const hasPriority = plan.features.includes('Priority Support');
                    const label = hasDedicated
                      ? t('plans.compare.support.dedicated')
                      : hasPriority
                      ? t('plans.compare.support.priority')
                      : t('plans.compare.support.basic');
                    return (
                      <div key={plan.id} className="p-4 md:p-6 text-sm text-slate-900 dark:text-white border-l border-slate-100 dark:border-slate-700">
                        {label}
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-4 md:grid-cols-4">
                  <div className="p-4 md:p-6 text-sm text-slate-700 dark:text-slate-300">
                    {t('plans.compare.freeDomain')}
                  </div>
                  {PLANS.map((plan) => {
                    const has = plan.features.includes('Free Domain (1 year)');
                    return (
                      <div key={plan.id} className="p-4 md:p-6 text-sm border-l border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                          <Icon name={has ? 'check_circle' : 'minus'} className={has ? 'text-green-600 dark:text-green-400' : 'text-slate-400'} />
                          <span className="text-slate-900 dark:text-white">{has ? t('plans.compare.included') : t('plans.compare.notIncluded')}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-4 md:grid-cols-4">
                  <div className="p-4 md:p-6 text-sm text-slate-700 dark:text-slate-300">
                    {t('plans.compare.backups')}
                  </div>
                  {PLANS.map((plan) => {
                    const has = plan.features.includes('Daily Backups');
                    return (
                      <div key={plan.id} className="p-4 md:p-6 text-sm border-l border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                          <Icon name={has ? 'check_circle' : 'minus'} className={has ? 'text-green-600 dark:text-green-400' : 'text-slate-400'} />
                          <span className="text-slate-900 dark:text-white">{has ? t('plans.compare.included') : t('plans.compare.notIncluded')}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-4 md:grid-cols-4">
                  <div className="p-4 md:p-6 text-sm text-slate-700 dark:text-slate-300">
                    {t('plans.compare.security')}
                  </div>
                  {PLANS.map((plan) => {
                    const has = plan.features.includes('Advanced Security');
                    return (
                      <div key={plan.id} className="p-4 md:p-6 text-sm border-l border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                          <Icon name={has ? 'check_circle' : 'minus'} className={has ? 'text-green-600 dark:text-green-400' : 'text-slate-400'} />
                          <span className="text-slate-900 dark:text-white">{has ? t('plans.compare.included') : t('plans.compare.notIncluded')}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-4 md:grid-cols-4">
                  <div className="p-4 md:p-6 text-sm text-slate-700 dark:text-slate-300">
                    {t('plans.compare.uptime')}
                  </div>
                  {PLANS.map((plan) => {
                    const has = plan.features.includes('99.9% Uptime Guarantee');
                    return (
                      <div key={plan.id} className="p-4 md:p-6 text-sm border-l border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                          <Icon name={has ? 'check_circle' : 'minus'} className={has ? 'text-green-600 dark:text-green-400' : 'text-slate-400'} />
                          <span className="text-slate-900 dark:text-white">{has ? '99.9%' : t('plans.compare.notIncluded')}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full pb-28 px-4 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-3 mb-6">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {t('plans.faq.title')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <details className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
                <summary className="cursor-pointer flex items-center justify-between">
                  <span className="text-slate-900 dark:text-white font-bold">{t('plans.faq.q1')}</span>
                  <Icon name="arrow_forward" className="transition-transform group-open:rotate-90 text-slate-500" />
                </summary>
                <p className="mt-4 text-slate-600 dark:text-slate-300">{t('plans.faq.a1')}</p>
              </details>
              <details className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
                <summary className="cursor-pointer flex items-center justify-between">
                  <span className="text-slate-900 dark:text-white font-bold">{t('plans.faq.q2')}</span>
                  <Icon name="arrow_forward" className="transition-transform group-open:rotate-90 text-slate-500" />
                </summary>
                <p className="mt-4 text-slate-600 dark:text-slate-300">{t('plans.faq.a2')}</p>
              </details>
              <details className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
                <summary className="cursor-pointer flex items-center justify-between">
                  <span className="text-slate-900 dark:text-white font-bold">{t('plans.faq.q3')}</span>
                  <Icon name="arrow_forward" className="transition-transform group-open:rotate-90 text-slate-500" />
                </summary>
                <p className="mt-4 text-slate-600 dark:text-slate-300">{t('plans.faq.a3')}</p>
              </details>
              <details className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
                <summary className="cursor-pointer flex items-center justify-between">
                  <span className="text-slate-900 dark:text-white font-bold">{t('plans.faq.q4')}</span>
                  <Icon name="arrow_forward" className="transition-transform group-open:rotate-90 text-slate-500" />
                </summary>
                <p className="mt-4 text-slate-600 dark:text-slate-300">{t('plans.faq.a4')}</p>
              </details>
              <details className="group rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 md:col-span-2">
                <summary className="cursor-pointer flex items-center justify-between">
                  <span className="text-slate-900 dark:text-white font-bold">{t('plans.faq.q5')}</span>
                  <Icon name="arrow_forward" className="transition-transform group-open:rotate-90 text-slate-500" />
                </summary>
                <p className="mt-4 text-slate-600 dark:text-slate-300">{t('plans.faq.a5')}</p>
              </details>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

