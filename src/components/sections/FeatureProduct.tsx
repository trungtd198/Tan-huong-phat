'use client';

import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button, Heading, Paragraph } from '@/components/ui';
import type {
  PublicProduct,
  PublicProductGroup,
} from '@/features/products/product.types';

import { MotionReveal } from './MotionReveal';

type FeatureProductProps = {
  productGroup?: PublicProductGroup;
};

const FeatureProduct = ({ productGroup }: FeatureProductProps) => {
  const initialProduct =
    productGroup?.products.find((p) => p.featured) ?? productGroup?.products[0];

  const [activeProduct, setActiveProduct] = useState<PublicProduct | undefined>(
    initialProduct,
  );

  if (!productGroup) return null;

  const productThumbs = productGroup.products.slice(0, 6);

  const activeImg =
    activeProduct?.images?.[0] ?? activeProduct?.image ?? productGroup.image;

  const benefits =
    (activeProduct?.benefits?.length ?? 0) > 0
      ? activeProduct?.benefits ?? []
      : productGroup.benefits;

  const activeIndex = productThumbs.findIndex(
    (p) => p.slug === activeProduct?.slug,
  );

  const goToPrev = () => {
    const prev =
      (activeIndex - 1 + productThumbs.length) % productThumbs.length;
    setActiveProduct(productThumbs[prev]);
  };

  const goToNext = () => {
    const next = (activeIndex + 1) % productThumbs.length;
    setActiveProduct(productThumbs[next]);
  };

  return (
    <section className="bg-sand-50 px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* ── LEFT COLUMN: Large product image only ── */}
        <MotionReveal>
          <div className="relative mx-auto aspect-[2/3] w-full max-w-xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 to-sand-100 shadow-xl">
            <Image
              src={activeImg}
              alt={activeProduct?.name ?? productGroup.name}
              fill
              sizes="(min-width: 1024px) 48vw, 90vw"
              className="z-10 object-contain p-8 mix-blend-multiply transition-all duration-500"
            />
          </div>
        </MotionReveal>

        {/* ── RIGHT COLUMN: Overline → Thumbnails → Title → Content ── */}
        <MotionReveal delay={0.1}>
          {/* Overline label */}
          <span className="text-[13px] font-semibold uppercase tracking-[0.24em] text-gold-500">
            Sản phẩm nổi bật
          </span>

          {/* Thumbnail strip — sits right below the overline, above the title */}
          {productThumbs.length > 1 && (
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={goToPrev}
                className="flex size-8 items-center justify-center rounded-full border border-sand-200 bg-white text-sand-500 shadow-sm transition hover:border-brand-400 hover:text-brand-500"
                aria-label="Sản phẩm trước"
              >
                <ChevronLeft className="size-4" />
              </button>

              <div className="flex gap-2.5">
                {productThumbs.map((product, i) => (
                  <button
                    key={product.slug}
                    onClick={() => setActiveProduct(product)}
                    className={`relative size-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                      activeProduct?.slug === product.slug
                        ? 'border-gold-400 opacity-100 shadow-sm ring-1 ring-gold-300'
                        : 'border-sand-200 opacity-55 hover:border-brand-300 hover:opacity-100'
                    }`}
                    aria-label={`Xem ${product.name}`}
                  >
                    <Image
                      src={product.image}
                      alt={`${product.name} ảnh ${i + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={goToNext}
                className="flex size-8 items-center justify-center rounded-full border border-sand-200 bg-white text-sand-500 shadow-sm transition hover:border-brand-400 hover:text-brand-500"
                aria-label="Sản phẩm tiếp theo"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}

          {/* Group name heading */}
          <Heading className="mt-5 font-display text-sand-900">
            {productGroup.name}
          </Heading>

          {/* Group description */}
          <Paragraph className="mt-4 text-sand-600">
            {productGroup.description}
          </Paragraph>

          {/* Active product name + size */}
          {activeProduct && (
            <p className="mt-3 text-sm font-medium text-sand-500">
              {activeProduct.name}
              {activeProduct.size ? ` · ${activeProduct.size}` : ''}
            </p>
          )}

          {/* Divider */}
          <div className="my-6 h-px w-16 bg-gold-400 opacity-60" />

          {/* Benefits list */}
          <ul className="space-y-3">
            {benefits.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-sm leading-6 text-sand-700"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            href={`/products/${productGroup.slug}`}
            variant="primary"
            size="lg"
            className="mt-9"
          >
            Tìm hiểu thêm
          </Button>
        </MotionReveal>
      </div>
    </section>
  );
};

export { FeatureProduct };
export type { FeatureProductProps };
