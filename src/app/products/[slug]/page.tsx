import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ProductDetailCard } from '@/components/common/ProductDetailCard';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui';
import { getPublishedProductGroups } from '@/features/products/product.repository';

type ProductBrandPageProps = {
  params: { slug: string };
};

export const generateStaticParams = async () => {
  const productGroups = await getPublishedProductGroups();
  return productGroups.map((group) => ({ slug: group.slug }));
};

export const generateMetadata = async ({ params }: ProductBrandPageProps) => {
  const productGroups = await getPublishedProductGroups();
  const productGroup = productGroups.find(
    (group) => group.slug === params.slug,
  );
  if (!productGroup) return { title: 'Sản phẩm | Tân Hương Phát' };
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
  if (!productGroup) notFound();

  const gridProducts = productGroup.products.filter((p) => !p.isBannerCard);
  const bannerProducts = productGroup.products.filter((p) => p.isBannerCard);

  return (
    <SiteLayout activeHref="/products">
      <PageHero
        title={productGroup.name}
        subtitle={productGroup.description}
        imageUrl={productGroup.image}
        overline="THƯƠNG HIỆU"
        breadcrumb={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Sản phẩm', href: '/products' },
          { label: productGroup.name },
        ]}
      />

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <Container>
          {/* Back + breadcrumb row */}
          <div className="mb-10 flex items-center justify-between gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal-700/60 transition-colors hover:text-charcoal-900"
            >
              <ArrowLeft className="size-4" />
              Tất cả dòng sản phẩm
            </Link>
            <p className="hidden text-xs text-charcoal-700/40 sm:block">
              Trang chủ / Sản phẩm / {productGroup.name}
            </p>
          </div>

          {/* Banner products */}
          {bannerProducts.length > 0 && (
            <div className="mb-14 space-y-4">
              {bannerProducts.map((banner) => (
                <div
                  key={banner.slug}
                  className="relative w-full overflow-hidden rounded-2xl shadow-md"
                >
                  <div className="relative aspect-[21/9] w-full">
                    <Image
                      src={banner.image}
                      alt={banner.name}
                      fill
                      sizes="100vw"
                      className="object-cover object-center"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/50 via-charcoal-900/10 to-transparent" />
                    <div className="absolute left-6 top-6 rounded bg-amber-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                      Liệu trình nổi bật
                    </div>
                    <div className="absolute inset-x-6 bottom-6">
                      <p className="text-xs font-semibold text-white/70">
                        {banner.size}
                      </p>
                      <h3 className="mt-1 max-w-md text-lg font-bold leading-snug text-white sm:text-xl">
                        {banner.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Section header */}
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-600">
                DANH SÁCH SẢN PHẨM
              </p>
              <h2 className="text-xl font-bold text-charcoal-900 sm:text-2xl">
                {productGroup.name} — {gridProducts.length} sản phẩm
              </h2>
              <div className="mt-3 h-[3px] w-10 rounded-full bg-amber-500" />
            </div>
          </div>

          {/* Product grid */}
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
