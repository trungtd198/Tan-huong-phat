import type { BadgeVariant } from '@/components/ui';
import { Badge, SectionSubtitle, SectionTitle } from '@/components/ui';
import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  badge?: string;
  badgeVariant?: BadgeVariant;
  title: string;
  subtitle?: string;
  theme?: 'light' | 'dark';
  align?: 'center' | 'left';
  className?: string;
};

const SectionHeader = ({
  badge,
  badgeVariant = 'default',
  title,
  subtitle,
  theme = 'light',
  align = 'center',
  className,
}: SectionHeaderProps) => (
  <div
    className={cn(
      'mb-12 sm:mb-16',
      align === 'center' && 'text-center',
      className,
    )}
  >
    {badge && (
      <Badge variant={badgeVariant} className="mb-4">
        {badge}
      </Badge>
    )}

    <SectionTitle
      as="h2"
      className={cn('mb-4', theme === 'light' ? 'text-sand-900' : 'text-white')}
    >
      {title}
    </SectionTitle>

    {subtitle && (
      <SectionSubtitle
        align={align}
        className={theme === 'light' ? 'text-sand-600' : 'text-sand-400'}
      >
        {subtitle}
      </SectionSubtitle>
    )}
  </div>
);

export { SectionHeader };
export type { SectionHeaderProps };
