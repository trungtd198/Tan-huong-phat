import { ArrowRight } from 'lucide-react';

import { type ButtonSize, OutlineButton, PrimaryButton } from '@/components/ui';
import { cn } from '@/lib/utils';

type SectionAction = {
  label: string;
  href: string;
  id?: string;
};

type SectionActionsProps = {
  primaryAction: SectionAction;
  secondaryAction: SectionAction;
  size?: ButtonSize;
  layout?: 'responsive-row' | 'stacked';
  className?: string;
  secondaryClassName?: string;
};

const layoutStyles: Record<
  NonNullable<SectionActionsProps['layout']>,
  string
> = {
  'responsive-row': 'flex flex-col gap-4 sm:flex-row',
  stacked: 'flex flex-col gap-4',
};

const SectionActions = ({
  primaryAction,
  secondaryAction,
  size = 'lg',
  layout = 'responsive-row',
  className,
  secondaryClassName,
}: SectionActionsProps) => (
  <div className={cn(layoutStyles[layout], className)}>
    <PrimaryButton
      href={primaryAction.href}
      id={primaryAction.id}
      size={size}
      trailingIcon={<ArrowRight className="size-4" />}
    >
      {primaryAction.label}
    </PrimaryButton>
    <OutlineButton
      href={secondaryAction.href}
      id={secondaryAction.id}
      size={size}
      className={cn(
        'border-white/20 text-white hover:bg-white/10 hover:text-white',
        secondaryClassName,
      )}
    >
      {secondaryAction.label}
    </OutlineButton>
  </div>
);

export { SectionActions };
export type { SectionAction, SectionActionsProps };
