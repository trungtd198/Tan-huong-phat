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
import Link from 'next/link';

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
  { icon: UserCircle2, label: 'Giám đốc đại diện', value: 'Giáp Thị Hương' },
  { icon: Coins, label: 'Vốn điều lệ', value: '3.000.000.000 đồng' },
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
        overline="VỀ CHÚNG TÔI"
        breadcrumb={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Về chúng tôi' },
        ]}
      />

      {/* ── Stats Bar ── */}
      <div className="bg-charcoal-900 py-10">
        <Container>
          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
            {[
              { value: '10+', label: 'Năm kinh nghiệm', sub: 'Trong ngành' },
              {
                value: '1000+',
                label: 'Salon & Đối tác',
                sub: 'Trên toàn quốc',
              },
              { value: '63', label: 'Tỉnh thành', sub: 'Phân phối' },
              {
                value: '100%',
                label: 'Cam kết chính hãng',
                sub: '& Chất lượng',
              },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-3xl font-bold text-amber-500 sm:text-4xl">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-white">{stat.label}</p>
                <p className="text-xs text-white/50">{stat.sub}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ── Company Info ── */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-600">
                HỒ SƠ THƯƠNG HIỆU
              </p>
              <h2 className="mt-3 text-3xl font-bold text-charcoal-900 sm:text-4xl">
                Thông tin công ty
              </h2>
              <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-amber-500" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {companyCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex gap-4 rounded-2xl bg-ivory-100 p-5 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-amber-500 shadow-sm">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-700/50">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-charcoal-900">
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

      {/* ── Vision & Mission ── */}
      <section className="bg-ivory-100 py-16 sm:py-20">
        <Container>
          <div className="mb-12 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-600">
              NGUYÊN LÝ VẬN HÀNH
            </p>
            <h2 className="mt-3 text-3xl font-bold text-charcoal-900 sm:text-4xl">
              Tầm nhìn & Sứ mệnh
            </h2>
            <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-amber-500" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {visionMission.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="flex flex-col justify-between rounded-2xl border-l-4 border-amber-500 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-ivory-100 text-amber-500">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-xl font-bold text-charcoal-900">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-charcoal-800/60">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-ivory-200 pt-6 text-right">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
                      {item.tag}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Quality Commitment ── */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto mb-12 max-w-4xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-600">
              ĐẢM BẢO CHẤT LƯỢNG
            </p>
            <h2 className="mt-3 text-3xl font-bold text-charcoal-900 sm:text-4xl">
              Cam kết chất lượng
            </h2>
            <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-amber-500" />
            <p className="mx-auto mt-5 max-w-xl text-sm text-charcoal-800/60">
              Tại Tân Hương Phát, chất lượng không chỉ là lời hứa mà là kim chỉ
              nam hoạt động. Mỗi sản phẩm đều được kiểm định nghiêm ngặt trước
              khi trao tới tay bạn.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {commitments.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-2xl bg-ivory-100 p-6 text-left transition-all duration-300 hover:shadow-md"
                >
                  <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-white text-amber-500 shadow-sm">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
                    {item.tag}
                  </span>
                  <h4 className="mt-2 text-base font-semibold text-charcoal-900">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-800/60">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Partner CTA ── */}
      <section className="bg-charcoal-900 py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-500">
              HỢP TÁC CÙNG CHÚNG TÔI
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Trở thành đối tác phân phối
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/60">
              Tân Hương Phát luôn tìm kiếm những đối tác tin cậy để cùng phát
              triển ngành chăm sóc tóc Việt Nam.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="rounded-xl bg-amber-500 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all duration-300 hover:bg-amber-600 hover:shadow-lg"
              >
                Liên hệ hợp tác
              </Link>
              <Link
                href="/products"
                className="rounded-xl border border-white/20 px-8 py-3.5 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-white/50 hover:text-white"
              >
                Xem sản phẩm
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
};

export default AboutPage;
