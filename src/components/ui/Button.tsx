import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

import { cn } from '@/lib/utils';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'cta'
  | 'gold';

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonAsButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: undefined;
  };

type ButtonAsLinkProps = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-500 text-white shadow-sm hover:bg-brand-600 hover:shadow-glow-brand active:bg-brand-700',
  secondary:
    'bg-espresso-900 text-white shadow-sm hover:bg-espresso-800 active:bg-espresso-900',
  outline:
    'border border-sand-300 bg-transparent text-sand-900 hover:border-sand-900 hover:bg-sand-900 hover:text-white',
  ghost: 'bg-transparent text-sand-700 hover:bg-sand-100 hover:text-sand-900',
  cta: 'bg-cta-gradient text-white shadow-md hover:shadow-lg active:shadow-md',
  gold: 'bg-gold-500 text-white shadow-md hover:bg-gold-600 hover:shadow-lg',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'min-h-10 gap-1.5 px-4 text-sm',
  md: 'min-h-11 gap-2 px-5 text-sm sm:px-6',
  lg: 'min-h-12 gap-2 px-6 text-base sm:px-7',
  xl: 'min-h-14 gap-2.5 px-7 text-base sm:px-9 sm:text-lg',
};

const Button = ({
  variant = 'primary',
  size = 'md',
  href,
  loading = false,
  loadingText,
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...rest
}: ButtonProps) => {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full font-semibold',
    'transition-all duration-300 ease-out',
    'hover:-translate-y-0.5 active:translate-y-0',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2',
    'disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60',
    fullWidth && 'w-full',
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  const content = (
    <>
      {loading && (
        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {!loading && leadingIcon && (
        <span className="shrink-0">{leadingIcon}</span>
      )}
      <span>{loading && loadingText ? loadingText : children}</span>
      {!loading && trailingIcon && (
        <span className="shrink-0">{trailingIcon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={loading}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      type="button"
      className={classes}
      disabled={loading || buttonProps.disabled}
      {...buttonProps}
    >
      {content}
    </button>
  );
};

const PrimaryButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="primary" {...(props as ButtonProps)} />
);

const SecondaryButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="secondary" {...(props as ButtonProps)} />
);

const OutlineButton = (props: Omit<ButtonProps, 'variant'>) => (
  <Button variant="outline" {...(props as ButtonProps)} />
);

export { Button, OutlineButton, PrimaryButton, SecondaryButton };
export type { BaseButtonProps, ButtonProps, ButtonSize, ButtonVariant };
