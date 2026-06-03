import { ProductStatus } from '@prisma/client';
import { Archive, ExternalLink, Eye, Pencil, Plus, Search } from 'lucide-react';
import Link from 'next/link';

import {
  importLegacyProductData,
  updateAdminProductStatus,
} from '@/features/admin/products/product-admin.actions';
import {
  getAdminProductLines,
  getAdminProducts,
  getProductStatusFromSearch,
} from '@/features/admin/products/product-admin.queries';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

type AdminProductsPageProps = {
  searchParams?: {
    q?: string;
    status?: string;
    lineId?: string;
    imported?: string;
  };
};

const statusClassNames = {
  IN_STOCK: 'bg-green-50 text-green-700',
  OUT_OF_STOCK: 'bg-red-50 text-red-700',
  COMING_SOON: 'bg-amber-50 text-amber-700',
} satisfies Record<ProductStatus, string>;

const statusLabels = {
  IN_STOCK: 'Còn hàng',
  OUT_OF_STOCK: 'Hết hàng',
  COMING_SOON: 'Sắp ra mắt',
} satisfies Record<ProductStatus, string>;

const statusDotClassNames = {
  IN_STOCK: 'bg-green-500',
  OUT_OF_STOCK: 'bg-red-500',
  COMING_SOON: 'bg-amber-500',
} satisfies Record<ProductStatus, string>;

const getProductCoverImage = (
  images: Array<{ publicUrl: string; isCover: boolean }>,
) => images.find((image) => image.isCover)?.publicUrl ?? images[0]?.publicUrl;

