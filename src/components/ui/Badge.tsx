import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'accent' | 'dark' | 'success' | 'gold';

type BadgeProps = {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
};

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-brand-50 text-brand-700',
  accent: 'bg-brand-100 text-brand-600',
  dark: 'bg-espresso-800 text-gold-400 border border-espresso-700',
  success: 'bg-green-50 text-green-700',
  gold: 'bg-gold-500/10 text-gold-600 border border-gold-500/20',
};

const Badge = ({ variant = 'default', className, children }: BadgeProps) => (
  <span
    className={cn(
      'inline-block rounded-sm px-4 py-1.5',
      'text-xs font-semibold uppercase tracking-widest',
      variantStyles[variant],
      className,
    )}
  >
    {children}
  </span>
);

export { Badge };
export type { BadgeProps, BadgeVariant };
