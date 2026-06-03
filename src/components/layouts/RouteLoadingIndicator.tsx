'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { PageLoadingSpinner } from '@/components/layouts/PageLoadingSpinner';

const shouldShowLoadingForAnchor = (anchor: HTMLAnchorElement) => {
  const href = anchor.getAttribute('href');

  if (
    !href ||
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    anchor.target === '_blank' ||
    anchor.hasAttribute('download')
  ) {
    return false;
  }

  const nextUrl = new URL(href, window.location.href);
  const currentUrl = new URL(window.location.href);

  if (nextUrl.origin !== currentUrl.origin) {
    return false;
  }

  if (
    nextUrl.pathname === currentUrl.pathname &&
    nextUrl.search === currentUrl.search
  ) {
    return false;
  }

  return true;
};

const RouteLoadingIndicator = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const routeKey = `${pathname}?${searchParams?.toString() ?? ''}`;

  useEffect(() => {
    setIsLoading(false);

    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  }, [routeKey]);

  useEffect(() => {
    const showLoading = () => {
      setIsLoading(true);

      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }

      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        loadingTimeoutRef.current = null;
      }, 12000);
    };

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const { target } = event;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest('a');

      if (!anchor || !shouldShowLoadingForAnchor(anchor)) {
        return;
      }

      showLoading();
    };

    const handlePopState = () => {
      showLoading();
    };

    document.addEventListener('click', handleClick, true);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('popstate', handlePopState);

      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <PageLoadingSpinner className="fixed inset-0 z-[9998] bg-sand-50/80 backdrop-blur-sm" />
  );
};

export default RouteLoadingIndicator;
