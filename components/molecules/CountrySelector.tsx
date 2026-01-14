'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/components/utils/cn';

export type Country = {
  code: string;
  nameEn: string;
  nameAr: string;
  dialCode: string | null;
  flagUrl: string;
};

interface CountrySelectorProps {
  countries: Country[];
  selectedCode: string;
  onChange: (code: string) => void;
  loading?: boolean;
  className?: string;
}

export function CountrySelector({
  countries,
  selectedCode,
  onChange,
  loading = true,
  className,
}: CountrySelectorProps) {
  const { locale, dir } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedCountry = useMemo(
    () => countries.find((c) => c.code === selectedCode),
    [countries, selectedCode]
  );

  const filteredCountries = useMemo(() => {
    if (!search) return countries;
    const s = search.toLowerCase();
    return countries.filter(
      (c) =>
        c.nameEn.toLowerCase().includes(s) ||
        c.nameAr.toLowerCase().includes(s) ||
        c.code.toLowerCase().includes(s)
    );
  }, [countries, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Scroll to selected item when opening
  useEffect(() => {
    if (isOpen && selectedCode && listRef.current) {
      const selectedElement = listRef.current.querySelector(`[data-code="${selectedCode}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [isOpen, selectedCode]);

  return (
    <div className={cn('relative w-full', className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => !loading && setIsOpen(!isOpen)}
        className={cn(
          'flex w-full h-12 items-center justify-between rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-background-light dark:bg-gray-800 px-4 text-[#0c121d] dark:text-white transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none',
          loading && 'opacity-50 cursor-not-allowed',
          isOpen && 'border-primary ring-1 ring-primary'
        )}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {loading ? (
            <span className="text-sm text-[#4563a1] dark:text-gray-400">
              {locale === 'ar' ? 'جارِ التحميل...' : 'Loading...'}
            </span>
          ) : selectedCountry ? (
            <>
              <img
                alt={selectedCountry.code}
                className="rounded-sm object-cover border border-gray-200 dark:border-gray-600 flex-shrink-0 shadow-sm"
                height={18}
                src={selectedCountry.flagUrl}
                width={28}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.src = `https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`;
                }}
              />
              <span className="text-base truncate">
                {locale === 'ar' ? selectedCountry.nameAr : selectedCountry.nameEn}
              </span>
            </>
          ) : (
            <span className="text-sm text-[#4563a1] dark:text-gray-400">
              {locale === 'ar' ? 'اختر الدولة' : 'Select country'}
            </span>
          )}
        </div>
        <Icon
          name="expand_more"
          className={cn(
            'text-[#4563a1] transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-[#1a202c] border border-[#e6ebf4] dark:border-gray-800 rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[400px]">
          <div className="p-3 border-b border-[#e6ebf4] dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="relative">
              <Icon
                name="search"
                className={cn(
                  'absolute top-1/2 -translate-y-1/2 text-[#4563a1] dark:text-gray-400',
                  dir === 'rtl' ? 'right-3' : 'left-3'
                )}
              />
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={locale === 'ar' ? 'ابحث عن دولة...' : 'Search country...'}
                className={cn(
                  'w-full h-10 bg-white dark:bg-gray-900 border border-[#cdd7ea] dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors',
                  dir === 'rtl' ? 'pr-10 pl-3' : 'pl-10 pr-3'
                )}
              />
            </div>
          </div>

          <div className="overflow-y-auto flex-1 py-1" ref={listRef}>
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  data-code={country.code}
                  type="button"
                  onClick={() => {
                    onChange(country.code);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={cn(
                    'w-full px-4 py-2.5 flex items-center gap-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left',
                    dir === 'rtl' && 'text-right',
                    selectedCode === country.code && 'bg-blue-50 dark:bg-blue-900/30'
                  )}
                >
                  <img
                    alt={country.code}
                    className="rounded-sm object-cover border border-gray-200 dark:border-gray-600 flex-shrink-0 shadow-sm"
                    height={18}
                    src={country.flagUrl}
                    width={28}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.src = `https://flagcdn.com/w40/${country.code.toLowerCase()}.png`;
                    }}
                  />
                  <span
                    className={cn(
                      'text-sm flex-1 truncate',
                      selectedCode === country.code
                        ? 'font-bold text-primary dark:text-blue-400'
                        : 'text-[#0c121d] dark:text-gray-200'
                    )}
                  >
                    {locale === 'ar' ? country.nameAr : country.nameEn}
                  </span>
                  {selectedCode === country.code && (
                    <Icon name="check" className="text-primary text-sm" />
                  )}
                </button>
              ))
            ) : (
              <div className="p-8 text-center text-sm text-[#4563a1] dark:text-gray-400">
                {locale === 'ar' ? 'لا توجد نتائج' : 'No countries found'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
