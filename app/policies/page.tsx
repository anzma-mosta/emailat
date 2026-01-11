'use client';

import { useLocale } from '@/components/providers/LocaleProvider';

export default function PoliciesPage() {
  const { t } = useLocale();
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0c121d] dark:text-white transition-colors duration-200">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display">
        <main className="layout-container flex grow flex-col items-center py-10 px-4 md:px-10">
          <div className="layout-content-container max-w-[880px] w-full space-y-8">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">{t('policies.title')}</h1>
              <p className="text-gray-600 dark:text-gray-400">{t('policies.subtitle')}</p>
            </div>

            <section className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-2">{t('policies.privacyTitle')}</h2>
              <p className="text-gray-700 dark:text-gray-300">{t('policies.privacyText')}</p>
            </section>

            <section className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-2">{t('policies.cookiesTitle')}</h2>
              <p className="text-gray-700 dark:text-gray-300">{t('policies.cookiesText')}</p>
            </section>

            <section className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-2">{t('policies.retentionTitle')}</h2>
              <p className="text-gray-700 dark:text-gray-300">{t('policies.retentionText')}</p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
