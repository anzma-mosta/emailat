'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { useEffect, useMemo, useState } from 'react';

export default function EmailsPage() {
  const { t, locale } = useLocale();
  const [mailboxes, setMailboxes] = useState<Array<{ mailbox: string; domain: string; storage: number; status: string }>>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [localPart, setLocalPart] = useState('');
  const [domain, setDomain] = useState('');
  const [storage, setStorage] = useState('10GB');

  useEffect(() => {
    const selectedDomain = typeof window !== 'undefined' ? localStorage.getItem('selectedDomain') : null;
    setDomain(selectedDomain || 'acmecorp.com');
    setMailboxes([
      { mailbox: 'info@acmecorp.com', domain: 'acmecorp.com', storage: 80, status: t('dashboard.status.active') },
      { mailbox: 'sales@acmecorp.com', domain: 'acmecorp.com', storage: 35, status: t('dashboard.status.active') },
      { mailbox: 'support@acmecorp.com', domain: 'acmecorp.com', storage: 10, status: t('dashboard.status.pending') },
    ]);
  }, [t]);

  const domains = useMemo(() => {
    const d = typeof window !== 'undefined' ? localStorage.getItem('selectedDomain') : null;
    return [d || 'acmecorp.com'];
  }, []);

  const addMailbox = () => {
    const lp = localPart.trim();
    const dom = (domain || '').trim() || domains[0];
    if (!lp) return;
    const email = `${lp}@${dom}`;
    setMailboxes((prev) => [{ mailbox: email, domain: dom, storage: 0, status: t('dashboard.status.pending') }, ...prev]);
    setLocalPart('');
    setShowAdd(false);
  };

  const toggleStatus = (index: number, enable: boolean) => {
    setMailboxes((prev) =>
      prev.map((m, i) =>
        i === index ? { ...m, status: enable ? t('dashboard.status.active') : t('dashboard.status.pending') } : m
      )
    );
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="mx-auto max-w-[1200px] flex flex-col gap-8">
        <div className="flex items-end justify-between gap-4 border-b border-[#e6ebf4] dark:border-gray-800 pb-3">
          <div>
            <p className="text-sm text-[#4563a1] dark:text-gray-400">Manage mailboxes and aliases.</p>
          </div>
          <Button size="sm" onClick={() => setShowAdd((v) => !v)}>
            <Icon name="add_circle" className="mr-2" />
            {t('dashboard.addMailbox')}
          </Button>
        </div>

        <div className="rounded-xl border border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-[#e6ebf4] dark:border-gray-800 flex items-center gap-2">
            <Icon name="mail" className="text-primary" />
            <h3 className="text-lg font-bold text-[#0c121d] dark:text-white">{t('dashboard.mailboxes')}</h3>
          </div>
          {showAdd && (
            <div className="px-6 py-4 border-b border-[#e6ebf4] dark:border-gray-800">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <Input
                  value={localPart}
                  onChange={(e) => setLocalPart(e.target.value)}
                  placeholder={locale === 'ar' ? 'اسم المستخدم' : 'Username'}
                />
                <Select value={domain} onChange={(e) => setDomain(e.target.value)}>
                  {domains.map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                  ))}
                </Select>
                <Select value={storage} onChange={(e) => setStorage(e.target.value)}>
                  <option>2GB</option>
                  <option>5GB</option>
                  <option>10GB</option>
                  <option>20GB</option>
                </Select>
                <div className="flex items-center justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => setShowAdd(false)}>{locale === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
                  <Button size="sm" onClick={addMailbox}>{locale === 'ar' ? 'حفظ' : 'Save'}</Button>
                </div>
              </div>
              <p className="text-xs text-[#4563a1] dark:text-gray-400 mt-2">{t('domain.perAccountSuffix')}</p>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#e6ebf4] dark:border-gray-800 text-[#4563a1] dark:text-gray-400">
                  <th className="px-6 py-3 font-medium">{t('dashboard.mailbox')}</th>
                  <th className="px-6 py-3 font-medium">Domain</th>
                  <th className="px-6 py-3 font-medium">{t('dashboard.storage')}</th>
                  <th className="px-6 py-3 font-medium">{t('dashboard.columns.status')}</th>
                  <th className="px-6 py-3 font-medium">{t('dashboard.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6ebf4] dark:divide-gray-800 text-[#0c121d] dark:text-white">
                {mailboxes.map((m, idx) => (
                  <tr key={m.mailbox} className="hover:bg-background-light/50 dark:hover:bg-gray-800/20 transition-colors">
                    <td className="px-6 py-3 font-semibold">{m.mailbox}</td>
                    <td className="px-6 py-3 text-[#4563a1] dark:text-gray-400">{m.domain}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-32 overflow-hidden rounded-full bg-background-light dark:bg-gray-800">
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-500"
                            style={{ width: `${m.storage}%` }}
                          />
                        </div>
                        <span className="text-xs text-[#4563a1] dark:text-gray-400">{m.storage}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                        {m.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => toggleStatus(idx, true)}>
                          {t('dashboard.enable')}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => toggleStatus(idx, false)}>
                          {t('dashboard.disable')}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setMailboxes((prev) => prev.filter((_, i) => i !== idx))}>
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
    </div>
  );
}
