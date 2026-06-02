import { BannerPlacement } from '@prisma/client';
import { ArrowRight } from 'lucide-react';

import {
  ProductLineAction,
  ProductLineCard,
} from '@/components/common/ProductLineCard';
import { Button, Container, Heading, Paragraph } from '@/components/ui';
import { brandFeatures } from '@/data/reference-layout';
import { getActiveBanner } from '@/features/banners/banner.repository';
import { getPublishedProductLines } from '@/features/products/product.repository';

import { SiteLayout } from './SiteLayout';

const Base = async () => {
  const [heroBanner, productLines] = await Promise.all([
    getActiveBanner(BannerPlacement.HOME_HERO),
    getPublishedProductLines(),
  ]);

  return (
    <SiteLayout activeHref="/">
      <section className="relative min-h-[32rem] overflow-hidden bg-espresso-900 text-white sm:min-h-[36rem]">
        <img
          src={heroBanner.imageUrl}
          alt={heroBanner.title}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-espresso-900/60" />
        <Container className="relative flex min-h-[32rem] items-center justify-center py-20 text-center sm:min-h-[36rem]">
          <div className="max-w-4xl">
            <Heading as="h1" className="text-white lg:text-7xl">
              {heroBanner.title}
            </Heading>
            <Paragraph size="lg" tone="inverse" className="mt-5 text-sand-100">
              {heroBanner.subtitle}
            </Paragraph>
            <Paragraph tone="inverse" className="mx-auto mt-4 max-w-3xl">
              Được phát triển từ những thành phần thiên nhiên chọn lọc, giúp tôn
              lên vẻ đẹp và sức sống tự nhiên của mái tóc.
            </Paragraph>
            {heroBanner.ctaHref && heroBanner.ctaLabel ? (
              <Button
                href={heroBanner.ctaHref}
                variant="gold"
                className="mt-9"
                trailingIcon={<ArrowRight className="size-4" />}
              >
                {heroBanner.ctaLabel}
              </Button>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="bg-sand-100 py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Heading className="text-sand-900">
              Thiên nhiên kết hợp cùng khoa học
            </Heading>
            <Paragraph className="mx-auto mt-5 max-w-3xl">
              Tại Tân Hương Phát, chúng tôi tin vào sức mạnh của thiên nhiên khi
              được kết hợp cùng cải tiến khoa học. Các sản phẩm chăm sóc tóc cao
              cấp được xây dựng từ thành phần thiên nhiên chọn lọc, hướng đến
              hiệu quả rõ ràng nhưng vẫn dịu nhẹ với tóc và da đầu.
            </Paragraph>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {brandFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-lg bg-white p-8 shadow-sm"
                >
                  <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-sand-100 text-gold-500">
                    <Icon className="size-6" />
                  </div>
                  <Heading as="h4" className="text-sand-900">
                    {feature.title}
                  </Heading>
                  <Paragraph size="sm" className="mt-3">
                    {feature.description}
                  </Paragraph>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Heading className="text-sand-900">Dòng sản phẩm</Heading>
            <Paragraph className="mx-auto mt-5 max-w-3xl">
              Khám phá ba bộ sưu tập đặc trưng, mỗi dòng được thiết kế cho nhu
              cầu chăm sóc tóc riêng với tinh thần thiên nhiên cao cấp.
            </Paragraph>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {productLines.slice(0, 2).map((line) => (
              <ProductLineCard key={line.name} line={line} />
            ))}
          </div>
          <div className="mt-8">
            {productLines[2] && (
              <ProductLineCard line={productLines[2]} featured />
            )}
          </div>

          <div className="mt-12 text-center">
            <ProductLineAction />
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
};

export { Base };
