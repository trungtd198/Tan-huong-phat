/* eslint-disable no-console */

import { AdminRole } from '@prisma/client';

import { hashPassword } from '../src/features/admin/auth/password';
import { db } from '../src/lib/db';

const getEnv = (key: string, fallback?: string) => {
  const value = process.env[key] ?? fallback;

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

const main = async () => {
  const email = getEnv('ADMIN_EMAIL');
  const name = getEnv('ADMIN_NAME', 'Admin');
  const password = getEnv('ADMIN_PASSWORD');
  const roleValue = getEnv('ADMIN_ROLE', AdminRole.ADMIN);
  const role = Object.values(AdminRole).includes(roleValue as AdminRole)
    ? (roleValue as AdminRole)
    : AdminRole.ADMIN;

  await db.adminUser.upsert({
    where: {
      email,
    },
    update: {
      name,
      role,
      passwordHash: hashPassword(password),
      isActive: true,
    },
    create: {
      email,
      name,
      role,
      passwordHash: hashPassword(password),
      isActive: true,
    },
  });

  console.log(`Admin user ready: ${email}`);
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
