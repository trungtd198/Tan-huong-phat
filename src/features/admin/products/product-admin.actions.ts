'use server';

import { BannerPlacement, ProductStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import path from 'path';

import { productGroups } from '@/data/reference-layout';
import { requireAdminUser } from '@/features/admin/auth/guards';
import {
  createProductCoverStoragePath,
  createProductImageStoragePath,
  createProductLineBannerStoragePath,
} from '@/features/uploads/storage-path';
import { uploadImage } from '@/features/uploads/upload.service';
import { db } from '@/lib/db';

import { parseProductAdminFormData } from './product-admin.validation';

export const revalidateProductPaths = (
  slugs: Array<string | null | undefined>,
) => {
  revalidatePath('/');
  revalidatePath('/products');
  revalidatePath('/sitemap.xml');
  slugs.filter(Boolean).forEach((slug) => {
    revalidatePath(`/products/${slug}`);
  });
};

const getPublishedAt = (
  status: ProductStatus,
  existingPublishedAt?: Date | null,
) => {
  if (status !== ProductStatus.PUBLISHED) {
    return null;
  }

  return existingPublishedAt ?? new Date();
};

const createSlug = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const resolveUniqueProductSlug = async (
  name: string,
  currentProductId?: string,
) => {
  const baseSlug = createSlug(name) || `san-pham-${Date.now()}`;
  const findAvailableSlug = async (slug: string, suffix: number) => {
    const existing = await db.product.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
      },
    });

    if (!existing || existing.id === currentProductId) {
      return slug;
    }

    return findAvailableSlug(`${baseSlug}-${suffix}`, suffix + 1);
  };

  return findAvailableSlug(baseSlug, 2);
};

const getString = (formData: FormData, key: string) =>
  String(formData.get(key) ?? '').trim();

const getImageFileExtension = (file: File) => {
  const extensionFromName = path.extname(file.name);

  if (extensionFromName) {
    return extensionFromName;
  }

  return `.${file.type.split('/')[1] ?? 'webp'}`;
};

