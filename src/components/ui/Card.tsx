import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'glass' | 'dark' | 'featured' | 'muted';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

type BaseCardProps = {
  variant?: CardVariant;
  hover?: boolean;
  className?: string;
  children: ReactNode;
  padding?: CardPadding;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

const variantStyles: Record<CardVariant, string> = {
  default: 'border border-sand-200 bg-white shadow-sm',
  glass: 'border border-white/10 bg-white/5 backdrop-blur-md',
  dark: 'border border-espresso-700 bg-espresso-800',
  featured:
    'border border-sand-200 border-t-4 border-t-brand-500 bg-white shadow-md',
  muted: 'border border-sand-200 bg-sand-100 shadow-sm',
};

const hoverStyles: Record<CardVariant, string> = {
  default: 'hover:-translate-y-1 hover:border-sand-300 hover:shadow-md',
  glass: 'hover:bg-white/10 hover:border-white/20',
  dark: 'hover:border-brand-500/30',
  featured: 'hover:-translate-y-1 hover:shadow-lg',
  muted: 'hover:border-sand-300 hover:shadow-md',
};

const paddingStyles: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-5',
  md: 'p-6 sm:p-7',
  lg: 'p-7 sm:p-8',
};

const BaseCard = ({
  variant = 'default',
  hover = true,
  padding = 'md',
  className,
  children,
  ...rest
}: BaseCardProps) => (
  <div
    className={cn(
      'rounded-xl transition-all duration-300',
      variantStyles[variant],
      paddingStyles[padding],
      hover && hoverStyles[variant],
      className,
    )}
    {...rest}
  >
    {children}
  </div>
);

const Card = BaseCard;

export { BaseCard, Card };
export type { BaseCardProps, CardPadding, CardVariant };
