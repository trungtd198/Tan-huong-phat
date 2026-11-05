import { BannerPlacement } from '@prisma/client';
import Link from 'next/link';

import { CatalogProductCard } from '@/components/common/CatalogProductCard';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui';
import { getActiveBanner } from '@/features/banners/banner.repository';
import { getPublishedProductGroups } from '@/features/products/product.repository';

import { BrandFilterBar } from './_components/BrandFilterBar';

export const metadata = {
  title: 'Sản phẩm | Tân Hương Phát',
  description:
    'Khám phá các dòng sản phẩm chăm sóc tóc thiên nhiên của Tân Hương Phát.',
};

const ProductsPage = async () => {
  const [heroBanner, productGroups] = await Promise.all([
    getActiveBanner(BannerPlacement.PRODUCTS_HERO),
    getPublishedProductGroups(),
  ]);

  return (
    <SiteLayout activeHref="/products">
      <PageHero
        title={heroBanner.title}
        subtitle={heroBanner.subtitle}
        imageUrl={heroBanner.imageUrl}
        overline="DANH MỤC SẢN PHẨM"
        breadcrumb={[{ label: 'Trang chủ', href: '/' }, { label: 'Sản phẩm' }]}
      />

      <BrandFilterBar
        groups={productGroups.map((g) => ({ slug: g.slug, name: g.name }))}
      />

      <div>
        {productGroups.map((group, index) => {
          const previewProducts = group.products
            .filter((p) => !p.isBannerCard)
            .slice(0, 3);

          return (
            <section
              key={group.slug}
              id={`brand-${group.slug}`}
              className={`border-b border-ivory-200 py-16 last:border-0 sm:py-20 ${
                index % 2 === 0 ? 'bg-white' : 'bg-ivory-100'
              }`}
            >
              <Container>
                {/* Section header */}
                <div className="mb-10 flex items-end justify-between gap-4">
                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-600">
                      THƯƠNG HIỆU
                    </p>
                    <h2 className="text-2xl font-bold text-charcoal-900 sm:text-3xl">
                      {group.name}
                    </h2>
                    <div className="mt-3 h-[3px] w-10 rounded-full bg-amber-500" />
                  </div>
                  <Link
                    href={`/products/${group.slug}`}
                    className="flex shrink-0 items-center gap-1 text-sm font-semibold text-charcoal-900 transition-colors hover:text-amber-600"
                  >
                    Xem tất cả <span aria-hidden="true">→</span>
                  </Link>
                </div>

                <p className="mb-10 max-w-2xl text-sm leading-relaxed text-charcoal-800/60">
                  {group.description}
                </p>

                {/* Product grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {previewProducts.map((product) => (
                    <CatalogProductCard
                      key={product.slug}
                      href={`/products/${group.slug}/${product.slug}`}
                      product={product}
                    />
                  ))}
                </div>
              </Container>
            </section>
          );
        })}
      </div>
    </SiteLayout>
  );
};

export default ProductsPage;
