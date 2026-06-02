import { Star } from 'lucide-react';

import { Badge, BaseCard, Paragraph } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/types';

type TestimonialCardProps = {
  testimonial: Testimonial;
  theme?: 'light' | 'dark';
  className?: string;
};

const TestimonialCard = ({
  testimonial,
  theme = 'dark',
  className,
}: TestimonialCardProps) => (
  <BaseCard
    variant={theme === 'dark' ? 'dark' : 'default'}
    className={cn('flex h-full flex-col', className)}
  >
    <div className="mb-4 flex gap-1 text-sm tracking-[0.3em] text-gold-400">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={`${testimonial.id}-${index + 1}`}
          aria-hidden="true"
          className={cn(
            'size-4 fill-current',
            index < testimonial.rating ? 'opacity-100' : 'opacity-30',
          )}
          strokeWidth={1.6}
        />
      ))}
    </div>

    <Paragraph
      size="sm"
      tone={theme === 'dark' ? 'inverse' : 'default'}
      className="mb-6 flex-1"
    >
      &quot;{testimonial.text}&quot;
    </Paragraph>

    {testimonial.product && (
      <div className="mb-5">
        <Badge variant={theme === 'dark' ? 'dark' : 'gold'}>
          {testimonial.product}
        </Badge>
      </div>
    )}

    <div className="flex items-center gap-3 border-t border-white/10 pt-5">
      <div
        className={cn(
          'flex size-11 items-center justify-center rounded-full text-sm font-semibold text-white shadow-sm',
          testimonial.avatarBg,
        )}
      >
        {testimonial.avatar}
      </div>

      <div className="space-y-1">
        <div
          className={cn(
            'text-sm font-semibold',
            theme === 'dark' ? 'text-white' : 'text-sand-900',
          )}
        >
          {testimonial.name}
        </div>
        {testimonial.location && (
          <div
            className={cn(
              'text-xs',
              theme === 'dark' ? 'text-sand-500' : 'text-sand-500',
            )}
          >
            {testimonial.location}
          </div>
        )}
      </div>
    </div>
  </BaseCard>
);

export { TestimonialCard };
export type { TestimonialCardProps };
