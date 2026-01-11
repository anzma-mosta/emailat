'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import LanguageToggleButton from '@/components/atoms/LanguageToggleButton';


interface HeaderProps {
  showAuth?: boolean;
}

export default function Header({ showAuth = true }: HeaderProps) {
  const { t, locale, setLocale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const isDashboard = pathname?.startsWith('/dashboard');
  const handleLogout = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userDetails');
        localStorage.removeItem('loggedIn');
      }
      router.push('/');
    } catch {}
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e6ebf4] dark:border-gray-800 bg-white/80 dark:bg-[#1a2332]/80 backdrop-blur-md">
      <div className="px-4 md:px-10 py-3 flex items-center justify-between mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-4">
          <div className="text-primary">
            <Icon name="mail" className="text-3xl" />
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight text-[#0c121d] dark:text-white">
            Emailat
          </h2>
        </Link>
        {showAuth && (
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-6">
              <Link
                href="#"
                className="text-sm font-medium hover:text-primary transition-colors text-[#0c121d] dark:text-white"
              >
                {t('header.features')}
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-primary transition-colors text-[#0c121d] dark:text-white"
              >
                {t('header.pricing')}
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-primary transition-colors text-[#0c121d] dark:text-white"
              >
                {t('header.support')}
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              {!isDashboard ? (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium hover:text-primary transition-colors text-[#0c121d] dark:text-white"
                  >
                    {t('header.login')}
                  </Link>
                  <Link href="/subscribe/plans" className="">
                    <Button size="sm">{t('header.getStarted')}</Button>
                  </Link>
                </>
              ) : (
                <Button size="sm" variant="outline" onClick={handleLogout}>
                  {t('header.logout')}
                </Button>
              )}
              <div className="flex items-center gap-2">
              <LanguageToggleButton locale={locale} setLocale={setLocale} />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
