import { StatGrid } from '@/components/ui';
import type { StatItem } from '@/types';

import type { StatCardVariant } from './StatCard';
import { StatCard } from './StatCard';

type TrustBadgesProps = {
  badges: StatItem[];
  variant?: StatCardVariant;
  columns?: 2 | 3 | 4;
  className?: string;
};

const TrustBadges = ({
  badges,
  variant = 'glass',
  columns = 4,
  className,
}: TrustBadgesProps) => (
  <StatGrid columns={columns} className={className}>
    {badges.map((badge) => (
      <StatCard
        key={badge.label}
        icon={badge.icon}
        value={badge.value}
        label={badge.label}
        variant={variant}
      />
    ))}
  </StatGrid>
);

export { TrustBadges };
export type { TrustBadgesProps };
