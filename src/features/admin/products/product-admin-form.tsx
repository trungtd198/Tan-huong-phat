import { type ProductImage, ProductStatus } from '@prisma/client';
import Link from 'next/link';

import type {
  getAdminProductById,
  getAdminProductLines,
} from './product-admin.queries';
import { ProductAdminSubmitButton } from './product-admin-submit-button';

type ProductRecord = NonNullable<
  Awaited<ReturnType<typeof getAdminProductById>>
>;
type ProductLineOption = Awaited<
  ReturnType<typeof getAdminProductLines>
>[number];

type ProductAdminFormProps = {
  action: (formData: FormData) => Promise<void>;
  lines: ProductLineOption[];
  product?: ProductRecord;
  saved?: boolean;
};

const fieldClassName =
  'mt-2 w-full rounded-md border border-sand-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40';

const textareaClassName = `${fieldClassName} min-h-28`;

const getJsonList = (value: unknown) =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];

const getCoverImage = (images?: ProductImage[]) =>
  images?.find((image) => image.isCover)?.publicUrl ??
  images?.[0]?.publicUrl ??
  '';

const getAdditionalImages = (images?: ProductImage[]) =>
  images?.filter((image) => !image.isCover) ?? [];

const statusLabels = {
  DRAFT: 'Bản nháp',
  PUBLISHED: 'Đã xuất bản',
  ARCHIVED: 'Đã lưu trữ',
} satisfies Record<ProductStatus, string>;

export const ProductAdminForm = ({
  action,
  lines,
  product,
  saved = false,
}: ProductAdminFormProps) => (
  <form action={action} className="space-y-6">
    {product ? (
      <input type="hidden" name="productId" value={product.id} />
    ) : null}
    {saved ? (
      <p className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
        Đã lưu thay đổi.
      </p>
    ) : null}

    <section className="rounded-lg border border-sand-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold">Tên sản phẩm</span>
          <input
            name="name"
            defaultValue={product?.name}
            required
            className={fieldClassName}
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Slug tự sinh</span>
          <input
            value={
              product?.slug
                ? `/products/${product.slug}`
                : 'Tự tạo từ tên sản phẩm khi lưu'
            }
            readOnly
            className={fieldClassName}
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Dòng sản phẩm</span>
          <select
            name="lineId"
            defaultValue={product?.lineId}
            required
            className={fieldClassName}
          >
            <option value="">Chọn dòng sản phẩm</option>
            {lines.map((line) => (
              <option key={line.id} value={line.id}>
                {line.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Dung tích/Kích cỡ</span>
          <input
            name="size"
            defaultValue={product?.size ?? ''}
            className={fieldClassName}
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
          <label className="block">
            <span className="text-sm font-semibold">Trạng thái</span>
            <select
              name="status"
              defaultValue={product?.status ?? ProductStatus.DRAFT}
              className={fieldClassName}
            >
              {Object.values(ProductStatus).map((status) => (
                <option key={status} value={status}>
                  {statusLabels[status]}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Thứ tự sắp xếp</span>
            <input
              name="sortOrder"
              type="number"
              defaultValue={product?.sortOrder ?? 0}
              className={fieldClassName}
            />
          </label>
          <label className="mt-8 flex items-center gap-2 text-sm font-semibold">
            <input
              name="featured"
              type="checkbox"
              defaultChecked={product?.featured ?? false}
            />
            Nổi bật
          </label>
        </div>
      </div>
    </section>

    <section className="rounded-lg border border-sand-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold">Nội dung hiển thị</h2>
      <div className="mt-4 grid gap-4">
        <label className="block">
          <span className="text-sm font-semibold">Tóm tắt</span>
          <textarea
            name="excerpt"
            defaultValue={product?.excerpt}
            required
            className={textareaClassName}
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Mô tả</span>
          <textarea
            name="description"
            defaultValue={product?.description}
            required
            className={textareaClassName}
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">
            Lợi ích, mỗi dòng một mục
          </span>
          <textarea
            name="benefits"
            defaultValue={getJsonList(product?.benefits).join('\n')}
            className={textareaClassName}
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Thành phần</span>
          <textarea
            name="ingredients"
            defaultValue={product?.ingredients ?? ''}
            className={textareaClassName}
          />
        </label>
      </div>
    </section>

    <section className="rounded-lg border border-sand-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold">Ảnh sản phẩm</h2>
      <div className="mt-4 grid gap-4">
        {getCoverImage(product?.images) ? (
          <div>
            <p className="text-sm font-semibold">Ảnh đại diện hiện tại</p>
            <img
              src={getCoverImage(product?.images)}
              alt={product?.name ?? 'Ảnh đại diện sản phẩm'}
              className="mt-2 size-32 rounded-md border border-sand-200 object-contain"
            />
          </div>
        ) : null}
        <label className="block">
          <span className="text-sm font-semibold">
            Tải ảnh đại diện lên
            {product ? '' : ' *'}
          </span>
          <input
            name="coverImageFile"
            type="file"
            accept="image/*"
            required={!product}
            className={fieldClassName}
          />
        </label>
        {getAdditionalImages(product?.images).length > 0 ? (
          <div>
            <p className="text-sm font-semibold">Ảnh phụ hiện tại</p>
            <div className="mt-2 flex flex-wrap gap-3">
              {getAdditionalImages(product?.images).map((image) => (
                <img
                  key={image.id}
                  src={image.publicUrl}
                  alt={image.alt ?? product?.name ?? 'Ảnh phụ sản phẩm'}
                  className="size-24 rounded-md border border-sand-200 object-contain"
                />
              ))}
            </div>
          </div>
        ) : null}
        <label className="block">
          <span className="text-sm font-semibold">Tải ảnh phụ lên</span>
          <input
            name="imageFiles"
            type="file"
            accept="image/*"
            multiple
            className={fieldClassName}
          />
        </label>
      </div>
    </section>

    <section className="rounded-lg border border-sand-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold">SEO</h2>
      <div className="mt-4 grid gap-4">
        <label className="block">
          <span className="text-sm font-semibold">Tiêu đề SEO</span>
          <input
            name="seoTitle"
            defaultValue={product?.seoTitle ?? ''}
            className={fieldClassName}
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Mô tả SEO</span>
          <textarea
            name="seoDescription"
            defaultValue={product?.seoDescription ?? ''}
            className={textareaClassName}
          />
        </label>
      </div>
    </section>

    <div className="flex flex-col gap-3 sm:flex-row">
      <ProductAdminSubmitButton>Lưu sản phẩm</ProductAdminSubmitButton>
      <Link
        href="/admin/products"
        className="rounded-md border border-sand-300 bg-white px-5 py-2.5 text-center text-sm font-bold transition hover:bg-sand-100"
      >
        Hủy
      </Link>
    </div>
  </form>
);
