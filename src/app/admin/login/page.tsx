import { redirect } from 'next/navigation';

import { getCurrentAdminUser } from '@/features/admin/auth/guards';

import { loginAdmin } from './actions';

export const dynamic = 'force-dynamic';

type AdminLoginPageProps = {
  searchParams?: {
    error?: string;
  };
};

const AdminLoginPage = async ({ searchParams }: AdminLoginPageProps) => {
  const adminUser = await getCurrentAdminUser();

  if (adminUser) {
    redirect('/admin');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-sand-100 px-4 py-12 text-sand-900">
      <form
        action={loginAdmin}
        className="w-full max-w-md rounded-lg border border-sand-200 bg-white p-6 shadow-lg"
      >
        <p className="text-sm font-semibold uppercase text-gold-600">
          Quản trị Tân Hương Phát
        </p>
        <h1 className="mt-2 text-2xl font-bold">Đăng nhập</h1>
        {searchParams?.error ? (
          <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
            Thông tin đăng nhập không hợp lệ.
          </p>
        ) : null}
        <label className="mt-6 block">
          <span className="text-sm font-semibold">Email</span>
          <input
            name="email"
            type="email"
            required
            className="mt-2 h-11 w-full rounded-md border border-sand-300 px-3 text-sm outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40"
          />
        </label>
        <label className="mt-4 block">
          <span className="text-sm font-semibold">Mật khẩu</span>
          <input
            name="password"
            type="password"
            required
            className="mt-2 h-11 w-full rounded-md border border-sand-300 px-3 text-sm outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40"
          />
        </label>
        <button
          type="submit"
          className="mt-6 h-11 w-full rounded-md bg-espresso-900 px-4 text-sm font-bold text-white transition hover:bg-espresso-800"
        >
          Đăng nhập
        </button>
      </form>
    </main>
  );
};

export default AdminLoginPage;
