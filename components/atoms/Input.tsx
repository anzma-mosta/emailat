import { forwardRef } from 'react';
import { cn } from '@/components/utils/cn';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const base = 'form-input w-full h-12 px-4 rounded-lg border border-[#cdd7ea] dark:border-gray-600 bg-background-light dark:bg-gray-800 text-[#0c121d] dark:text-white text-base placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none';

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, ...props },
  ref
) {
  return <input ref={ref} className={cn(base, className)} {...props} />;
});