const AdminProductsPage = async ({ searchParams }: AdminProductsPageProps) => {
  const filters = {
    q: searchParams?.q?.trim() || undefined,
    status: getProductStatusFromSearch(searchParams?.status),
    lineId: searchParams?.lineId || undefined,
  };
  const [
    products,
    lines,
    totalProducts,
    inStockProducts,
    outOfStockProducts,
    comingSoonProducts,
  ] = await Promise.all([
    getAdminProducts(filters),
    getAdminProductLines(),
    db.product.count(),
    db.product.count({
      where: {
        status: ProductStatus.IN_STOCK,
      },
    }),
    db.product.count({
      where: {
        status: ProductStatus.OUT_OF_STOCK,
      },
    }),
    db.product.count({
      where: {
        status: ProductStatus.COMING_SOON,
      },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-gold-600">
            Sản phẩm
          </p>
          <h1 className="mt-2 text-3xl font-bold">Quản lý sản phẩm</h1>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <form action={importLegacyProductData}>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md border border-sand-300 bg-white px-4 py-2.5 text-sm font-bold transition hover:bg-sand-100 sm:w-auto"
            >
              Nhập data cũ
            </button>
          </form>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-espresso-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-espresso-800"
          >
            <Plus className="size-4" />
            Tạo sản phẩm
          </Link>
        </div>
      </div>

      {searchParams?.imported ? (
        <p className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
          Đã nhập data cũ vào DB.
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border border-sand-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-sand-500">
            Tổng sản phẩm
          </p>
          <p className="mt-2 text-3xl font-bold text-espresso-900">
            {totalProducts}
          </p>
        </div>
        <div className="rounded-lg border border-green-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-green-700">
            Còn hàng
          </p>
          <p className="mt-2 text-3xl font-bold text-green-700">
            {inStockProducts}
          </p>
        </div>
        <div className="rounded-lg border border-red-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-red-700">
            Hết hàng
          </p>
          <p className="mt-2 text-3xl font-bold text-red-700">
            {outOfStockProducts}
          </p>
        </div>
        <div className="rounded-lg border border-amber-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Sắp ra mắt
          </p>
          <p className="mt-2 text-3xl font-bold text-amber-700">
            {comingSoonProducts}
          </p>
        </div>
      </div>

      <form className="grid gap-3 rounded-lg border border-sand-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_220px_220px_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sand-500" />
          <input
            name="q"
            defaultValue={searchParams?.q ?? ''}
            placeholder="Tìm theo tên, slug, tóm tắt"
            className="h-11 w-full rounded-md border border-sand-300 pl-9 pr-3 text-sm outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40"
          />
        </label>
        <select
          name="status"
          defaultValue={searchParams?.status ?? ''}
          className="h-11 rounded-md border border-sand-300 px-3 text-sm outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40"
        >
          <option value="">Tất cả trạng thái</option>
          {Object.values(ProductStatus).map((status) => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>
        <select
          name="lineId"
          defaultValue={searchParams?.lineId ?? ''}
          className="h-11 rounded-md border border-sand-300 px-3 text-sm outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40"
        >
          <option value="">Tất cả dòng sản phẩm</option>
          {lines.map((line) => (
            <option key={line.id} value={line.id}>
              {line.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="h-11 rounded-md border border-sand-300 bg-white px-4 text-sm font-semibold transition hover:bg-sand-100"
        >
          Lọc
        </button>
      </form>

      <div className="overflow-hidden rounded-lg border border-sand-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-sand-200 text-sm">
            <thead className="bg-sand-100 text-left text-xs font-bold uppercase text-sand-500">
              <tr>
                <th className="px-4 py-3">Sản phẩm</th>
                <th className="px-4 py-3">Dòng</th>
                <th className="px-4 py-3">Kích cỡ</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200">
              {products.map((product) => (
                <tr key={product.id} className="align-top">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {getProductCoverImage(product.images) ? (
                        <img
                          src={getProductCoverImage(product.images)}
                          alt={product.name}
                          className="size-12 shrink-0 rounded-md border border-sand-200 bg-sand-100 object-cover"
                        />
                      ) : (
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-md border border-sand-200 bg-espresso-900 text-xs font-bold text-sand-100">
                          THP
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-sand-900">
                          {product.name}
                        </p>
                        <p className="mt-1 text-xs text-sand-500">
                          /products/{product.line.slug}/{product.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sand-700">
                    {product.line.name}
                    {product.line.isFeatured ? (
                      <span className="ml-2 inline-flex rounded-md border border-gold-500/20 bg-sand-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-gold-600">
                        Dòng nổi bật
                      </span>
                    ) : null}
                  </td>
                  <td className="p-4 font-semibold text-espresso-900">
                    {product.size ?? 'Mặc định'}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${statusClassNames[product.status]}`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${statusDotClassNames[product.status]}`}
                      />
                      {statusLabels[product.status]}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}?mode=view`}
                        className="inline-flex size-9 items-center justify-center rounded-md border border-sand-300 text-sand-700 transition hover:bg-sand-100"
                        title="Xem chi tiết"
                      >
                        <Eye className="size-4" />
                      </Link>
                      <Link
                        href={`/products/${product.line.slug}/${product.slug}`}
                        className="inline-flex size-9 items-center justify-center rounded-md border border-sand-300 text-sand-700 transition hover:bg-sand-100"
                        title="Xem trang công khai"
                      >
                        <ExternalLink className="size-4" />
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="inline-flex size-9 items-center justify-center rounded-md border border-sand-300 text-sand-700 transition hover:bg-sand-100"
                        title="Chỉnh sửa"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      {product.status !== ProductStatus.OUT_OF_STOCK ? (
                        <form action={updateAdminProductStatus}>
                          <input
                            type="hidden"
                            name="productId"
                            value={product.id}
                          />
                          <input
                            type="hidden"
                            name="status"
                            value={ProductStatus.OUT_OF_STOCK}
                          />
                          <button
                            type="submit"
                            className="inline-flex size-9 items-center justify-center rounded-md border border-sand-300 text-sand-700 transition hover:bg-sand-100"
                            title="Đánh dấu hết hàng"
                          >
                            <Archive className="size-4" />
                          </button>
                        </form>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-sand-500">
            Không tìm thấy sản phẩm.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminProductsPage;
