'use client';

import Header from '@/components/organisms/Header';
import { useLocale } from '@/components/providers/LocaleProvider';
import { BillingForm } from '@/components/organisms/BillingForm';
import { Card } from '@/components/atoms/Card';

import { OrderSummaryCard } from '@/components/organisms/OrderSummaryCard';

export default function BillingPage() {
  const { t } = useLocale();
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0c121d] dark:text-white font-display min-h-screen flex flex-col overflow-x-hidden transition-colors duration-200">
      {/* <Header showAuth={false} /> */}
      <main className="flex-grow p-4 sm:p-8">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BillingForm />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-6 flex flex-col gap-6">
              <OrderSummaryCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
