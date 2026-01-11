'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProgressStepper from '@/components/organisms/ProgressStepper';
import { PLANS } from '@/lib/constants';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';

export default function DashboardUpgradeDomainPage() {
  const router = useRouter();
  const { t } = useLocale();
  const [domainChoice, setDomainChoice] = useState<'new' | 'existing'>('new');
  const [domainName, setDomainName] = useState('');
  const [domainExtension, setDomainExtension] = useState('.com');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [emailAccounts, setEmailAccounts] = useState(5);
  const [storage, setStorage] = useState('10GB');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    // Get selected plan from localStorage
    const planId = localStorage.getItem('selectedPlan');
    const period = localStorage.getItem('billingPeriod') as 'monthly' | 'yearly' | null;
    const plan = PLANS.find((p) => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
      setEmailAccounts(plan.emailAccounts);
      setStorage(plan.storage);
      if (period === 'monthly' || period === 'yearly') {
        setBillingPeriod(period);
      }
    } else {
      router.push('/dashboard/upgrade');
    }
  }, [router]);

  const handleCheckDomain = () => {
    if (domainName) {
      // Simulate domain check
      setSelectedDomain(`${domainName}${domainExtension}`);
    }
  };

  const handleContinue = () => {
    if (selectedDomain) {
      localStorage.setItem('selectedDomain', selectedDomain);
      localStorage.setItem('emailAccounts', emailAccounts.toString());
      localStorage.setItem('storage', storage);
      router.push('/dashboard/upgrade/billing');
    }
  };

  const getTotalPrice = () => {
    const planPrice = selectedPlan?.price || 0;
    const domainPrice = selectedDomain ? 15 : 0;
    return planPrice + domainPrice;
  };

  if (!selectedPlan) {
    return null;
  }

  return (
    <div className="p-6 lg:p-10">
      <div className="mx-auto max-w-[1200px] flex flex-col gap-8">
        <ProgressStepper
          currentStep={2}
          totalSteps={4}
          stepLabels={[t('domain.step.plan'), t('domain.step.domain'), t('domain.step.billing'), t('domain.step.payment')]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-[#0c121d] dark:text-white tracking-tight text-3xl font-bold leading-tight">
                {t('domain.chooseTitle')}
              </h1>
              <p className="text-[#4563a1] dark:text-gray-400 text-base font-normal leading-normal">
                {t('domain.chooseSubtitle')}
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 md:p-8 shadow-sm">
              <div className="flex mb-8">
                <div className="flex h-12 w-full md:w-auto items-center justify-center rounded-lg bg-[#f0f4f8] dark:bg-gray-800 p-1">
                  <label
                    className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-6 transition-all duration-200 ${
                      domainChoice === 'new'
                        ? 'bg-white dark:bg-gray-700 shadow-sm text-primary dark:text-white'
                        : 'text-gray-500'
                    }`}
                  >
                    <span className="truncate text-sm font-semibold">{t('domain.tab.new')}</span>
                    <input
                      checked={domainChoice === 'new'}
                      onChange={() => setDomainChoice('new')}
                      className="invisible w-0"
                      name="domain_choice"
                      type="radio"
                      value="new"
                    />
                  </label>
                  <label
                    className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-6 transition-all duration-200 ${
                      domainChoice === 'existing'
                        ? 'bg-white dark:bg-gray-700 shadow-sm text-primary dark:text-white'
                        : 'text-gray-500'
                    }`}
                  >
                    <span className="truncate text-sm font-semibold">{t('domain.tab.existing')}</span>
                    <input
                      checked={domainChoice === 'existing'}
                      onChange={() => setDomainChoice('existing')}
                      className="invisible w-0"
                      name="domain_choice"
                      type="radio"
                      value="existing"
                    />
                  </label>
                </div>
              </div>

              {domainChoice === 'new' ? (
                <>
                  <div className="flex flex-col md:flex-row items-start md:items-end gap-4 mb-8">
                    <label className="flex flex-col w-full md:flex-[2]">
                      <p className="text-[#0c121d] dark:text-gray-300 text-sm font-semibold leading-normal pb-2">
                        {t('domain.nameLabel')}
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-[#0c121d] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#cdd7ea] dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-gray-400 p-4 text-lg font-normal leading-normal"
                        placeholder="mycompany"
                        value={domainName}
                        onChange={(e) => setDomainName(e.target.value)}
                      />
                    </label>
                    <label className="flex flex-col w-full md:w-32 md:flex-none">
                      <p className="text-[#0c121d] dark:text-gray-300 text-sm font-semibold leading-normal pb-2">
                        {t('domain.extensionLabel')}
                      </p>
                      <div className="relative">
                        <select
                          className="form-select w-full appearance-none rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-white dark:bg-gray-800 text-[#0c121d] dark:text-white h-12 px-4 pr-8 text-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
                          value={domainExtension}
                          onChange={(e) => setDomainExtension(e.target.value)}
                        >
                          <option>.com</option>
                          <option>.net</option>
                          <option>.org</option>
                          <option>.io</option>
                          <option>.co</option>
                        </select>
                      </div>
                    </label>
                    <Button onClick={handleCheckDomain} className="h-12 w-full md:w-auto px-6">
                      <Icon name="search" className="text-[20px]" />
                      <span>{t('domain.check')}</span>
                    </Button>
                  </div>

                  {selectedDomain && (
                    <div className="border-t border-[#e6ebf4] dark:border-gray-700 pt-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg mb-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 dark:bg-green-800 rounded-full p-1 text-green-700 dark:text-green-300">
                            <Icon name="check" className="text-[20px] block" />
                          </div>
                          <div>
                            <p className="text-green-800 dark:text-green-300 font-bold text-lg">
                              {selectedDomain} {t('domain.availableSuffix')}
                            </p>
                            <p className="text-green-700 dark:text-green-400 text-sm">
                              {t('domain.greatChoice')}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 sm:mt-0 flex items-center gap-4 w-full sm:w-auto">
                          <span className="font-bold text-lg text-[#0c121d] dark:text-white">
                            $15.00<span className="text-sm font-normal text-gray-500">/yr</span>
                          </span>
                          <Button
                            onClick={() => setSelectedDomain(selectedDomain)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto"
                          >
                            {t('domain.select')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-4">
                  <label className="flex flex-col">
                    <p className="text-[#0c121d] dark:text-gray-300 text-sm font-semibold leading-normal pb-2">
                      {t('domain.nameLabel')}
                    </p>
                    <input
                      className="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-[#0c121d] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#cdd7ea] dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-gray-400 p-4 text-lg font-normal leading-normal"
                      placeholder="example.com"
                      value={domainName}
                      onChange={(e) => {
                        setDomainName(e.target.value);
                        setSelectedDomain(e.target.value);
                      }}
                    />
                  </label>
                </div>
              )}

              <div className="mt-8">
                <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 md:p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-[#0c121d] dark:text-white mb-4">
                    {t('domain.planSettings')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col">
                      <p className="text-[#0c121d] dark:text-gray-300 text-sm font-semibold leading-normal pb-2">
                        {t('domain.accountsRequested')}
                      </p>
                      <input
                        type="number"
                        min={1}
                        max={selectedPlan?.emailAccounts > 0 ? selectedPlan.emailAccounts : 500}
                        value={emailAccounts}
                        onChange={(e) => setEmailAccounts(Number(e.target.value))}
                        className="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-[#0c121d] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-[#cdd7ea] dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-gray-400 p-4 text-lg font-normal leading-normal"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        {selectedPlan?.id === 'enterprise'
                          ? 'Unlimited available'
                          : `Up to ${selectedPlan?.emailAccounts} ${t('common.users')}`}
                      </p>
                    </label>
                    <label className="flex flex-col">
                      <p className="text-[#0c121d] dark:text-gray-300 text-sm font-semibold leading-normal pb-2">
                        {t('domain.storagePerAccount')}
                      </p>
                      <select
                        value={storage}
                        onChange={(e) => setStorage(e.target.value)}
                        className="form-select w-full appearance-none rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-white dark:bg-gray-800 text-[#0c121d] dark:text-white h-12 px-4 pr-8 text-lg focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        <option>2GB</option>
                        <option>5GB</option>
                        <option>10GB</option>
                        <option>20GB</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-2">
                        {t('domain.perAccountSuffix')}
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#1a202c] rounded-lg border border-[#e6ebf4] dark:border-gray-700">
                  <Icon name="lock" className="text-primary text-2xl" />
                  <div>
                    <p className="text-xs font-bold text-[#0c121d] dark:text-white">{t('domain.secureTransfer')}</p>
                    <p className="text-xs text-gray-500">{t('domain.encryption')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#1a202c] rounded-lg border border-[#e6ebf4] dark:border-gray-700">
                  <Icon name="support_agent" className="text-primary text-2xl" />
                  <div>
                    <p className="text-xs font-bold text-[#0c121d] dark:text-white">{t('domain.support24')}</p>
                    <p className="text-xs text-gray-500">{t('domain.liveChat')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#1a202c] rounded-lg border border-[#e6ebf4] dark:border-gray-700">
                  <Icon name="dns" className="text-primary text-2xl" />
                  <div>
                    <p className="text-xs font-bold text-[#0c121d] dark:text-white">{t('domain.autoConfig')}</p>
                    <p className="text-xs text-gray-500">{t('domain.dnsIncluded')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6 flex flex-col gap-6">
              <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#0c121d] dark:text-white mb-6 pb-4 border-b border-[#e6ebf4] dark:border-gray-700">
                  {t('order.summary')}
                </h2>
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-[#0c121d] dark:text-white text-sm">
                        {selectedPlan.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {emailAccounts} {t('common.users')}, {storage} {t('domain.perAccountSuffix')}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-gray-500">{t('order.billingPeriod')}:</span>
                        <span className="text-xs font-medium text-[#0c121d] dark:text-white">
                          {billingPeriod === 'yearly' ? t('plans.toggle.yearly') : t('plans.toggle.monthly')}
                        </span>
                        {billingPeriod === 'yearly' && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full ml-2">
                            <Icon name="percent" className="text-[12px]" />
                            <span>{t('plans.toggle.save20')}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="font-medium text-[#0c121d] dark:text-white text-sm">
                      ${selectedPlan.price}.00/mo
                    </p>
                  </div>
                  {selectedDomain && (
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-[#0c121d] dark:text-white text-sm">
                          {selectedDomain}
                        </p>
                        <p className="text-xs text-gray-500">{t('domain.registrationOneYear')}</p>
                      </div>
                      <p className="font-medium text-[#0c121d] dark:text-white text-sm">$15.00</p>
                    </div>
                  )}
                </div>
                <div className="border-t border-[#e6ebf4] dark:border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between items-end">
                    <span className="text-base font-normal text-gray-500">{t('order.totalDueToday')}</span>
                    <span className="text-2xl font-bold text-[#0c121d] dark:text-white">
                      ${getTotalPrice()}.00
                    </span>
                  </div>
                </div>
                <Button
                  onClick={handleContinue}
                  disabled={!selectedDomain}
                  className="w-full disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-between items-center group"
                >
                  <span>{t('domain.continueBilling')}</span>
                  <Icon name="arrow_forward" className="group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-xs text-center text-gray-400 mt-4">
                  {t('common.termsAgreed')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
