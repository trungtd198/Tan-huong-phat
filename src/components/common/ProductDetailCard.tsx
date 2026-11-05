'use client';

import { CheckCircle2, Phone } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import type { PublicProduct } from '@/features/products/product.types';

type ProductDetailCardProps = {
  product: PublicProduct;
  href?: string;
};

const ProductDetailCard = ({
  product,
  href = '#contact',
}: ProductDetailCardProps) => {
  const images = product.images.length > 0 ? product.images : [product.image];
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* ── Image area ── */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ivory-100">
        {/* Featured badge */}
        {product.featured && (
          <div className="absolute left-3 top-3 z-20 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            Nổi bật
          </div>
        )}

        {images.map((image, index) => (
          <div
            key={image}
            className={[
              'absolute inset-0 transition-opacity duration-300',
              index === selectedIndex ? 'z-10 opacity-100' : 'z-0 opacity-0',
            ].join(' ')}
          >
            <Image
              src={image}
              alt={index === selectedIndex ? product.name : ''}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* ── Thumbnail strip ── */}
      {images.length > 1 && (
        <div className="scrollbar-thin flex gap-2 overflow-x-auto border-b border-ivory-200 bg-ivory-50 px-3 py-2">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Xem ảnh ${index + 1}`}
              onClick={() => setSelectedIndex(index)}
              className={[
                'relative aspect-square w-12 shrink-0 overflow-hidden rounded-lg bg-white transition-all duration-200',
                index === selectedIndex
                  ? 'ring-2 ring-amber-500 ring-offset-1 opacity-100'
                  : 'opacity-50 hover:opacity-85 hover:ring-1 hover:ring-ivory-300 hover:ring-offset-1',
              ].join(' ')}
            >
              <Image
                src={image}
                alt={`${product.name} ảnh ${index + 1}`}
                fill
                sizes="48px"
                className="object-contain p-1"
                priority
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Product metadata ── */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <h3 className="text-sm font-semibold leading-snug text-charcoal-900">
          {product.name}
        </h3>

        {/* Size */}
        {product.size && (
          <p className="mt-1 text-xs text-charcoal-700/50">{product.size}</p>
        )}

        {/* Contact indicator */}
        <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-amber-600">
          <Phone className="size-3.5 shrink-0" />
          Liên hệ báo giá
        </p>

        {/* Benefits */}
        {product.benefits.length > 0 && (
          <ul className="mt-4 space-y-2 text-xs leading-6 text-charcoal-800/60">
            {product.benefits.slice(0, 3).map((benefit) => (
              <li key={benefit} className="flex gap-2.5">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-amber-500" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        <div className="mt-5 pt-2">
          <a
            href={href}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-charcoal-900 bg-transparent px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-charcoal-900 transition-all duration-300 hover:bg-charcoal-900 hover:text-white active:scale-95"
          >
            Xem chi tiết
          </a>
        </div>
      </div>
    </article>
  );
};

export { ProductDetailCard };
export type { ProductDetailCardProps };