const uploadCoverIfNeeded = async ({
  productId,
  productSlug,
  name,
  coverImageFile,
}: {
  productId: string;
  productSlug: string;
  name: string;
  coverImageFile: File | null;
}) => {
  if (coverImageFile) {
    const upload = await uploadImage({
      path: createProductCoverStoragePath({
        productSlug,
        extension: getImageFileExtension(coverImageFile),
      }),
      file: coverImageFile,
      contentType: coverImageFile.type || 'image/webp',
      upsert: false,
    });

    const existingCover = await db.productImage.findFirst({
      where: {
        productId,
        isCover: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (existingCover) {
      await db.productImage.update({
        where: {
          id: existingCover.id,
        },
        data: {
          storagePath: upload.path,
          publicUrl: upload.publicUrl,
          alt: name,
          isCover: true,
          sortOrder: 0,
        },
      });
    } else {
      await db.productImage.create({
        data: {
          productId,
          storagePath: upload.path,
          publicUrl: upload.publicUrl,
          alt: name,
          isCover: true,
          sortOrder: 0,
        },
      });
    }
  }
};

const uploadAdditionalImageFiles = async ({
  productId,
  productSlug,
  name,
  imageFiles,
}: {
  productId: string;
  productSlug: string;
  name: string;
  imageFiles: File[];
}) => {
  if (imageFiles.length === 0) {
    return;
  }

  const existingImagesCount = await db.productImage.count({
    where: {
      productId,
      isCover: false,
    },
  });

  const uploadedImages = await Promise.all(
    imageFiles.map(async (file, index) => {
      const sortOrder = existingImagesCount + index + 1;
      const upload = await uploadImage({
        path: createProductImageStoragePath({
          productSlug,
          index: sortOrder,
          extension: getImageFileExtension(file),
        }),
        file,
        contentType: file.type || 'image/webp',
        upsert: false,
      });

      return {
        productId,
        storagePath: upload.path,
        publicUrl: upload.publicUrl,
        alt: `${name} ảnh ${sortOrder + 1}`,
        isCover: false,
        sortOrder,
      };
    }),
  );

  await db.productImage.createMany({
    data: uploadedImages,
  });
};

export const createAdminProduct = async (formData: FormData) => {
  await requireAdminUser();

  const payload = parseProductAdminFormData(formData);
  if (!payload.coverImageFile) {
    throw new Error('Vui lòng tải ảnh đại diện sản phẩm');
  }

  const slug = await resolveUniqueProductSlug(payload.name);

  const product = await db.product.create({
    data: {
      lineId: payload.lineId,
      slug,
      name: payload.name,
      size: payload.size,
      excerpt: payload.excerpt,
      description: payload.description,
      ingredients: payload.ingredients,
      benefits: payload.benefits,
      featured: payload.featured,
      status: payload.status,
      sortOrder: payload.sortOrder,
      seoTitle: payload.seoTitle,
      seoDescription: payload.seoDescription,
      publishedAt: getPublishedAt(payload.status),
    },
    select: {
      id: true,
      slug: true,
      name: true,
      line: {
        select: {
          slug: true,
        },
      },
    },
  });

  await uploadCoverIfNeeded({
    productId: product.id,
    productSlug: product.slug,
    name: product.name,
    coverImageFile: payload.coverImageFile,
  });
  await uploadAdditionalImageFiles({
    productId: product.id,
    productSlug: product.slug,
    name: product.name,
    imageFiles: payload.imageFiles,
  });

  revalidateProductPaths([product.slug]);
  revalidatePath(`/products/${product.line.slug}/${product.slug}`);
  redirect(`/admin/products/${product.id}?saved=1`);
};

export const updateAdminProduct = async (formData: FormData) => {
  await requireAdminUser();

  const productId = getString(formData, 'productId');

  if (!productId) {
    throw new Error('Thiếu ID sản phẩm');
  }

  const payload = parseProductAdminFormData(formData);
  const slug = await resolveUniqueProductSlug(payload.name, productId);
  const existingProduct = await db.product.findUniqueOrThrow({
    where: {
      id: productId,
    },
    select: {
      slug: true,
      line: {
        select: {
          slug: true,
        },
      },
      publishedAt: true,
    },
  });

  const product = await db.product.update({
    where: {
      id: productId,
    },
    data: {
      lineId: payload.lineId,
      slug,
      name: payload.name,
      size: payload.size,
      excerpt: payload.excerpt,
      description: payload.description,
      ingredients: payload.ingredients,
      benefits: payload.benefits,
      featured: payload.featured,
      status: payload.status,
      sortOrder: payload.sortOrder,
      seoTitle: payload.seoTitle,
      seoDescription: payload.seoDescription,
      publishedAt: getPublishedAt(payload.status, existingProduct.publishedAt),
    },
    select: {
      id: true,
      slug: true,
      name: true,
      line: {
        select: {
          slug: true,
        },
      },
    },
  });

  await uploadCoverIfNeeded({
    productId: product.id,
    productSlug: product.slug,
    name: product.name,
    coverImageFile: payload.coverImageFile,
  });
  await uploadAdditionalImageFiles({
    productId: product.id,
    productSlug: product.slug,
    name: product.name,
    imageFiles: payload.imageFiles,
  });

  revalidateProductPaths([existingProduct.slug, product.slug]);
  revalidatePath(
    `/products/${existingProduct.line.slug}/${existingProduct.slug}`,
  );
  revalidatePath(`/products/${product.line.slug}/${product.slug}`);
  redirect(`/admin/products/${product.id}?saved=1`);
};

export const updateAdminProductStatus = async (formData: FormData) => {
  await requireAdminUser();

  const productId = getString(formData, 'productId');
  const status = getString(formData, 'status') as ProductStatus;

  if (!productId || !Object.values(ProductStatus).includes(status)) {
    throw new Error('Cập nhật trạng thái sản phẩm không hợp lệ');
  }

  const existingProduct = await db.product.findUniqueOrThrow({
    where: {
      id: productId,
    },
    select: {
      slug: true,
      publishedAt: true,
    },
  });

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      status,
      publishedAt: getPublishedAt(status, existingProduct.publishedAt),
    },
  });

  revalidateProductPaths([existingProduct.slug]);
  redirect('/admin/products');
};

