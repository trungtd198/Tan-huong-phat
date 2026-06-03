import { ArrowLeft, Check, Phone, Sprout } from 'lucide-react';
import { notFound } from 'next/navigation';

import { ProductDetailInfoTabs } from '@/components/common/ProductDetailInfoTabs';
import { ProductImageGallery } from '@/components/common/ProductImageGallery';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { Button, Container, Heading, Paragraph } from '@/components/ui';
import { siteConfig } from '@/config/site';
import {
  getPublishedProductBySlugs,
  getPublishedProductGroups,
} from '@/features/products/product.repository';

type ProductDetailPageProps = {
  params: {
    slug: string;
    productSlug: string;
  };
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
      .map((product) => ({
        slug: group.slug,
        productSlug: product.slug,
      })),
  );
};

export const generateMetadata = async ({ params }: ProductDetailPageProps) => {
  const result = await getPublishedProductBySlugs(getSlugs(params));

  if (!result) {
    return {
      title: 'Sản phẩm | Tân Hương Phát',
    };
  }

  return {
    title:
      result.product.seoTitle ??
      `${result.product.name} | ${result.group.name} | Tân Hương Phát`,
    description: result.product.seoDescription ?? result.product.excerpt,
  };
};

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const result = await getPublishedProductBySlugs(getSlugs(params));

  if (!result) {
    notFound();
  }

  const { group, product } = result;
  const descriptionParagraphs = splitParagraphs(product.description);
  const howToUseSteps = splitSteps(product.howToUse);

  return (
    <SiteLayout activeHref="/products">
      <section className="bg-sand-50 py-8 sm:py-12 lg:py-16">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-4 border-b border-gold-500/10 pb-4 sm:flex-row sm:items-center">
            <Button
              href={`/products/${group.slug}`}
              variant="ghost"
              leadingIcon={<ArrowLeft className="size-4" />}
              className="self-start px-0 text-xs font-bold uppercase tracking-wider text-gold-600 hover:bg-transparent hover:text-espresso-900"
            >
              {group.name}
            </Button>
            <p className="text-[10px] font-bold uppercase tracking-widest text-sand-400">
              Chi tiết sản phẩm
            </p>
          </div>

          <div className="mb-16 grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <ProductImageGallery
                name={product.name}
                images={product.images}
              />
            </div>

            <div className="space-y-6 rounded-2xl border border-gold-500/15 bg-white p-6 shadow-sm sm:p-10 lg:col-span-6">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-gold-600">
                  {group.name}
                </p>
                <Heading
                  as="h1"
                  className="text-3xl leading-tight text-espresso-900 md:text-4xl lg:text-5xl"
                >
                  {product.name}
                </Heading>
              </div>

              {product.size ? (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/20 bg-sand-100 px-3 py-1">
                  <Sprout className="size-3.5 text-gold-600" />
                  <span className="text-xs font-bold text-gold-600">
                    {product.size}
                  </span>
                </div>
              ) : null}

              <Paragraph className="text-sm italic leading-7 text-sand-500 md:text-base">
                {product.excerpt}
              </Paragraph>

              {product.benefits.length > 0 ? (
                <div className="space-y-3.5 border-y border-gold-500/10 py-6">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-gold-600">
                    Ưu điểm nổi bật
                  </h2>
                  <ul className="space-y-3">
                    {product.benefits.slice(0, 5).map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-3 text-sm font-medium leading-6 text-sand-800"
                      >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-gold-500/30 bg-sand-100 text-gold-600">
                          <Check className="size-3" />
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="pt-2">
                <Button
                  href={`tel:${siteConfig.phoneRaw}`}
                  variant="secondary"
                  size="lg"
                  leadingIcon={<Phone className="size-4" />}
                  className="shadow-lg"
                >
                  Liên hệ tư vấn
                </Button>
              </div>
            </div>
          </div>

          <section className="space-y-8 border-t border-gold-500/15 pt-12">
            {/* Section header — stacked, left-aligned */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-gold-600">
                Thông tin chi tiết
              </p>
              <Heading
                as="h2"
                className="text-3xl leading-tight text-espresso-900 md:text-4xl"
              >
                Mô tả sản phẩm
              </Heading>
              <div className="h-px w-16 bg-gold-500" />
            </div>

            {/* Tabs + warnings — full width */}
            <div>
              <ProductDetailInfoTabs
                descriptionParagraphs={descriptionParagraphs}
                ingredients={product.ingredients}
                howToUseSteps={howToUseSteps}
              />

              {product.warnings ? (
                <div className="mt-6 rounded-2xl border border-gold-500/15 bg-white/70 p-5 text-sm leading-7 text-sand-700">
                  <h3 className="font-bold text-espresso-900">Lưu ý</h3>
                  <p className="mt-2">{product.warnings}</p>
                </div>
              ) : null}
            </div>
          </section>
        </Container>
      </section>
    </SiteLayout>
  );
};

export default ProductDetailPage;
export type { ProductDetailPageProps };
