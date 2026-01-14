'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';
import { NavItem } from '@/components/molecules/NavItem';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';

const navItems = [
  { href: '/dashboard', labelKey: 'dashboard.title', icon: 'dashboard' },
  { href: '/dashboard/domains', labelKey: 'dashboard.domains', icon: 'language' },
  { href: '/dashboard/emails', labelKey: 'dashboard.emails', icon: 'mail' },
  { href: '/dashboard/billing', labelKey: 'dashboard.billing', icon: 'credit_card' },
  { href: '/dashboard/upgrade', labelKey: 'header.pricing', icon: 'auto_awesome' },
  { href: '/dashboard/support', labelKey: 'dashboard.support', icon: 'support_agent' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { t, locale, setLocale, dir } = useLocale();

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'ar' : 'en');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed inset-y-0 z-50 flex w-64 flex-col border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] transition-all duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen
            ? 'translate-x-0'
            : dir === 'rtl'
            ? 'translate-x-full'
            : '-translate-x-full'
        } ${dir === 'rtl' ? 'right-0 border-l' : 'left-0 border-r'}`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-[#e6ebf4] dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-lg bg-primary/10 p-2 text-primary">
              <Icon name="mail" className="text-[24px]" />
            </div>
            <h2 className="text-xl font-bold text-[#0c121d] dark:text-white">{t('dashboard.title')}</h2>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#4563a1] hover:bg-background-light dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
          >
            <Icon name="close" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6 custom-scrollbar">
          {navItems.map((item, index) => (
            <div 
              key={item.href} 
              onClick={onClose}
              className="transform transition-all duration-300"
              style={{ 
                 transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                 opacity: isOpen || (typeof window !== 'undefined' && window.innerWidth >= 768) ? 1 : 0,
                 transform: isOpen || (typeof window !== 'undefined' && window.innerWidth >= 768) ? 'translateX(0)' : (dir === 'rtl' ? 'translateX(20px)' : 'translateX(-20px)')
               }}
            >
              <NavItem href={item.href} icon={item.icon} labelKey={item.labelKey} />
            </div>
          ))}
        </nav>
        <div className="border-t border-[#e6ebf4] dark:border-gray-800 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full bg-cover bg-center border-2 border-primary/20"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASgUzLrtMyFj6VkUlUbbQRtx7RmzpSe8Y-e7W0jWA5EmL3Wx3NZi3mBBz4VRysRIonBOVuWobJGJ3qA8fCYHaqHRyXzLnyk3cuNk7eEKmIg1n3Yu_joIlhse0k-kL3SyLOYu_0tEYwiYgNbQLEkJcV_eLCULGoX2W0cy8tT9sb_8Oj3PR4GHEQTNC1sI26pCMskWs8GFXjKWovtEOgISGbIAXEho4L9tcGot0lg_WaN-YZ51-1LfFmgVFaZH56ra1P_4QN5u3Q7No")',
                }}
              />
              <div className="flex flex-col overflow-hidden">
                <p className="truncate text-sm font-bold text-[#0c121d] dark:text-white">John Doe</p>
                <p className="truncate text-[11px] font-medium text-[#4563a1] dark:text-gray-400 uppercase tracking-wider">Acme Corp</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                aria-label="Toggle language"
                title="Toggle language"
                className="relative flex items-center justify-between w-14 h-7 p-0.5 bg-[#e6ebf4] dark:bg-gray-700 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary transition-colors overflow-hidden"
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-[26px] h-[22px] bg-primary rounded-full shadow-sm transform transition-transform duration-300 ease-in-out ${
                    locale === 'en' ? 'translate-x-0' : 'translate-x-full'
                  }`}
                ></span>
                <span
                  className={`relative z-10 w-1/2 text-center text-[10px] font-black transition-colors duration-300 ${
                    locale === 'en' ? 'text-white' : 'text-[#0c121d] dark:text-white'
                  }`}
                >
                  EN
                </span>
                <span
                  className={`relative z-10 w-1/2 text-center text-[10px] font-black transition-colors duration-300 ${
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
    </>
  );
}


