import { redirect } from 'next/navigation';

import { db } from '@/lib/db';

import { getAdminSession } from './session';

export const getCurrentAdminUser = async () => {
  const session = getAdminSession();

  if (!session) {
    return null;
  }

  return db.adminUser.findFirst({
    where: {
      id: session.userId,
      isActive: true,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
};

export const requireAdminUser = async () => {
  const user = await getCurrentAdminUser();

  if (!user) {
    redirect('/admin/login');
  }

  return user;
};
