import { BannerPlacement } from '@prisma/client';

import { db } from '@/lib/db';

export const getBannerPlacementFromSearch = (value?: string) =>
  value && Object.values(BannerPlacement).includes(value as BannerPlacement)
    ? (value as BannerPlacement)
    : undefined;

export const getAdminBanners = (placement?: BannerPlacement) =>
  db.banner.findMany({
    where: {
      placement,
    },
    orderBy: [{ placement: 'asc' }, { sortOrder: 'asc' }, { createdAt: 'asc' }],
  });

export const getAdminProductLineBanners = () =>
  db.productLine.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      imageUrl: true,
      isActive: true,
    },
  });
