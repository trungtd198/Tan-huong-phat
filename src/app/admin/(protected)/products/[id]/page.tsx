import { notFound } from 'next/navigation';

import { updateAdminProduct } from '@/features/admin/products/product-admin.actions';
import {
  getAdminProductById,
  getAdminProductLines,
} from '@/features/admin/products/product-admin.queries';
import { ProductAdminForm } from '@/features/admin/products/product-admin-form';

export const dynamic = 'force-dynamic';

type EditAdminProductPageProps = {
  params: {
    id: string;
  };
  searchParams?: {
    mode?: string;
    saved?: string;
  };
};

const EditAdminProductPage = async ({
  params,
  searchParams,
}: EditAdminProductPageProps) => {
  const [product, lines] = await Promise.all([
    getAdminProductById(params.id),
    getAdminProductLines(),
  ]);

  if (!product) {
    notFound();
  }

  const readOnly = searchParams?.mode === 'view';

  return (
    <div>
      <p className="text-sm font-semibold uppercase text-gold-600">Sản phẩm</p>
      <h1 className="mt-2 text-3xl font-bold">
        {readOnly ? 'Xem thông tin sản phẩm' : 'Chỉnh sửa sản phẩm'}
      </h1>
      <div className="mt-6">
        <ProductAdminForm
          action={updateAdminProduct}
          lines={lines}
          product={product}
          readOnly={readOnly}
          saved={searchParams?.saved === '1'}
        />
      </div>
    </div>
  );
};

export default EditAdminProductPage;
