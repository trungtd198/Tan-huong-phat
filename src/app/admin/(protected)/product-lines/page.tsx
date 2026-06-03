import { Layers3, Pencil, Plus, Star, Trash2, X } from 'lucide-react';

import { AdminStatusToast } from '@/features/admin/admin-status-toast';
import { AdminSubmitButton } from '@/features/admin/admin-submit-button';
import {
  createAdminProductLine,
  deleteAdminProductLine,
  updateAdminProductLine,
  updateAdminProductLineFeatured,
} from '@/features/admin/products/product-admin.actions';
import { getAdminProductLines } from '@/features/admin/products/product-admin.queries';
import { ProductLineDialogCloseButton } from '@/features/admin/products/product-line-dialog-close-button';

export const dynamic = 'force-dynamic';

type AdminProductLinesPageProps = {
  searchParams?: {
    saved?: string;
    featured?: string;
    deleted?: string;
    delete?: string;
  };
};

type ProductLineRecord = Awaited<
  ReturnType<typeof getAdminProductLines>
>[number];

const fieldClassName =
  'w-full rounded-md border border-sand-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40';

const getJsonList = (value: unknown) =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];

const statusToast = (
  searchParams?: AdminProductLinesPageProps['searchParams'],
) => {
  if (searchParams?.saved) {
    return {
      title: 'Đã lưu dòng sản phẩm',
      description: 'Thông tin dòng sản phẩm đã được cập nhật.',
    };
  }

  if (searchParams?.featured) {
    return {
      title: 'Đã cập nhật dòng nổi bật',
      description: 'Thiết lập dòng sản phẩm nổi bật đã được lưu.',
    };
  }

  if (searchParams?.deleted) {
    return {
      title: 'Đã xóa dòng sản phẩm',
      description: 'Dòng sản phẩm đã được xóa khỏi hệ thống.',
    };
  }

  if (searchParams?.delete === 'blocked') {
    return {
      title: 'Không thể xóa dòng sản phẩm',
      description: 'Dòng sản phẩm đang có sản phẩm liên kết.',
      type: 'warning' as const,
    };
  }

  return null;
};

const ProductLineFields = ({
  line,
  nextSortOrder,
}: {
  line?: ProductLineRecord;
  nextSortOrder?: number;
}) => (
  <div className="grid gap-4 lg:grid-cols-2">
    {line ? <input type="hidden" name="lineId" value={line.id} /> : null}
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-sand-500">
        Tên dòng sản phẩm *
      </span>
      <input
        name="name"
        defaultValue={line?.name ?? ''}
        required
        placeholder="Ví dụ: Caluo.ber"
        className={`mt-2 ${fieldClassName}`}
      />
    </label>
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-sand-500">
        Slug
      </span>
      <input
        name="slug"
        defaultValue={line?.slug ?? ''}
        placeholder="Tự tạo từ tên nếu để trống"
        className={`mt-2 font-mono ${fieldClassName}`}
      />
    </label>
    <label className="block lg:col-span-2">
      <span className="text-xs font-bold uppercase tracking-wider text-sand-500">
        Mô tả *
      </span>
      <textarea
        name="description"
        defaultValue={line?.description ?? ''}
        required
        rows={3}
        className={`mt-2 ${fieldClassName}`}
      />
    </label>
    <label className="block lg:col-span-2">
      <span className="text-xs font-bold uppercase tracking-wider text-sand-500">
        Lợi ích, mỗi dòng một mục
      </span>
      <textarea
        name="benefits"
        defaultValue={getJsonList(line?.benefits).join('\n')}
        rows={3}
        className={`mt-2 ${fieldClassName}`}
      />
    </label>
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-sand-500">
        Tải ảnh đại diện
      </span>
      <input
        name="imageFile"
        type="file"
        accept="image/*"
        className={`mt-2 ${fieldClassName}`}
      />
    </label>
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-sand-500">
        Thứ tự
      </span>
      <input
        name="sortOrder"
        type="number"
        defaultValue={line?.sortOrder ?? nextSortOrder ?? 0}
        className={`mt-2 ${fieldClassName}`}
      />
    </label>
    <div className="flex flex-wrap items-center gap-5 pt-6">
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input
          name="isActive"
          type="checkbox"
          defaultChecked={line?.isActive ?? true}
        />
        Hoạt động
      </label>
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input
          name="isFeatured"
          type="checkbox"
          defaultChecked={line?.isFeatured ?? false}
        />
        Dòng sản phẩm nổi bật
      </label>
    </div>
  </div>
);