const upsertLegacyProductImage = async ({
  productId,
  publicUrl,
  alt,
  isCover,
  sortOrder,
}: {
  productId: string;
  publicUrl: string;
  alt: string;
  isCover: boolean;
  sortOrder: number;
}) => {
  const existingImage = await db.productImage.findFirst({
    where: isCover
      ? {
          productId,
          isCover: true,
        }
      : {
          productId,
          publicUrl,
        },
    orderBy: {
      createdAt: 'asc',
    },
  });

  if (existingImage) {
    await db.productImage.update({
      where: {
        id: existingImage.id,
      },
      data: {
        publicUrl,
        alt,
        isCover,
        sortOrder,
      },
    });
    return;
  }

  await db.productImage.create({
    data: {
      productId,
      publicUrl,
      alt,
      isCover,
      sortOrder,
    },
  });
};

/* eslint-disable no-await-in-loop, no-continue */
export const importLegacyProductData = async () => {
  await requireAdminUser();

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
      const savedProduct = await db.product.upsert({
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
          status: ProductStatus.PUBLISHED,
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
          status: ProductStatus.PUBLISHED,
          sortOrder: productIndex,
          publishedAt: new Date(),
        },
      });

      const existingDefaultVariant = await db.productVariant.findFirst({
        where: {
          productId: savedProduct.id,
          isDefault: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      const variantData = {
        name: product.size ? `${product.name} - ${product.size}` : product.name,
        size: product.size,
        isDefault: true,
        isActive: true,
        sortOrder: 0,
      };

      if (existingDefaultVariant) {
        await db.productVariant.update({
          where: {
            id: existingDefaultVariant.id,
          },
          data: variantData,
        });
      } else {
        await db.productVariant.create({
          data: {
            productId: savedProduct.id,
            ...variantData,
          },
        });
      }

      await upsertLegacyProductImage({
        productId: savedProduct.id,
        publicUrl: product.image,
        alt: product.name,
        isCover: true,
        sortOrder: 0,
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

        await upsertLegacyProductImage({
          productId: savedProduct.id,
          publicUrl: image,
          alt: `${product.name} ảnh ${imageIndex + 2}`,
          isCover: false,
          sortOrder: imageIndex + 1,
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

  revalidateProductPaths(
    productGroups.flatMap((group) =>
      group.products.map((product) => createSlug(product.name)),
    ),
  );
  productGroups.forEach((group) => {
    revalidatePath(`/products/${createSlug(group.name)}`);
    group.products.forEach((product) => {
      revalidatePath(
        `/products/${createSlug(group.name)}/${createSlug(product.name)}`,
      );
    });
  });
  revalidatePath('/admin/products');
  redirect('/admin/products?imported=1');
};
/* eslint-enable no-await-in-loop, no-continue */

const getOptionalString = (formData: FormData, key: string) => {
  const value = getString(formData, key);

  return value.length > 0 ? value : null;
};

const getInt = (formData: FormData, key: string) => {
  const value = Number.parseInt(getString(formData, key), 10);

  return Number.isFinite(value) ? value : 0;
};

const getBoolean = (formData: FormData, key: string) =>
  formData.get(key) === 'on' || formData.get(key) === 'true';

const getOptionalFile = (formData: FormData, key: string) => {
  const value = formData.get(key);

  if (!(value instanceof File) || value.size === 0) {
    return null;
  }

  return value;
};

const parseLines = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const resolveProductLineImageUrl = async ({
  slug,
  imageUrl,
  imageFile,
}: {
  slug: string;
  imageUrl: string | null;
  imageFile: File | null;
}) => {
  if (!imageFile) {
    return imageUrl;
  }

  const upload = await uploadImage({
    path: createProductLineBannerStoragePath({
      lineSlug: slug,
      extension: getImageFileExtension(imageFile),
    }),
    file: imageFile,
    contentType: imageFile.type || 'image/webp',
    upsert: false,
  });

  return upload.publicUrl;
};

const revalidateProductLinePaths = (slugs: Array<string | undefined>) => {
  revalidateProductPaths([]);
  slugs.filter(Boolean).forEach((slug) => {
    revalidatePath(`/products/${slug}`);
  });
  revalidatePath('/admin/product-lines');
};

export const createAdminProductLine = async (formData: FormData) => {
  await requireAdminUser();

  const slug = getString(formData, 'slug');
  const name = getString(formData, 'name');
  const description = getString(formData, 'description');
  const resolvedSlug = slug || createSlug(name);

  if (!resolvedSlug || !name || !description) {
    throw new Error('Thiếu thông tin dòng sản phẩm');
  }

  const imageUrl = await resolveProductLineImageUrl({
    slug: resolvedSlug,
    imageUrl: getOptionalString(formData, 'imageUrl'),
    imageFile: getOptionalFile(formData, 'imageFile'),
  });
  const isFeatured = getBoolean(formData, 'isFeatured');

  if (isFeatured) {
    await db.productLine.updateMany({
      data: {
        isFeatured: false,
      },
    });
  }

  await db.productLine.create({
    data: {
      slug: resolvedSlug,
      name,
      description,
      imageUrl,
      benefits: parseLines(getString(formData, 'benefits')),
      isFeatured,
      sortOrder: getInt(formData, 'sortOrder'),
      isActive: getBoolean(formData, 'isActive'),
    },
  });

  revalidateProductLinePaths([resolvedSlug]);
  redirect('/admin/product-lines?saved=1');
};

export const updateAdminProductLine = async (formData: FormData) => {
  await requireAdminUser();

  const lineId = getString(formData, 'lineId');
  const slug = getString(formData, 'slug');
  const name = getString(formData, 'name');
  const description = getString(formData, 'description');
  const resolvedSlug = slug || createSlug(name);

  if (!lineId || !resolvedSlug || !name || !description) {
    throw new Error('Thiếu thông tin dòng sản phẩm');
  }

  const existingLine = await db.productLine.findUniqueOrThrow({
    where: {
      id: lineId,
    },
    select: {
      slug: true,
      imageUrl: true,
    },
  });
  const imageUrl =
    (await resolveProductLineImageUrl({
      slug: resolvedSlug,
      imageUrl: getOptionalString(formData, 'imageUrl'),
      imageFile: getOptionalFile(formData, 'imageFile'),
    })) ?? existingLine.imageUrl;
  const isFeatured = getBoolean(formData, 'isFeatured');

  if (isFeatured) {
    await db.productLine.updateMany({
      where: {
        id: {
          not: lineId,
        },
      },
      data: {
        isFeatured: false,
      },
    });
  }

  await db.productLine.update({
    where: {
      id: lineId,
    },
    data: {
      slug: resolvedSlug,
      name,
      description,
      imageUrl,
      benefits: parseLines(getString(formData, 'benefits')),
      isFeatured,
      sortOrder: getInt(formData, 'sortOrder'),
      isActive: getBoolean(formData, 'isActive'),
    },
  });

  revalidateProductLinePaths([existingLine.slug, resolvedSlug]);
  redirect('/admin/product-lines?saved=1');
};

export const updateAdminProductLineFeatured = async (formData: FormData) => {
  await requireAdminUser();

  const lineId = getString(formData, 'lineId');
  const isFeatured = getBoolean(formData, 'isFeatured');

  if (!lineId) {
    throw new Error('Thiếu ID dòng sản phẩm');
  }

  const line = await db.productLine.findUniqueOrThrow({
    where: {
      id: lineId,
    },
    select: {
      slug: true,
    },
  });

  if (isFeatured) {
    await db.$transaction([
      db.productLine.updateMany({
        data: {
          isFeatured: false,
        },
      }),
      db.productLine.update({
        where: {
          id: lineId,
        },
        data: {
          isFeatured: true,
        },
      }),
    ]);
  } else {
    await db.productLine.update({
      where: {
        id: lineId,
      },
      data: {
        isFeatured: false,
      },
    });
  }

  revalidateProductLinePaths([line.slug]);
  redirect('/admin/product-lines?featured=1');
};

export const deleteAdminProductLine = async (formData: FormData) => {
  await requireAdminUser();

  const lineId = getString(formData, 'lineId');

  if (!lineId) {
    throw new Error('Thiếu ID dòng sản phẩm');
  }

  const line = await db.productLine.findUniqueOrThrow({
    where: {
      id: lineId,
    },
    select: {
      slug: true,
      products: {
        select: {
          id: true,
        },
      },
    },
  });

  if (line.products.length > 0) {
    redirect('/admin/product-lines?delete=blocked');
  }

  await db.productLine.delete({
    where: {
      id: lineId,
    },
  });

  revalidateProductLinePaths([line.slug]);
  redirect('/admin/product-lines?deleted=1');
};
