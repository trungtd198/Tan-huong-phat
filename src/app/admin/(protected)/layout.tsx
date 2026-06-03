import Link from 'next/link';
import type { ReactNode } from 'react';

import { AdminShellNav } from '@/features/admin/admin-shell-nav';
import { AdminToaster } from '@/features/admin/admin-toaster';
import { requireAdminUser } from '@/features/admin/auth/guards';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

type AdminProtectedLayoutProps = {
  children: ReactNode;
};

const AdminProtectedLayout = async ({
  children,
}: AdminProtectedLayoutProps) => {
  const [adminUser, productsCount, productLinesCount, bannersCount] =
    await Promise.all([
      requireAdminUser(),
      db.product.count(),
      db.productLine.count(),
      db.banner.count(),
    ]);
  const currentDate = new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="flex h-screen overflow-hidden bg-sand-100 text-sand-900">
      <AdminToaster />
      {/* ── Sidebar ── fixed height, scrollable internally if needed */}
      <aside className="flex w-72 shrink-0 flex-col justify-between overflow-y-auto bg-espresso-900 p-6 text-white">
        <div>
          <Link
            href="/admin"
            className="mb-8 flex items-center gap-3 border-b border-white/10 pb-8"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-gold-500 text-sm font-black text-espresso-900 shadow-sm">
              THP
            </span>
            <span>
              <span className="block text-sm font-bold uppercase tracking-wider text-sand-100">
                Tân Hương Phát
              </span>
              <span className="mt-1 block text-xs text-white/55">
                Hệ thống quản lý
              </span>
            </span>
          </Link>
          <AdminShellNav
            counts={{
              products: productsCount,
              productLines: productLinesCount,
              banners: bannersCount,
            }}
          />
        </div>
        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-white/10 text-gold-500">
              {adminUser.name.slice(0, 1).toUpperCase()}
            </span>
            <span>
              <span className="block text-sm font-semibold">
                {adminUser.name}
              </span>
              <span className="block text-xs text-white/50">
                {adminUser.role} - THP Group
              </span>
            </span>
          </div>
          <Link
            href="/admin/logout"
            className="flex w-full items-center justify-center rounded-lg border border-red-900/40 bg-red-950/40 px-4 py-2.5 text-sm font-semibold text-red-200 transition hover:bg-red-900/60"
          >
            Đăng xuất hệ thống
          </Link>
        </div>
      </aside>

      {/* ── Content column ── scrolls independently */}
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <header className="sticky top-0 z-10 border-b border-gold-500/20 bg-sand-100/95 px-4 py-6 backdrop-blur-sm sm:px-6 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold-600">
                Trang quản trị
              </p>
              <h1 className="mt-1 text-2xl font-bold text-espresso-900">
                Quản lý nội dung
              </h1>
            </div>
            <p className="text-xs font-medium text-sand-500">
              Cập nhật lúc: {currentDate}
            </p>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminProtectedLayout;
