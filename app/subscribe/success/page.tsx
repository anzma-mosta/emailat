'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@/components/atoms/Icon';
import { useLocale } from '@/components/providers/LocaleProvider';
import { PLANS } from '@/lib/constants';

export default function SuccessPage() {
  const router = useRouter();
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const { t } = useLocale();

  useEffect(() => {
    const planId = localStorage.getItem('selectedPlan');
    const domain = localStorage.getItem('selectedDomain');
    const userDetails = localStorage.getItem('userDetails');
    const plan = PLANS.find((p) => p.id === planId);

    if (!plan || !userDetails) {
      router.push('/subscribe/plans');
      return;
    }

    setSubscriptionData({
      plan,
      domain,
      userDetails: JSON.parse(userDetails),
    });
  }, [router]);

  if (!subscriptionData) {
    return null;
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0c121d] dark:text-white transition-colors duration-200">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden font-display">
        <main className="layout-container flex h-full grow flex-col items-center justify-center py-10 px-4 md:px-10">
          <div className="layout-content-container flex flex-col max-w-[640px] w-full flex-1">
            <div className="flex flex-col items-center gap-6 text-center py-6">
              <div className="size-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 animate-bounce-subtle">
                <Icon name="check_circle" className="text-[48px]" />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[#0c121d] dark:text-white tracking-tight text-3xl md:text-4xl font-black leading-tight">
                  {t('success.title')}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal max-w-[480px] mx-auto">
                  {t('success.description')}
                </p>
              </div>
            </div>

            <div className="mt-8 bg-white dark:bg-[#1a2332] rounded-xl shadow-sm border border-[#e6ebf4] dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-[#e6ebf4] dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 dark:bg-gray-800/20">
                <div>
                  <p className="text-xs font-semibold text-primary dark:text-blue-400 uppercase tracking-wide mb-1">
                    {t('success.paymentConfirmed')}
                  </p>
                  <h3 className="text-lg font-bold text-[#0c121d] dark:text-white">{t('order.summary')}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Icon name="receipt_long" className="text-lg" />
                  <span>{t('success.invoiceLabel')} #10234</span>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-dashed border-gray-200 dark:border-gray-700 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary dark:text-blue-400">
                      <Icon name="domain" />
                    </div>
                    <div>
                      <p className="font-bold text-[#0c121d] dark:text-white">
                        {subscriptionData.plan.name} {t('success.emailPlan')}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {subscriptionData.plan.storage} {t('common.storage')} • {t('success.monthlyBilling')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 text-right">
                    <p className="font-bold text-lg text-[#0c121d] dark:text-white">
                      ${subscriptionData.plan.price}.00
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 mb-1">{t('success.domain')}</p>
                    <p className="font-medium text-[#0c121d] dark:text-white">
                      @{subscriptionData.domain || 'غير محدد'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 mb-1">{t('success.paymentMethod')}</p>
                    <div className="flex items-center gap-2">
                      <Icon name="credit_card" className="text-gray-400 text-lg" />
                      <p className="font-medium text-[#0c121d] dark:text-white">{t('success.methodCard')}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 mb-1">{t('success.billingDate')}</p>
                    <p className="font-medium text-[#0c121d] dark:text-white">
                      {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 mb-1">{t('success.nextInvoice')}</p>
                    <p className="font-medium text-[#0c121d] dark:text-white">
                      {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-[#e6ebf4] dark:border-gray-700 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Icon name="verified" className="text-green-600 dark:text-green-400 text-lg" />
                  <span>{t('success.paymentSecure')}</span>
                </div>
                <button className="flex items-center gap-2 text-primary dark:text-blue-400 text-sm font-bold hover:underline">
                  <Icon name="download" className="text-lg" />
                  {t('success.downloadInvoice')}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-8 w-full max-w-[400px] mx-auto">
              <Link
                href="/dashboard"
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary hover:bg-blue-800 text-white text-base font-bold leading-normal tracking-[0.015em] transition-all shadow-md hover:shadow-lg"
              >
                <span className="truncate">{t('success.goDashboard')}</span>
                <Icon name="arrow_forward" className="ml-2 text-xl" />
              </Link>
            </div>

            <div className="mt-12 text-center">
              <a
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-primary dark:hover:text-blue-400 transition-colors flex items-center justify-center gap-1"
                href="#"
              >
                {t('success.needHelp')}
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
