import { useEffect, useState } from 'react';

import type { NavItem } from '@/config/navigation';

interface LocationState {
  pathname: string;
  hash: string;
}

const getLocationState = (): LocationState => ({
  pathname: window.location.pathname,
  hash: window.location.hash,
});

const isActiveItem = (item: NavItem, loc: LocationState): boolean => {
  if (item.match === 'prefix') {
    return loc.pathname.startsWith(item.href);
  }
  if (item.match === 'exact') {
    return loc.pathname === item.href;
  }
  return loc.hash === item.href;
};

/**
 * Resolves the currently active nav item based on URL hash / pathname.
 * When `overrideHref` is provided it is used directly, skipping the listener.
 */
const useActiveNavHref = (items: NavItem[], overrideHref?: string): string => {
  const [activeHref, setActiveHref] = useState(overrideHref ?? '');

  useEffect(() => {
    if (overrideHref) {
      setActiveHref(overrideHref);
      return undefined;
    }

    const sync = () => {
      const loc = getLocationState();
      const match = items.find((item) => isActiveItem(item, loc));
      setActiveHref(match?.href ?? '');
    };

    sync();
    window.addEventListener('hashchange', sync);

    return () => {
      window.removeEventListener('hashchange', sync);
    };
  }, [overrideHref, items]);

  return activeHref;
};

export { useActiveNavHref };
