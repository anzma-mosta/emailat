import { cn } from '@/components/utils/cn';

type Props = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export function FormField({ label, children, className }: Props) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label className="text-[#0c121d] dark:text-gray-200 text-sm font-medium leading-normal ml-1">
        {label}
      </label>
      {children}
    </div>
  );
}
