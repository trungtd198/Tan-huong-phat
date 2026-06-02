import { ArrowRight } from 'lucide-react';

import { Button, Heading, Paragraph } from '@/components/ui';
import type { ProductLine } from '@/data/reference-layout';
import { cn } from '@/lib/utils';

type ProductLineCardProps = {
  line: ProductLine;
  featured?: boolean;
};

const ProductLineCard = ({ line, featured = false }: ProductLineCardProps) => (
  <article
    className={cn(
      'overflow-hidden rounded-lg border border-sand-200 bg-white shadow-sm',
      featured && 'relative min-h-[23rem] border-0 bg-espresso-900 shadow-lg',
    )}
  >
    <div
      className={cn(
        'relative overflow-hidden',
        featured ? 'absolute inset-0' : 'aspect-[16/10]',
      )}
    >
      <img
        src={line.image}
        alt={line.name}
        className={cn('size-full object-cover', featured && 'opacity-80')}
        loading="lazy"
      />
      <div
        className={cn(
          'absolute inset-0',
          featured
            ? 'bg-[linear-gradient(90deg,rgba(26,20,18,0.92)_0%,rgba(26,20,18,0.78)_48%,rgba(26,20,18,0.4)_100%)]'
            : 'bg-gradient-to-t from-espresso-900/90 via-espresso-900/60 to-espresso-900/20',
        )}
      />
    </div>

    <div
      className={cn(
        featured
          ? 'relative flex min-h-[23rem] max-w-lg flex-col justify-center p-8 text-white sm:p-10'
          : 'relative -mt-24 p-8 text-white',
      )}
    >
      <div
        className={cn(
          featured &&
            'rounded-lg border border-white/10 bg-espresso-900/72 p-6 shadow-lg backdrop-blur-sm sm:p-7',
        )}
      >
        <Heading as="h3" className="text-white">
          {line.name}
        </Heading>
        <Paragraph size="sm" tone="inverse" className="mt-2 text-sand-100">
          {line.description}
        </Paragraph>
        <ul
          className={cn(
            'mt-6 space-y-2 text-sm',
            featured ? 'text-sand-100' : 'sr-only',
          )}
        >
          {line.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-2">
              <span className="text-gold-400">•</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {!featured && (
      <div className="p-6">
        <ul className="space-y-2 text-sm text-sand-600">
          {line.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-2">
              <span className="text-gold-500">•</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </article>
);

const ProductLineAction = () => (
  <Button href="/products" variant="gold" trailingIcon={<ArrowRight />}>
    Xem tất cả sản phẩm
  </Button>
);

export { ProductLineAction, ProductLineCard };
export type { ProductLineCardProps };
