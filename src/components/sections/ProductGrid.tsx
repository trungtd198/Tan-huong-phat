'use client';

import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button, Heading, Paragraph } from '@/components/ui';
import type {
  PublicProduct,
  PublicProductGroup,
} from '@/features/products/product.types';

import { MotionReveal } from './MotionReveal';

type ProductGridProps = {
  productLines: PublicProductGroup[];
};

type ProductCardProps = {
  line: PublicProductGroup;
  index: number;
};

const ProductCard = ({ line, index }: ProductCardProps) => {
  const initialProduct = line.products[0];
  const [activeProduct, setActiveProduct] = useState<PublicProduct | undefined>(
    initialProduct,
  );

  const productThumbs = line.products.slice(0, 6);
  const activeImg = activeProduct?.image ?? line.image;

  return (
    <MotionReveal delay={index * 0.1}>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Image area — no blurred overlay, full brightness product photo */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-50 to-sand-100">
          <Image
            src={activeImg}
            alt={activeProduct?.name ?? line.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="z-10 object-contain mix-blend-multiply transition-all duration-500"
          />
        </div>

        {/* Thumbnail strip */}
        {productThumbs.length > 1 && (
          <div className="flex flex-wrap gap-2.5 border-b border-sand-100 bg-white px-5 py-3">
            {productThumbs.map((product, i) => (
              <button
                key={product.slug}
                onClick={() => setActiveProduct(product)}
                className={`relative size-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                  activeProduct?.slug === product.slug
                    ? 'border-gold-400 opacity-100 ring-1 ring-gold-300'
                    : 'border-sand-200 opacity-55 hover:border-brand-300 hover:opacity-100'
                }`}
                aria-label={`Xem ${product.name}`}
              >
                <Image
                  src={product.image}
                  alt={`${line.name} sản phẩm ${i + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Text content */}
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <Heading as="h3" className="font-display text-sand-900">
            {line.name}
          </Heading>
          {/* Soft charcoal — avoids harsh black on white card */}
          <Paragraph className="mt-3 text-sm leading-relaxed text-slate-500">
            {line.description}
          </Paragraph>

          {/* Benefits with check icons */}
          <ul className="mt-5 flex-1 space-y-2.5">
            {line.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2.5 text-sm leading-6 text-slate-600"
              >
                {/* Gold accent icon — matches brand colour system */}
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold-500" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <Button
            href={`/products/${line.slug}`}
            variant="outline"
            size="md"
            className="mt-8 self-start border-brand-400 font-semibold text-brand-700 hover:border-brand-600 hover:bg-brand-600 hover:text-white"
            trailingIcon={<ArrowRight className="size-4" />}
          >
            Xem sản phẩm
          </Button>
        </div>
      </article>
    </MotionReveal>
  );
};

const ProductGrid = ({ productLines }: ProductGridProps) => (
  <section
    id="products"
    className="bg-espresso-900 px-5 py-20 sm:px-6 sm:py-24 lg:px-8"
  >
    <div className="mx-auto max-w-7xl">
      {/* Section header — white text on dark green */}
      <MotionReveal className="mx-auto max-w-3xl text-center">
        <Heading className="text-white">Dòng sản phẩm khác</Heading>
        <Paragraph className="mx-auto mt-5 max-w-2xl text-white/65">
          Khám phá các dòng chăm sóc tóc cao cấp từ Tân Hương Phát, được phát
          triển cho từng nhu cầu phục hồi, nuôi dưỡng và bảo vệ mái tóc mỗi
          ngày.
        </Paragraph>
      </MotionReveal>

      {/* Two-column product card grid */}
      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {productLines.map((line, i) => (
          <ProductCard key={line.slug} line={line} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export { ProductGrid };
export type { ProductGridProps };
