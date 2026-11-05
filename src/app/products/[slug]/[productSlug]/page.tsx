import { Check, Phone, Sprout } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ProductDetailInfoTabs } from '@/components/common/ProductDetailInfoTabs';
import { ProductImageGallery } from '@/components/common/ProductImageGallery';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { Container } from '@/components/ui';
import { siteConfig } from '@/config/site';
import {
  getPublishedProductBySlugs,
  getPublishedProductGroups,
} from '@/features/products/product.repository';

type ProductDetailPageProps = {
  params: { slug: string; productSlug: string };
};

const splitParagraphs = (value: string) =>
  value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

const splitSteps = (value?: string) =>
  value
    ? value
        .split(/\n+/)
        .map((item) => item.trim().replace(/^\d+[).]\s*/, ''))
        .filter(Boolean)
    : [];

const getSlugs = (params: ProductDetailPageProps['params']) => ({
  lineSlug: params.slug,
  productSlug: params.productSlug,
});

export const generateStaticParams = async () => {
  const groups = await getPublishedProductGroups();
  return groups.flatMap((group) =>
    group.products
      .filter((product) => !product.isBannerCard)
      .map((product) => ({ slug: group.slug, productSlug: product.slug })),
  );
};

export const generateMetadata = async ({ params }: ProductDetailPageProps) => {
  const result = await getPublishedProductBySlugs(getSlugs(params));
  if (!result) return { title: 'Sản phẩm | Tân Hương Phát' };
  return {
    title:
      result.product.seoTitle ??
      `${result.product.name} | ${result.group.name} | Tân Hương Phát`,
    description: result.product.seoDescription ?? result.product.excerpt,
  };
};

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const result = await getPublishedProductBySlugs(getSlugs(params));
  if (!result) notFound();

  const { group, product } = result;
  const descriptionParagraphs = splitParagraphs(product.description);
  const howToUseSteps = splitSteps(product.howToUse);

  // Related products: same group, exclude current, max 4
  const relatedProducts = group.products
    .filter((p) => p.slug !== product.slug && !p.isBannerCard)
    .slice(0, 4);

  return (
    <SiteLayout activeHref="/products">
      {/* ── Main product section ── */}
      <section className="bg-white py-10 sm:py-14 lg:py-20">
        <Container>
          {/* Breadcrumb */}
          <nav className="mb-10 flex flex-wrap items-center gap-1.5 text-xs text-charcoal-700/50">
            {[
              { label: 'Trang chủ', href: '/' },
              { label: 'Sản phẩm', href: '/products' },
              { label: group.name, href: `/products/${group.slug}` },
              { label: product.name },
            ].map((crumb, i, arr) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-charcoal-900"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="max-w-[200px] truncate font-semibold text-amber-600">
                    {crumb.label}
                  </span>
                )}
                {i < arr.length - 1 && (
                  <span className="text-charcoal-700/30">/</span>
                )}
              </span>
            ))}
          </nav>

          {/* 2-column layout */}
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Left: Image Gallery */}
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl bg-ivory-100">
                <ProductImageGallery
                  name={product.name}
                  images={product.images}
                />
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6 lg:col-span-6">
              {/* Brand + name */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
                  {group.name}
                </p>
                <h1 className="text-3xl font-bold leading-tight text-charcoal-900 md:text-4xl">
                  {product.name}
                </h1>
              </div>

              {/* Size badge */}
              {product.size && (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/60 bg-ivory-100 px-3 py-1">
                  <Sprout className="size-3.5 text-amber-600" />
                  <span className="text-xs font-bold text-amber-700">
                    {product.size}
                  </span>
                </div>
              )}

              {/* Excerpt */}
              <p className="text-sm italic leading-7 text-charcoal-800/60 md:text-base">
                {product.excerpt}
              </p>

              {/* Benefits */}
              {product.benefits.length > 0 && (
                <div className="space-y-3.5 border-y border-ivory-200 py-6">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-600">
                    Ưu điểm nổi bật
                  </h2>
                  <ul className="space-y-3">
                    {product.benefits.slice(0, 5).map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-3 text-sm font-medium leading-6 text-charcoal-800"
                      >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-amber-50 text-amber-600">
                          <Check className="size-3" />
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="space-y-4 pt-2">
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-charcoal-900 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all duration-300 hover:bg-amber-600 hover:shadow-lg active:scale-95"
                >
                  <Phone className="size-4" />
                  Liên hệ tư vấn ngay
                </a>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-4 border-t border-ivory-200 pt-4">
                  {[
                    '✓ Chính hãng 100%',
                    '✓ Giao hàng toàn quốc',
                    '✓ Tư vấn miễn phí',
                  ].map((badge) => (
                    <span
                      key={badge}
                      className="text-xs font-medium text-charcoal-700/60"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detail tabs */}
          <section className="mt-10 overflow-hidden rounded-2xl bg-ivory-100 p-6 sm:p-10">
            <div className="mb-8 space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-600">
                THÔNG TIN CHI TIẾT
              </p>
              <h2 className="text-2xl font-bold leading-tight text-charcoal-900 md:text-3xl">
                Mô tả sản phẩm
              </h2>
              <div className="h-[3px] w-12 rounded-full bg-amber-500" />
            </div>

            <ProductDetailInfoTabs
              descriptionParagraphs={descriptionParagraphs}
              ingredients={product.ingredients}
              howToUseSteps={howToUseSteps}
            />

            {product.warnings && (
              <div className="mt-6 rounded-2xl border border-amber-200/60 bg-amber-50 p-5 text-sm leading-7 text-charcoal-800">
                <h3 className="font-bold text-charcoal-900">Lưu ý</h3>
                <p className="mt-2">{product.warnings}</p>
              </div>
            )}
          </section>
        </Container>
      </section>

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <section className="bg-ivory-100 py-14 sm:py-16">
          <Container>
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-600">
                  CÓ THỂ BẠN QUAN TÂM
                </p>
                <h2 className="text-xl font-bold text-charcoal-900 sm:text-2xl">
                  Sản phẩm liên quan
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

            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <article
                  key={p.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-square overflow-hidden bg-ivory-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.name}
                      className="size-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-xs font-semibold leading-snug text-charcoal-900 sm:text-sm">
                      {p.name}
                    </h3>
                    {p.size && (
                      <p className="mt-1 text-[11px] text-charcoal-700/50">
                        {p.size}
                      </p>
                    )}
                    <Link
                      href={`/products/${group.slug}/${p.slug}`}
                      className="mt-4 flex w-full items-center justify-center rounded-lg border border-charcoal-900 bg-transparent py-2 text-xs font-semibold uppercase tracking-wide text-charcoal-900 transition-all duration-300 hover:bg-charcoal-900 hover:text-white"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}
    </SiteLayout>
  );
};

export default ProductDetailPage;
export type { ProductDetailPageProps };
