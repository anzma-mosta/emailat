import { forwardRef } from 'react';
import { cn } from '@/components/utils/cn';

type Props = React.SelectHTMLAttributes<HTMLSelectElement>;

const base = 'form-select w-full h-12 rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-background-light dark:bg-gray-800 text-[#0c121d] dark:text-white text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer';

export const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { className, ...props },
  ref
) {
  return <select ref={ref} className={cn(base, className)} {...props} />;
});
