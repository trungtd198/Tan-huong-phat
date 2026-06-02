import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type PageWrapperProps<T extends ElementType = 'div'> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'children'>;

const PageWrapper = <T extends ElementType = 'div'>({
  as,
  className,
  children,
  ...rest
}: PageWrapperProps<T>) => {
  const Component = as ?? 'div';

  return (
    <Component
      className={cn(
        'min-h-screen overflow-x-hidden bg-sand-50 font-sans text-sand-600 antialiased',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};

export { PageWrapper };
export type { PageWrapperProps };
