import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';
type TextSize = 'lg' | 'base' | 'sm' | 'xs';
type TextTone = 'default' | 'muted' | 'strong' | 'inverse';

type HeadingProps = {
  as?: HeadingLevel;
  className?: string;
  children: ReactNode;
};

type ParagraphProps = {
  size?: TextSize;
  tone?: TextTone;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'p'>, 'children'>;

type TextProps = ParagraphProps;

type OverlineProps = {
  className?: string;
  children: ReactNode;
};

type SectionTitleProps = HeadingProps;

type SectionSubtitleProps = ParagraphProps & {
  align?: 'left' | 'center';
};

type GradientTextProps = {
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'span'>, 'children'>;

const headingStyles: Record<HeadingLevel, string> = {
  h1: 'font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl',
  h2: 'font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl',
  h3: 'font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl',
  h4: 'font-sans text-lg font-semibold leading-snug sm:text-xl',
};

const Heading = ({ as: Tag = 'h2', className, children }: HeadingProps) => (
  <Tag className={cn(headingStyles[Tag], className)}>{children}</Tag>
);

// Font-size system:
// xs   = 12px — copyright, timestamps, tiny badge labels
// sm   = 14px — nav links, card body, checklist items, secondary descriptions
// base = 16px — default body text, product descriptions
// lg   = 18–20px — larger intro/lead text
const textSizeStyles: Record<TextSize, string> = {
  lg: 'text-lg leading-8',
  base: 'text-base leading-7',
  sm: 'text-sm leading-6',
  xs: 'text-xs leading-5',
};

const textToneStyles: Record<TextTone, string> = {
  default: 'text-sand-600',
  muted: 'text-sand-500',
  strong: 'text-sand-900',
  inverse: 'text-sand-200',
};

const Paragraph = ({
  size = 'base',
  tone = 'default',
  className,
  children,
  ...rest
}: ParagraphProps) => (
  <p
    className={cn(
      'font-sans',
      textSizeStyles[size],
      textToneStyles[tone],
      className,
    )}
    {...rest}
  >
    {children}
  </p>
);

const Text = (props: TextProps) => <Paragraph {...props} />;

const Overline = ({ className, children }: OverlineProps) => (
  <span
    className={cn(
      'font-sans text-xs font-semibold uppercase tracking-[0.28em]',
      className,
    )}
  >
    {children}
  </span>
);

const SectionTitle = ({
  as: Tag = 'h2',
  className,
  children,
}: SectionTitleProps) => (
  <Heading as={Tag} className={cn('max-w-4xl text-sand-900', className)}>
    {children}
  </Heading>
);

const SectionSubtitle = ({
  align = 'left',
  className,
  ...props
}: SectionSubtitleProps) => (
  <Paragraph
    size="lg"
    tone="muted"
    className={cn('max-w-3xl', align === 'center' && 'mx-auto', className)}
    {...props}
  />
);

const GradientText = ({ className, children, ...rest }: GradientTextProps) => (
  <span
    className={cn('bg-cta-gradient bg-clip-text text-transparent', className)}
    {...rest}
  >
    {children}
  </span>
);

export {
  GradientText,
  Heading,
  Overline,
  Paragraph,
  SectionSubtitle,
  SectionTitle,
  Text,
};
export type {
  GradientTextProps,
  HeadingProps,
  OverlineProps,
  ParagraphProps,
  SectionSubtitleProps,
  SectionTitleProps,
  TextProps,
};
