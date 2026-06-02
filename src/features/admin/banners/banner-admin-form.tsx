'use client';

import { useState } from 'react';

type ProductLineOption = {
  id: string;
  name: string;
};

type BannerAdminFormProps = {
  action: (formData: FormData) => Promise<void>;
  productLines: ProductLineOption[];
};

const fieldClassName =
  'rounded-md border border-sand-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40';

const bannerTargets = [
  { value: 'HOME_HERO', label: 'Hero trang chủ' },
  { value: 'PRODUCTS_HERO', label: 'Hero trang sản phẩm' },
  { value: 'ABOUT_HERO', label: 'Hero trang giới thiệu' },
  { value: 'PRODUCT_LINE', label: 'Hero dòng sản phẩm' },
];

export const BannerAdminForm = ({
  action,
  productLines,
}: BannerAdminFormProps) => {
  const [target, setTarget] = useState('');
  const isProductLineBanner = target === 'PRODUCT_LINE';

  return (
    <form action={action} className="grid gap-3 lg:grid-cols-2">
      <select
        name="bannerTarget"
        value={target}
        onChange={(event) => setTarget(event.target.value)}
        required
        className={fieldClassName}
      >
        <option value="">Chọn loại banner</option>
        {bannerTargets.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {isProductLineBanner ? (
        <select name="lineId" required className={fieldClassName}>
          <option value="">Chọn dòng sản phẩm</option>
          {productLines.map((line) => (
            <option key={line.id} value={line.id}>
              {line.name}
            </option>
          ))}
        </select>
      ) : null}

      {!isProductLineBanner ? (
        <>
          <input
            name="title"
            placeholder="Tiêu đề"
            required
            className={fieldClassName}
          />
          <input
            name="subtitle"
            placeholder="Tiêu đề phụ"
            className={fieldClassName}
          />
        </>
      ) : null}

      <input
        name="imageFile"
        type="file"
        accept="image/*"
        required
        className={fieldClassName}
      />

      {!isProductLineBanner ? (
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input name="isActive" type="checkbox" defaultChecked />
          Hoạt động
        </label>
      ) : null}

      <button
        type="submit"
        className="rounded-md bg-espresso-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-espresso-800 lg:col-span-2"
      >
        Lưu banner
      </button>
    </form>
  );
};

export type { BannerAdminFormProps };
