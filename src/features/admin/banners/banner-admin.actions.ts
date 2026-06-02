'use server';

import { BannerPlacement } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import path from 'path';

import { requireAdminUser } from '@/features/admin/auth/guards';
import {
  createBannerStoragePath,
  createProductLineBannerStoragePath,
} from '@/features/uploads/storage-path';
import { uploadImage } from '@/features/uploads/upload.service';
import { db } from '@/lib/db';

const getString = (formData: FormData, key: string) =>
  String(formData.get(key) ?? '').trim();

const getOptionalString = (formData: FormData, key: string) => {
  const value = getString(formData, key);

  return value.length > 0 ? value : null;
};

const getRequiredString = (formData: FormData, key: string) => {
  const value = getString(formData, key);

  if (!value) {
    throw new Error(`Thiếu trường bắt buộc: ${key}`);
  }

  return value;
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

const getPlacement = (formData: FormData) => {
  const value = getRequiredString(formData, 'placement');

  if (!Object.values(BannerPlacement).includes(value as BannerPlacement)) {
    throw new Error('Vị trí banner không hợp lệ');
  }

  return value as BannerPlacement;
};

const getBannerTarget = (formData: FormData) => {
  const value = getRequiredString(formData, 'bannerTarget');

  if (value === 'PRODUCT_LINE') {
    return value;
  }

  if (!Object.values(BannerPlacement).includes(value as BannerPlacement)) {
    throw new Error('Vị trí banner không hợp lệ');
  }

  return value as BannerPlacement;
};

const getImageFileExtension = (file: File) => {
  const extensionFromName = path.extname(file.name);

  if (extensionFromName) {
    return extensionFromName;
  }

  return `.${file.type.split('/')[1] ?? 'webp'}`;
};

const revalidateBannerPaths = (placement?: BannerPlacement) => {
  if (!placement || placement === BannerPlacement.HOME_HERO) {
    revalidatePath('/');
  }

  if (!placement || placement === BannerPlacement.PRODUCTS_HERO) {
    revalidatePath('/products');
  }

  if (!placement || placement === BannerPlacement.ABOUT_HERO) {
    revalidatePath('/about');
  }

  revalidatePath('/sitemap.xml');
};

const resolveBannerImageUrl = async ({
  placement,
  imageUrl,
  imageFile,
}: {
  placement: BannerPlacement;
  imageUrl: string | null;
  imageFile: File | null;
}) => {
  if (!imageFile) {
    return imageUrl;
  }

  const upload = await uploadImage({
    path: createBannerStoragePath({
      placement,
      extension: getImageFileExtension(imageFile),
    }),
    file: imageFile,
    contentType: imageFile.type || 'image/webp',
    upsert: false,
  });

  return upload.publicUrl;
};

export const createAdminBanner = async (formData: FormData) => {
  await requireAdminUser();

  const placement = getPlacement(formData);
  const imageFile = getOptionalFile(formData, 'imageFile');
  const imageUrl = await resolveBannerImageUrl({
    placement,
    imageUrl: null,
    imageFile,
  });

  if (!imageUrl) {
    throw new Error('Banner cần có ảnh');
  }

  await db.banner.create({
    data: {
      placement,
      title: getRequiredString(formData, 'title'),
      subtitle: getOptionalString(formData, 'subtitle'),
      imageUrl,
      ctaLabel: null,
      ctaHref: null,
      isActive: getBoolean(formData, 'isActive'),
      sortOrder: getInt(formData, 'sortOrder'),
    },
  });

  revalidateBannerPaths(placement);
  redirect('/admin/banners?saved=1');
};

export const updateAdminBanner = async (formData: FormData) => {
  await requireAdminUser();

  const bannerId = getRequiredString(formData, 'bannerId');
  const placement = getPlacement(formData);
  const existing = await db.banner.findUniqueOrThrow({
    where: {
      id: bannerId,
    },
    select: {
      placement: true,
      imageUrl: true,
    },
  });
  const imageUrl =
    (await resolveBannerImageUrl({
      placement,
      imageUrl: null,
      imageFile: getOptionalFile(formData, 'imageFile'),
    })) ?? existing.imageUrl;

  await db.banner.update({
    where: {
      id: bannerId,
    },
    data: {
      placement,
      title: getRequiredString(formData, 'title'),
      subtitle: getOptionalString(formData, 'subtitle'),
      imageUrl,
      ctaLabel: null,
      ctaHref: null,
      isActive: getBoolean(formData, 'isActive'),
      sortOrder: getInt(formData, 'sortOrder'),
    },
  });

  revalidateBannerPaths(existing.placement);
  revalidateBannerPaths(placement);
  redirect('/admin/banners?saved=1');
};

export const deleteAdminBanner = async (formData: FormData) => {
  await requireAdminUser();

  const bannerId = getRequiredString(formData, 'bannerId');
  const banner = await db.banner.delete({
    where: {
      id: bannerId,
    },
    select: {
      placement: true,
    },
  });

  revalidateBannerPaths(banner.placement);
  redirect('/admin/banners?deleted=1');
};

export const updateAdminProductLineBanner = async (formData: FormData) => {
  await requireAdminUser();

  const lineId = getRequiredString(formData, 'lineId');
  const imageFile = getOptionalFile(formData, 'imageFile');

  if (!imageFile) {
    throw new Error('Vui lòng tải ảnh banner dòng sản phẩm');
  }

  const line = await db.productLine.findUniqueOrThrow({
    where: {
      id: lineId,
    },
    select: {
      slug: true,
    },
  });
  const upload = await uploadImage({
    path: createProductLineBannerStoragePath({
      lineSlug: line.slug,
      extension: getImageFileExtension(imageFile),
    }),
    file: imageFile,
    contentType: imageFile.type || 'image/webp',
    upsert: false,
  });

  await db.productLine.update({
    where: {
      id: lineId,
    },
    data: {
      imageUrl: upload.publicUrl,
    },
  });

  revalidatePath('/');
  revalidatePath('/products');
  revalidatePath(`/products/${line.slug}`);
  revalidatePath('/sitemap.xml');
  redirect('/admin/banners?lineBanner=saved');
};

export const saveAdminBanner = async (formData: FormData) => {
  await requireAdminUser();

  const target = getBannerTarget(formData);

  if (target === 'PRODUCT_LINE') {
    await updateAdminProductLineBanner(formData);
  } else {
    const placement = target;
    const imageFile = getOptionalFile(formData, 'imageFile');
    const imageUrl = await resolveBannerImageUrl({
      placement,
      imageUrl: null,
      imageFile,
    });

    if (!imageUrl) {
      throw new Error('Banner cần có ảnh');
    }

    const existing = await db.banner.findFirst({
      where: {
        placement,
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      select: {
        id: true,
      },
    });
    const data = {
      placement,
      title: getRequiredString(formData, 'title'),
      subtitle: getOptionalString(formData, 'subtitle'),
      imageUrl,
      ctaLabel: null,
      ctaHref: null,
      isActive: getBoolean(formData, 'isActive'),
      sortOrder: 0,
    };

    if (existing) {
      await db.banner.update({
        where: {
          id: existing.id,
        },
        data,
      });
    } else {
      await db.banner.create({
        data,
      });
    }

    revalidateBannerPaths(placement);
    redirect('/admin/banners?saved=1');
  }
};
