import { type Prisma, ProductStatus } from '@prisma/client';

import { productGroups as staticProductGroups } from '@/data/reference-layout';
import { db } from '@/lib/db';
import { hasDatabaseEnv } from '@/lib/env';

import type { PublicProductGroup } from './product.types';

const DEFAULT_LINE_IMAGE =
  '/images/products/acai-berry/shampoo-conditioner/z7761622216555_cd4e95bf60a41ad858ed8eafaec20d69.jpg';
const DEFAULT_PRODUCT_IMAGE =
  '/images/products/caluober/kerafill-keratin-treatment/banner-5.jpg';

const lineInclude = {
  products: {
    where: {
      status: ProductStatus.PUBLISHED,
    },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    include: {
      images: {
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      },
    },
  },
} satisfies Prisma.ProductLineInclude;

type ProductLineRecord = Prisma.ProductLineGetPayload<{
  include: typeof lineInclude;
}>;

const asStringArray = (value: Prisma.JsonValue | null | undefined) =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];

const createSlug = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getProductImage = (product: ProductLineRecord['products'][number]) =>
  product.images.find((image) => image.isCover)?.publicUrl ??
  product.images[0]?.publicUrl ??
  DEFAULT_PRODUCT_IMAGE;

const getProductImages = (product: ProductLineRecord['products'][number]) => {
  const images = product.images.map((image) => image.publicUrl);

  return images.length > 0 ? images : [DEFAULT_PRODUCT_IMAGE];
};

const mapLine = (line: ProductLineRecord): PublicProductGroup => ({
  slug: line.slug,
  name: line.name,
  description: line.description,
  image: line.imageUrl ?? DEFAULT_LINE_IMAGE,
  benefits: asStringArray(line.benefits),
  isFeatured: line.isFeatured,
  products: line.products.map((product) => ({
    slug: product.slug,
    name: product.name,
    size: product.size ?? '',
    excerpt: product.excerpt,
    description: product.description,
    image: getProductImage(product),
    benefits: asStringArray(product.benefits),
    ingredients: product.ingredients ?? '',
    featured: product.featured,
    images: getProductImages(product),
    howToUse: product.howToUse ?? undefined,
    warnings: product.warnings ?? undefined,
    seoTitle: product.seoTitle ?? undefined,
    seoDescription: product.seoDescription ?? undefined,
    isBannerCard: false,
  })),
});

const getStaticProductGroups = (): PublicProductGroup[] =>
  staticProductGroups.map((group) => ({
    slug: createSlug(group.name),
    name: group.name,
    description: group.description,
    image: group.image,
    benefits: group.benefits,
    isFeatured: group.name === 'Caluo.ber',
    products: group.products.map((product) => ({
      slug: createSlug(product.name),
      name: product.name,
      size: product.size,
      excerpt: product.benefits[0] ?? product.name,
      description: product.benefits.join('\n'),
      image: product.image,
      images: product.images ?? [product.image],
      benefits: product.benefits,
      ingredients: product.ingredients,
      featured: product.featured ?? false,
      isBannerCard: product.isBannerCard ?? false,
    })),
  }));

export const getPublishedProductGroups = async () => {
  if (!hasDatabaseEnv()) {
    return getStaticProductGroups();
  }

  try {
    const lines = await db.productLine.findMany({
      where: {
        isActive: true,
      },
      include: lineInclude,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });
    const groups = lines
      .map(mapLine)
      .filter((line) => line.products.length > 0);

    return groups.length > 0 ? groups : getStaticProductGroups();
  } catch {
    return getStaticProductGroups();
  }
};

export const getPublishedProductLines = async () => {
  const groups = await getPublishedProductGroups();

  return groups.map(({ products: _products, ...line }) => line);
};

export const getPublishedProductBySlugs = async ({
  lineSlug,
  productSlug,
}: {
  lineSlug: string;
  productSlug: string;
}) => {
  const groups = await getPublishedProductGroups();
  const group = groups.find((item) => item.slug === lineSlug);
  const product = group?.products.find((item) => item.slug === productSlug);

  return group && product ? { group, product } : null;
};
