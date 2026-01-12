'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';

export default function SupportPage() {
  const { t } = useLocale();

  const supportOptions = [
    {
      title: t('services.support24'),
      desc: t('services.support24Desc'),
      icon: 'support_agent',
      action: 'الدردشة المباشرة'
    },
    {
      title: 'مركز المساعدة',
      desc: 'ابحث عن إجابات سريعة في قاعدة المعرفة الخاصة بنا.',
      icon: 'help',
      action: 'تصفح المقالات'
    },
    {
      title: 'تذاكر الدعم',
      desc: 'افتح تذكرة وسيقوم فريقنا بالرد عليك في أقرب وقت.',
      icon: 'confirmation_number',
      action: 'فتح تذكرة'
    }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0c121d] dark:text-white transition-colors duration-200">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <main className="layout-container flex grow flex-col items-center py-20 px-4 md:px-10">
          <div className="layout-content-container max-w-[1000px] w-full space-y-16">
            <div className="flex flex-col gap-6 text-center">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight">{t('header.support')}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                نحن هنا لمساعدتك في أي وقت. اختر الطريقة التي تفضلها للتواصل معنا.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {supportOptions.map((option, idx) => (
                <div key={idx} className="bg-white dark:bg-[#1a202c] rounded-3xl border border-[#e6ebf4] dark:border-gray-700 p-8 shadow-sm text-center flex flex-col items-center gap-6">
                  <div className="p-4 bg-primary/10 rounded-2xl">
                    <Icon name={option.icon} className="text-primary text-4xl" />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold">{option.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {option.desc}
                    </p>
                  </div>
                  <Button variant="outline" className="w-full mt-auto">
                    {option.action}
                  </Button>
                </div>
              ))}
            </div>

            <div className="bg-primary/5 dark:bg-primary/10 rounded-3xl p-10 md:p-16 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="space-y-4 text-center md:text-right">
                <h2 className="text-3xl font-black">هل لديك أسئلة أخرى؟</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  فريق المبيعات والدعم جاهز للرد على استفساراتكم التقنية والتجارية.
                </p>
              </div>
              <Button size="lg" className="px-12 text-lg h-14">تواصل معنا</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
