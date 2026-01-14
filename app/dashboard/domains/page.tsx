'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { useMemo, useState } from 'react';
import { Modal } from '@/components/atoms/Modal';
import { FormField } from '@/components/molecules/FormField';

export default function DomainsPage() {
  const { t, locale } = useLocale();
  const [domains, setDomains] = useState<Array<{ name: string; status: string; statusColor: string; expiry: string }>>(() => [
    { name: 'acmecorp.com', status: t('dashboard.status.active'), statusColor: 'green', expiry: 'Feb 12, 2026' },
    { name: 'shop.acmecorp.com', status: t('dashboard.status.expiring'), statusColor: 'yellow', expiry: 'Jan 25, 2026' },
    { name: 'staging.acmecorp.org', status: t('dashboard.status.pending'), statusColor: 'orange', expiry: '—' },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [name, setName] = useState('');
  const [ext, setExt] = useState('.com');
  const [connectName, setConnectName] = useState('');

  const localeTag = useMemo(() => (locale === 'ar' ? 'ar-EG' : 'en-US'), [locale]);

  const addDomain = () => {
    const dn = name.trim();
    if (!dn) return;
    const full = `${dn}${ext}`;
    const status = t('dashboard.status.pending');
    const expiry = '—';
    setDomains((prev) => [{ name: full, status, statusColor: 'orange', expiry }, ...prev]);
    setName('');
    setShowAdd(false);
  };

  const connectDomain = () => {
    const full = connectName.trim();
    if (!full) return;
    setDomains((prev) => [{ name: full, status: t('dashboard.status.pending'), statusColor: 'orange', expiry: '—' }, ...prev]);
    setConnectName('');
    setShowConnect(false);
  };

  const getStatusChip = (color: string) => {
    const map: Record<string, string> = {
      green: 'bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400',
      yellow: 'bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
      orange: 'bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
    };
    return map[color] || map.green;
  };
  return (
    <div className="p-6 lg:p-10">
      <div className="mx-auto max-w-[1200px] flex flex-col gap-8">
        <div className="flex items-end justify-between gap-4 border-b border-[#e6ebf4] dark:border-gray-800 pb-3">
          <div>
            <p className="text-sm text-[#4563a1] dark:text-gray-400">{t('dashboard.domainsManage')}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => setShowAdd((v) => !v)}>
              <Icon name="add_circle" className="mr-2 " />
              {t('dashboard.addDomain')}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowConnect((v) => !v)}>
              <Icon name="language" className="mr-2" />
              {t('dashboard.connectDomain')}
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-[#e6ebf4] dark:border-gray-800 flex items-center gap-2">
            <Icon name="language" className="text-primary" />
            <h3 className="text-lg font-bold text-[#0c121d] dark:text-white">{t('dashboard.domainsList')}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#e6ebf4] dark:border-gray-800 text-[#4563a1] dark:text-gray-400">
                  <th className="px-6 py-3 font-medium">Domain</th>
                  <th className="px-6 py-3 font-medium">{t('dashboard.columns.status')}</th>
                  <th className="px-6 py-3 font-medium">Expiry</th>
                  <th className="px-6 py-3 font-medium">{t('dashboard.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6ebf4] dark:divide-gray-800 text-[#0c121d] dark:text-white">
                {domains.map((d) => (
                  <tr key={d.name} className="hover:bg-background-light/50 dark:hover:bg-gray-800/20 transition-colors">
                    <td className="px-6 py-3 font-semibold">{d.name}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center rounded-full ${getStatusChip(d.statusColor)}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-[#4563a1] dark:text-gray-400">{d.expiry}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Icon name="dns" className="mr-2" />
                          {t('dashboard.manageDNS')}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Icon name="autorenew" className="mr-2" />
                          {t('dashboard.renew')}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setDomains((prev) => prev.filter((x) => x.name !== d.name))}>
                          {t('billing.remove')}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        title={t('dashboard.addDomain')}
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={locale === 'ar' ? 'اسم النطاق' : 'Domain name'}
                className="w-full"
              />
            </div>
            <div className="w-32">
              <Select value={ext} onChange={(e) => setExt(e.target.value)}>
                <option>.com</option>
                <option>.net</option>
                <option>.org</option>
                <option>.co</option>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAdd(false)}>
              {locale === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={addDomain}>
              {locale === 'ar' ? 'حفظ' : 'Save'}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showConnect}
        onClose={() => setShowConnect(false)}
        title={t('dashboard.connectDomain')}
      >
        <div className="flex flex-col gap-4">
          <Input
            value={connectName}
            onChange={(e) => setConnectName(e.target.value)}
            placeholder={locale === 'ar' ? 'أدخل اسم النطاق الخاص بك' : 'Enter your domain name'}
            className="w-full"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowConnect(false)}>
              {locale === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={connectDomain}>
              {locale === 'ar' ? 'حفظ' : 'Save'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
