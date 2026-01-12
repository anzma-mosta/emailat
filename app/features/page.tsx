'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';

export default function FeaturesPage() {
  const { t } = useLocale();

  const features = [
    {
      title: t('services.emailHosting'),
      desc: t('services.emailHostingDesc'),
      icon: 'mail'
    },
    {
      title: t('services.domainManagement'),
      desc: t('services.domainManagementDesc'),
      icon: 'public'
    },
    {
      title: t('services.security'),
      desc: t('services.securityDesc'),
      icon: 'lock'
    },
    {
      title: t('services.support24'),
      desc: t('services.support24Desc'),
      icon: 'support_agent'
    }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0c121d] dark:text-white transition-colors duration-200">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display">
        <main className="layout-container flex grow flex-col items-center py-20 px-4 md:px-10">
          <div className="layout-content-container max-w-[1000px] w-full space-y-12">
            <div className="flex flex-col gap-4 text-center">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">{t('header.features')}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('services.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="bg-white dark:bg-[#1a202c] rounded-2xl border border-[#e6ebf4] dark:border-gray-700 p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Icon name={feature.icon} className="text-primary text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold">{feature.title}</h2>
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
