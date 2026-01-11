'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/organisms/Header';
import ProgressStepper from '@/components/organisms/ProgressStepper';
import { PLANS } from '@/lib/constants';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';

export default function PaymentPage() {
  const router = useRouter();
  const { t } = useLocale();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'bank'>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [selectedDomain, setSelectedDomain] = useState<string>('');

  useEffect(() => {
    const planId = localStorage.getItem('selectedPlan');
    const domain = localStorage.getItem('selectedDomain');
    const plan = PLANS.find((p) => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
      setSelectedDomain(domain || '');
    } else {
      router.push('/subscribe/plans');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store payment method
    localStorage.setItem('paymentMethod', paymentMethod);
    if (paymentMethod === 'card') {
      localStorage.setItem('cardDetails', JSON.stringify(cardDetails));
    }
    // Simulate payment processing
    router.push('/dashboard');
  };

  const getTotalPrice = () => {
    if (!selectedPlan) return 0;
    const planPrice = selectedPlan.price;
    const domainPrice = selectedDomain ? 15 : 0;
    return planPrice + domainPrice;
  };

  if (!selectedPlan) {
    return null;
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0c121d] dark:text-white font-display min-h-screen flex flex-col overflow-x-hidden transition-colors duration-200">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1">
            <ProgressStepper
              currentStep={4}
              totalSteps={4}
              stepLabels={[t('domain.step.plan'), t('domain.step.domain'), t('domain.step.registration'), t('domain.step.payment')]}
            />

            <div className="flex flex-col gap-2 mb-8">
              <h1 className="text-[#0c121d] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
                {t('payment.reviewPay')}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-relaxed">
                {t('payment.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#0c121d] dark:text-white mb-2">
                    {t('payment.method')}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {t('payment.methodHint')}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {(['card', 'paypal', 'bank'] as const).map((method) => (
                      <label
                        key={method}
                        className={`cursor-pointer relative flex flex-col gap-3 rounded-lg border-2 p-4 transition-all ${
                          paymentMethod === method
                            ? 'border-primary bg-primary/5'
                            : 'border-[#e6ebf4] dark:border-gray-700 hover:border-primary/50'
                        }`}
                      >
                        <input
                          checked={paymentMethod === method}
                          onChange={() => setPaymentMethod(method)}
                          className="absolute right-4 top-4 h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                          name="payment_method"
                          type="radio"
                          value={method}
                        />
                        <Icon
                          name={
                            method === 'card'
                              ? 'credit_card'
                              : method === 'paypal'
                              ? 'account_balance_wallet'
                              : 'account_balance'
                          }
                          className="text-primary text-3xl"
                        />
                        <div>
                          <div className="font-bold text-[#0c121d] dark:text-white text-sm">
                            {method === 'card' ? t('payment.card') : method === 'paypal' ? t('payment.paypal') : t('payment.bank')}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {method === 'card'
                              ? t('payment.cardHint')
                              : method === 'paypal'
                              ? t('payment.paypalHint')
                              : t('payment.bankHint')}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-[#0c121d] dark:text-white mb-6">
                      {t('payment.cardDetails')}
                    </h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          {t('payment.cardNumber')}
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <Icon name="credit_card" className="text-[20px]" />
                          </span>
                          <input
                            className="block w-full rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 pl-10 pr-3 text-sm placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary dark:text-white dark:placeholder-gray-500"
                            placeholder="0000 0000 0000 0000"
                            type="text"
                            value={cardDetails.number}
                            onChange={(e) =>
                              setCardDetails({ ...cardDetails, number: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            {t('payment.expiry')}
                          </label>
                          <input
                            className="block w-full rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 px-3 text-sm placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary dark:text-white dark:placeholder-gray-500"
                            placeholder="MM / YY"
                            type="text"
                            value={cardDetails.expiry}
                            onChange={(e) =>
                              setCardDetails({ ...cardDetails, expiry: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            {t('payment.cvv')}
                          </label>
                          <input
                            className="block w-full rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 px-3 text-sm placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary dark:text-white dark:placeholder-gray-500"
                            placeholder="123"
                            type="text"
                            value={cardDetails.cvv}
                            onChange={(e) =>
                              setCardDetails({ ...cardDetails, cvv: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          {t('payment.cardholderName')}
                        </label>
                        <input
                          className="block w-full rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-white dark:bg-gray-800 py-2.5 px-3 text-sm placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary dark:text-white dark:placeholder-gray-500"
                          placeholder="John Doe"
                          type="text"
                          value={cardDetails.name}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full mt-6">
                        <span>{t('payment.completePayment')}</span>
                        <Icon name="lock" />
                      </Button>
                    </form>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 shadow-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {t('payment.redirectPaypal')}
                    </p>
                    <Button onClick={handleSubmit} className="w-full">
                      <span>{t('payment.paypal')}</span>
                    </Button>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 shadow-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {t('payment.bankInfo')}
                    </p>
                    <Button onClick={handleSubmit} className="w-full">
                      <span>{t('payment.requestInvoice')}</span>
                    </Button>
                  </div>
                )}
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
                            {selectedPlan.emailAccounts} {t('common.users')}, {selectedPlan.storage} {t('common.storage')}
                          </p>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

