'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';

export default function PhonePage() {
  const router = useRouter();
  const { t } = useLocale();
  const [countryCode, setCountryCode] = useState('EG');
  const [firstName, setFirstName] = useState('Taha');
  const [lastName, setLastName] = useState('Capoo');
  const [phoneNumber, setPhoneNumber] = useState('00000000');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('billingFirstName', firstName);
    localStorage.setItem('billingLastName', lastName);
    localStorage.setItem('billingCountry', countryCode);
    localStorage.setItem('billingPhone', phoneNumber);
    localStorage.setItem('billingAddress', address);
    localStorage.setItem('billingCity', city);
    localStorage.setItem('billingZip', zip);
    router.push('/subscribe/payment');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0c121d] dark:text-white font-display min-h-screen flex flex-col overflow-x-hidden transition-colors duration-200">
      <main className="flex-grow p-4 sm:p-8">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-[#e6ebf4] dark:border-gray-700 p-6 sm:p-10">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400 mb-4">
                <Icon name="home_pin" />
              </div>
              <h1 className="text-[#0c121d] dark:text-white text-2xl sm:text-3xl font-bold leading-tight mb-1">
                {t('billing.title')}
              </h1>
            </div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[#0c121d] dark:text-gray-200 text-sm font-medium leading-normal ml-1">{t('billing.firstName')}</label>
                  <input
                    className="form-input w-full h-12 px-4 rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-background-light dark:bg-gray-800 text-[#0c121d] dark:text-white text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Taha"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#0c121d] dark:text-gray-200 text-sm font-medium leading-normal ml-1">{t('billing.lastName')}</label>
                  <input
                    className="form-input w-full h-12 px-4 rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-background-light dark:bg-gray-800 text-[#0c121d] dark:text-white text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Capoo"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#0c121d] dark:text-gray-200 text-sm font-medium leading-normal ml-1">{t('billing.country')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Image
                      alt="Flag"
                      className="rounded-[2px] object-cover border border-gray-200 dark:border-gray-600"
                      height={16}
                      src={`https://flagcdn.com/w24/${countryCode.toLowerCase()}.png`}
                      width={24}
                    />
                  </div>
                  <select
                    className="form-select w-full h-12 pl-12 pr-8 rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-background-light dark:bg-gray-800 text-[#0c121d] dark:text-white text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    required
                  >
                    <option value="EG">Egypt</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#0c121d] dark:text-gray-200 text-sm font-medium leading-normal ml-1">{t('billing.phone')}</label>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#4563a1] dark:text-gray-400 whitespace-nowrap">+20 (Egypt)</span>
                  <input
                    className="form-input w-full h-12 px-4 rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-background-light dark:bg-gray-800 text-[#0c121d] dark:text-white text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="00000000"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#0c121d] dark:text-gray-200 text-sm font-medium leading-normal ml-1">{t('billing.address')}</label>
                <input
                  className="form-input w-full h-12 px-4 rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-background-light dark:bg-gray-800 text-[#0c121d] dark:text-white text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[#0c121d] dark:text-gray-200 text-sm font-medium leading-normal ml-1">{t('billing.city')}</label>
                  <input
                    className="form-input w-full h-12 px-4 rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-background-light dark:bg-gray-800 text-[#0c121d] dark:text-white text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Cairo"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#0c121d] dark:text-gray-200 text-sm font-medium leading-normal ml-1">{t('billing.zip')}</label>
                  <input
                    className="form-input w-full h-12 px-4 rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-background-light dark:bg-gray-800 text-[#0c121d] dark:text-white text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="00000"
                    required
                  />
                </div>
              </div>
              <button
                className="w-full h-12 mt-2 bg-primary hover:bg-blue-800 text-white text-base font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                type="submit"
              >
                <span>{t('phone.continue')}</span>
                <Icon name="arrow_forward" className="text-lg" />
              </button>
            </form>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-6 flex flex-col gap-6">
              <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#0c121d] dark:text-white mb-2">{t('payment.title')}</h2>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('order.summary')}</p>
                  <span className="text-xs px-2 py-0.5 rounded bg-background-light dark:bg-gray-800 text-[#4563a1] dark:text-gray-400">2 items</span>
                </div>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-[#0c121d] dark:text-white">Premium — 48-month plan</p>
                      <p className="text-xs text-[#4563a1] dark:text-gray-400">2 extra months</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[#0c121d] dark:text-white">$ 623.52</p>
                      <p className="text-xs text-[#4563a1] dark:text-gray-400">$ 95.52</p>
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-[#0c121d] dark:text-white">capoo.eu — Domain registration - 2 years</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[#0c121d] dark:text-white">$ 15.98</p>
                      <p className="text-xs text-[#4563a1] dark:text-gray-400">$ 7.99</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-dashed border-[#e6ebf4] dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('order.taxes')}</p>
                    <p className="text-xs text-[#4563a1] dark:text-gray-400">{t('order.taxes')}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#0c121d] dark:text-white">{t('order.subtotal')}</p>
                    <div className="text-right">
                      <p className="font-bold text-[#0c121d] dark:text-white">$ 665.48</p>
                      <p className="text-xs text-[#4563a1] dark:text-gray-400">$ 103.51</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

