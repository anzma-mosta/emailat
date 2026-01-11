'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';

export default function SupportPage() {
  const { t } = useLocale();
  return (
    <div className="p-6 lg:p-10">
      <div className="mx-auto max-w-[1200px] flex flex-col gap-8">
        <div className="flex items-end justify-between gap-4 border-b border-[#e6ebf4] dark:border-gray-800 pb-3">
          <div>
            <p className="text-sm text-[#4563a1] dark:text-gray-400">Contact support for assistance.</p>
          </div>
          <Button size="sm">
            <Icon name="support_agent" className="mr-2" />
            {t('support.openTicket')}
          </Button>
        </div>

        <div className="rounded-xl border border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-[#e6ebf4] dark:border-gray-800 flex items-center gap-2">
            <Icon name="support_agent" className="text-primary" />
            <h3 className="text-lg font-bold text-[#0c121d] dark:text-white">{t('support.recentTickets')}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#e6ebf4] dark:border-gray-800 text-[#4563a1] dark:text-gray-400">
                  <th className="px-6 py-3 font-medium">Ticket</th>
                  <th className="px-6 py-3 font-medium">{t('dashboard.columns.date')}</th>
                  <th className="px-6 py-3 font-medium">{t('dashboard.columns.description')}</th>
                  <th className="px-6 py-3 font-medium">{t('dashboard.columns.status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6ebf4] dark:divide-gray-800 text-[#0c121d] dark:text-white">
                {[
                  { id: 'SUP-4021', date: 'Oct 24, 2025', desc: 'Issue with mailbox quota', status: t('status.completed'), color: 'green' },
                  { id: 'SUP-3998', date: 'Oct 22, 2025', desc: 'DNS propagation delay', status: t('status.pendingPropagation'), color: 'yellow' },
                  { id: 'SUP-3950', date: 'Oct 18, 2025', desc: 'Billing inquiry', status: t('status.completed'), color: 'green' },
                ].map((k) => (
                  <tr key={k.id} className="hover:bg-background-light/50 dark:hover:bg-gray-800/20 transition-colors">
                    <td className="px-6 py-3 font-semibold">{k.id}</td>
                    <td className="px-6 py-3 text-[#4563a1] dark:text-gray-400">{k.date}</td>
                    <td className="px-6 py-3">{k.desc}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center rounded-full ${k.color === 'green'
                          ? 'bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                        {k.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
