import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ContainerPadding = 'sm' | 'md' | 'lg';

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T;
  size?: ContainerSize;
  padding?: ContainerPadding;
  className?: string;
  children: ReactNode;
};

const sizeMap: Record<ContainerSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-none',
};

const paddingMap: Record<ContainerPadding, string> = {
  sm: 'px-4 sm:px-5 lg:px-6',
  md: 'px-5 sm:px-6 lg:px-8',
  lg: 'px-6 sm:px-8 lg:px-10',
};

const Container = <T extends ElementType = 'div'>({
  as,
  size = 'xl',
  padding = 'md',
  className,
  children,
  ...rest
}: ContainerProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) => {
  const Component = as ?? 'div';

  return (
    <Component
      className={cn(
        'mx-auto w-full',
        sizeMap[size],
        paddingMap[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

export { Container };
export type { ContainerPadding, ContainerProps, ContainerSize };