const ProductLineCard = ({ line }: { line: ProductLineRecord }) => (
  <article className="overflow-hidden rounded-lg border border-sand-200 bg-white shadow-sm">
    <div className="relative h-48 bg-sand-100">
      {line.imageUrl ? (
        <img
          src={line.imageUrl}
          alt={line.name}
          className="size-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-espresso-900 text-sm font-semibold text-sand-100">
          Chưa có ảnh đại diện
        </div>
      )}
      {line.isFeatured ? (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-espresso-900 shadow-sm">
          <Star className="size-3 fill-current" />
          Nổi bật
        </span>
      ) : null}
    </div>

    <div className="space-y-4 p-5">
      <div>
        <h2 className="text-lg font-bold text-espresso-900">{line.name}</h2>
        <p className="mt-1 font-mono text-xs font-semibold text-gold-600">
          /products/{line.slug}
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-sand-600">
          {line.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-sand-100 px-2 py-1 text-xs font-bold text-sand-700">
          {line.products.length} sản phẩm
        </span>
        <span
          className={`rounded-md px-2 py-1 text-xs font-bold ${
            line.isActive
              ? 'bg-green-50 text-green-700'
              : 'bg-sand-100 text-sand-600'
          }`}
        >
          {line.isActive ? 'Hoạt động' : 'Tắt'}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sand-100 pt-4">
        <form action={updateAdminProductLineFeatured}>
          <input type="hidden" name="lineId" value={line.id} />
          <input
            type="hidden"
            name="isFeatured"
            value={line.isFeatured ? 'false' : 'true'}
          />
          <AdminSubmitButton
            pendingTitle="Đang cập nhật"
            className={`rounded-md border px-3 py-2 text-xs font-bold transition ${
              line.isFeatured
                ? 'border-amber-200 text-amber-700 hover:bg-amber-50'
                : 'border-sand-300 text-espresso-900 hover:bg-sand-100'
            }`}
          >
            {line.isFeatured ? 'Bỏ nổi bật' : 'Thiết lập nổi bật'}
          </AdminSubmitButton>
        </form>
        <div className="flex items-center gap-2">
          <details className="group">
            <summary className="inline-flex size-9 cursor-pointer list-none items-center justify-center rounded-md border border-sand-300 text-espresso-900 transition hover:bg-sand-100">
              <Pencil className="size-4" />
            </summary>
            <div className="fixed inset-0 z-40 overflow-y-auto bg-black/50 p-4">
              <form
                action={updateAdminProductLine}
                className="mx-auto mt-8 max-w-2xl rounded-lg border border-gold-300 bg-white p-5 shadow-xl"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-espresso-900">
                    Chỉnh sửa dòng sản phẩm
                  </h3>
                  <ProductLineDialogCloseButton
                    title="Đóng"
                    className="inline-flex size-9 items-center justify-center rounded-md border border-sand-300 text-sand-600 transition hover:bg-sand-100 hover:text-espresso-900"
                  >
                    <X className="size-4" />
                  </ProductLineDialogCloseButton>
                </div>
                <div className="mt-5">
                  <ProductLineFields line={line} />
                </div>
                <div className="mt-5 flex justify-end gap-3 border-t border-sand-100 pt-4">
                  <ProductLineDialogCloseButton className="inline-flex items-center justify-center rounded-md border border-sand-300 bg-white px-4 py-2 text-sm font-bold text-sand-700 transition hover:bg-sand-100">
                    Đóng
                  </ProductLineDialogCloseButton>
                  <AdminSubmitButton
                    pendingTitle="Đang lưu dòng sản phẩm"
                    className="rounded-md bg-espresso-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-espresso-800"
                  >
                    Lưu thông tin
                  </AdminSubmitButton>
                </div>
              </form>
            </div>
          </details>
          <form action={deleteAdminProductLine}>
            <input type="hidden" name="lineId" value={line.id} />
            <AdminSubmitButton
              className="inline-flex size-9 items-center justify-center rounded-md border border-red-200 text-red-600 transition hover:bg-red-50"
              pendingTitle="Đang xóa dòng sản phẩm"
              title="Xóa dòng sản phẩm"
            >
              <Trash2 className="size-4" />
            </AdminSubmitButton>
          </form>
        </div>
      </div>
    </div>
  </article>
);

const AdminProductLinesPage = async ({
  searchParams,
}: AdminProductLinesPageProps) => {
  const lines = await getAdminProductLines();
  const toastStatus = statusToast(searchParams);

  return (
    <div className="space-y-8">
      {toastStatus ? (
        <AdminStatusToast
          show
          title={toastStatus.title}
          description={toastStatus.description}
          type={toastStatus.type}
        />
      ) : null}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-lg border border-sand-200 bg-white p-3 text-gold-600 shadow-sm">
            <Layers3 className="size-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase text-gold-600">
              Dòng sản phẩm
            </p>
            <h1 className="mt-1 text-3xl font-bold text-espresso-900">
              Danh mục dòng sản phẩm
            </h1>
            <p className="mt-2 text-sm text-sand-500">
              Phân loại sản phẩm và thiết lập dòng sản phẩm nổi bật ngoài trang
              chủ.
            </p>
          </div>
        </div>
      </div>

      <section className="rounded-lg border border-sand-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <Plus className="size-5 text-gold-600" />
          <h2 className="text-lg font-bold">Tạo dòng sản phẩm mới</h2>
        </div>
        <form action={createAdminProductLine}>
          <ProductLineFields nextSortOrder={lines.length} />
          <div className="mt-5 flex justify-end border-t border-sand-100 pt-4">
            <AdminSubmitButton
              pendingTitle="Đang lưu dòng sản phẩm"
              className="rounded-md bg-espresso-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-espresso-800"
            >
              Lưu thông tin
            </AdminSubmitButton>
          </div>
        </form>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {lines.map((line) => (
          <ProductLineCard key={line.id} line={line} />
        ))}
      </section>

      {lines.length === 0 ? (
        <div className="rounded-lg border border-sand-200 bg-white px-4 py-10 text-center text-sm font-semibold text-sand-500">
          Chưa có dòng sản phẩm nào.
        </div>
      ) : null}
    </div>
  );
};

export default AdminProductLinesPage;
