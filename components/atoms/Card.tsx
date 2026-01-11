import { cn } from '@/components/utils/cn';

type Props = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-[#1a202c] rounded-xl border border-[#e6ebf4] dark:border-gray-700 p-6 shadow-sm',
        className
      )}
      {...props}
    />
  );
}
