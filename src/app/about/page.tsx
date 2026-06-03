import { BannerPlacement } from '@prisma/client';
import {
  Building2,
  Coins,
  Eye,
  Feather,
  FlaskConical,
  Leaf,
  MapPin,
  UserCircle2,
} from 'lucide-react';

import { SiteLayout } from '@/components/layouts/SiteLayout';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui';
import { getActiveBanner } from '@/features/banners/banner.repository';

export const metadata = {
  title: 'Về chúng tôi | Tân Hương Phát',
  description:
    'Thông tin công ty, tầm nhìn sứ mệnh và cam kết chất lượng từ Tân Hương Phát - Mỹ phẩm thiên nhiên cao cấp.',
};

const companyCards = [
  {
    icon: Building2,
    label: 'Tên công ty',
    value: 'Công ty Cổ phần Mỹ phẩm Thiên nhiên Tân Hương Phát',
  },
  {
    icon: UserCircle2,
    label: 'Giám đốc đại diện',
    value: 'Giáp Thị Hương',
  },
  {
    icon: Coins,
    label: 'Vốn điều lệ',
    value: '3.000.000.000 đồng',
  },
  {
    icon: MapPin,
    label: 'Địa chỉ trụ sở',
    value:
      '475/6E/15 Bạch Đằng, Phường Tân Sơn Hòa, Quận Tân Bình, TP. Hồ Chí Minh',
  },
];

const visionMission = [
  {
    icon: Eye,
    title: 'Tầm nhìn',
    description:
      'Trở thành đơn vị mỹ phẩm thiên nhiên đáng tin cậy hàng đầu tại Việt Nam, được ghi nhận bởi cam kết về chất lượng thượng hạng, không ngừng sáng tạo đổi mới và tận tâm chăm sóc sức khỏe của khách hàng.',
    tag: 'Tân Hương Phát Premium',
  },
  {
    icon: Feather,
    title: 'Sứ mệnh',
    description:
      'Mang đến các dòng sản phẩm chăm sóc tóc thiên nhiên chất lượng tinh túy nhất, giúp tôn vinh vẻ đẹp tự nhiên bền vững và bồi đắp sức khỏe của cộng đồng thông qua việc tuyển lựa khắt khe các thành phần thảo dược cổ truyền quý báu.',
    tag: 'Natural & Pure',
  },
];

const commitments = [
  {
    icon: Leaf,
    tag: 'Giá trị cốt lõi',
    title: 'Thành phần thiên nhiên',
    description:
      'Chúng tôi chọn lọc thảo mộc và chiết xuất tinh khiết từ các nhà cung cấp đáng tin cậy hàng đầu, đảm bảo nguồn gốc hữu cơ không chứa hóa chất độc hại.',
  },
  {
    icon: FlaskConical,
    tag: 'Giá trị cốt lõi',
    title: 'Công thức khoa học',
    description:
      'Sự kết hợp hoàn hảo giữa tri thức thảo dược truyền thống bản địa với dây chuyền sản xuất tiên tiến, hiện đại tối ưu tối đa dược tính sản phẩm.',
  },
];

const AboutPage = async () => {
  const heroBanner = await getActiveBanner(BannerPlacement.ABOUT_HERO);

  return (
    <SiteLayout activeHref="/about">
      <PageHero
        title={heroBanner.title}
        subtitle={heroBanner.subtitle}
        imageUrl={heroBanner.imageUrl ?? undefined}
      />

      {/* ── Thông tin công ty ── */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="mx-auto max-w-4xl">
            {/* Section header */}
            <div className="mb-12 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                Hồ sơ thương hiệu
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-brand-900 sm:text-4xl">
                Thông tin công ty
              </h2>
              <div className="mx-auto mt-4 h-px w-12 bg-gold-300" />
            </div>

            {/* Company info cards grid */}
            <div className="grid gap-5 sm:grid-cols-2">
              {companyCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="hover:border-gold-200 flex gap-4 rounded-2xl border border-sand-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sand-50 text-gold-500">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-sand-400">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-brand-900">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Tầm nhìn & Sứ mệnh ── */}
      <section className="border-y border-sand-100 bg-sand-50 py-20 sm:py-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {visionMission.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="hover:border-gold-200 flex flex-col justify-between rounded-2xl border border-sand-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-sand-50 text-gold-500">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-brand-900">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-sand-600">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-sand-50 pt-6 text-right">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold-500">
                      {item.tag}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Cam kết chất lượng ── */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
              Nguyên lý vận hành
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-brand-900 sm:text-4xl">
              Cam kết chất lượng
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-sand-500">
              Tại Tân Hương Phát, chất lượng không chỉ là lời hứa mà là kim chỉ
              nam hoạt động. Mỗi sản phẩm đều được kiểm định nghiêm ngặt trước
              khi trao tới tay bạn.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {commitments.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="hover:border-gold-200 rounded-2xl border border-sand-100 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-sand-50 text-gold-500">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-500">
                    {item.tag}
                  </span>
                  <h4 className="mt-2 text-base font-semibold text-brand-900">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-sand-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
};

export default AboutPage;
