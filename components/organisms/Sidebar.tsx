'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';
import { NavItem } from '@/components/molecules/NavItem';

const navItems = [
  { href: '/dashboard', labelKey: 'dashboard.title', icon: 'dashboard' },
  { href: '/dashboard/domains', labelKey: 'dashboard.domains', icon: 'language' },
  { href: '/dashboard/emails', labelKey: 'dashboard.emails', icon: 'mail' },
  { href: '/dashboard/billing', labelKey: 'dashboard.billing', icon: 'credit_card' },
  { href: '/dashboard/upgrade', labelKey: 'header.pricing', icon: 'auto_awesome' },
  { href: '/dashboard/support', labelKey: 'dashboard.support', icon: 'support_agent' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { t, locale, setLocale } = useLocale();

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'ar' : 'en');
  };

  return (
    <aside className="flex w-64 flex-col border-r border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] transition-colors duration-200 hidden md:flex">
      <div className="flex h-16 items-center gap-3 px-6 border-b border-[#e6ebf4] dark:border-gray-800">
        <div className="flex items-center justify-center rounded-lg bg-primary/10 p-2 text-primary">
          <Icon name="mail" className="text-[24px]" />
        </div>
        <div className="flex items-center gap-4">
          
          <h2 className="text-xl font-bold text-[#0c121d] dark:text-white">{t('dashboard.title')}</h2>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavItem key={item.href} href={item.href} icon={item.icon} labelKey={item.labelKey} />
          ))}
        </div>
      </nav>
      <div className="border-t border-[#e6ebf4] dark:border-gray-800 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASgUzLrtMyFj6VkUlUbbQRtx7RmzpSe8Y-e7W0jWA5EmL3Wx3NZi3mBBz4VRysRIonBOVuWobJGJ3qA8fCYHaqHRyXzLnyk3cuNk7eEKmIg1n3Yu_joIlhse0k-kL3SyLOYu_0tEYwiYgNbQLEkJcV_eLCULGoX2W0cy8tT9sb_8Oj3PR4GHEQTNC1sI26pCMskWs8GFXjKWovtEOgISGbIAXEho4L9tcGot0lg_WaN-YZ51-1LfFmgVFaZH56ra1P_4QN5u3Q7No")',
              }}
            />
            <div className="flex flex-col overflow-hidden">
              <p className="truncate text-sm font-medium text-[#0c121d] dark:text-white">John Doe</p>
              <p className="truncate text-xs text-[#4563a1] dark:text-gray-400">Acme Corp</p>
            </div>
            
          </div>
          <div className="flex items-center gap-2">
           <button
      onClick={toggleLanguage}
      aria-label="Toggle language"
      title="Toggle language"
      className="relative flex items-center justify-between w-20 h-8 p-1 bg-[#e6ebf4] dark:bg-gray-700 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary transition-colors overflow-hidden"
    >
      <span
        className={`absolute top-0 left-0 w-1/2 h-full bg-primary rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
          locale === 'en' ? 'translate-x-0' : 'translate-x-full'
        }`} style={{    transform:` scale(1.1)`}}
      ></span>
      <span
        className={`relative z-10 w-1/2 text-center text-xs font-bold transition-colors duration-300 ease-in-out ${
          locale === 'en' ? 'text-white' : 'text-[#0c121d] dark:text-white'
        }`}
      >
        EN
      </span>
      <span
        className={`relative z-10 w-1/2 text-center text-xs font-bold transition-colors duration-300 ease-in-out ${
          locale === 'ar' ? 'text-white' : 'text-[#0c121d] dark:text-white'
        }`}
      >
        AR
      </span>
    </button>

          </div>
        </div>
      </div>
    </aside>
  );
}

