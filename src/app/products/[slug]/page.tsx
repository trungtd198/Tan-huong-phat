import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { ProductDetailCard } from '@/components/common/ProductDetailCard';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { PageHero } from '@/components/sections/PageHero';
import { Button, Container } from '@/components/ui';
import { getPublishedProductGroups } from '@/features/products/product.repository';

type ProductBrandPageProps = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = async () => {
  const productGroups = await getPublishedProductGroups();

  return productGroups.map((group) => ({
    slug: group.slug,
  }));
};

export const generateMetadata = async ({ params }: ProductBrandPageProps) => {
  const productGroups = await getPublishedProductGroups();
  const productGroup = productGroups.find(
    (group) => group.slug === params.slug,
  );

  if (!productGroup) {
    return {
      title: 'Sản phẩm | Tân Hương Phát',
    };
  }

  return {
    title: `${productGroup.name} | Tân Hương Phát`,
    description: productGroup.description,
  };
};

const ProductBrandPage = async ({ params }: ProductBrandPageProps) => {
  const productGroups = await getPublishedProductGroups();
  const productGroup = productGroups.find(
    (group) => group.slug === params.slug,
  );

  if (!productGroup) {
    notFound();
  }

  const gridProducts = productGroup.products.filter((p) => !p.isBannerCard);
  const bannerProducts = productGroup.products.filter((p) => p.isBannerCard);

  return (
    <SiteLayout activeHref="/products">
      <PageHero
        title={productGroup.name}
        subtitle={productGroup.description}
        imageUrl={productGroup.image}
      />

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <Button
            href="/products"
            variant="ghost"
            leadingIcon={<ArrowLeft className="size-4" />}
            className="mb-10"
          >
            Tất cả dòng sản phẩm
          </Button>

          {bannerProducts.length > 0 && (
            <div className="mb-12 space-y-4">
              {bannerProducts.map((banner) => (
                <div
                  key={banner.slug}
                  className="relative w-full overflow-hidden rounded-2xl shadow-lg"
                >
                  {/* Use a tall aspect on mobile, wide on desktop */}
                  <div className="relative aspect-[16/7] w-full">
                    <Image
                      src={banner.image}
                      alt={banner.name}
                      fill
                      sizes="100vw"
                      className="object-cover object-center"
                      priority
                    />
                    {/* Subtle gradient overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

                    {/* Optional label badge */}
                    <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-700 shadow-sm backdrop-blur-sm">
                      Liệu trình nổi bật
                    </div>

                    {/* Product name overlay */}
                    <div className="absolute inset-x-6 bottom-6">
                      <p className="text-sm font-semibold text-white/80">
                        {banner.size}
                      </p>
                      <h3 className="mt-1 max-w-md font-display text-lg font-bold leading-snug text-white sm:text-xl">
                        {banner.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridProducts.map((product) => (
              <ProductDetailCard
                key={product.slug}
                product={product}
                href={`/products/${productGroup.slug}/${product.slug}`}
              />
            ))}
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
};

export default ProductBrandPage;
export type { ProductBrandPageProps };
