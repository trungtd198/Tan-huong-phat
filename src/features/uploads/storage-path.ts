const sanitizePathPart = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const createProductCoverStoragePath = ({
  productSlug,
  extension,
}: {
  productSlug: string;
  extension: string;
}) =>
  `products/${sanitizePathPart(productSlug)}/cover-${Date.now()}${extension}`;

export const createProductImageStoragePath = ({
  productSlug,
  index,
  extension,
}: {
  productSlug: string;
  index: number;
  extension: string;
}) =>
  `products/${sanitizePathPart(productSlug)}/gallery-${index}-${Date.now()}${extension}`;

export const createProductLineBannerStoragePath = ({
  lineSlug,
  extension,
}: {
  lineSlug: string;
  extension: string;
}) =>
  `product-lines/${sanitizePathPart(lineSlug)}/banner-${Date.now()}${extension}`;

export const createBannerStoragePath = ({
  placement,
  extension,
}: {
  placement: string;
  extension: string;
}) => `banners/${sanitizePathPart(placement)}/${Date.now()}${extension}`;
