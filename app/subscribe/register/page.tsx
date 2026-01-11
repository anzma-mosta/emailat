'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProgressStepper from '@/components/organisms/ProgressStepper';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      localStorage.setItem('userDetails', JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }));
      router.push('/subscribe/payment');
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0c121d] dark:text-white font-display min-h-screen flex flex-col overflow-x-hidden transition-colors duration-200">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col w-full max-w-[800px] flex-1">
            <ProgressStepper
              currentStep={3}
              totalSteps={4}
              stepLabels={[t('domain.step.plan'), t('domain.step.domain'), t('domain.step.registration'), t('domain.step.payment')]}
            />

            <div className="flex flex-col gap-2 mb-8">
              <h1 className="text-[#0c121d] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
                {t('register.title')}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-relaxed">
                {t('register.subtitle')}
              </p>
            </div>

            <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 sm:p-10 shadow-sm">
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <label className="flex flex-col w-full">
                    <span className="text-[#0c121d] dark:text-gray-300 text-sm font-medium mb-2">
                      Full Name
                    </span>
                    <input
                      className="w-full rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-white dark:bg-gray-800 text-[#0c121d] dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-gray-400"
                      placeholder="John Doe"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </label>
                  <label className="flex flex-col w-full">
                    <span className="text-[#0c121d] dark:text-gray-300 text-sm font-medium mb-2">
                      Email
                    </span>
                    <input
                      className="w-full rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-white dark:bg-gray-800 text-[#0c121d] dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-gray-400"
                      placeholder="name@company.com"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </label>
                  <label className="flex flex-col w-full">
                    <span className="text-[#0c121d] dark:text-gray-300 text-sm font-medium mb-2">
                      Password
                    </span>
                    <input
                      className="w-full rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-white dark:bg-gray-800 text-[#0c121d] dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-gray-400"
                      placeholder="••••••••"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </label>
                  <label className="flex flex-col w-full">
                    <span className="text-[#0c121d] dark:text-gray-300 text-sm font-medium mb-2">
                      Confirm Password
                    </span>
                    <input
                      className="w-full rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-white dark:bg-gray-800 text-[#0c121d] dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-gray-400"
                      placeholder="••••••••"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                  </label>
                </div>

                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-red-500 text-sm">{t('register.passwordMismatch')}</p>
                )}

                <button
                  className="w-full h-12 mt-2 bg-primary hover:bg-blue-800 text-white text-base font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  type="submit"
                  disabled={formData.password !== formData.confirmPassword}
                >
                  <span>{t('register.continuePayment')}</span>
                  <Icon name="arrow_forward" className="text-lg" />
                </button>
              </form>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => router.back()}
                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors flex items-center justify-center gap-1 mx-auto"
              >
                <Icon name="arrow_back" className="text-lg" />
                {t('register.back')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

