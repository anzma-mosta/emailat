'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import LanguageToggleButton from '@/components/atoms/LanguageToggleButton';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export function DashboardHeader() {
  const { t, locale, setLocale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageTitle = () => {
    if (pathname === '/dashboard') return t('dashboard.title');
    if (pathname === '/dashboard/domains') return t('dashboard.domains');
    if (pathname === '/dashboard/emails') return t('dashboard.emails');
    if (pathname === '/dashboard/billing') return t('dashboard.billing');
    if (pathname === '/dashboard/upgrade') return t('header.pricing');
    if (pathname === '/dashboard/support') return t('dashboard.support');
    return t('dashboard.title');
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('userDetails');
    }
    router.push('/');
  };

 const toggleNotifications = useCallback(() => {
    setShowNotifications((v) => !v);
  }, []);

  return (
    <header className="h-16 border-b border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] px-6 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200">
     <div className="flex items-center gap-6">
          <div className="hidden max-w-md items-center rounded-lg bg-background-light dark:bg-background-dark px-3 py-2 sm:flex border border-transparent focus-within:border-primary/50 transition-colors">
            <Icon name="search" className="text-[#4563a1] dark:text-gray-400" />
            <input
              className="ml-2 w-full bg-transparent text-sm text-[#0c121d] dark:text-white placeholder-[#4563a1] focus:outline-none dark:placeholder-gray-400/50"
              placeholder={t('dashboard.searchPlaceholder')}
              type="text"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleNotifications}
              className="relative rounded-full p-2 text-[#4563a1] hover:bg-background-light dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            >
              <Icon name="notifications" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#1a202c]"></span>
            </button>
           
          </div>
        </div>
      <div className="flex items-center gap-3">
        {/* <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-gray-800 text-[#4563a1] dark:text-gray-400 transition-colors relative"
          >
            <Icon name="notifications" className="text-[20px]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a202c]"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-[#1a202c] border border-[#e6ebf4] dark:border-gray-800 rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="p-4 border-b border-[#e6ebf4] dark:border-gray-800 flex justify-between items-center">
                <h3 className="font-bold text-sm">{t('notifications.title') || (locale === 'ar' ? 'الإشعارات' : 'Notifications')}</h3>
                <button className="text-xs text-primary font-bold hover:underline">{t('notifications.markRead') || (locale === 'ar' ? 'تحديد كقروء' : 'Mark as read')}</button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-4 flex gap-3 hover:bg-background-light dark:hover:bg-gray-800 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <Icon name="mail" className="text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-[#0c121d] dark:text-white">New email account created</p>
                    <p className="text-[10px] text-[#4563a1] dark:text-gray-400 mt-0.5">2 minutes ago</p>
                  </div>
                </div>
                <div className="p-4 flex gap-3 hover:bg-background-light dark:hover:bg-gray-800 transition-colors cursor-pointer border-t border-[#e6ebf4] dark:border-gray-800">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                    <Icon name="receipt_long" className="text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-[#0c121d] dark:text-white">Payment successful</p>
                    <p className="text-[10px] text-[#4563a1] dark:text-gray-400 mt-0.5">1 hour ago</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-background-light/50 dark:bg-gray-800/50 text-center border-t border-[#e6ebf4] dark:border-gray-800">
                <button className="text-xs font-bold text-primary hover:underline">View all</button>
              </div>
            </div>
          )}
        </div> */}

        <div className="h-6 w-[1px] bg-[#e6ebf4] dark:border-gray-800 mx-1"></div>

        <div className="flex items-center gap-2">
          <LanguageToggleButton locale={locale} setLocale={setLocale} />
        </div>

        <div className="h-6 w-[1px] bg-[#e6ebf4] dark:border-gray-800 mx-1"></div>

        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-[#4563a1] dark:text-gray-400 hover:text-red-500">
          <Icon name="logout" className="text-[20px]" />
        </Button>
      </div>
    </header>
  );
}
