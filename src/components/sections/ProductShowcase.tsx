import { ProductCard } from '@/components/common';
import { BaseCard, CardGrid, Paragraph, PrimaryButton } from '@/components/ui';
import { landingPageContent } from '@/data/landing-page';
import { featuredProducts } from '@/data/products';

import { SectionHeader } from './SectionHeader';
import { SectionWrapper } from './SectionWrapper';

const ProductShowcase = () => (
  <SectionWrapper id="products" theme="alt">
    <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
      <SectionHeader
        badge={landingPageContent.products.badge}
        badgeVariant="accent"
        title={landingPageContent.products.title}
        subtitle={landingPageContent.products.subtitle}
        align="left"
        className="mb-0"
      />

      <BaseCard
        variant="default"
        hover={false}
        className="border-white/60 bg-white/70 shadow-md backdrop-blur-sm"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {landingPageContent.products.highlights.map(([index, label]) => (
            <div key={index}>
              <div className="mb-2 font-display text-3xl text-brand-500">
                {index}
              </div>
              <Paragraph size="sm">{label}</Paragraph>
            </div>
          ))}
        </div>
      </BaseCard>
    </div>

    <CardGrid columns={3}>
      {featuredProducts.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          className={index === 0 ? 'sm:col-span-2 lg:col-span-1' : undefined}
        />
      ))}
    </CardGrid>

    <div className="mt-10 text-center sm:mt-12">
      <PrimaryButton href="#cta" id="products-cta" size="lg">
        Nhận gợi ý quy trình phù hợp
      </PrimaryButton>
    </div>
  </SectionWrapper>
);

export { ProductShowcase };
