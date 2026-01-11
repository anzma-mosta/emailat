import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/atoms/Icon';
import { useLocale } from '@/components/providers/LocaleProvider';

type Props = {
  href: string;
  icon: string;
  labelKey: string;
};

export function NavItem({ href, icon, labelKey }: Props) {
  const pathname = usePathname();
  const { t } = useLocale();
  const isActive = pathname === href || pathname?.startsWith(href + '/');
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
        isActive
          ? 'bg-primary text-white'
          : 'text-[#4563a1] dark:text-gray-400 hover:bg-primary/5 dark:hover:bg-primary/20 hover:text-primary'
      }`}
    >
      <Icon name={icon} />
      <span className="text-sm font-medium">{t(labelKey)}</span>
    </Link>
  );
}
