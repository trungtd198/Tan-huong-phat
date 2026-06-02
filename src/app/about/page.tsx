import { BannerPlacement } from '@prisma/client';

import { SiteLayout } from '@/components/layouts/SiteLayout';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Heading, Paragraph } from '@/components/ui';
import {
  commitments,
  companyInfo,
  visionMission,
} from '@/data/reference-layout';
import { getActiveBanner } from '@/features/banners/banner.repository';

export const metadata = {
  title: 'Về chúng tôi | Tân Hương Phát',
  description: 'Thông tin công ty và cam kết chất lượng từ Tân Hương Phát.',
};

const AboutPage = async () => {
  const heroBanner = await getActiveBanner(BannerPlacement.ABOUT_HERO);

  return (
    <SiteLayout activeHref="/about">
      <PageHero title={heroBanner.title} subtitle={heroBanner.subtitle} />

      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Heading className="text-sand-900">Thông tin công ty</Heading>
              <div className="mt-8 space-y-7">
                {companyInfo.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="flex gap-5">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-sand-100 text-gold-500">
                        <Icon className="size-6" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold uppercase text-sand-500">
                          {item.label}
                        </p>
                        <p className="mt-2 text-lg font-medium text-sand-900">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg ring-1 ring-sand-200">
              <div className="space-y-4 font-display text-lg leading-7 text-sand-900">
                <p>
                  <strong>1. Tên công ty</strong>
                </p>
                <p>
                  Tên công ty viết bằng tiếng Việt: CÔNG TY CỔ PHẦN MỸ PHẨM
                  THIÊN NHIÊN TÂN HƯƠNG PHÁT
                </p>
                <p>
                  Tên công ty viết bằng tiếng nước ngoài: TAN HUONG PHAT NATURAL
                  COSMETICS JOINT STOCK COMPANY
                </p>
                <p>
                  <strong>2. Địa chỉ trụ sở chính</strong>
                </p>
                <p>
                  475/6E/15 Bạch Đằng, Phường Tân Sơn Hòa, Thành phố Hồ Chí Minh
                </p>
                <p>Điện thoại: 0888296822</p>
                <p>
                  <strong>3. Vốn điều lệ: 3.000.000.000 đồng</strong>
                </p>
                <p>Bằng chữ: Ba tỷ đồng</p>
                <p>
                  <strong>4. Người đại diện theo pháp luật của công ty</strong>
                </p>
                <p>Họ, chữ đệm và tên: GIÁP THỊ HƯƠNG</p>
                <p>Chức danh: Giám đốc</p>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-2">
            {visionMission.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-lg border border-sand-200 bg-white p-8 shadow-sm"
                >
                  <div className="mb-8 flex size-12 items-center justify-center rounded-lg bg-sand-100 text-gold-500">
                    <Icon className="size-6" />
                  </div>
                  <Heading as="h3" className="text-sand-900">
                    {item.title}
                  </Heading>
                  <Paragraph className="mt-5">{item.description}</Paragraph>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-sand-100 py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Heading className="text-sand-900">Cam kết chất lượng</Heading>
            <Paragraph className="mx-auto mt-5 max-w-3xl">
              Tại Tân Hương Phát, chất lượng không chỉ là lời hứa mà là nền tảng
              hoạt động. Mỗi sản phẩm đều được kiểm tra và kiểm soát chất lượng
              nghiêm ngặt để đáp ứng tiêu chuẩn của chúng tôi.
            </Paragraph>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            {commitments.map((item) => (
              <article
                key={item.title}
                className="rounded-lg bg-white p-8 text-center shadow-sm"
              >
                <Heading as="h4" className="text-sand-900">
                  {item.title}
                </Heading>
                <Paragraph className="mt-4">{item.description}</Paragraph>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
};

export default AboutPage;
