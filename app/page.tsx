'use client';

import Link from 'next/link';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';

export default function HomePage() {
  const { t } = useLocale();
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0c121d] dark:text-white transition-colors duration-200">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display">
        <main className="layout-container flex grow flex-col">
          <section className="px-4 md:px-10 py-20">
            <div className="mx-auto max-w-6xl rounded-2xl border border-[#e6ebf4] dark:border-gray-800 bg-white/70 dark:bg-[#1a202c]/70 backdrop-blur-md shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12 items-center">
                <div className="flex flex-col gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold w-fit">
                    <Icon name="verified" className="text-[14px]" />
                    <span>آمن وموثوق</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                    {t('home.title')}
                  </h1>
                  <p className="text-[#4563a1] dark:text-gray-400 text-base">
                    {t('home.subtitle')}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <Link href="/pricing">
                      <Button size="md">
                        {t('header.getStarted')}
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button size="md" variant="outline">
                        {t('home.goDashboard')}
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
                    <p className="text-xs text-[#4563a1] dark:text-gray-400">Active Domains</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
                    <p className="text-xs text-[#4563a1] dark:text-gray-400">Mailboxes Used</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
                    <p className="text-xs text-[#4563a1] dark:text-gray-400">Storage Usage</p>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-background-light dark:bg-gray-700">
                      <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: '45%' }} />
                    </div>
                    <p className="mt-2 text-xs text-[#4563a1] dark:text-gray-400">22.5 GB / 50 GB</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
                    <p className="text-xs text-[#4563a1] dark:text-gray-400">All operational</p>
                    <div className="mt-2 flex items-center gap-2 text-green-600 dark:text-green-400">
                      <Icon name="check_circle" />
                      <span className="text-xs">Running smoothly</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 md:px-10 pb-24">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-col gap-2 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">لماذا إيمايلات</h2>
                <p className="text-[#4563a1] dark:text-gray-400 max-w-2xl">حلول بريد ونطاق آمنة وقابلة للتوسّع مع دعم احترافي.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="rounded-xl border border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] p-6">
                  <div className="text-primary mb-3">
                    <Icon name="mail" className="text-2xl" />
                  </div>
                  <p className="font-semibold">{t('services.emailHosting')}</p>
                  <p className="text-sm text-[#4563a1] dark:text-gray-400 mt-2">{t('services.emailHostingDesc')}</p>
                </div>
                <div className="rounded-xl border border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] p-6">
                  <div className="text-primary mb-3">
                    <Icon name="language" className="text-2xl" />
                  </div>
                  <p className="font-semibold">{t('services.domainManagement')}</p>
                  <p className="text-sm text-[#4563a1] dark:text-gray-400 mt-2">{t('services.domainManagementDesc')}</p>
                </div>
                <div className="rounded-xl border border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] p-6">
                  <div className="text-primary mb-3">
                    <Icon name="support_agent" className="text-2xl" />
                  </div>
                  <p className="font-semibold">{t('services.support24')}</p>
                  <p className="text-sm text-[#4563a1] dark:text-gray-400 mt-2">{t('services.support24Desc')}</p>
                </div>
                <div className="rounded-xl border border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] p-6">
                  <div className="text-primary mb-3">
                    <Icon name="lock" className="text-2xl" />
                  </div>
                  <p className="font-semibold">{t('services.security')}</p>
                  <p className="text-sm text-[#4563a1] dark:text-gray-400 mt-2">{t('services.securityDesc')}</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
