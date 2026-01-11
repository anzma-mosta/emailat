'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLocale();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const loggedIn = typeof window !== 'undefined' ? localStorage.getItem('loggedIn') : null;
      if (loggedIn === 'true') {
        router.replace('/dashboard');
      }
    } catch {}
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('userDetails') : null;
      if (!raw) {
        setError(t('login.error'));
        return;
      }
      const user = JSON.parse(raw);
      if (user?.email === email && user?.password === password) {
        localStorage.setItem('loggedIn', 'true');
        router.push('/dashboard');
      } else {
        setError(t('login.error'));
      }
    } catch {
      setError(t('login.error'));
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0c121d] dark:text-white transition-colors duration-200">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display">
        <main className="layout-container flex grow flex-col items-center justify-center px-4 md:px-10 py-10">
          <div className="w-full max-w-[480px] rounded-2xl border border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="lock" className="text-primary text-2xl" />
              <h1 className="text-xl sm:text-2xl font-bold">{t('login.title')}</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col">
                <span className="text-sm font-medium text-[#0c121d] dark:text-gray-200">{t('login.email')}</span>
                <input
                  className="w-full h-11 rounded-lg border border-[#cdd7ea] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0c121d] dark:text-white px-3 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium text-[#0c121d] dark:text-gray-200">{t('login.password')}</span>
                <input
                  className="w-full h-11 rounded-lg border border-[#cdd7ea] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0c121d] dark:text-white px-3 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <Button className="w-full h-11" type="submit">
                {t('login.submit')}
              </Button>
            </form>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">{t('login.noAccount')}</span>
              <Link href="/subscribe/register" className="text-primary font-bold hover:underline">
                {t('login.goRegister')}
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

