import type { ReactNode } from 'react';

import { BaseCard, Heading, Paragraph, StatGrid } from '@/components/ui';
import { defaultBrandStoryMetrics } from '@/data/marketing';
import { cn } from '@/lib/utils';

import { SectionHeader } from './SectionHeader';
import { SectionWrapper } from './SectionWrapper';

type BrandStoryMetric = {
  value: string;
  label: string;
};

type BrandStorySectionProps = {
  id?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  description: string;
  supportingText?: string;
  metrics?: BrandStoryMetric[];
  theme?: 'light' | 'alt' | 'dark';
  visual?: ReactNode;
};

const BrandStorySection = ({
  id,
  badge,
  title,
  subtitle,
  description,
  supportingText,
  metrics = defaultBrandStoryMetrics,
  theme = 'light',
  visual,
}: BrandStorySectionProps) => (
  <SectionWrapper id={id} theme={theme}>
    <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
      <div>
        <SectionHeader
          badge={badge}
          badgeVariant={theme === 'dark' ? 'dark' : 'accent'}
          title={title}
          subtitle={subtitle}
          theme={theme === 'dark' ? 'dark' : 'light'}
          align="left"
        />

        <div className="space-y-5">
          <Paragraph tone={theme === 'dark' ? 'inverse' : 'default'}>
            {description}
          </Paragraph>
          {supportingText && (
            <Paragraph tone={theme === 'dark' ? 'inverse' : 'muted'}>
              {supportingText}
            </Paragraph>
          )}
        </div>

        <StatGrid columns={3} className="mt-8">
          {metrics.map((metric) => (
            <BaseCard
              key={metric.label}
              variant={theme === 'dark' ? 'dark' : 'default'}
              hover={false}
              className="h-full"
            >
              <Heading
                as="h3"
                className={cn(
                  'text-3xl sm:text-3xl',
                  theme === 'dark' ? 'text-white' : 'text-sand-900',
                )}
              >
                {metric.value}
              </Heading>
              <Paragraph
                size="sm"
                tone={theme === 'dark' ? 'inverse' : 'muted'}
                className="mt-2"
              >
                {metric.label}
              </Paragraph>
            </BaseCard>
          ))}
        </StatGrid>
      </div>

      <BaseCard
        variant={theme === 'dark' ? 'glass' : 'default'}
        className="overflow-hidden"
      >
        {visual ?? (
          <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-gradient-to-br from-sand-100 via-sand-50 to-brand-50">
            <div className="absolute inset-8 rounded-[2rem] border border-white/70" />
            <div className="absolute right-8 top-8 size-24 rounded-full border border-brand-200/60" />
            <div className="absolute bottom-10 left-10 hidden size-40 rounded-full bg-white/70 blur-2xl sm:block" />

            <div className="absolute inset-x-10 top-10">
              <div className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-brand-600">
                Nghi thức thương hiệu
              </div>
              <div className="max-w-sm font-display text-3xl leading-tight text-sand-900">
                Kết cấu, sự êm dịu và cảm giác tự tin trong mỗi quy trình.
              </div>
            </div>

            <div className="absolute inset-x-10 bottom-10 rounded-xl bg-white/80 p-6 backdrop-blur-sm">
              <div className="mb-2 text-sm uppercase tracking-[0.24em] text-sand-500">
                Định hướng đặc trưng
              </div>
              <div className="font-display text-2xl text-sand-900">
                Ít sản phẩm hơn. Cảm giác tốt hơn. Duy trì đều đặn hơn.
              </div>
            </div>
          </div>
        )}
      </BaseCard>
    </div>
  </SectionWrapper>
);

export { BrandStorySection };
export type { BrandStoryMetric, BrandStorySectionProps };
