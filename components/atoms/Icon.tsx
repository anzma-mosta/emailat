import { cn } from '@/components/utils/cn';

type Props = {
  name: string;
  className?: string;
  fill?: 0 | 1;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  grade?: -25 | 0 | 200;
  opsz?: 20 | 24 | 40 | 48;
};

export function Icon({
  name,
  className,
  fill = 0,
  weight = 400,
  grade = 0,
  opsz = 24,
}: Props) {
  return (
    <span
      className={cn('material-symbols-outlined select-none', className)}
      style={{
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opsz}`,
      }}
    >
      {name}
    </span>
  );
}
