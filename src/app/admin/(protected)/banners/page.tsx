import { BannerPlacement } from '@prisma/client';
import { ImagePlus, Trash2 } from 'lucide-react';

import {
  deleteAdminBanner,
  saveAdminBanner,
} from '@/features/admin/banners/banner-admin.actions';
import {
  getAdminBanners,
  getAdminProductLineBanners,
  getBannerPlacementFromSearch,
} from '@/features/admin/banners/banner-admin.queries';
import { BannerAdminForm } from '@/features/admin/banners/banner-admin-form';

export const dynamic = 'force-dynamic';

type AdminBannersPageProps = {
  searchParams?: {
    placement?: string;
    saved?: string;
    deleted?: string;
    lineBanner?: string;
  };
};

const fieldClassName =
  'rounded-md border border-sand-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40';

const placementLabels = {
  HOME_HERO: 'Hero trang chủ',
  PRODUCTS_HERO: 'Hero trang sản phẩm',
  ABOUT_HERO: 'Hero trang giới thiệu',
} satisfies Record<BannerPlacement, string>;

const AdminBannersPage = async ({ searchParams }: AdminBannersPageProps) => {
  const placement = getBannerPlacementFromSearch(searchParams?.placement);
  const [banners, productLines] = await Promise.all([
    getAdminBanners(placement),
    getAdminProductLineBanners(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase text-gold-600">Banner</p>
        <h1 className="mt-2 text-3xl font-bold">Quản lý banner</h1>
        {searchParams?.saved ? (
          <p className="mt-3 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
            Đã lưu banner.
          </p>
        ) : null}
        {searchParams?.deleted ? (
          <p className="mt-3 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
            Đã xóa banner.
          </p>
        ) : null}
        {searchParams?.lineBanner ? (
          <p className="mt-3 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
            Đã lưu banner dòng sản phẩm.
          </p>
        ) : null}
      </div>

      <section className="rounded-lg border border-sand-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <ImagePlus className="size-5 text-gold-600" />
          <h2 className="text-lg font-bold">Tạo hoặc cập nhật banner</h2>
        </div>
        <BannerAdminForm action={saveAdminBanner} productLines={productLines} />
      </section>

      <section className="rounded-lg border border-sand-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">Banner dòng sản phẩm hiện tại</h2>
        <div className="mt-5 overflow-hidden rounded-lg border border-sand-200">
          <table className="min-w-full divide-y divide-sand-200 text-sm">
            <thead className="bg-sand-100 text-left text-xs font-bold uppercase text-sand-500">
              <tr>
                <th className="px-4 py-3">Ảnh</th>
                <th className="px-4 py-3">Dòng sản phẩm</th>
                <th className="px-4 py-3">Mô tả</th>
                <th className="px-4 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200 bg-white">
              {productLines.map((line) => (
                <tr key={line.id} className="align-top">
                  <td className="p-4">
                    {line.imageUrl ? (
                      <img
                        src={line.imageUrl}
                        alt={line.name}
                        className="h-20 w-32 rounded-md bg-sand-100 object-cover"
                      />
                    ) : (
                      <div className="flex h-20 w-32 items-center justify-center rounded-md bg-sand-100 text-xs text-sand-500">
                        Chưa có banner
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-bold text-sand-900">{line.name}</td>
                  <td className="max-w-xl p-4 text-sand-600">
                    {line.description}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex rounded-md px-2 py-1 text-xs font-bold ${
                        line.imageUrl
                          ? 'bg-green-50 text-green-700'
                          : 'bg-sand-100 text-sand-600'
                      }`}
                    >
                      {line.imageUrl ? 'Đã có banner' : 'Chưa có banner'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <form className="flex flex-col gap-3 rounded-lg border border-sand-200 bg-white p-4 shadow-sm sm:flex-row">
        <select
          name="placement"
          defaultValue={searchParams?.placement ?? ''}
          className={`${fieldClassName} h-11`}
        >
          <option value="">Tất cả vị trí</option>
          {Object.values(BannerPlacement).map((item) => (
            <option key={item} value={item}>
              {placementLabels[item]}
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

      <section className="overflow-hidden rounded-lg border border-sand-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-sand-200 text-sm">
          <thead className="bg-sand-100 text-left text-xs font-bold uppercase text-sand-500">
            <tr>
              <th className="px-4 py-3">Ảnh</th>
              <th className="px-4 py-3">Vị trí</th>
              <th className="px-4 py-3">Tiêu đề</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-200">
            {banners.map((banner) => (
              <tr key={banner.id} className="align-top">
                <td className="p-4">
                  <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="h-20 w-32 rounded-md bg-sand-100 object-cover"
                  />
                </td>
                <td className="p-4 font-semibold text-sand-700">
                  {placementLabels[banner.placement]}
                </td>
                <td className="p-4">
                  <p className="font-bold text-sand-900">{banner.title}</p>
                  {banner.subtitle ? (
                    <p className="mt-1 text-sand-500">{banner.subtitle}</p>
                  ) : null}
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex rounded-md px-2 py-1 text-xs font-bold ${
                      banner.isActive
                        ? 'bg-green-50 text-green-700'
                        : 'bg-sand-100 text-sand-600'
                    }`}
                  >
                    {banner.isActive ? 'Hoạt động' : 'Tắt'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <form action={deleteAdminBanner}>
                      <input type="hidden" name="bannerId" value={banner.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50"
                      >
                        <Trash2 className="size-4" />
                        Xóa
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {banners.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-sand-500">
            Không có banner phù hợp.
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default AdminBannersPage;
