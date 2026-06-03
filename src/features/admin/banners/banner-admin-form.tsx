'use client';

import { ImagePlus, Pencil, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { AdminSubmitButton } from '@/features/admin/admin-submit-button';
import { cn } from '@/lib/utils';

type ProductLineOption = {
  id: string;
  name: string;
};

type BannerTarget =
  | 'HOME_HERO'
  | 'PRODUCTS_HERO'
  | 'ABOUT_HERO'
  | 'PRODUCT_LINE';

type EditableBanner = {
  id: string;
  placement: Exclude<BannerTarget, 'PRODUCT_LINE'>;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  isActive: boolean;
};

type BannerAdminFormProps = {
  action: (formData: FormData) => Promise<void>;
  productLines: ProductLineOption[];
  banner?: EditableBanner;
  className?: string;
};

const fieldClassName =
  'w-full rounded-lg border border-sand-200 bg-sand-50/70 px-4 py-2.5 text-sm outline-none transition focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-300/35';

const fileFieldClassName =
  'block w-full rounded-lg border border-sand-200 bg-sand-50/70 p-1 text-xs text-sand-600 file:mr-4 file:rounded-md file:border-0 file:bg-sand-100 file:px-4 file:py-2 file:text-xs file:font-bold file:text-espresso-900 hover:file:bg-gold-300/40';

const bannerTargets = [
  { value: 'HOME_HERO', label: 'Hero trang chủ' },
  { value: 'PRODUCTS_HERO', label: 'Hero trang sản phẩm' },
  { value: 'ABOUT_HERO', label: 'Hero trang giới thiệu' },
  { value: 'PRODUCT_LINE', label: 'Hero dòng sản phẩm' },
] satisfies Array<{ value: BannerTarget; label: string }>;

export const BannerAdminForm = ({
  action,
  productLines,
  banner,
  className,
}: BannerAdminFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [target, setTarget] = useState<BannerTarget>(
    banner?.placement ?? 'HOME_HERO',
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const isProductLineBanner = target === 'PRODUCT_LINE';
  const isEdit = Boolean(banner);
  const availableTargets = useMemo(
    () =>
      isEdit
        ? bannerTargets.filter((item) => item.value !== 'PRODUCT_LINE')
        : bannerTargets,
    [isEdit],
  );

  useEffect(
    () => () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    },
    [previewUrl],
  );

  const closeModal = () => {
    setIsOpen(false);
    setTarget(banner?.placement ?? 'HOME_HERO');
    setPreviewUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }

      return null;
    });
  };

  const imagePreviewUrl = previewUrl ?? banner?.imageUrl;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-bold shadow-sm transition',
          isEdit
            ? 'border border-gold-500/25 bg-white px-3 py-2 text-xs text-espresso-900 hover:border-gold-500 hover:bg-sand-50 hover:text-gold-600'
            : 'bg-espresso-900 px-5 py-2.5 text-sm text-white hover:bg-espresso-800',
          className,
        )}
      >
        {isEdit ? (
          <Pencil className="size-4" />
        ) : (
          <ImagePlus className="size-4" />
        )}
        {isEdit ? 'Sửa' : 'Tạo banner mới'}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso-900/70 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-gold-500/30 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gold-500/15 bg-sand-50 px-6 py-5">
              <div className="flex items-center gap-2 text-espresso-900">
                <Pencil className="size-5 text-gold-600" />
                <h2 className="text-base font-bold uppercase tracking-wide">
                  {isEdit ? 'Cập nhật banner' : 'Tạo banner'}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="flex size-8 items-center justify-center rounded-full bg-white text-sand-500 transition hover:bg-sand-100 hover:text-espresso-900"
                title="Đóng"
              >
                <X className="size-4" />
              </button>
            </div>

            <form action={action} className="space-y-5 p-6">
              {banner ? (
                <input type="hidden" name="bannerId" value={banner.id} />
              ) : null}
              <input type="hidden" name="bannerTarget" value={target} />

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor={`banner-target-${banner?.id ?? 'new'}`}
                    className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-sand-500"
                  >
                    Vị trí / Loại banner *
                  </label>
                  <select
                    id={`banner-target-${banner?.id ?? 'new'}`}
                    value={target}
                    onChange={(event) =>
                      setTarget(event.target.value as BannerTarget)
                    }
                    required
                    className={fieldClassName}
                  >
                    {availableTargets.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {isProductLineBanner ? (
                  <div>
                    <label
                      htmlFor="lineId"
                      className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-sand-500"
                    >
                      Dòng sản phẩm *
                    </label>
                    <select
                      id="lineId"
                      name="lineId"
                      required
                      className={fieldClassName}
                    >
                      <option value="">Chọn dòng sản phẩm</option>
                      {productLines.map((line) => (
                        <option key={line.id} value={line.id}>
                          {line.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor={`banner-title-${banner?.id ?? 'new'}`}
                      className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-sand-500"
                    >
                      Tiêu đề chính / Tên Banner
                    </label>
                    <input
                      id={`banner-title-${banner?.id ?? 'new'}`}
                      name="title"
                      defaultValue={banner?.title ?? ''}
                      placeholder="Nhập tiêu đề hoặc tên Banner..."
                      className={fieldClassName}
                    />
                  </div>
                )}
              </div>

              {!isProductLineBanner ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`banner-subtitle-${banner?.id ?? 'new'}`}
                      className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-sand-500"
                    >
                      Tiêu đề phụ
                    </label>
                    <input
                      id={`banner-subtitle-${banner?.id ?? 'new'}`}
                      name="subtitle"
                      defaultValue={banner?.subtitle ?? ''}
                      placeholder="Ví dụ: Chăm sóc tóc thiên nhiên cao cấp"
                      className={fieldClassName}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`banner-file-${banner?.id ?? 'new'}`}
                      className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-sand-500"
                    >
                      Tải ảnh Banner lên {isEdit ? '' : '*'}
                    </label>
                    <input
                      id={`banner-file-${banner?.id ?? 'new'}`}
                      name="imageFile"
                      type="file"
                      accept="image/*"
                      required={!isEdit}
                      className={fileFieldClassName}
                      onChange={(event) => {
                        const file = event.target.files?.[0];

                        setPreviewUrl((current) => {
                          if (current) {
                            URL.revokeObjectURL(current);
                          }

                          return file ? URL.createObjectURL(file) : null;
                        });
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="product-line-banner-file"
                    className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-sand-500"
                  >
                    Tải ảnh Banner lên *
                  </label>
                  <input
                    id="product-line-banner-file"
                    name="imageFile"
                    type="file"
                    accept="image/*"
                    required
                    className={fileFieldClassName}
                    onChange={(event) => {
                      const file = event.target.files?.[0];

                      setPreviewUrl((current) => {
                        if (current) {
                          URL.revokeObjectURL(current);
                        }

                        return file ? URL.createObjectURL(file) : null;
                      });
                    }}
                  />
                </div>
              )}

              {imagePreviewUrl ? (
                <div className="flex items-center gap-3 rounded-lg border border-gold-500/15 bg-sand-50 p-3">
                  <img
                    src={imagePreviewUrl}
                    alt="Xem trước banner"
                    className="h-14 w-28 rounded-md border border-gold-500/10 object-cover shadow-sm"
                  />
                  <div className="text-xs">
                    <p className="font-bold text-espresso-900">
                      {previewUrl ? 'Ảnh đã chọn' : 'Ảnh hiện tại'}
                    </p>
                    <p className="mt-1 text-sand-500">
                      {previewUrl
                        ? 'Ảnh sẵn sàng tải lên hệ thống.'
                        : 'Chọn ảnh mới nếu muốn thay thế.'}
                    </p>
                  </div>
                </div>
              ) : null}

              {!isProductLineBanner ? (
                <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-espresso-900">
                  <input
                    name="isActive"
                    type="checkbox"
                    defaultChecked={banner?.isActive ?? true}
                    className="size-4 rounded border-sand-300 text-espresso-900 focus:ring-gold-500"
                  />
                  Thiết lập hoạt động ngay lập tức
                </label>
              ) : null}

              <div className="flex justify-end gap-3 border-t border-sand-200 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-sand-200 bg-white px-5 py-2.5 text-sm font-semibold text-sand-600 transition hover:bg-sand-50"
                >
                  Hủy
                </button>
                <AdminSubmitButton
                  pendingTitle={
                    isEdit ? 'Đang cập nhật banner' : 'Đang lưu banner'
                  }
                  className="rounded-lg bg-espresso-900 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-espresso-800"
                >
                  Lưu Banner
                </AdminSubmitButton>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export type { BannerAdminFormProps, EditableBanner };
