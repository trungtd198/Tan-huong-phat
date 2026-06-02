import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

import type { ContainerPadding, ContainerSize } from './Container';
import { Container } from './Container';

type SectionTheme = 'light' | 'alt' | 'dark' | 'brand';
type SectionSpacing = 'sm' | 'md' | 'lg' | 'xl';

type SectionProps = {
  theme?: SectionTheme;
  spacing?: SectionSpacing;
  containerSize?: ContainerSize;
  containerPadding?: ContainerPadding;
  withContainer?: boolean;
  containerClassName?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'section'>, 'children'>;

const themeStyles: Record<SectionTheme, string> = {
  light: 'bg-sand-50 text-sand-600',
  alt: 'bg-sand-100 text-sand-600',
  dark: 'bg-espresso-900 text-sand-400',
  brand: 'bg-cta-gradient text-white',
};

const spacingStyles: Record<SectionSpacing, string> = {
  sm: 'py-10 sm:py-14 lg:py-16',
  md: 'py-12 sm:py-16 lg:py-20 xl:py-24',
  lg: 'py-16 sm:py-20 lg:py-24 xl:py-32',
  xl: 'py-20 sm:py-24 lg:py-28 xl:py-36',
};

const Section = ({
  theme = 'light',
  spacing = 'md',
  containerSize = 'xl',
  containerPadding = 'md',
  withContainer = true,
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) => (
  <section
    className={cn(themeStyles[theme], spacingStyles[spacing], className)}
    {...rest}
  >
    {withContainer ? (
      <Container
        size={containerSize}
        padding={containerPadding}
        className={containerClassName}
      >
        {children}
      </Container>
    ) : (
      children
    )}
  </section>
);

export { Section };
export type { SectionProps, SectionSpacing, SectionTheme };
