import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type GridGap = 'sm' | 'md' | 'lg';
type CardGridColumns = 2 | 3 | 4;
type CardGridResponsive = 'default' | 'desktop';
type StatGridColumns = 2 | 3 | 4;

type BaseGridProps = {
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

type CardGridProps = BaseGridProps & {
  columns?: CardGridColumns;
  gap?: GridGap;
  responsive?: CardGridResponsive;
};

type StatGridProps = BaseGridProps & {
  columns?: StatGridColumns;
  gap?: GridGap;
};

const gapStyles: Record<GridGap, string> = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

const cardGridStyles: Record<
  CardGridResponsive,
  Record<CardGridColumns, string>
> = {
  default: {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  },
  desktop: {
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 lg:grid-cols-3',
    4: 'grid-cols-1 lg:grid-cols-4',
  },
};

const statGridStyles: Record<StatGridColumns, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-4',
};

const CardGrid = ({
  columns = 3,
  gap = 'md',
  responsive = 'default',
  className,
  children,
  ...rest
}: CardGridProps) => (
  <div
    className={cn(
      'grid',
      gapStyles[gap],
      cardGridStyles[responsive][columns],
      className,
    )}
    {...rest}
  >
    {children}
  </div>
);

const StatGrid = ({
  columns = 4,
  gap = 'sm',
  className,
  children,
  ...rest
}: StatGridProps) => (
  <div
    className={cn('grid', gapStyles[gap], statGridStyles[columns], className)}
    {...rest}
  >
    {children}
  </div>
);

export { CardGrid, StatGrid };
export type {
  CardGridColumns,
  CardGridProps,
  CardGridResponsive,
  GridGap,
  StatGridColumns,
  StatGridProps,
};
