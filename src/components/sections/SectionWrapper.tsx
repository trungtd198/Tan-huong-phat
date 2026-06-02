import type { ReactNode } from 'react';

import { Section } from '@/components/ui';

type SectionTheme = 'light' | 'alt' | 'dark' | 'brand';
type SectionPadding = 'sm' | 'md' | 'lg';

type SectionWrapperProps = {
  id?: string;
  theme?: SectionTheme;
  padding?: SectionPadding;
  className?: string;
  children: ReactNode;
};

const SectionWrapper = ({
  id,
  theme = 'light',
  padding = 'md',
  className,
  children,
}: SectionWrapperProps) => (
  <Section id={id} theme={theme} spacing={padding} className={className}>
    {children}
  </Section>
);

export { SectionWrapper };
export type { SectionPadding, SectionTheme, SectionWrapperProps };
