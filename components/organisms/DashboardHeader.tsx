'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import LanguageToggleButton from '@/components/atoms/LanguageToggleButton';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useState, useRef, useEffect } from 'react';

export function DashboardHeader() {
  const { t, locale, setLocale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Mock notifications for demonstration
  const [notifications] = useState([
    { id: 1, type: 'mail', key: 'notifications.newEmail', time: '2 mins ago' },
    { id: 2, type: 'receipt_long', key: 'notifications.paymentSuccess', time: '1 hour ago' },
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const getPageTitle = () => {
    if (pathname === '/dashboard') return t('dashboard.title');
    if (pathname === '/dashboard/domains') return t('dashboard.domains');
    if (pathname === '/dashboard/emails') return t('dashboard.emails');
    if (pathname === '/dashboard/billing') return t('dashboard.billing');
    if (pathname === '/dashboard/upgrade') return t('header.pricing');
    if (pathname?.startsWith('/dashboard/upgrade')) return t('plans.upgrade') || (locale === 'ar' ? 'ترقية' : 'Upgrade');
    if (pathname === '/dashboard/support') return t('dashboard.support');
    return t('dashboard.title');
  };

  // const handleLogout = () => {
  //   if (typeof window !== 'undefined') {
  //     localStorage.removeItem('loggedIn');
  //     localStorage.removeItem('userDetails');
  //   }
  //   router.push('/');
  // };

 const toggleNotifications = useCallback(() => {
    setShowNotifications((v) => !v);
  }, []);

  return (
    <header className="h-16 border-b border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] px-6 flex items-center justify-center sticky top-0 z-30000 transition-colors duration-200">
      <div className="flex items-center gap-6">
        <div className="relative" ref={notificationRef}>
            <button
              onClick={toggleNotifications}
              className="relative rounded-full p-2 text-[#4563a1] hover:bg-background-light dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            >
              <Icon name="notifications" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#1a202c]"></span>
            </button>

            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-[#1a202c] border border-[#e6ebf4] dark:border-gray-800 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="p-4 border-b border-[#e6ebf4] dark:border-gray-800 flex justify-between items-center">
                  <h3 className="font-bold text-sm">{t('notifications.title')}</h3>
                  <button className="text-xs text-primary font-bold hover:underline">
                    {t('notifications.markRead')}
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notif, idx) => (
                      <div 
                        key={notif.id}
                        className={`p-4 flex gap-3 hover:bg-background-light dark:hover:bg-gray-800 transition-colors cursor-pointer ${idx !== 0 ? 'border-t border-[#e6ebf4] dark:border-gray-800' : ''}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${notif.type === 'mail' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 'bg-green-100 dark:bg-green-900/30 text-green-600'}`}>
                          <Icon name={notif.type} className="text-sm" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-[#0c121d] dark:text-white">
                            {t(notif.key)}
                          </p>
                          <p className="text-[10px] text-[#4563a1] dark:text-gray-400 mt-0.5">{notif.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-12 h-12 rounded-full bg-background-light dark:bg-gray-800 flex items-center justify-center mx-auto mb-3">
                        <Icon name="notifications_off" className="text-[#4563a1] dark:text-gray-400" />
                      </div>
                      <p className="text-xs text-[#4563a1] dark:text-gray-400">
                        {t('notifications.empty')}
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-3 bg-background-light/50 dark:bg-gray-800/50 text-center border-t border-[#e6ebf4] dark:border-gray-800">
                  <button className="text-xs font-bold text-primary hover:underline">
                    {t('notifications.viewAll')}
                  </button>
                </div>
              </div>
            )}
          </div>
        <div className="hidden max-w-md items-center rounded-lg bg-background-light dark:bg-background-dark px-3 py-2 sm:flex border border-transparent focus-within:border-primary/50 transition-colors">
          <Icon name="search" className="text-[#4563a1] dark:text-gray-400" />
          <input
            className="ml-2 w-full bg-transparent text-sm text-[#0c121d] dark:text-white placeholder-[#4563a1] focus:outline-none dark:placeholder-gray-400/50"
            placeholder={t('dashboard.searchPlaceholder')}
            type="text"
          />
        </div>
        
        <div className="flex items-center gap-4">
          
          
          
        </div>
      </div>
    </header>
  );
}
