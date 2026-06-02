export type PublicProductLine = {
  slug: string;
  name: string;
  description: string;
  image: string;
  benefits: string[];
  isFeatured: boolean;
};

export type PublicProduct = {
  slug: string;
  name: string;
  size: string;
  excerpt: string;
  description: string;
  image: string;
  images: string[];
  benefits: string[];
  ingredients: string;
  featured: boolean;
  howToUse?: string;
  warnings?: string;
  seoTitle?: string;
  seoDescription?: string;
  /** When true, this product's cover image is a marketing infographic banner — displayed outside the product grid */
  isBannerCard?: boolean;
};

export type PublicProductGroup = PublicProductLine & {
  products: PublicProduct[];
};
