import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { useLocale } from '@/components/providers/LocaleProvider';
import React, { memo, useState } from 'react';

type Method = { type: 'card' | 'bank' | 'paypal'; label: string; default?: boolean };

type Props = {
  methods: Array<Method>;
  onAddMethod?: (m: Method) => void;
  onRemoveMethod?: (index: number) => void;
  onSetDefault?: (index: number) => void;
  onEditMethod?: (index: number, m: Method) => void;
};

function PaymentMethodsCardImpl({ methods, onAddMethod, onRemoveMethod, onSetDefault, onEditMethod }: Props) {
  const { t, locale } = useLocale();
  const [showAdd, setShowAdd] = useState(false);
  const [newType, setNewType] = useState<Method['type']>('card');
  const [newLabel, setNewLabel] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editType, setEditType] = useState<Method['type']>('card');
  const [editLabel, setEditLabel] = useState<string>('');

  const resetAddForm = () => {
    setNewType('card');
    setNewLabel('');
    setShowAdd(false);
  };

  const startEdit = (index: number, m: Method) => {
    setEditIndex(index);
    setEditType(m.type);
    setEditLabel(m.label);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditType('card');
    setEditLabel('');
  };

  return (
    <div className="rounded-xl border border-[#e6ebf4] dark:border-gray-800 bg-white dark:bg-[#1a202c] shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-[#e6ebf4] dark:border-gray-800 flex items-center gap-2">
        <Icon name="credit_card" className="text-primary" />
        <h3 className="text-lg font-bold text-[#0c121d] dark:text-white">{t('billing.paymentMethods')}</h3>
      </div>
      <div className="p-6 flex flex-col gap-4">
        {showAdd && (
          <div className="rounded-lg border border-[#e6ebf4] dark:border-gray-800 p-4 bg-background-light dark:bg-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Select value={newType} onChange={(e) => setNewType(e.target.value as Method['type'])}>
                <option value="card">{t('payment.card')}</option>
                <option value="paypal">{t('payment.paypal')}</option>
                <option value="bank">{t('payment.bank')}</option>
              </Select>
              <div className="sm:col-span-2">
                <Input
                  placeholder={locale === 'ar' ? 'التسمية الظاهرة' : 'Display label'}
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={resetAddForm}
              >
                {t('common.cancel')}
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  const label = newLabel.trim() || (newType === 'card' ? (locale === 'ar' ? 'بطاقة' : 'Card') : newType === 'paypal' ? 'PayPal' : (locale === 'ar' ? 'تحويل بنكي' : 'Bank Transfer'));
                  onAddMethod?.({ type: newType, label, default: methods.length === 0 });
                  resetAddForm();
                }}
              >
                {t('common.save')}
              </Button>
            </div>
          </div>
        )}
        {methods.map((m, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-[#e6ebf4] dark:border-gray-800 p-3 gap-4">
            <div className="flex items-center gap-3">
              <Icon name={m.type === 'card' ? 'credit_card' : m.type === 'bank' ? 'account_balance' : 'account_balance_wallet'} className="text-[#4563a1] dark:text-gray-400" />
              <div className="flex-1 min-w-0">
                {editIndex === i ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Select value={editType} onChange={(e) => setEditType(e.target.value as Method['type'])}>
                      <option value="card">{t('payment.card')}</option>
                      <option value="paypal">{t('payment.paypal')}</option>
                      <option value="bank">{t('payment.bank')}</option>
                    </Select>
                    <div className="sm:col-span-2">
                      <Input
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-[#0c121d] dark:text-white truncate">{m.label}</p>
                )}
                {m.default && (
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    {t('billing.default')}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:justify-end">
              {!m.default && (
                <Button size="sm" variant="outline" className="flex-1 sm:flex-none" onClick={() => onSetDefault?.(i)}>{t('billing.setDefault')}</Button>
              )}
              {editIndex === i ? (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 sm:flex-none"
                    onClick={cancelEdit}
                  >
                    {t('common.cancel')}
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 sm:flex-none"
                    onClick={() => {
                      onEditMethod?.(i, { type: editType, label: editLabel.trim() || m.label, default: m.default });
                      cancelEdit();
                    }}
                  >
                    {t('common.save')}
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" variant="outline" className="flex-1 sm:flex-none" onClick={() => startEdit(i, m)}>{t('common.edit')}</Button>
                  <Button size="sm" variant="outline" className="flex-1 sm:flex-none" onClick={() => onRemoveMethod?.(i)}>{t('billing.remove')}</Button>
                </>
              )}
            </div>
          </div>
        ))}
        {methods.length === 0 && (
          <div className="text-sm text-[#4563a1] dark:text-gray-400">
            {locale === 'ar' ? 'لا توجد طرق دفع محفوظة.' : 'No saved payment methods.'}
          </div>
        )}
        <Button size="sm" className="w-full" onClick={() => setShowAdd((v) => !v)}>
          <Icon name="add_circle" className="mr-2" />
          {t('billing.addMethod')}
        </Button>
      </div>
    </div>
  );
}

export default memo(PaymentMethodsCardImpl);
