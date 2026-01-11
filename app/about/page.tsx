'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';

export default function AboutPage() {
  const { t } = useLocale();
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0c121d] dark:text-white transition-colors duration-200">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display">
        <main className="layout-container flex grow flex-col items-center py-10 px-4 md:px-10">
          <div className="layout-content-container max-w-[880px] w-full space-y-8">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">{t('about.title')}</h1>
              <p className="text-gray-600 dark:text-gray-400">{t('about.subtitle')}</p>
            </div>

            <section className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-3">{t('about.missionTitle')}</h2>
              <p className="text-gray-600 dark:text-gray-300">{t('about.missionText')}</p>
            </section>

            <section className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">{t('about.valuesTitle')}</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Icon name="check_circle" className="text-green-600 dark:text-green-400 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">{t('about.values.1')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="check_circle" className="text-green-600 dark:text-green-400 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">{t('about.values.2')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="check_circle" className="text-green-600 dark:text-green-400 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">{t('about.values.3')}</p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
