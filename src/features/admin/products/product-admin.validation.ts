import { ProductStatus } from '@prisma/client';

export type ProductAdminFormPayload = {
  lineId: string;
  name: string;
  size: string | null;
  excerpt: string;
  description: string;
  ingredients: string | null;
  benefits: string[];
  howToUse: string | null;
  warnings: string | null;
  featured: boolean;
  status: ProductStatus;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
  coverImageFile: File | null;
  imageFiles: File[];
  removeImageIds: string[];
};

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

const parseLines = (value: string) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const getOptionalFile = (formData: FormData, key: string) => {
  const value = formData.get(key);

  if (!(value instanceof File) || value.size === 0) {
    return null;
  }

  return value;
};

const getOptionalFiles = (formData: FormData, key: string) =>
  formData
    .getAll(key)
    .filter((value): value is File => value instanceof File && value.size > 0);

const getStringList = (formData: FormData, key: string) =>
  formData
    .getAll(key)
    .map((value) => String(value).trim())
    .filter(Boolean);

export const parseProductAdminFormData = (
  formData: FormData,
): ProductAdminFormPayload => {
  const statusValue = getRequiredString(formData, 'status');

  if (!Object.values(ProductStatus).includes(statusValue as ProductStatus)) {
    throw new Error('Trạng thái sản phẩm không hợp lệ');
  }

  return {
    lineId: getRequiredString(formData, 'lineId'),
    name: getRequiredString(formData, 'name'),
    size: getOptionalString(formData, 'size'),
    excerpt: getRequiredString(formData, 'excerpt'),
    description: getRequiredString(formData, 'description'),
    ingredients: getOptionalString(formData, 'ingredients'),
    benefits: parseLines(getString(formData, 'benefits')),
    howToUse: getOptionalString(formData, 'howToUse'),
    warnings: getOptionalString(formData, 'warnings'),
    featured: getBoolean(formData, 'featured'),
    status: statusValue as ProductStatus,
    sortOrder: getInt(formData, 'sortOrder'),
    seoTitle: getOptionalString(formData, 'seoTitle'),
    seoDescription: getOptionalString(formData, 'seoDescription'),
    coverImageFile: getOptionalFile(formData, 'coverImageFile'),
    imageFiles: getOptionalFiles(formData, 'imageFiles'),
    removeImageIds: getStringList(formData, 'removeImageIds'),
  };
};
