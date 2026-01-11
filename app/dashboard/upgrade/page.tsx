'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PLANS } from '@/lib/constants';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import ProgressStepper from '@/components/organisms/ProgressStepper';

export default function UpgradePage() {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const { t } = useLocale();

  const handleSelectPlan = (planId: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedPlan', planId);
      localStorage.setItem('billingPeriod', billingPeriod);
    }
    // Instead of going to /subscribe/domain, we stay in dashboard
    router.push('/dashboard/upgrade/domain');
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="mx-auto max-w-[1200px] flex flex-col gap-8">
        <ProgressStepper
          currentStep={1}
          totalSteps={3}
          stepLabels={[t('domain.step.plan'), t('domain.step.domain'), t('domain.step.payment')]}
        />
        <div className="flex flex-col gap-2 border-b border-[#e6ebf4] dark:border-gray-800 pb-6">
          <h1 className="text-3xl font-bold text-[#0c121d] dark:text-white">
            {t('plans.title')}
          </h1>
          <p className="text-lg text-[#4563a1] dark:text-gray-400 max-w-2xl">
            {t('plans.subtitle')}
          </p>
          
          <div className="flex items-center gap-4 mt-6 bg-white dark:bg-[#1a202c] p-1.5 rounded-full border border-[#e6ebf4] dark:border-gray-700 shadow-sm w-fit">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-500 hover:text-[#0c121d] dark:hover:text-white'
              }`}
            >
              {t('plans.toggle.monthly')}
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 text-sm font-bold rounded-full transition-all flex items-center gap-2 ${
                billingPeriod === 'yearly'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-500 hover:text-[#0c121d] dark:hover:text-white'
              }`}
            >
              {t('plans.toggle.yearly')}
              {billingPeriod === 'yearly' && (
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase font-normal">
                  {t('plans.toggle.save20')}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`flex flex-col rounded-2xl border transition-all duration-300 ${
                plan.popular
                  ? 'border-2 border-primary bg-white dark:bg-[#1a202c] p-8 shadow-xl relative md:-mt-4'
                  : 'border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] p-8 shadow-sm hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 left-0 -mt-4 flex justify-center">
                  <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    {t('plans.popular')}
                  </span>
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#0c121d] dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-[#4563a1] dark:text-gray-400">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-black text-[#0c121d] dark:text-white">
                  ${billingPeriod === 'yearly' ? Math.round(plan.price * 0.8) : plan.price}
                </span>
                <span className="text-sm text-[#4563a1] dark:text-gray-400">
                  /{t('plans.toggle.monthly')}
                </span>
              </div>

              <div className="flex flex-col gap-4 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                      <Icon name="check" className="text-xs" />
                    </div>
                    <span className="text-sm text-[#0c121d] dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.popular ? 'default' : 'outline'}
                className="w-full py-6 text-base font-bold"
                onClick={() => handleSelectPlan(plan.id)}
              >
                {t('plans.select')}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
