import { useEffect, useState } from 'react';

/**
 * Returns `true` once the page has been scrolled past the given threshold.
 * The listener is only attached when `enabled` is `true`.
 */
const useScrolled = (threshold = 16, enabled = true): boolean => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, enabled]);

  return scrolled;
};

export { useScrolled };
