'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { BillingForm } from '@/components/organisms/BillingForm';
import { OrderSummaryCard } from '@/components/organisms/OrderSummaryCard';
import ProgressStepper from '@/components/organisms/ProgressStepper';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';

export default function DashboardUpgradeBillingPage() {
  const { t } = useLocale();
  const router = useRouter();

  const handleContinue = () => {
    router.push('/dashboard/upgrade/payment');
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="mx-auto max-w-[1200px] flex flex-col gap-8">
        <ProgressStepper
          currentStep={3}
          totalSteps={4}
          stepLabels={[t('domain.step.plan'), t('domain.step.domain'), t('domain.step.billing'), t('domain.step.payment')]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#0c121d] dark:text-white mb-6">
                {t('billing.title') || 'Billing Information'}
              </h2>
              <BillingForm hideSubmit={true} />
              <div className="mt-8 flex justify-end">
                <Button onClick={handleContinue} className="group">
                  <span>{t('common.continue') || 'Continue to Payment'}</span>
                  <Icon name="arrow_forward" className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <OrderSummaryCard hideButton={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
