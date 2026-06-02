import type { Banner, BannerPlacement } from '@prisma/client';

import { db } from '@/lib/db';
import { hasDatabaseEnv } from '@/lib/env';

export type PublicBanner = {
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaLabel: string;
  ctaHref: string;
};

const fallbackBanners = {
  HOME_HERO: {
    title: 'Tân Hương Phát',
    subtitle: 'Chăm sóc tóc thiên nhiên cao cấp',
    imageUrl: '/images/products/acai-berry/shampoo-conditioner/banner-2.jpg',
    ctaLabel: 'Khám phá sản phẩm',
    ctaHref: '/products',
  },
  PRODUCTS_HERO: {
    title: 'Sản phẩm',
    subtitle:
      'Khám phá trọn bộ sản phẩm chăm sóc tóc thiên nhiên cao cấp, được phát triển từ những thành phần chọn lọc để mang lại hiệu quả rõ ràng.',
    imageUrl:
      '/images/products/caluober/collagen-anti-dandruff-shampoo-conditioner/banner-14.jpg',
    ctaLabel: '',
    ctaHref: '',
  },
  ABOUT_HERO: {
    title: 'Về chúng tôi',
    subtitle:
      'Cam kết theo đuổi chất lượng trong chăm sóc tóc thiên nhiên từ những ngày đầu thành lập.',
    imageUrl: '/images/products/contiiena/product-overview/banner-1.jpg',
    ctaLabel: '',
    ctaHref: '',
  },
} satisfies Record<BannerPlacement, PublicBanner>;

const mapBanner = (banner: Banner) => ({
  title: banner.title,
  subtitle: banner.subtitle ?? '',
  imageUrl: banner.imageUrl,
  ctaLabel: banner.ctaLabel ?? '',
  ctaHref: banner.ctaHref ?? '',
});

export const getActiveBanner = async (placement: BannerPlacement) => {
  if (!hasDatabaseEnv()) {
    return fallbackBanners[placement];
  }

  try {
    const banner = await db.banner.findFirst({
      where: {
        placement,
        isActive: true,
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });

    return banner ? mapBanner(banner) : fallbackBanners[placement];
  } catch {
    return fallbackBanners[placement];
  }
};
