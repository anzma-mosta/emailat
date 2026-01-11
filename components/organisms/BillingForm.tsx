'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';
import { FormField } from '@/components/molecules/FormField';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { Button } from '@/components/atoms/Button';

type ApiCountry = {
  cca2: string;
  name: { common: string };
  translations?: { ara?: { common?: string } };
  idd?: { root?: string; suffixes?: string[] };
};

type Country = {
  code: string;
  nameEn: string;
  nameAr: string;
  dialCode: string | null;
};

export function BillingForm({ hideSubmit = false }: { hideSubmit?: boolean }) {
  const router = useRouter();
  const { t, locale } = useLocale();
  const pathname = usePathname();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [countryCode, setCountryCode] = useState('EG');
  const [firstName, setFirstName] = useState('Taha');
  const [lastName, setLastName] = useState('Capoo');
  const [phoneNumber, setPhoneNumber] = useState('00000000');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function fetchCountries() {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=cca2,name,translations,idd');
        const data: ApiCountry[] = await res.json();
        const list: Country[] = data
          .filter((c) => typeof c.cca2 === 'string' && c.cca2.length === 2)
          .map((c) => {
            const code = c.cca2.toUpperCase();
            const dialRoot = c.idd?.root ?? '';
            const dialSuffix = c.idd?.suffixes?.[0] ?? '';
            const dial = dialRoot || dialSuffix ? `${dialRoot}${dialSuffix}` : null;
            const nameEn = c.name?.common ?? code;
            const nameAr = c.translations?.ara?.common ?? nameEn;
            return { code, nameEn, nameAr, dialCode: dial };
          });
        const sorted = list.sort((a, b) => {
          const aName = locale === 'ar' ? a.nameAr : a.nameEn;
          const bName = locale === 'ar' ? b.nameAr : b.nameEn;
          return aName.localeCompare(bName);
        });
        if (!cancelled) {
          setCountries(sorted);
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }
    fetchCountries();
    return () => {
      cancelled = true;
    };
  }, [locale]);

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
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Taha" required />
          </FormField>
          <FormField label={t('billing.lastName')}>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Capoo" required />
          </FormField>
        </div>

        <FormField label={t('billing.country')}>
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
            <Select
              className="pl-12 pr-8"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              required
            >
              {loading ? (
                <option value="">{locale === 'ar' ? 'جارِ التحميل...' : 'Loading...'}</option>
              ) : (
                countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {locale === 'ar' ? c.nameAr : c.nameEn}
                  </option>
                ))
              )}
            </Select>
          </div>
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
              placeholder={locale === 'ar' ? 'القاهرة' : 'Cairo'}
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

