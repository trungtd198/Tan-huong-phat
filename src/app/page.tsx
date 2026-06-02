import { BannerPlacement } from '@prisma/client';

import { SiteLayout } from '@/components/layouts/SiteLayout';
import {
  CoreValues,
  FeatureProduct,
  Hero,
  ProductGrid,
} from '@/components/sections';
import { getActiveBanner } from '@/features/banners/banner.repository';
import { getPublishedProductGroups } from '@/features/products/product.repository';

const HomePage = async () => {
  const [heroBanner, productGroups] = await Promise.all([
    getActiveBanner(BannerPlacement.HOME_HERO),
    getPublishedProductGroups(),
  ]);

  const featureProduct =
    productGroups.find((group) => group.isFeatured) ??
    productGroups.find((group) => group.slug.includes('caluober')) ??
    productGroups[2];
  const productLines = productGroups.filter(
    (group) => group.slug !== featureProduct?.slug,
  );

  return (
    <SiteLayout
      activeHref="/"
      navbarProps={{
        position: 'fixed',
        transparent: true,
        enableScrollTransition: true,
      }}
    >
      <Hero
        title={heroBanner.title}
        subtitle={heroBanner.subtitle}
        imageUrl={heroBanner.imageUrl}
        ctaHref={heroBanner.ctaHref}
        ctaLabel={heroBanner.ctaLabel}
      />
      <CoreValues />
      <FeatureProduct productGroup={featureProduct} />
      <ProductGrid productLines={productLines} />
    </SiteLayout>
  );
};

export default HomePage;
