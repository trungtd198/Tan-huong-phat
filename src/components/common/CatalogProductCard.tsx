import Image from 'next/image';
import Link from 'next/link';

import type { ProductItem } from '@/data/reference-layout';

type CatalogProductCardProps = {
  href: string;
  product: ProductItem;
};

const CatalogProductCard = ({ href, product }: CatalogProductCardProps) => (
  <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
    {/* ── Image area ── */}
    <div className="relative aspect-[3/4] overflow-hidden bg-ivory-100">
      {/* Featured badge */}
      {product.featured && (
        <div className="absolute left-3 top-3 z-20 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
          Nổi bật
        </div>
      )}
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>

    {/* ── Content ── */}
    <div className="flex flex-1 flex-col p-5">
      <div className="flex-1">
        {/* Name + size */}
        <h4 className="text-sm font-semibold leading-snug text-charcoal-900">
          {product.name}
        </h4>
        {product.size && (
          <p className="mt-1 text-xs text-charcoal-700/50">{product.size}</p>
        )}

        {/* Benefits */}
        {product.benefits.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {product.benefits.slice(0, 3).map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-1.5 text-xs leading-5 text-charcoal-800/60"
              >
                <span className="mt-px shrink-0 text-amber-500">•</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CTA */}
      <Link
        href={href}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-charcoal-900 bg-transparent px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-charcoal-900 transition-all duration-300 hover:bg-charcoal-900 hover:text-white active:scale-95"
      >
        Xem chi tiết
      </Link>
    </div>
  </article>
);

export { CatalogProductCard };
export type { CatalogProductCardProps };
