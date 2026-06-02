import { Sparkles } from 'lucide-react';

import { Heading } from '@/components/ui';
import type { ProductItem } from '@/data/reference-layout';

type CatalogProductCardProps = {
  product: ProductItem;
};

const CatalogProductCard = ({ product }: CatalogProductCardProps) => (
  <article className="overflow-hidden rounded-lg border border-sand-200 bg-white shadow-sm">
    <div className="relative aspect-[2/3] overflow-hidden">
      {/* Blurred background — lấp đầy phần dư khi ảnh không phủ hết khung */}
      <img
        src={product.image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full scale-110 object-cover blur-2xl brightness-90"
      />
      {/* Ảnh chính — hiển thị đủ, không bị cắt */}
      <img
        src={product.image}
        alt={product.name}
        className="relative z-10 size-full object-contain"
        loading="lazy"
      />
    </div>
    <div className="p-6">
      <div className="flex items-start justify-between gap-4">
        <Heading as="h4" className="text-base text-sand-900">
          {product.name}
        </Heading>
        {product.featured && (
          <Sparkles className="mt-1 size-4 shrink-0 text-gold-500" />
        )}
      </div>
      <p className="mt-2 text-xs font-semibold text-sand-500">{product.size}</p>
      <div className="mt-4">
        <p className="text-[0.65rem] font-semibold uppercase text-sand-500">
          Lợi ích chính
        </p>
        <ul className="mt-2 space-y-1 text-sm text-sand-600">
          {product.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-2">
              <span className="text-gold-500">•</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5 border-t border-sand-200 pt-4">
        <p className="text-[0.65rem] font-semibold uppercase text-sand-500">
          Thành phần chính
        </p>
        <p className="mt-2 text-sm text-sand-600">{product.ingredients}</p>
      </div>
    </div>
  </article>
);

export { CatalogProductCard };
export type { CatalogProductCardProps };
