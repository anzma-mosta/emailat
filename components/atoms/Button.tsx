import { forwardRef } from 'react';
import { cn } from '@/components/utils/cn';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const base = 'inline-flex items-center justify-center rounded-lg font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed';
const variants: Record<Variant, string> = {
  primary: 'bg-primary hover:bg-blue-800 text-white',
  outline: 'border border-[#e6ebf4] dark:border-gray-700 text-[#0c121d] dark:text-white hover:bg-background-light dark:hover:bg-gray-800',
  ghost: 'text-[#0c121d] dark:text-white hover:bg-background-light dark:hover:bg-gray-800',
};
const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-6 text-base',
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = 'primary', size = 'md', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});
