import { type ProductImage, ProductStatus } from '@prisma/client';
import { ArrowLeft, Pencil } from 'lucide-react';
import Link from 'next/link';

import type {
  getAdminProductById,
  getAdminProductLines,
} from './product-admin.queries';
import { ProductAdminSubmitButton } from './product-admin-submit-button';
import { ProductSaveToast } from './product-save-toast';

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
  readOnly?: boolean;
  saved?: boolean;
};

const fieldClassName =
  'mt-2 w-full rounded-md border border-sand-300 bg-white px-3 py-2 text-sm outline-none transition disabled:bg-sand-100 disabled:text-sand-600 focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40';

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
  IN_STOCK: 'Còn hàng',
  OUT_OF_STOCK: 'Hết hàng',
  COMING_SOON: 'Sắp ra mắt',
} satisfies Record<ProductStatus, string>;

export const ProductAdminForm = ({
  action,
  lines,
  product,
  readOnly = false,
  saved = false,
}: ProductAdminFormProps) => (
  <>
    <ProductSaveToast
      show={saved}
      message="Thông tin mới đã được cập nhật vào chi tiết sản phẩm."
    />

    <div className="mb-6 flex items-center justify-between gap-4 border-b border-gold-500/10 pb-4">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 rounded-md border border-transparent px-3 py-2 text-xs font-bold uppercase tracking-wider text-gold-600 transition hover:border-gold-500/25 hover:bg-sand-100 hover:text-espresso-900"
      >
        <ArrowLeft className="size-4" />
        Quay lại danh sách sản phẩm
      </Link>
      <div className="hidden text-right sm:block">
        <span className="block text-[10px] font-bold uppercase tracking-widest text-gold-600">
          Phân hệ quản trị
        </span>
        <span className="text-xs font-semibold text-espresso-900">
          Sản phẩm & Thương hiệu
        </span>
      </div>
    </div>

    <form action={action} className="space-y-6">
      {product ? (
        <input type="hidden" name="productId" value={product.id} />
      ) : null}

      <section className="rounded-lg border border-sand-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold">Tên sản phẩm</span>
            <input
              name="name"
              defaultValue={product?.name}
              disabled={readOnly}
              required
              className={fieldClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Slug</span>
            <input
              value={product?.slug ?? 'Tự tạo từ tên sản phẩm khi lưu'}
              disabled
              className={fieldClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Dòng sản phẩm</span>
            <select
              name="lineId"
              defaultValue={product?.lineId}
              disabled={readOnly}
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
            <span className="text-sm font-semibold">
              Nhãn hiển thị / Dung tích
            </span>
            <span className="mt-1 block text-xs text-sand-500">
              Hiển thị dạng pill dưới tên sản phẩm, ví dụ: Dưỡng tạo kiểu hoặc
              300ml.
            </span>
            <input
              name="size"
              defaultValue={product?.size ?? ''}
              disabled={readOnly}
              className={fieldClassName}
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
            <label className="block">
              <span className="text-sm font-semibold">Trạng thái</span>
              <select
                name="status"
                defaultValue={product?.status ?? ProductStatus.IN_STOCK}
                disabled={readOnly}
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
                disabled={readOnly}
                className={fieldClassName}
              />
            </label>
            <label className="mt-8 flex items-center gap-2 text-sm font-semibold">
              <input
                name="featured"
                type="checkbox"
                defaultChecked={product?.featured ?? false}
                disabled={readOnly}
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
            <span className="mt-1 block text-xs text-sand-500">
              Hiển thị ở panel giới thiệu của trang chi tiết sản phẩm.
            </span>
            <textarea
              name="excerpt"
              defaultValue={product?.excerpt}
              disabled={readOnly}
              required
              className={textareaClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Mô tả</span>
            <span className="mt-1 block text-xs text-sand-500">
              Hiển thị trong tab Mô tả sản phẩm. Xuống dòng để tách đoạn.
            </span>
            <textarea
              name="description"
              defaultValue={product?.description}
              disabled={readOnly}
              required
              className={textareaClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">
              Lợi ích, mỗi dòng một mục
            </span>
            <span className="mt-1 block text-xs text-sand-500">
              Hiển thị trong mục Ưu điểm nổi bật của trang chi tiết.
            </span>
            <textarea
              name="benefits"
              defaultValue={getJsonList(product?.benefits).join('\n')}
              disabled={readOnly}
              className={textareaClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Thành phần</span>
            <span className="mt-1 block text-xs text-sand-500">
              Hiển thị trong tab Thành phần chi tiết và box Thành phần chính.
            </span>
            <textarea
              name="ingredients"
              defaultValue={product?.ingredients ?? ''}
              disabled={readOnly}
              className={textareaClassName}
            />
          </label>
        </div>
      </section>

      <section className="rounded-lg border border-sand-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">Thông tin trang chi tiết</h2>
        <p className="mt-1 text-sm text-sand-500">
          Các trường này đang được dùng trực tiếp ở tab thông tin và khối lưu ý
          trên trang chi tiết sản phẩm.
        </p>
        <div className="mt-4 grid gap-4">
          <label className="block">
            <span className="text-sm font-semibold">Hướng dẫn sử dụng</span>
            <span className="mt-1 block text-xs text-sand-500">
              Mỗi dòng là một bước trong tab Hướng dẫn sử dụng.
            </span>
            <textarea
              name="howToUse"
              defaultValue={product?.howToUse ?? ''}
              disabled={readOnly}
              placeholder={`Lấy một lượng sản phẩm vừa đủ.\nThoa đều từ thân tóc đến ngọn tóc.\nTạo kiểu hoặc xả lại tùy loại sản phẩm.`}
              className={textareaClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Lưu ý</span>
            <span className="mt-1 block text-xs text-sand-500">
              Hiển thị dưới phần tab thông tin chi tiết nếu có nội dung.
            </span>
            <textarea
              name="warnings"
              defaultValue={product?.warnings ?? ''}
              disabled={readOnly}
              placeholder="Ví dụ: Tránh tiếp xúc trực tiếp với mắt. Ngưng sử dụng nếu có dấu hiệu kích ứng."
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
          {!readOnly ? (
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
          ) : null}
          {getAdditionalImages(product?.images).length > 0 ? (
            <div>
              <p className="text-sm font-semibold">Ảnh phụ hiện tại</p>
              <div className="mt-2 flex flex-wrap gap-3">
                {getAdditionalImages(product?.images).map((image) => (
                  <div
                    key={image.id}
                    className="block rounded-md border border-sand-200 bg-white p-2"
                  >
                    <img
                      src={image.publicUrl}
                      alt={image.alt ?? product?.name ?? 'Ảnh phụ sản phẩm'}
                      className="size-24 rounded-md object-contain"
                    />
                    {!readOnly ? (
                      <label className="mt-2 flex items-center gap-2 text-xs font-semibold text-red-600">
                        <input
                          type="checkbox"
                          name="removeImageIds"
                          value={image.id}
                        />
                        Xóa ảnh này
                      </label>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {!readOnly ? (
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
          ) : null}
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
              disabled={readOnly}
              className={fieldClassName}
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Mô tả SEO</span>
            <textarea
              name="seoDescription"
              defaultValue={product?.seoDescription ?? ''}
              disabled={readOnly}
              className={textareaClassName}
            />
          </label>
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        {readOnly && product ? (
          <Link
            href={`/admin/products/${product.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-espresso-900 px-5 py-2.5 text-center text-sm font-bold text-white transition hover:bg-espresso-800"
          >
            <Pencil className="size-4" />
            Chỉnh sửa sản phẩm
          </Link>
        ) : (
          <ProductAdminSubmitButton>Lưu sản phẩm</ProductAdminSubmitButton>
        )}
        {!readOnly ? (
          <Link
            href="/admin/products"
            className="rounded-md border border-sand-300 bg-white px-5 py-2.5 text-center text-sm font-bold transition hover:bg-sand-100"
          >
            Hủy
          </Link>
        ) : null}
      </div>
    </form>
  </>
);
