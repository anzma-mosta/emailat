'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { Card } from '@/components/atoms/Card';

export function OrderSummaryCard() {
  const { t } = useLocale();
  return (
    <Card>
      <h2 className="text-lg font-bold text-[#0c121d] dark:text-white mb-2">{t('payment.title')}</h2>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{t('order.summary')}</p>
        <span className="text-xs px-2 py-0.5 rounded bg-background-light dark:bg-gray-800 text-[#4563a1] dark:text-gray-400">
          2 {t('order.itemsLabel')}
        </span>
      </div>
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-medium text-[#0c121d] dark:text-white">Premium — 48-month plan</p>
            <p className="text-xs text-[#4563a1] dark:text-gray-400">2 extra months</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-[#0c121d] dark:text-white">$ 623.52</p>
            <p className="text-xs text-[#4563a1] dark:text-gray-400">$ 95.52</p>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <p className="font-medium text-[#0c121d] dark:text-white">capoo.eu — Domain registration - 2 years</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-[#0c121d] dark:text-white">$ 15.98</p>
            <p className="text-xs text-[#4563a1] dark:text-gray-400">$ 7.99</p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-dashed border-[#e6ebf4] dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('order.taxes')}</p>
          <p className="text-xs text-[#4563a1] dark:text-gray-400">{t('order.taxesLabel') || 'Included'}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-bold text-[#0c121d] dark:text-white">{t('order.subtotal')}</p>
          <div className="text-right">
            <p className="font-bold text-[#0c121d] dark:text-white">$ 665.48</p>
            <p className="text-xs text-[#4563a1] dark:text-gray-400">$ 103.51</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
