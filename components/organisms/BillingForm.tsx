'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';
import { FormField } from '@/components/molecules/FormField';
import { CountrySelector } from '@/components/molecules/CountrySelector';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { useCountries } from '@/components/hooks/useCountries';

export function BillingForm({ hideSubmit = false }: { hideSubmit?: boolean }) {
  const router = useRouter();
  const { t, locale } = useLocale();
  const pathname = usePathname();
  const { countries, loading } = useCountries();
  const [countryCode, setCountryCode] = useState('EG');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('1234567890');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const selectedCountry = useMemo(
    () => countries.find((c) => c.code === countryCode),
    [countries, countryCode]
  );

  const phonePrefix = selectedCountry?.dialCode ?? '+20';

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
    <Card className="p-6 sm:p-10">
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
          <FormField label={t('billing.firstName')}>
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required />
          </FormField>
          <FormField label={t('billing.lastName')}>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required />
          </FormField>
        </div>

        <FormField label={t('billing.country')}>
          <CountrySelector
            countries={countries}
            selectedCode={countryCode}
            onChange={setCountryCode}
            loading={loading}
          />
        </FormField>

        <FormField label={t('billing.phone')}>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#4563a1] dark:text-gray-400 whitespace-nowrap">{phonePrefix}</span>
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="00000000"
              required
            />
          </div>
        </FormField>

        <FormField label={t('billing.address')}>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={locale === 'ar' ? 'العنوان' : 'Street address'}
            required
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label={t('billing.city')}>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={locale === 'ar' ? 'المدينة ' : 'City'}
              required
            />
          </FormField>
          <FormField label={t('billing.zip')}>
            <Input value={zip} onChange={(e) => setZip(e.target.value)} placeholder="00000" required />
          </FormField>
        </div>

        {!hideSubmit && (
          <Button type="submit" className="w-full mt-2">
            <span>{t('billing.continue')}</span>
            <Icon name="arrow_forward" className="text-lg ml-2" />
          </Button>
        )}
      </form>
    </Card>
  );
}

