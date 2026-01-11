'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';

export default function BillingPage() {
  const { t, locale } = useLocale();

  const invoices = [
    { id: '#4902', date: 'Oct 22, 2025', dueDate: 'Oct 29, 2025', amount: '$29.00', status: t('billing.status.paid') },
    { id: '#4876', date: 'Sep 22, 2025', dueDate: 'Sep 29, 2025', amount: '$29.00', status: t('billing.status.paid') },
    { id: '#4841', date: 'Aug 22, 2025', dueDate: 'Aug 29, 2025', amount: '$29.00', status: t('billing.status.paid') },
  ];

  const payments = [
    { id: 'TX-92873', date: 'Oct 22, 2025', method: 'Visa •••• 4242', amount: '$29.00', status: t('billing.status.paid') },
    { id: 'TX-91411', date: 'Sep 22, 2025', method: 'Visa •••• 4242', amount: '$29.00', status: t('billing.status.paid') },
    { id: 'TX-90077', date: 'Aug 22, 2025', method: locale === 'ar' ? 'تحويل بنكي' : 'Bank Transfer', amount: '$29.00', status: t('billing.status.paid') },
  ];

  const methods = [
    { type: 'card', label: 'Visa •••• 4242', default: true },
    { type: 'bank', label: locale === 'ar' ? 'تحويل بنكي' : 'Bank Transfer', default: false },
  ];

  return (
    <div className="p-6 lg:p-10">
      <div className="mx-auto max-w-[1200px] flex flex-col gap-8">
        <div className="flex items-end justify-between gap-4 border-b border-[#e6ebf4] dark:border-gray-800 pb-3">
          <div>
            <p className="text-sm text-[#4563a1] dark:text-gray-400">{t('dashboard.billingViewHint')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          <section className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-xl border border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-[#e6ebf4] dark:border-gray-800 flex items-center gap-2">
                <Icon name="receipt_long" className="text-primary" />
                <h3 className="text-lg font-bold text-[#0c121d] dark:text-white">{t('billing.invoices')}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e6ebf4] dark:border-gray-800 text-[#4563a1] dark:text-gray-400">
                      <th className="px-6 py-3 font-medium">{t('billing.columns.invoice')}</th>
                      <th className="px-6 py-3 font-medium">{t('billing.columns.date')}</th>
                      <th className="px-6 py-3 font-medium">{t('billing.columns.dueDate')}</th>
                      <th className="px-6 py-3 font-medium">{t('billing.columns.amount')}</th>
                      <th className="px-6 py-3 font-medium">{t('billing.columns.status')}</th>
                      <th className="px-6 py-3 font-medium">{t('billing.columns.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6ebf4] dark:divide-gray-800 text-[#0c121d] dark:text-white">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-background-light/50 dark:hover:bg-gray-800/20 transition-colors">
                        <td className="px-6 py-3 font-medium">{inv.id}</td>
                        <td className="px-6 py-3 text-[#4563a1] dark:text-gray-400">{inv.date}</td>
                        <td className="px-6 py-3 text-[#4563a1] dark:text-gray-400">{inv.dueDate}</td>
                        <td className="px-6 py-3">{inv.amount}</td>
                        <td className="px-6 py-3">
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <button className="inline-flex items-center gap-2 text-primary dark:text-blue-400 text-xs font-bold hover:underline">
                            <Icon name="download" className="text-[14px]" />
                            {locale === 'ar' ? 'تحميل' : 'Download'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-[#e6ebf4] dark:border-gray-800 flex items-center gap-2">
                <Icon name="credit_card" className="text-primary" />
                <h3 className="text-lg font-bold text-[#0c121d] dark:text-white">{t('billing.paymentHistory')}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e6ebf4] dark:border-gray-800 text-[#4563a1] dark:text-gray-400">
                      <th className="px-6 py-3 font-medium">Txn</th>
                      <th className="px-6 py-3 font-medium">{t('billing.columns.date')}</th>
                      <th className="px-6 py-3 font-medium">{t('payment.method')}</th>
                      <th className="px-6 py-3 font-medium">{t('billing.columns.amount')}</th>
                      <th className="px-6 py-3 font-medium">{t('billing.columns.status')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6ebf4] dark:divide-gray-800 text-[#0c121d] dark:text-white">
                    {payments.map((p) => (
                      <tr key={p.id} className="hover:bg-background-light/50 dark:hover:bg-gray-800/20 transition-colors">
                        <td className="px-6 py-3 font-medium">{p.id}</td>
                        <td className="px-6 py-3 text-[#4563a1] dark:text-gray-400">{p.date}</td>
                        <td className="px-6 py-3">{p.method}</td>
                        <td className="px-6 py-3">{p.amount}</td>
                        <td className="px-6 py-3">
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <aside className="flex flex-col gap-6">
            <div className="rounded-xl border border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-[#e6ebf4] dark:border-gray-800 flex items-center gap-2">
                <Icon name="dashboard" className="text-primary" />
                <h3 className="text-lg font-bold text-[#0c121d] dark:text-white">{t('billing.subscriptions')}</h3>
              </div>
              <div className="p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#4563a1] dark:text-gray-400">{t('success.emailPlan')}</p>
                    <p className="text-base font-bold text-[#0c121d] dark:text-white">Growth</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold">
                      {locale === 'ar' ? 'شهري' : 'Monthly'}
                    </span>
                    <button 
                      onClick={() => window.location.href = '/dashboard/upgrade'}
                      className="text-xs text-primary font-bold hover:underline"
                    >
                      {t('plans.upgrade') || (locale === 'ar' ? 'ترقية' : 'Upgrade')}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
                    <p className="text-xs text-[#4563a1] dark:text-gray-400">{t('success.nextInvoice')}</p>
                    <p className="text-sm font-semibold text-[#0c121d] dark:text-white">Nov 22, 2025</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
                    <p className="text-xs text-[#4563a1] dark:text-gray-400">{t('success.paymentMethod')}</p>
                    <p className="text-sm font-semibold text-[#0c121d] dark:text-white">Visa •••• 4242</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-[#e6ebf4] dark:border-gray-800 flex items-center gap-2">
                <Icon name="credit_card" className="text-primary" />
                <h3 className="text-lg font-bold text-[#0c121d] dark:text-white">{t('billing.paymentMethods')}</h3>
              </div>
              <div className="p-6 flex flex-col gap-4">
                {methods.map((m, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-[#e6ebf4] dark:border-gray-800 p-3">
                    <div className="flex items-center gap-3">
                      <Icon name={m.type === 'card' ? 'credit_card' : 'account_balance'} className="text-[#4563a1] dark:text-gray-400" />
                      <div>
                        <p className="text-sm font-semibold text-[#0c121d] dark:text-white">{m.label}</p>
                        {m.default && (
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                            {t('billing.default')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!m.default && (
                        <Button size="sm" variant="outline">{t('billing.setDefault')}</Button>
                      )}
                      <Button size="sm" variant="outline">{t('billing.remove')}</Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full" size="sm">
                  <Icon name="add_circle" className="mr-2" />
                  {t('billing.addMethod')}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
