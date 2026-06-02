'use client';

import { CheckCircle2, Eye, Phone } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Heading, Paragraph } from '@/components/ui';
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
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* ── Image area ── */}
      {/*
        Fix for Card-2 gray-line issue:
        We use a solid white background (`bg-white`) on the container so white-bottle
        images blend perfectly with the card frame. The blurred-image backdrop is kept
        but capped at opacity-30 and is cropped with overflow-hidden on the outer div,
        preventing it from bleeding as a visible stripe at the top edge.
      */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-white">
        {images.map((image, index) => (
          <div
            key={image}
            className={[
              'absolute inset-0 transition-opacity duration-300',
              index === selectedIndex ? 'z-10 opacity-100' : 'z-0 opacity-0',
            ].join(' ')}
          >
            {/* Soft blurred backdrop — low opacity so white products don't show a harsh line */}
            <Image
              src={image}
              alt=""
              fill
              aria-hidden="true"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="scale-110 object-cover opacity-30 blur-2xl brightness-95"
              priority={index === 0}
            />
            {/* Main product image */}
            <Image
              src={image}
              alt={index === selectedIndex ? product.name : ''}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="z-10 object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* ── Thumbnail strip ── */}
      {images.length > 1 && (
        <div className="scrollbar-thin flex gap-2 overflow-x-auto border-b border-sand-100 px-3 py-2">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Xem ảnh ${index + 1}`}
              onClick={() => setSelectedIndex(index)}
              className={[
                'relative aspect-square w-14 shrink-0 overflow-hidden rounded-lg bg-white transition-all duration-200',
                index === selectedIndex
                  ? 'ring-2 ring-gold-500 ring-offset-1 opacity-100'
                  : 'opacity-50 hover:opacity-85 hover:ring-1 hover:ring-sand-300 hover:ring-offset-1',
              ].join(' ')}
            >
              {/* Blurred thumbnail bg */}
              <Image
                src={image}
                alt=""
                fill
                aria-hidden="true"
                sizes="56px"
                className="scale-110 object-cover opacity-40 blur-xl brightness-90"
                priority
              />
              {/* Thumbnail image */}
              <Image
                src={image}
                alt={`${product.name} ảnh ${index + 1}`}
                fill
                sizes="56px"
                className="z-10 object-contain p-1"
                priority
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Product metadata ── */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <Heading
          as="h3"
          className="text-base font-semibold leading-snug text-slate-900"
        >
          {product.name}
        </Heading>

        {/* Capacity / Volume */}
        {product.size && (
          <p className="mt-1 text-sm text-gray-500">{product.size}</p>
        )}

        {/* Price / Status */}
        <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-gold-600">
          <Phone className="size-3.5 shrink-0" />
          Liên hệ
        </p>

        {/* Benefits — collapsible list */}
        <ul className="mt-4 space-y-2 text-sm leading-6 text-sand-700">
          {product.benefits.slice(0, 3).map((benefit) => (
            <li key={benefit} className="flex gap-2.5">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-500" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        {/* Ingredients */}
        {product.ingredients && (
          <div className="mt-4 border-t border-sand-100 pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sand-500">
              Thành phần chính
            </p>
            <Paragraph size="sm" className="mt-1.5 text-sand-600">
              {product.ingredients}
            </Paragraph>
          </div>
        )}

        {/* ── CTA Button ── */}
        <div className="mt-5 pt-2">
          <a
            href={href}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-500 bg-transparent px-4 py-2.5 text-sm font-semibold text-brand-600 transition-all duration-300 hover:bg-brand-500 hover:text-white hover:shadow-md active:scale-95"
          >
            <Eye className="size-4 shrink-0" />
            Xem chi tiết
          </a>
        </div>
      </div>
    </article>
  );
};

export { ProductDetailCard };
export type { ProductDetailCardProps };
