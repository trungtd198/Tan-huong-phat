'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { Logo } from '@/components/common';
import { Button, Container } from '@/components/ui';
import type { NavAction, NavItem } from '@/config/navigation';
import { navItems } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { useActiveNavHref } from '@/hooks/useActiveNavHref';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/utils';

import { MobileMenu } from './MobileMenu';

export interface NavbarProps {
  items?: NavItem[];
  cta?: NavAction;
  position?: 'static' | 'sticky' | 'fixed';
  transparent?: boolean;
  enableScrollTransition?: boolean;
  activeHref?: string;
  className?: string;
}

const positionStyles = {
  static: 'relative',
  sticky: 'sticky top-0',
  fixed: 'fixed inset-x-0 top-0',
};

const defaultCta: NavAction = {
  label: 'Liên hệ ngay',
  href: '/contact',
};

const Navbar = ({
  items = navItems,
  cta = defaultCta,
  position = 'static',
  transparent = false,
  enableScrollTransition = false,
  activeHref,
  className,
}: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const resolvedActiveHref = useActiveNavHref(items, activeHref);
  const hasScrolled = useScrolled(16, enableScrollTransition);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) {
      return undefined;
    }

    const closeOnResize = () => {
      if (window.innerWidth >= 768) {
        closeMobile();
      }
    };

    window.addEventListener('resize', closeOnResize);

    return () => {
      window.removeEventListener('resize', closeOnResize);
    };
  }, [mobileOpen, closeMobile]);

  const isSolid = !transparent || (enableScrollTransition && hasScrolled);
  // Hero background is now light mint — always use dark text; only invert when
  // the navbar sits over a genuinely dark/image section.
  const theme = isSolid ? 'light' : 'light';
  const linkStyles = isSolid
    ? {
        // Scrolled/solid navbar over cream bg
        base: 'font-semibold text-[#1F3E35] hover:text-[#152a24]',
        active: 'font-semibold text-[#152a24]',
      }
    : {
        // Transparent over light mint hero — equally dark & bold
        base: 'font-semibold text-[#1F3E35] hover:text-[#152a24]',
        active: 'font-semibold text-[#152a24]',
      };

  return (
    <nav
      className={cn(
        'z-30 w-full transition-colors duration-300',
        positionStyles[position],
        isSolid
          ? 'border-b border-sand-200 bg-sand-50/90 shadow-sm backdrop-blur-xl'
          : 'bg-transparent',
        className,
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label={siteConfig.name}>
          {/* Always use the light (dark-ink) logo — hero bg is cream/mint */}
          <Logo variant="light" />
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          {items.map((item) => {
            const isActive = resolvedActiveHref === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm transition-colors duration-300',
                  linkStyles.base,
                  isActive && cn(linkStyles.active, 'bg-brand-50'),
                )}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className={cn(
              'hidden text-sm font-medium transition-colors duration-300 lg:inline-flex',
              isSolid
                ? 'text-sand-600 hover:text-sand-900'
                : 'font-semibold text-brand-800 hover:text-brand-600',
            )}
          >
            {siteConfig.phone}
          </a>
          <Button
            href={cta.href}
            variant="gold"
            size="sm"
            className="hidden sm:inline-flex"
          >
            {cta.label}
          </Button>

          <button
            type="button"
            onClick={() => setMobileOpen((currentState) => !currentState)}
            className={cn(
              'flex size-11 flex-col items-center justify-center gap-1 rounded-lg transition-colors duration-300 md:hidden',
              isSolid
                ? 'text-sand-900 hover:bg-white'
                : 'text-brand-900 hover:bg-brand-100',
            )}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
          >
            <span
              className={cn(
                'block h-px w-5 bg-current transition-transform duration-300',
                mobileOpen && 'translate-y-[5px] rotate-45',
              )}
            />
            <span
              className={cn(
                'block h-px w-5 bg-current transition-opacity duration-300',
                mobileOpen && 'opacity-0',
              )}
            />
            <span
              className={cn(
                'block h-px w-5 bg-current transition-transform duration-300',
                mobileOpen && '-translate-y-[5px] -rotate-45',
              )}
            />
          </button>
        </div>
      </Container>

      <MobileMenu
        items={items}
        isOpen={mobileOpen}
        activeHref={resolvedActiveHref}
        cta={cta}
        theme={theme}
        onClose={closeMobile}
      />
    </nav>
  );
};

export { Navbar };
