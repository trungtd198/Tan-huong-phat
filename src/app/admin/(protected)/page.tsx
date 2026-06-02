import Link from 'next/link';

import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

const AdminDashboardPage = async () => {
  const [productsCount, activeBannersCount] = await Promise.all([
    db.product.count(),
    db.banner.count({
      where: {
        isActive: true,
      },
    }),
  ]);

  return (
    <div>
      <p className="text-sm font-semibold uppercase text-gold-600">Tổng quan</p>
      <h1 className="mt-2 text-3xl font-bold">Quản lý nội dung</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Link
          href="/admin/products"
          className="rounded-lg border border-sand-200 bg-white p-5 shadow-sm transition hover:border-gold-400"
        >
          <p className="text-sm font-semibold text-sand-500">Sản phẩm</p>
          <p className="mt-3 text-3xl font-bold">{productsCount}</p>
        </Link>
        <Link
          href="/admin/banners"
          className="rounded-lg border border-sand-200 bg-white p-5 shadow-sm transition hover:border-gold-400"
        >
          <p className="text-sm font-semibold text-sand-500">
            Banner đang hoạt động
          </p>
          <p className="mt-3 text-3xl font-bold">{activeBannersCount}</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
