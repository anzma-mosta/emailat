'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';

export default function ServicesPage() {
  const { t } = useLocale();
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0c121d] dark:text-white transition-colors duration-200">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display">
        <main className="layout-container flex grow flex-col items-center py-10 px-4 md:px-10">
          <div className="layout-content-container max-w-[880px] w-full space-y-8">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">{t('services.title')}</h1>
              <p className="text-gray-600 dark:text-gray-400">{t('services.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="mail" className="text-primary text-2xl" />
                  <h2 className="text-lg font-bold">{t('services.emailHosting')}</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{t('services.emailHostingDesc')}</p>
              </div>
              <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="public" className="text-primary text-2xl" />
                  <h2 className="text-lg font-bold">{t('services.domainManagement')}</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{t('services.domainManagementDesc')}</p>
              </div>
              <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="support_agent" className="text-primary text-2xl" />
                  <h2 className="text-lg font-bold">{t('services.support24')}</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{t('services.support24Desc')}</p>
              </div>
              <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="lock" className="text-primary text-2xl" />
                  <h2 className="text-lg font-bold">{t('services.security')}</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{t('services.securityDesc')}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
