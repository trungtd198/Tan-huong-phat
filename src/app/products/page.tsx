import { BannerPlacement } from '@prisma/client';

import { CatalogProductCard } from '@/components/common/CatalogProductCard';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Heading, Paragraph } from '@/components/ui';
import { getActiveBanner } from '@/features/banners/banner.repository';
import { getPublishedProductGroups } from '@/features/products/product.repository';

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
      />

      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="space-y-20 lg:space-y-24">
            {productGroups.map((group) => (
              <section
                key={group.name}
                className="border-b border-sand-200 pb-20 last:border-0 last:pb-0"
              >
                <div className="max-w-3xl">
                  <Heading className="text-sand-900">{group.name}</Heading>
                  <Paragraph className="mt-5">{group.description}</Paragraph>
                </div>
                <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {group.products.map((product) => (
                    <CatalogProductCard
                      key={product.slug}
                      href={`/products/${group.slug}/${product.slug}`}
                      product={product}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
};

export default ProductsPage;
