import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/ui';
import { cn } from '@/lib/utils';

type PageHeroProps = {
  title: string;
  subtitle: string;
  imageUrl?: string | null;
  overline?: string;
  breadcrumb?: { label: string; href?: string }[];
  className?: string;
};

const PageHero = ({
  title,
  subtitle,
  imageUrl,
  overline,
  breadcrumb,
  className,
}: PageHeroProps) => (
  <section
    className={cn(
      'relative overflow-hidden bg-ivory-100 pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20',
      className,
    )}
  >
    {/* Decorative circle — top right */}
    <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-amber-500/5" />
    <div className="pointer-events-none absolute -right-10 top-10 size-48 rounded-full border border-amber-500/10" />

    <Container>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* ── LEFT: Text block ── */}
        <div className="max-w-xl">
          {/* Breadcrumb */}
          {breadcrumb && breadcrumb.length > 0 && (
            <nav className="mb-5 flex items-center gap-1.5 text-xs text-charcoal-700/50">
              {breadcrumb.map((crumb, i) => (
                <span key={crumb.label} className="flex items-center gap-1.5">
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-charcoal-900"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-amber-600">
                      {crumb.label}
                    </span>
                  )}
                  {i < breadcrumb.length - 1 && (
                    <span className="text-charcoal-700/30">/</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Overline */}
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-600">
            {overline ?? 'TÂN HƯƠNG PHÁT'}
          </p>

          {/* Heading */}
          <h1 className="font-sans text-3xl font-bold leading-tight text-charcoal-900 sm:text-4xl lg:text-[2.6rem]">
            {title}
          </h1>

          {/* Gold divider */}
          <div className="my-5 h-[3px] w-12 rounded-full bg-amber-500" />

          {/* Subtitle */}
          <p className="text-base leading-relaxed text-charcoal-800/60">
            {subtitle}
          </p>
        </div>

        {/* ── RIGHT: Decorative image (optional) ── */}
        {imageUrl ? (
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl lg:block">
            <Image
              src={imageUrl}
              alt=""
              aria-hidden="true"
              fill
              sizes="45vw"
              className="object-cover"
              priority
            />
            {/* Subtle warm overlay */}
            <div className="absolute inset-0 bg-charcoal-900/10" />
          </div>
        ) : (
          /* Placeholder block when no image */
          <div className="hidden h-56 items-center justify-center lg:flex">
            <div className="size-40 rounded-full border-2 border-dashed border-amber-500/20" />
          </div>
        )}
      </div>
    </Container>
  </section>
);

export { PageHero };
export type { PageHeroProps };
