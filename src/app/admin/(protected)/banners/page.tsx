import { BannerPlacement } from '@prisma/client';
import { ImagePlus, Layers3, Trash2 } from 'lucide-react';

import { AdminStatusToast } from '@/features/admin/admin-status-toast';
import { AdminSubmitButton } from '@/features/admin/admin-submit-button';
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

const statusToast = (searchParams?: AdminBannersPageProps['searchParams']) => {
  if (searchParams?.saved) {
    return {
      title: 'Đã lưu banner',
      description: 'Banner đã được cập nhật.',
    };
  }

  if (searchParams?.deleted) {
    return {
      title: 'Đã xóa banner',
      description: 'Banner đã được xóa khỏi hệ thống.',
    };
  }

  if (searchParams?.lineBanner) {
    return {
      title: 'Đã lưu banner dòng sản phẩm',
      description: 'Ảnh banner dòng sản phẩm đã được cập nhật.',
    };
  }

  return null;
};

const AdminBannersPage = async ({ searchParams }: AdminBannersPageProps) => {
  const placement = getBannerPlacementFromSearch(searchParams?.placement);
  const [banners, productLines] = await Promise.all([
    getAdminBanners(placement),
    getAdminProductLineBanners(),
  ]);
  const toastStatus = statusToast(searchParams);

  return (
    <div className="space-y-8">
      {toastStatus ? (
        <AdminStatusToast
          show
          title={toastStatus.title}
          description={toastStatus.description}
        />
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex size-12 items-center justify-center rounded-lg border border-gold-500/15 bg-white text-gold-600 shadow-sm">
            <ImagePlus className="size-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-espresso-900">
              Quản lý không gian Banner
            </h1>
            <p className="mt-1 text-xs font-medium text-sand-500">
              Cấu hình các slide banner quảng bá sản phẩm ở trang chủ và các
              trang con
            </p>
          </div>
        </div>
        <BannerAdminForm action={saveAdminBanner} productLines={productLines} />
      </div>

      <section className="space-y-4 rounded-lg border border-gold-500/10 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 border-b border-sand-200 pb-3">
          <Layers3 className="size-4 text-gold-600" />
          <h2 className="text-sm font-bold uppercase tracking-wide text-espresso-900">
            Banner dòng sản phẩm hiện tại
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-xs">
            <thead className="border-b border-gold-500/10 bg-sand-50 text-xs font-bold uppercase text-espresso-900">
              <tr>
                <th className="p-3">Ảnh</th>
                <th className="p-3">Dòng sản phẩm</th>
                <th className="p-3">Mô tả</th>
                <th className="p-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100 bg-white">
              {productLines.map((line) => (
                <tr key={line.id} className="align-top">
                  <td className="p-3">
                    {line.imageUrl ? (
                      <img
                        src={line.imageUrl}
                        alt={line.name}
                        className="h-10 w-16 rounded-md border border-gold-500/10 bg-sand-100 object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-16 items-center justify-center rounded-md border border-sand-200 bg-sand-100 text-[10px] text-sand-500">
                        Chưa có banner
                      </div>
                    )}
                  </td>
                  <td className="p-3 font-bold text-espresso-900">
                    {line.name}
                  </td>
                  <td className="max-w-xl p-3 text-sand-600">
                    {line.description || 'Chưa có mô tả.'}
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-flex rounded-md border px-2 py-1 text-[10px] font-bold ${
                        line.imageUrl
                          ? 'border-green-100 bg-green-50 text-green-700'
                          : 'border-sand-200 bg-sand-100 text-sand-500'
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

      <div className="space-y-4">
        <form className="flex max-w-md items-center gap-2 rounded-lg border border-gold-500/10 bg-white p-4 shadow-sm">
          <select
            name="placement"
            defaultValue={searchParams?.placement ?? ''}
            className={`${fieldClassName} h-10 flex-1 text-xs`}
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
            className="h-10 rounded-lg border border-sand-300 bg-white px-5 text-xs font-bold text-espresso-900 shadow-sm transition hover:border-gold-500 hover:text-gold-600"
          >
            Lọc
          </button>
        </form>

        <section className="overflow-hidden rounded-lg border border-gold-500/10 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-xs">
              <thead className="border-b border-gold-500/10 bg-sand-50 font-bold uppercase text-espresso-900">
                <tr>
                  <th className="p-4 pl-6">Ảnh</th>
                  <th className="p-4">Vị trí</th>
                  <th className="p-4">Tiêu đề</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 pr-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-100">
                {banners.map((banner) => (
                  <tr key={banner.id} className="align-top">
                    <td className="p-4 pl-6">
                      <img
                        src={banner.imageUrl}
                        alt={banner.title}
                        className="h-10 w-20 rounded-lg border border-gold-500/10 bg-sand-100 object-cover shadow-sm"
                      />
                    </td>
                    <td className="p-4 font-semibold text-sand-600">
                      {placementLabels[banner.placement]}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-espresso-900">
                        {banner.title}
                      </p>
                      {banner.subtitle ? (
                        <p className="mt-1 text-[10px] font-medium text-sand-500">
                          {banner.subtitle}
                        </p>
                      ) : null}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${
                          banner.isActive ? 'text-green-700' : 'text-amber-700'
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            banner.isActive ? 'bg-green-500' : 'bg-amber-500'
                          }`}
                        />
                        {banner.isActive ? 'Hoạt động' : 'Tạm ẩn'}
                      </span>
                    </td>
                    <td className="p-4 pr-6">
                      <div className="flex justify-end gap-2">
                        <BannerAdminForm
                          action={saveAdminBanner}
                          productLines={productLines}
                          banner={{
                            id: banner.id,
                            placement: banner.placement,
                            title: banner.title,
                            subtitle: banner.subtitle,
                            imageUrl: banner.imageUrl,
                            isActive: banner.isActive,
                          }}
                        />
                        <form action={deleteAdminBanner}>
                          <input
                            type="hidden"
                            name="bannerId"
                            value={banner.id}
                          />
                          <AdminSubmitButton
                            pendingTitle="Đang xóa banner"
                            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600 transition hover:border-red-400 hover:bg-red-50"
                          >
                            <Trash2 className="size-4" />
                            Xóa
                          </AdminSubmitButton>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {banners.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-sand-500">
              Không tìm thấy banner hoạt động cho phân mục này.
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
};

export default AdminBannersPage;
