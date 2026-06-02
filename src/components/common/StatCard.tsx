import { cn } from '@/lib/utils';
import type { StatItem } from '@/types';

import { IconSlot } from './IconSlot';

type StatCardVariant = 'light' | 'dark' | 'glass';

type StatCardProps = StatItem & {
  variant?: StatCardVariant;
  className?: string;
};

const variantStyles: Record<StatCardVariant, string> = {
  light: 'bg-white border border-sand-200 text-sand-900',
  dark: 'bg-espresso-800 border border-espresso-700 text-white',
  glass: 'bg-white/5 border border-white/10 text-white backdrop-blur-sm',
};

const StatCard = ({
  icon,
  value,
  label,
  variant = 'glass',
  className,
}: StatCardProps) => (
  <div
    className={cn(
      'rounded-xl px-4 py-3 text-center transition-all duration-300',
      variantStyles[variant],
      className,
    )}
  >
    {icon && (
      <div className="mb-2 flex justify-center">
        <IconSlot className="size-5 text-current opacity-80" icon={icon} />
      </div>
    )}
    <div className="font-display text-xl font-bold">{value}</div>
    <div
      className={cn(
        'text-xs',
        variant === 'light' ? 'text-sand-500' : 'text-sand-400',
      )}
    >
      {label}
    </div>
  </div>
);

export { StatCard };
export type { StatCardProps, StatCardVariant };
