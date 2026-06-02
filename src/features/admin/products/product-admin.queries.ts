import { ProductStatus } from '@prisma/client';

import { db } from '@/lib/db';

export type AdminProductFilters = {
  q?: string;
  status?: ProductStatus;
  lineId?: string;
};

export const getProductStatusFromSearch = (value?: string) =>
  value && Object.values(ProductStatus).includes(value as ProductStatus)
    ? (value as ProductStatus)
    : undefined;

export const getAdminProductLines = () =>
  db.productLine.findMany({
    include: {
      products: {
        select: {
          id: true,
        },
      },
    },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  });

export const getAdminProducts = (filters: AdminProductFilters = {}) =>
  db.product.findMany({
    where: {
      status: filters.status,
      lineId: filters.lineId,
      OR: filters.q
        ? [
            { name: { contains: filters.q, mode: 'insensitive' } },
            { slug: { contains: filters.q, mode: 'insensitive' } },
            { excerpt: { contains: filters.q, mode: 'insensitive' } },
          ]
        : undefined,
    },
    include: {
      line: true,
      images: {
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      },
    },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  });

export const getAdminProductById = (id: string) =>
  db.product.findUnique({
    where: {
      id,
    },
    include: {
      images: {
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      },
    },
  });
