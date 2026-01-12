'use client';

import Link from 'next/link';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';
import { Logo } from '@/components/atoms/Logo';

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c]">
      <div className="mx-auto max-w-7xl px-4 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Logo />
            </div>
            <p className="text-sm text-[#4563a1] dark:text-gray-400">
              {t('home.subtitle')}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-[#4563a1] dark:text-gray-400 mb-3">
              {t('footer.company')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-[#0c121d] dark:text-white hover:text-primary dark:hover:text-blue-400 transition-colors">
                  {t('footer.link.about')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-[#0c121d] dark:text-white hover:text-primary dark:hover:text-blue-400 transition-colors">
                  {t('footer.link.services')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-[#4563a1] dark:text-gray-400 mb-3">
              {t('footer.policies')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-[#0c121d] dark:text-white hover:text-primary dark:hover:text-blue-400 transition-colors">
                  {t('footer.link.terms')}
                </Link>
              </li>
              <li>
                <Link href="/policies" className="text-sm text-[#0c121d] dark:text-white hover:text-primary dark:hover:text-blue-400 transition-colors">
                  {t('footer.link.policies')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-[#4563a1] dark:text-gray-400 mb-3">
              {t('header.support')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-sm text-[#0c121d] dark:text-white hover:text-primary dark:hover:text-blue-400 transition-colors">
                  {t('header.pricing')}
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-[#0c121d] dark:text-white hover:text-primary dark:hover:text-blue-400 transition-colors">
                  {t('header.support')}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-[#0c121d] dark:text-white hover:text-primary dark:hover:text-blue-400 transition-colors">
                  {t('home.goDashboard')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[#e6ebf4] dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[#4563a1] dark:text-gray-400">{t('footer.copy')}</div>
          <div className="flex items-center gap-4 text-xs text-[#4563a1] dark:text-gray-400">
            <span>v0.1.0</span>
            <span>Next.js 14</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
