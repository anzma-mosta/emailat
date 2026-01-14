'use client';

import { useState, useEffect } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { type Country } from '@/components/molecules/CountrySelector';

type ApiCountry = {
  cca2: string;
  name: { common: string };
  translations?: { ara?: { common?: string } };
  idd?: { root?: string; suffixes?: string[] };
  flags?: { png?: string; svg?: string };
};

export function useCountries() {
  const { locale } = useLocale();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchCountries() {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=cca2,name,translations,idd,flags');
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
            const flagUrl = c.flags?.svg || c.flags?.png || `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
            return { code, nameEn, nameAr, dialCode: dial, flagUrl };
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

  return { countries, loading };
}
