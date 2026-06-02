'use client';

import { Images, Layers3, LayoutDashboard, Leaf } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

type AdminShellNavProps = {
  counts: {
    products: number;
    productLines: number;
    banners: number;
  };
};

const navigationItems = [
  {
    href: '/admin',
    label: 'Tổng quan',
    icon: LayoutDashboard,
  },
  {
    href: '/admin/products',
    label: 'Quản lý sản phẩm',
    icon: Leaf,
    countKey: 'products',
  },
  {
    href: '/admin/product-lines',
    label: 'Dòng sản phẩm',
    icon: Layers3,
    countKey: 'productLines',
  },
  {
    href: '/admin/banners',
    label: 'Quản lý Banner',
    icon: Images,
    countKey: 'banners',
  },
] as const;

export const AdminShellNav = ({ counts }: AdminShellNavProps) => {
  const pathname = usePathname() ?? '';

  return (
    <nav className="space-y-2">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === '/admin'
            ? pathname === item.href
            : pathname.startsWith(item.href);
        const count = 'countKey' in item ? counts[item.countKey] : undefined;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold transition',
              isActive
                ? 'bg-gold-500 text-espresso-900 shadow-sm'
                : 'text-white/80 hover:bg-white/10 hover:text-white',
            )}
          >
            <Icon className="size-5" />
            <span>{item.label}</span>
            {typeof count === 'number' ? (
              <span
                className={cn(
                  'ml-auto rounded-full px-2 py-0.5 text-xs font-bold',
                  isActive
                    ? 'bg-espresso-900 text-white'
                    : 'bg-gold-500 text-espresso-900',
                )}
              >
                {count}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
};
