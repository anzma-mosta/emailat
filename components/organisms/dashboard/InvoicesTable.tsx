import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { useLocale } from '@/components/providers/LocaleProvider';
import React, { memo, useState } from 'react';

type Invoice = { id: string; date: string; amount: string; status: string };

type Props = {
  invoices: Array<Invoice>;
  onAddInvoice?: (inv: Invoice) => void;
};

function InvoicesTableImpl({ invoices, onAddInvoice }: Props) {
  const { t, locale } = useLocale();
  const [showAdd, setShowAdd] = useState(false);
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<string>(() => {
    const d = new Date();
    const localeTag = locale === 'ar' ? 'ar-EG' : 'en-US';
    return d.toLocaleDateString(localeTag, { year: 'numeric', month: 'short', day: 'numeric' });
  });
  const [status, setStatus] = useState<string>(t('billing.status.paid'));

  return (
    <div className="rounded-xl border border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-[#e6ebf4] dark:border-gray-800 flex items-center gap-2">
        {/* <Icon name="file_invoice" className="text-primary" /> */}
        <h3 className="text-lg font-bold text-[#0c121d] dark:text-white">{t('billing.paymentHistory')}</h3>
      </div>
      {showAdd && (
        <div className="px-6 py-4 border-b border-[#e6ebf4] dark:border-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <Input
              placeholder={locale === 'ar' ? 'المبلغ (مثال: $29.00)' : 'Amount (e.g., $29.00)'}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Input
              placeholder={locale === 'ar' ? 'التاريخ' : 'Date'}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value={t('billing.status.paid')}>{t('billing.status.paid')}</option>
              <option value={t('billing.status.due')}>{t('billing.status.due')}</option>
              <option value={t('billing.status.overdue')}>{t('billing.status.overdue')}</option>
            </Select>
            <div className="flex items-center justify-end gap-2">
              <Button size="sm" variant="outline" onClick={() => setShowAdd(false)}>{t('common.cancel')}</Button>
              <Button
                size="sm"
                onClick={() => {
                  const id = `INV-${new Date().getTime().toString().slice(-4)}`;
                  const inv = { id, date: date.trim(), amount: amount.trim() || '$0.00', status };
                  onAddInvoice?.(inv);
                  setAmount('');
                  setShowAdd(false);
                }}
              >
                {t('common.save')}
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#e6ebf4] dark:border-gray-800 text-[#4563a1] dark:text-gray-400">
              <th className={`px-6 py-4 font-medium whitespace-nowrap ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('billing.columns.invoice')}</th>
              <th className={`px-6 py-4 font-medium whitespace-nowrap ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('billing.columns.date')}</th>
              <th className={`px-6 py-4 font-medium whitespace-nowrap ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('billing.columns.amount')}</th>
              <th className={`px-6 py-4 font-medium whitespace-nowrap ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('billing.columns.status')}</th>
              <th className={`px-6 py-4 font-medium whitespace-nowrap ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('billing.columns.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e6ebf4] dark:divide-gray-800 text-[#0c121d] dark:text-white">
            {invoices.map((inv, i) => (
              <tr key={i} className="hover:bg-background-light/50 dark:hover:bg-gray-800/20 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-[#4563a1] dark:text-gray-400">{inv.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{inv.date}</td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">{inv.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button size="sm" variant="outline">
                    <Icon name="download" className="mr-2" />
                    {locale === 'ar' ? 'تحميل' : 'Download'}
                  </Button>
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td className="px-6 py-4 text-[#4563a1] dark:text-gray-400" colSpan={5}>
                  {locale === 'ar' ? 'لا توجد فواتير بعد.' : 'No invoices yet.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-[#e6ebf4] dark:divide-gray-800">
        {invoices.map((inv, i) => (
          <div key={i} className="p-4 space-y-3 hover:bg-background-light/50 dark:hover:bg-gray-800/20 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#4563a1] dark:text-gray-400">{inv.id}</span>
              <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                {inv.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#0c121d] dark:text-white">{inv.amount}</p>
                <p className="text-xs text-[#4563a1] dark:text-gray-400">{inv.date}</p>
              </div>
              <Button size="sm" variant="outline">
                <Icon name="download" />
              </Button>
            </div>
          </div>
        ))}
        {invoices.length === 0 && (
          <div className="p-8 text-center text-[#4563a1] dark:text-gray-500 text-sm">
            {locale === 'ar' ? 'لا توجد فواتير بعد.' : 'No invoices yet.'}
          </div>
        )}
      </div>
      <div className="px-6 py-4">
        <Button size="sm" className="w-full" onClick={() => setShowAdd((v) => !v)}>
          <Icon name="add_circle" className="mr-2" />
          {t('billing.addInvoice')}
        </Button>
      </div>
    </div>
  );
}

export default memo(InvoicesTableImpl);
