'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Icon } from '@/components/atoms/Icon';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { Button } from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';
import { PLANS } from '@/lib/constants';

const SubscriptionsTable = dynamic(() => import('@/components/organisms/dashboard/SubscriptionsTable'), { ssr: false });
const PaymentMethodsCard = dynamic(() => import('@/components/organisms/dashboard/PaymentMethodsCard'), { ssr: false });
const InvoicesTable = dynamic(() => import('@/components/organisms/dashboard/InvoicesTable'), { ssr: false });

export default function DashboardPage() {
  const { t, locale } = useLocale();
  const [openNotifications, setOpenNotifications] = useState(false);
  const router = useRouter();
  
  const stats = useMemo(() => [
    { label: t('dashboard.stats.activeDomains'), value: '3', subtitle: t('dashboard.stats.allOperational'), icon: 'public', color: 'text-green-600' },
    { label: t('dashboard.stats.mailboxesUsed'), value: '12', subtitle: `38 ${t('dashboard.stats.licensesAvailable')}`, total: '50', icon: 'group' },
    { label: t('dashboard.stats.storageUsage'), value: '22.5 GB', subtitle: `${t('dashboard.stats.ofTotal')} 50 GB`, percentage: 45, icon: 'cloud' },
  ], [t]);

  const notifications = useMemo(() => [
    { icon: 'mail', title: t('activity.createdMailboxFor'), target: 'sales@acmecorp.com', time: locale === 'ar' ? 'قبل دقيقة' : '1m ago' },
    { icon: 'receipt_long', title: t('activity.autoPaymentSuccessful'), target: `${t('activity.invoice')} #4902`, time: locale === 'ar' ? 'قبل 10 دقائق' : '10m ago' },
    { icon: 'dns', title: t('activity.dnsRecordsUpdatedFor'), target: 'acmecorp.com', time: locale === 'ar' ? 'قبل ساعة' : '1h ago' },
  ], [t, locale]);

  const recentActivities = useMemo(() => [
    { date: 'Oct 24, 2023', type: t('activity.userManagement'), description: t('activity.createdMailboxFor'), email: 'sarah@acmecorp.com', status: t('status.completed'), statusColor: 'green' },
    { date: 'Oct 22, 2023', type: t('activity.billing'), description: `${t('activity.autoPaymentSuccessful')} ${t('activity.invoice')} #4902`, status: t('status.completed'), statusColor: 'green' },
    { date: 'Oct 20, 2023', type: t('activity.domainSettings'), description: t('activity.dnsRecordsUpdatedFor'), email: 'acmecorp.com', status: t('status.pendingPropagation'), statusColor: 'yellow' },
    { date: 'Oct 18, 2023', type: t('activity.systemAlert'), description: t('activity.storageUsageFor'), email: 'info@acmecorp.com', status: t('status.warning'), statusColor: 'orange', subtitle: `${t('activity.reached')} 80%` },
    { date: 'Oct 15, 2023', type: t('activity.security'), description: t('activity.passwordResetAdmin'), status: t('status.completed'), statusColor: 'green' },
  ], [t]);

  const [subscriptions, setSubscriptions] = useState<Array<any>>([]);
  const [methods, setMethods] = useState<Array<any>>([]);
  const [invoices, setInvoices] = useState<Array<any>>([]);

  useEffect(() => {
    try {
      const planId = typeof window !== 'undefined' ? localStorage.getItem('selectedPlan') : null;
      const billingPeriod = typeof window !== 'undefined' ? (localStorage.getItem('billingPeriod') as 'monthly' | 'yearly' | null) : null;
      const domain = typeof window !== 'undefined' ? localStorage.getItem('selectedDomain') : null;
      const paymentMethod = typeof window !== 'undefined' ? (localStorage.getItem('paymentMethod') as 'card' | 'paypal' | 'bank' | null) : null;
      const cardDetailsRaw = typeof window !== 'undefined' ? localStorage.getItem('cardDetails') : null;
      const plan = PLANS.find((p) => p.id === planId);

      const localeTag = locale === 'ar' ? 'ar-EG' : 'en-US';
      const nextDate = new Date();
      if (billingPeriod === 'yearly') {
        nextDate.setFullYear(nextDate.getFullYear() + 1);
      } else {
        nextDate.setMonth(nextDate.getMonth() + 1);
      }
      const nextBillingStr = nextDate.toLocaleDateString(localeTag, { year: 'numeric', month: 'short', day: 'numeric' });

      if (plan) {
        setSubscriptions([
          {
            id: `SUB-${plan.id.toUpperCase()}`,
            plan: plan.name,
            period: billingPeriod === 'yearly' ? (locale === 'ar' ? 'سنوي' : 'Yearly') : (locale === 'ar' ? 'شهري' : 'Monthly'),
            status: t('dashboard.status.active'),
            nextBilling: nextBillingStr,
            domain,
          },
        ]);

        const amount = `$${plan.price.toFixed(2)}`;
        const invoiceId = `INV-${new Date().getTime().toString().slice(-4)}`;
        setInvoices([
          {
            id: invoiceId,
            date: new Date().toLocaleDateString(localeTag, { year: 'numeric', month: 'short', day: 'numeric' }),
            amount,
            status: t('billing.status.paid'),
          },
        ]);
      } else {
        setSubscriptions([]);
        setInvoices([]);
      }

      const methodsArr: Array<any> = [];
      if (paymentMethod === 'card') {
        let label = locale === 'ar' ? 'بطاقة' : 'Card';
        if (cardDetailsRaw) {
          const cd = JSON.parse(cardDetailsRaw);
          const last4 = (cd.number || '').slice(-4);
          label = `Visa •••• ${last4 || '0000'}`;
        }
        methodsArr.push({ type: 'card', label, default: true });
      } else if (paymentMethod === 'paypal') {
        methodsArr.push({ type: 'card', label: 'PayPal', default: true });
      } else if (paymentMethod === 'bank') {
        methodsArr.push({ type: 'bank', label: locale === 'ar' ? 'تحويل بنكي' : 'Bank Transfer', default: true });
      }
      setMethods(methodsArr);
    } catch {
      setSubscriptions([]);
      setMethods([]);
      setInvoices([]);
    }
  }, [locale, t]);

  const toggleNotifications = useCallback(() => {
    setOpenNotifications((v) => !v);
  }, []);

  const handleAddMethod = useCallback((m: any) => {
    setMethods((prev) => [...prev, m]);
  }, []);

  const handleRemoveMethod = useCallback((index: number) => {
    setMethods((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSetDefault = useCallback((index: number) => {
    setMethods((prev) => prev.map((m, i) => ({ ...m, default: i === index })));
  }, []);

  const handleEditMethod = useCallback((index: number, m: any) => {
    setMethods((prev) => prev.map((item, i) => (i === index ? m : item)));
  }, []);

  const handleAddSubscription = useCallback((s: any) => {
    setSubscriptions((prev) => [...prev, s]);
  }, []);

  const handleRemoveSubscription = useCallback((index: number) => {
    setSubscriptions((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleEditSubscription = useCallback((index: number, s: any) => {
    setSubscriptions((prev) => prev.map((item, i) => (i === index ? s : item)));
  }, []);

  const handleAddInvoice = useCallback((inv: any) => {
    setInvoices((prev) => [inv, ...prev]);
  }, []);

  const getStatusColor = (color: string) => {
    const colors: Record<string, string> = {
      green: 'bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400',
      yellow: 'bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
      orange: 'bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
    };
    return colors[color] || colors.green;
  };

  return (
    <>
      {/* <header className="relative flex h-16 items-center justify-between border-b border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] px-6 lg:px-10">
       
        <div className="flex items-center gap-6">
          <div className="hidden max-w-md items-center rounded-lg bg-background-light dark:bg-background-dark px-3 py-2 sm:flex border border-transparent focus-within:border-primary/50 transition-colors">
            <Icon name="search" className="text-[#4563a1] dark:text-gray-400" />
            <input
              className="ml-2 w-full bg-transparent text-sm text-[#0c121d] dark:text-white placeholder-[#4563a1] focus:outline-none dark:placeholder-gray-400/50"
              placeholder={t('dashboard.searchPlaceholder')}
              type="text"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleNotifications}
              className="relative rounded-full p-2 text-[#4563a1] hover:bg-background-light dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            >
              <Icon name="notifications" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#1a202c]"></span>
            </button>
           
          </div>
        </div>
      </header> */}
      {openNotifications && (
        <div className="absolute right-6 top-20 z-50 w-full max-w-sm rounded-xl border border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] shadow-lg">
          <div className="px-4 py-3 border-b border-[#e6ebf4] dark:border-gray-800 flex items-center justify-between">
            <p className="text-sm font-bold text-[#0c121d] dark:text-white">{t('dashboard.recentActivity')}</p>
            <span className="text-xs text-[#4563a1] dark:text-gray-400">{notifications.length}</span>
          </div>
          <ul className="divide-y divide-[#e6ebf4] dark:divide-gray-800">
            {notifications.map((n, i) => (
              <li key={i} className="px-4 py-3 flex items-start gap-3 hover:bg-background-light/50 dark:hover:bg-gray-800/20 transition-colors">
                <div className="mt-0.5 text-primary">
                  <Icon name={n.icon} className="text-[18px]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#0c121d] dark:text-white">
                    {n.title} <span className="font-medium text-[#4563a1] dark:text-gray-300">{n.target}</span>
                  </p>
                  <p className="text-xs text-[#4563a1] dark:text-gray-400 mt-1">{n.time}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-4 py-2 text-xs text-[#4563a1] dark:text-gray-400">
            {locale === 'ar' ? 'عرض الكل' : 'View all'}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-[#0c121d] dark:text-white">
                {t('dashboard.welcome')} Acme Corp 👋
              </h3>
              <p className="mt-1 text-[#4563a1] dark:text-gray-400">
                {t('dashboard.overviewToday')}
              </p>
            </div>
            <div>
              <Link
            href="/dashboard/upgrade"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark"
          >
            <Icon name="add_circle" />
            {t('dashboard.newSubscription')}
          </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-xl border border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#4563a1] dark:text-gray-400">
                    {stat.label}
                  </p>
                  <Icon name={stat.icon} className="text-primary" />
                </div>
                <div className={stat.percentage ? 'flex flex-col justify-end h-full' : ''}>
                  <div className="flex items-end justify-between mb-2">
                    <p className="text-3xl font-bold text-[#0c121d] dark:text-white">
                      {stat.value}
                      {stat.total && (
                        <span className="text-lg text-[#4563a1] font-normal"> / {stat.total}</span>
                      )}
                    </p>
                    {stat.percentage && (
                      <span className="text-xs font-medium text-[#4563a1] dark:text-gray-400">
                        {stat.percentage}%
                      </span>
                    )}
                  </div>
                  {stat.percentage && (
                    <div className="h-2 w-full overflow-hidden rounded-full bg-background-light dark:bg-gray-800">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                  )}
                  <p className={`mt-2 text-xs ${stat.color || 'text-[#4563a1] dark:text-gray-400'} flex items-center gap-1`}>
                    {stat.color && <Icon name="check_circle" className="text-[16px]" />}
                    {stat.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <SubscriptionsTable
              subscriptions={subscriptions}
              onAddSubscription={handleAddSubscription}
              onRemoveSubscription={handleRemoveSubscription}
              onEditSubscription={handleEditSubscription}
            />
            <div className="flex flex-col gap-6">
              <PaymentMethodsCard
                methods={methods}
                onAddMethod={handleAddMethod}
                onRemoveMethod={handleRemoveMethod}
                onSetDefault={handleSetDefault}
                onEditMethod={handleEditMethod}
              />
              <InvoicesTable
                invoices={invoices}
                onAddInvoice={handleAddInvoice}
              />
            </div>
          </div>

          <div className="flex flex-col rounded-xl border border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e6ebf4] dark:border-gray-800">
              <h3 className="text-lg font-bold text-[#0c121d] dark:text-white">{t('dashboard.recentActivity')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e6ebf4] dark:border-gray-800 text-[#4563a1] dark:text-gray-400">
                    <th className="px-6 py-4 font-medium whitespace-nowrap">{t('dashboard.columns.date')}</th>
                    <th className="px-6 py-4 font-medium whitespace-nowrap">{t('dashboard.columns.activityType')}</th>
                    <th className="px-6 py-4 font-medium whitespace-nowrap">{t('dashboard.columns.description')}</th>
                    <th className="px-6 py-4 font-medium whitespace-nowrap">{t('dashboard.columns.status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6ebf4] dark:divide-gray-800 text-[#0c121d] dark:text-white">
                  {recentActivities.map((activity, index) => (
                    <tr
                      key={index}
                      className="hover:bg-background-light/50 dark:hover:bg-gray-800/20 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-[#4563a1] dark:text-gray-400">
                        {activity.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{activity.type}</td>
                      <td className="px-6 py-4 min-w-[250px]">
                        {activity.description}
                        {activity.email && (
                          <>
                            {' '}
                            <span className="font-medium text-[#4563a1] dark:text-gray-400">
                              {activity.email}
                            </span>
                          </>
                        )}
                        {activity.subtitle && (
                          <>
                            {' '}
                            <span className="text-[#4563a1] dark:text-gray-400">{activity.subtitle}</span>
                          </>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center rounded-full ${getStatusColor(activity.statusColor)}`}>
                          {activity.status}
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
    </>
  );
}

