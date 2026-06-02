import { ArrowLeft, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { notFound } from 'next/navigation';

import { ProductImageGallery } from '@/components/common/ProductImageGallery';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { Button, Container, Heading, Paragraph } from '@/components/ui';
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

  return (
    <SiteLayout activeHref="/products">
      <section className="bg-sand-50 py-14 sm:py-16 lg:py-20">
        <Container>
          <Button
            href={`/products/${group.slug}`}
            variant="ghost"
            leadingIcon={<ArrowLeft className="size-4" />}
            className="mb-10"
          >
            {group.name}
          </Button>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)] lg:items-start">
            <ProductImageGallery name={product.name} images={product.images} />

            <div className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-600">
                {group.name}
              </p>
              <Heading as="h1" className="mt-3 text-sand-900">
                {product.name}
              </Heading>
              {product.size ? (
                <p className="mt-3 text-sm font-semibold text-gold-600">
                  {product.size}
                </p>
              ) : null}
              <Paragraph className="mt-5 text-sand-600">
                {product.excerpt}
              </Paragraph>

              {product.benefits.length > 0 ? (
                <ul className="mt-7 space-y-3">
                  {product.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-sm leading-6 text-sand-700"
                    >
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-500" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <Button
                href="#contact"
                variant="primary"
                size="lg"
                leadingIcon={<Phone className="size-4" />}
                className="mt-8"
              >
                Liên hệ tư vấn
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold-600">
                Thông tin chi tiết
              </p>
              <Heading as="h2" className="mt-3 text-sand-900">
                Mô tả sản phẩm
              </Heading>
            </div>
            <div className="space-y-8">
              {descriptionParagraphs.length > 0 ? (
                <div className="space-y-4 text-base leading-8 text-sand-700">
                  {descriptionParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ) : null}

              {product.ingredients ? (
                <div className="rounded-xl border border-sand-200 bg-sand-50 p-5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-gold-600" />
                    <h3 className="font-semibold text-sand-900">
                      Thành phần chính
                    </h3>
                  </div>
                  <p className="mt-3 leading-7 text-sand-700">
                    {product.ingredients}
                  </p>
                </div>
              ) : null}

              {product.howToUse ? (
                <div>
                  <h3 className="font-semibold text-sand-900">Cách sử dụng</h3>
                  <p className="mt-3 leading-7 text-sand-700">
                    {product.howToUse}
                  </p>
                </div>
              ) : null}

              {product.warnings ? (
                <div>
                  <h3 className="font-semibold text-sand-900">Lưu ý</h3>
                  <p className="mt-3 leading-7 text-sand-700">
                    {product.warnings}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
};

export default ProductDetailPage;
export type { ProductDetailPageProps };
