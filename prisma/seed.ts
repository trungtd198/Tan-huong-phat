/* eslint-disable no-await-in-loop, no-console, no-continue */

import { BannerPlacement, ProductStatus } from '@prisma/client';

import { productGroups } from '../src/data/reference-layout';
import { db } from '../src/lib/db';

const createSlug = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const main = async () => {
  const brand = await db.brand.upsert({
    where: {
      slug: 'tan-huong-phat',
    },
    update: {
      name: 'Tân Hương Phát',
      description: 'Thương hiệu mỹ phẩm thiên nhiên và chăm sóc tóc cao cấp.',
      isActive: true,
      sortOrder: 0,
    },
    create: {
      slug: 'tan-huong-phat',
      name: 'Tân Hương Phát',
      description: 'Thương hiệu mỹ phẩm thiên nhiên và chăm sóc tóc cao cấp.',
      isActive: true,
      sortOrder: 0,
    },
  });

  const category = await db.productCategory.upsert({
    where: {
      slug: 'hair-care',
    },
    update: {
      name: 'Chăm sóc tóc',
      description: 'Dầu gội, serum, dầu xả và sản phẩm trị liệu cho tóc.',
      isActive: true,
      sortOrder: 0,
    },
    create: {
      slug: 'hair-care',
      name: 'Chăm sóc tóc',
      description: 'Dầu gội, serum, dầu xả và sản phẩm trị liệu cho tóc.',
      isActive: true,
      sortOrder: 0,
    },
  });

  for (let lineIndex = 0; lineIndex < productGroups.length; lineIndex += 1) {
    const group = productGroups[lineIndex];

    if (!group) {
      continue;
    }

    const line = await db.productLine.upsert({
      where: {
        slug: createSlug(group.name),
      },
      update: {
        name: group.name,
        description: group.description,
        imageUrl: group.image,
        benefits: group.benefits,
        isFeatured: createSlug(group.name) === 'caluo-ber',
        sortOrder: lineIndex,
        isActive: true,
      },
      create: {
        slug: createSlug(group.name),
        name: group.name,
        description: group.description,
        imageUrl: group.image,
        benefits: group.benefits,
        isFeatured: createSlug(group.name) === 'caluo-ber',
        sortOrder: lineIndex,
        isActive: true,
      },
    });

    for (
      let productIndex = 0;
      productIndex < group.products.length;
      productIndex += 1
    ) {
      const product = group.products[productIndex];

      if (!product) {
        continue;
      }

      const slug = createSlug(product.name);
      const seededProduct = await db.product.upsert({
        where: {
          slug,
        },
        update: {
          lineId: line.id,
          categoryId: category.id,
          brandId: brand.id,
          name: product.name,
          size: product.size,
          excerpt: product.benefits[0] ?? product.name,
          description: product.benefits.join('\n'),
          ingredients: product.ingredients,
          benefits: product.benefits,
          featured: product.featured ?? false,
          status: ProductStatus.IN_STOCK,
          sortOrder: productIndex,
          publishedAt: new Date(),
        },
        create: {
          lineId: line.id,
          categoryId: category.id,
          brandId: brand.id,
          slug,
          name: product.name,
          size: product.size,
          excerpt: product.benefits[0] ?? product.name,
          description: product.benefits.join('\n'),
          ingredients: product.ingredients,
          benefits: product.benefits,
          featured: product.featured ?? false,
          status: ProductStatus.IN_STOCK,
          sortOrder: productIndex,
          publishedAt: new Date(),
        },
      });

      await db.productVariant.upsert({
        where: {
          id: `${seededProduct.id}-default-variant`,
        },
        update: {
          name: product.size
            ? `${product.name} - ${product.size}`
            : product.name,
          size: product.size,
          isDefault: true,
          isActive: true,
          sortOrder: 0,
        },
        create: {
          id: `${seededProduct.id}-default-variant`,
          productId: seededProduct.id,
          name: product.size
            ? `${product.name} - ${product.size}`
            : product.name,
          size: product.size,
          isDefault: true,
          isActive: true,
          sortOrder: 0,
        },
      });

      await db.productImage.upsert({
        where: {
          id: `${seededProduct.id}-cover`,
        },
        update: {
          publicUrl: product.image,
          alt: product.name,
          isCover: true,
          sortOrder: 0,
        },
        create: {
          id: `${seededProduct.id}-cover`,
          productId: seededProduct.id,
          publicUrl: product.image,
          alt: product.name,
          isCover: true,
          sortOrder: 0,
        },
      });

      const additionalImages = (product.images ?? [])
        .filter((image) => image !== product.image)
        .slice(0, 12);

      for (
        let imageIndex = 0;
        imageIndex < additionalImages.length;
        imageIndex += 1
      ) {
        const image = additionalImages[imageIndex];

        if (!image) {
          continue;
        }

        await db.productImage.upsert({
          where: {
            id: `${seededProduct.id}-image-${imageIndex + 1}`,
          },
          update: {
            publicUrl: image,
            alt: `${product.name} ảnh ${imageIndex + 2}`,
            isCover: false,
            sortOrder: imageIndex + 1,
          },
          create: {
            id: `${seededProduct.id}-image-${imageIndex + 1}`,
            productId: seededProduct.id,
            publicUrl: image,
            alt: `${product.name} ảnh ${imageIndex + 2}`,
            isCover: false,
            sortOrder: imageIndex + 1,
          },
        });
      }
    }
  }

  await db.banner.upsert({
    where: {
      id: 'seed-home-hero',
    },
    update: {
      placement: BannerPlacement.HOME_HERO,
      title: 'Tân Hương Phát',
      subtitle: 'Chăm sóc tóc thiên nhiên cao cấp',
      imageUrl: '/images/products/acai-berry/shampoo-conditioner/banner-2.jpg',
      ctaLabel: 'Khám phá sản phẩm',
      ctaHref: '/products',
      isActive: true,
      sortOrder: 0,
    },
    create: {
      id: 'seed-home-hero',
      placement: BannerPlacement.HOME_HERO,
      title: 'Tân Hương Phát',
      subtitle: 'Chăm sóc tóc thiên nhiên cao cấp',
      imageUrl: '/images/products/acai-berry/shampoo-conditioner/banner-2.jpg',
      ctaLabel: 'Khám phá sản phẩm',
      ctaHref: '/products',
      isActive: true,
      sortOrder: 0,
    },
  });

  await db.banner.upsert({
    where: {
      id: 'seed-products-hero',
    },
    update: {
      placement: BannerPlacement.PRODUCTS_HERO,
      title: 'Sản phẩm',
      subtitle: 'Khám phá trọn bộ sản phẩm chăm sóc tóc thiên nhiên cao cấp.',
      imageUrl:
        '/images/products/caluober/collagen-anti-dandruff-shampoo-conditioner/banner-14.jpg',
      isActive: true,
      sortOrder: 0,
    },
    create: {
      id: 'seed-products-hero',
      placement: BannerPlacement.PRODUCTS_HERO,
      title: 'Sản phẩm',
      subtitle: 'Khám phá trọn bộ sản phẩm chăm sóc tóc thiên nhiên cao cấp.',
      imageUrl:
        '/images/products/caluober/collagen-anti-dandruff-shampoo-conditioner/banner-14.jpg',
      isActive: true,
      sortOrder: 0,
    },
  });

  console.log('Đã tạo dữ liệu mẫu.');
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
