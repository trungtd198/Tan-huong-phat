'use client';

import { useState } from 'react';

type BrandFilterBarProps = {
  groups: { slug: string; name: string }[];
};

const BrandFilterBar = ({ groups }: BrandFilterBarProps) => {
  const [active, setActive] = useState('all');

  const scrollTo = (slug: string) => {
    setActive(slug);
    if (slug === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(`brand-${slug}`);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-20 z-20 border-b border-ivory-200 bg-white py-3 shadow-sm">
      <div className="mx-auto max-w-7xl overflow-x-auto px-4 lg:px-8">
        <div className="flex gap-2 lg:justify-center">
          <button
            type="button"
            onClick={() => scrollTo('all')}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
              active === 'all'
                ? 'bg-charcoal-900 text-white'
                : 'border border-gray-200 text-charcoal-700 hover:border-charcoal-900 hover:text-charcoal-900'
            }`}
          >
            Tất cả
          </button>
          {groups.map((g) => (
            <button
              key={g.slug}
              type="button"
              onClick={() => scrollTo(g.slug)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
                active === g.slug
                  ? 'bg-charcoal-900 text-white'
                  : 'border border-gray-200 text-charcoal-700 hover:border-charcoal-900 hover:text-charcoal-900'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export { BrandFilterBar };
