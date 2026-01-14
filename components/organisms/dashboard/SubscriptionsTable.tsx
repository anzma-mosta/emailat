import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { useLocale } from '@/components/providers/LocaleProvider';
import React, { memo, useMemo, useState } from 'react';
import Link from 'next/link';

type Subscription = {
  id: string;
  plan: string;
  period: string;
  status: string;
  nextBilling: string;
  domain?: string | null;
};

type Props = {
  subscriptions: Array<Subscription>;
  onAddSubscription?: (s: Subscription) => void;
  onRemoveSubscription?: (index: number) => void;
  onEditSubscription?: (index: number, s: Subscription) => void;
};

function SubscriptionsTableImpl({ subscriptions, onAddSubscription, onRemoveSubscription, onEditSubscription }: Props) {
  const { t, locale } = useLocale();
  const [showAdd, setShowAdd] = useState(false);
  const [plan, setPlan] = useState<string>('');
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [domain, setDomain] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editPlan, setEditPlan] = useState<string>('');
  const [editPeriod, setEditPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [editDomain, setEditDomain] = useState<string>('');

  const localeTag = useMemo(() => (locale === 'ar' ? 'ar-EG' : 'en-US'), [locale]);

  const addSubscription = () => {
    const nextDate = new Date();
    if (period === 'yearly') {
      nextDate.setFullYear(nextDate.getFullYear() + 1);
    } else {
      nextDate.setMonth(nextDate.getMonth() + 1);
    }
    const nextBillingStr = nextDate.toLocaleDateString(localeTag, { year: 'numeric', month: 'short', day: 'numeric' });
    const readablePeriod = period === 'yearly' ? t('plans.toggle.yearly') : t('plans.toggle.monthly');
    const id = `SUB-${new Date().getTime().toString().slice(-4)}`;
    const s: Subscription = {
      id,
      plan: plan.trim() || (locale === 'ar' ? 'خطة' : 'Plan'),
      period: readablePeriod,
      status: t('dashboard.status.active'),
      nextBilling: nextBillingStr,
      domain: domain.trim() || undefined,
    };
    onAddSubscription?.(s);
    setPlan('');
    setDomain('');
    setPeriod('monthly');
    setShowAdd(false);
  };

  const startEdit = (index: number, s: Subscription) => {
    setEditIndex(index);
    setEditPlan(s.plan);
    setEditPeriod(s.period === t('plans.toggle.yearly') ? 'yearly' : 'monthly');
    setEditDomain(s.domain ?? '');
  };

  const saveEdit = (index: number, original: Subscription) => {
    const readablePeriod = editPeriod === 'yearly' ? t('plans.toggle.yearly') : t('plans.toggle.monthly');
    const updated: Subscription = {
      ...original,
      plan: editPlan.trim() || original.plan,
      period: readablePeriod,
      domain: editDomain.trim() || original.domain,
    };
    onEditSubscription?.(index, updated);
    setEditIndex(null);
    setEditPlan('');
    setEditDomain('');
    setEditPeriod('monthly');
  };

  return (
    <div className="lg:col-span-2 rounded-xl border border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-[#e6ebf4] dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="receipt_long" className="text-primary" />
          <h3 className="text-lg font-bold text-[#0c121d] dark:text-white">{t('billing.subscriptions')}</h3>
        </div>
        <Link href="/dashboard/upgrade">
          <Button size="sm" variant="primary" className="flex items-center gap-2">
            <Icon name="auto_awesome" className="text-sm" />
            {t('plans.upgrade') || (locale === 'ar' ? 'ترقية الخطة' : 'Upgrade Plan')}
          </Button>
        </Link>
      </div>
      {showAdd && (
        <div className="px-6 py-4 border-b border-[#e6ebf4] dark:border-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <Input
              placeholder={locale === 'ar' ? 'اسم الخطة' : 'Plan name'}
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
            />
            <Select value={period} onChange={(e) => setPeriod(e.target.value as 'monthly' | 'yearly')}>
              <option value="monthly">{t('plans.toggle.monthly')}</option>
              <option value="yearly">{t('plans.toggle.yearly')}</option>
            </Select>
            <Input
              placeholder={locale === 'ar' ? 'النطاق (اختياري)' : 'Domain (optional)'}
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
            <div className="flex items-center justify-end gap-2">
              <Button size="sm" variant="outline" onClick={() => setShowAdd(false)}>{t('common.cancel')}</Button>
              <Button size="sm" onClick={addSubscription}>{t('common.save')}</Button>
            </div>
          </div>
        </div>
      )}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#e6ebf4] dark:border-gray-800 text-[#4563a1] dark:text-gray-400">
              <th className={`px-6 py-4 font-medium whitespace-nowrap ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{locale === 'ar' ? 'الاشتراك' : 'Subscription'}</th>
              <th className={`px-6 py-4 font-medium whitespace-nowrap ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('domain.step.plan')}</th>
              <th className={`px-6 py-4 font-medium whitespace-nowrap ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('order.billingPeriod')}</th>
              <th className={`px-6 py-4 font-medium whitespace-nowrap ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('dashboard.columns.status')}</th>
              <th className={`px-6 py-4 font-medium whitespace-nowrap ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('billing.columns.dueDate')}</th>
              <th className={`px-6 py-4 font-medium whitespace-nowrap ${locale === 'ar' ? 'text-right' : 'text-left'}`}>{t('dashboard.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e6ebf4] dark:divide-gray-800 text-[#0c121d] dark:text-white">
            {subscriptions.map((s, i) => (
              <tr key={i} className="hover:bg-background-light/50 dark:hover:bg-gray-800/20 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-[#4563a1] dark:text-gray-400">{s.id}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {editIndex === i ? (
                    <Input value={editPlan} onChange={(e) => setEditPlan(e.target.value)} />
                  ) : (
                    s.plan
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editIndex === i ? (
                    <Select value={editPeriod} onChange={(e) => setEditPeriod(e.target.value as 'monthly' | 'yearly')}>
                      <option value="monthly">{t('plans.toggle.monthly')}</option>
                      <option value="yearly">{t('plans.toggle.yearly')}</option>
                    </Select>
                  ) : (
                    s.period
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[#4563a1] dark:text-gray-400">{s.nextBilling}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {editIndex === i ? (
                      <>
                        <Button size="sm" variant="outline" onClick={() => setEditIndex(null)}>{t('common.cancel')}</Button>
                        <Button size="sm" onClick={() => saveEdit(i, s)}>{t('common.save')}</Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={() => startEdit(i, s)}>{t('common.edit')}</Button>
                        <Button size="sm" variant="outline" onClick={() => onRemoveSubscription?.(i)}>{t('billing.remove')}</Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {subscriptions.length === 0 && (
              <tr>
                <td className="px-6 py-4 text-[#4563a1] dark:text-gray-400" colSpan={6}>
                  {locale === 'ar' ? 'لا توجد اشتراكات بعد.' : 'No subscriptions yet.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-[#e6ebf4] dark:divide-gray-800">
        {subscriptions.map((s, i) => (
          <div key={i} className="p-4 space-y-4 hover:bg-background-light/50 dark:hover:bg-gray-800/20 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#4563a1] dark:text-gray-400">{s.id}</span>
              <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                {s.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#4563a1] dark:text-gray-500 mb-1">
                  {t('domain.step.plan')}
                </p>
                {editIndex === i ? (
                  <Input className="h-10 text-sm" value={editPlan} onChange={(e) => setEditPlan(e.target.value)} />
                ) : (
                  <p className="text-sm font-bold text-[#0c121d] dark:text-white">{s.plan}</p>
                )}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#4563a1] dark:text-gray-500 mb-1">
                  {t('order.billingPeriod')}
                </p>
                {editIndex === i ? (
                  <Select className="h-10 text-sm" value={editPeriod} onChange={(e) => setEditPeriod(e.target.value as 'monthly' | 'yearly')}>
                    <option value="monthly">{t('plans.toggle.monthly')}</option>
                    <option value="yearly">{t('plans.toggle.yearly')}</option>
                  </Select>
                ) : (
                  <p className="text-sm text-[#0c121d] dark:text-white">{s.period}</p>
                )}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#4563a1] dark:text-gray-500 mb-1">
                  {t('billing.columns.dueDate')}
                </p>
                <p className="text-sm text-[#0c121d] dark:text-white">{s.nextBilling}</p>
              </div>
              <div className="flex items-end justify-end gap-2">
                {editIndex === i ? (
                  <>
                    <Button size="sm" variant="outline" onClick={() => setEditIndex(null)}>{t('common.cancel')}</Button>
                    <Button size="sm" onClick={() => saveEdit(i, s)}>{t('common.save')}</Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="outline" onClick={() => startEdit(i, s)}>{t('common.edit')}</Button>
                    <Button size="sm" variant="outline" onClick={() => onRemoveSubscription?.(i)}>{t('billing.remove')}</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        {subscriptions.length === 0 && (
          <div className="p-8 text-center text-[#4563a1] dark:text-gray-500 text-sm">
            {locale === 'ar' ? 'لا توجد اشتراكات بعد.' : 'No subscriptions yet.'}
          </div>
        )}
      </div>
      <div className="px-6 py-4">
        <Button size="sm" className="w-full" onClick={() => setShowAdd((v) => !v)}>
          <Icon name="add_circle" className="mr-2" />
          {t('dashboard.newSubscription')}
        </Button>
      </div>
    </div>
  );
}

export default memo(SubscriptionsTableImpl);
