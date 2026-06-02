import { createAdminProduct } from '@/features/admin/products/product-admin.actions';
import { getAdminProductLines } from '@/features/admin/products/product-admin.queries';
import { ProductAdminForm } from '@/features/admin/products/product-admin-form';

export const dynamic = 'force-dynamic';

const NewAdminProductPage = async () => {
  const lines = await getAdminProductLines();

  return (
    <div>
      <p className="text-sm font-semibold uppercase text-gold-600">Sản phẩm</p>
      <h1 className="mt-2 text-3xl font-bold">Tạo sản phẩm</h1>
      <div className="mt-6">
        <ProductAdminForm action={createAdminProduct} lines={lines} />
      </div>
    </div>
  );
};

export default NewAdminProductPage;
