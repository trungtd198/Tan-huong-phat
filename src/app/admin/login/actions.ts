'use server';

import { redirect } from 'next/navigation';

import { verifyPassword } from '@/features/admin/auth/password';
import { createAdminSession } from '@/features/admin/auth/session';
import { db } from '@/lib/db';

const getString = (formData: FormData, key: string) =>
  String(formData.get(key) ?? '').trim();

export const loginAdmin = async (formData: FormData) => {
  const email = getString(formData, 'email').toLowerCase();
  const password = getString(formData, 'password');

  if (!email || !password) {
    redirect('/admin/login?error=missing');
  }

  const adminUser = await db.adminUser.findFirst({
    where: {
      email,
      isActive: true,
    },
  });

  if (!adminUser || !verifyPassword(password, adminUser.passwordHash)) {
    redirect('/admin/login?error=invalid');
  }

  await db.adminUser.update({
    where: {
      id: adminUser.id,
    },
    data: {
      lastLoginAt: new Date(),
    },
  });

  createAdminSession({
    userId: adminUser.id,
    email: adminUser.email,
    role: adminUser.role,
  });

  redirect('/admin');
};
