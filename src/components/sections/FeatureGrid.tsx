import { IconSlot } from '@/components/common';
import { BaseCard, CardGrid, Heading, Paragraph } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { Feature } from '@/types';

import { SectionHeader } from './SectionHeader';
import { SectionWrapper } from './SectionWrapper';

type FeatureGridProps = {
  id?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  features: Feature[];
  theme?: 'light' | 'alt' | 'dark';
  columns?: 2 | 3;
};

const FeatureGrid = ({
  id,
  badge,
  title,
  subtitle,
  features,
  theme = 'light',
  columns = 3,
}: FeatureGridProps) => (
  <SectionWrapper id={id} theme={theme}>
    <SectionHeader
      badge={badge}
      badgeVariant={theme === 'dark' ? 'dark' : 'accent'}
      title={title}
      subtitle={subtitle}
      theme={theme === 'dark' ? 'dark' : 'light'}
    />

    <CardGrid columns={columns} responsive="desktop">
      {features.map((feature) => (
        <BaseCard
          key={feature.title}
          variant={theme === 'dark' ? 'dark' : 'default'}
          className="h-full"
        >
          <div
            className={cn(
              'mb-5 flex size-12 items-center justify-center rounded-full',
              theme === 'dark'
                ? 'bg-white/10 text-gold-400'
                : 'bg-brand-50 text-brand-600',
            )}
          >
            <IconSlot
              className={cn(
                typeof feature.icon === 'string'
                  ? 'font-sans text-sm font-semibold tracking-[0.24em]'
                  : 'size-5',
              )}
              icon={feature.icon}
            />
          </div>
          <Heading
            as="h3"
            className={cn(
              'mb-3',
              theme === 'dark' ? 'text-white' : 'text-sand-900',
            )}
          >
            {feature.title}
          </Heading>
          <Paragraph
            size="sm"
            tone={theme === 'dark' ? 'inverse' : 'default'}
            className="mb-5"
          >
            {feature.description}
          </Paragraph>

          {feature.tags && feature.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {feature.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    'rounded-sm px-2.5 py-1 text-xs',
                    theme === 'dark'
                      ? 'bg-white/5 text-sand-300'
                      : 'bg-sand-100 text-sand-600',
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </BaseCard>
      ))}
    </CardGrid>
  </SectionWrapper>
);

export { FeatureGrid };
export type { FeatureGridProps };
