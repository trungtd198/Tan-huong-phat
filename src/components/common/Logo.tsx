import Image from 'next/image';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

type LogoProps = {
  variant?: 'light' | 'dark';
  showTagline?: boolean;
  className?: string;
};

const Logo = ({
  variant = 'light',
  showTagline = true,
  className,
}: LogoProps) => (
  <div className={cn('flex items-center gap-3', className)}>
    <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl">
      <Image
        src="/images/logo/logo-1.png"
        alt={siteConfig.name}
        width={96}
        height={96}
        priority
        className={cn(
          'size-12 scale-[2.35] object-contain',
          variant === 'dark' && 'brightness-0 invert',
        )}
      />
    </span>
    <span className="min-w-0">
      <span
        className={cn(
          'block font-display text-lg font-semibold leading-none',
          variant === 'dark' ? 'text-sand-50' : 'text-sand-900',
        )}
      >
        {siteConfig.name}
      </span>
      {showTagline && (
        <span
          className={cn(
            'mt-1 block text-xs leading-none',
            variant === 'dark' ? 'text-sand-300' : 'text-sand-600',
          )}
        >
          {siteConfig.tagline}
        </span>
      )}
    </span>
  </div>
);

export { Logo };
export type { LogoProps };
