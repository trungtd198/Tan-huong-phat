import {
  Badge,
  BaseCard,
  Heading,
  OutlineButton,
  Paragraph,
} from '@/components/ui';
import type { Product } from '@/types';

type ProductCardProps = {
  product: Product;
  ctaLabel?: string;
  href?: string;
  className?: string;
};

const ProductCard = ({
  product,
  ctaLabel = 'Xem chi tiết',
  href = '#contact',
  className,
}: ProductCardProps) => (
  <BaseCard
    variant={product.featured ? 'featured' : 'default'}
    padding="none"
    className={className}
  >
    <div className="relative aspect-[4/5] overflow-hidden rounded-t-xl border-b border-sand-200 bg-gradient-to-br from-sand-100 via-sand-50 to-brand-50">
      <div className="absolute inset-6 rounded-[2rem] border border-white/70" />
      <div className="absolute right-8 top-8 hidden size-20 rounded-full bg-white/60 blur-2xl sm:block" />

      <div className="relative flex size-full items-center justify-center">
        <div className="relative h-[72%] w-36 rounded-[2.25rem] rounded-t-[3rem] bg-gradient-to-b from-white via-sand-100 to-sand-300 shadow-lg shadow-sand-900/10">
          <div className="absolute inset-x-7 top-5 h-7 rounded-full bg-white/70" />
          <div className="absolute inset-x-8 top-20 h-32 rounded-[1.5rem] border border-white/70 bg-white/35" />
          <div className="absolute inset-x-0 bottom-10 text-center font-display text-4xl text-sand-700">
            {product.name.charAt(0)}
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-4 p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="accent">{product.category}</Badge>
        {product.featured && <Badge variant="gold">Nổi bật</Badge>}
      </div>

      <div className="space-y-2">
        <Heading as="h3" className="text-sand-900">
          {product.name}
        </Heading>
        <Paragraph size="sm">{product.description}</Paragraph>
      </div>

      {product.tags && product.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm bg-sand-100 px-2.5 py-1 text-xs tracking-wide text-sand-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-sand-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-display text-2xl text-sand-900">
          {product.price}
        </div>
        <OutlineButton href={href} size="sm">
          {ctaLabel}
        </OutlineButton>
      </div>
    </div>
  </BaseCard>
);

export { ProductCard };
export type { ProductCardProps };
