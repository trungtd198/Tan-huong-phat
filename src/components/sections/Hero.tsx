import { ArrowRight, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui';

import { MotionReveal } from './MotionReveal';

type HeroProps = {
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaHref?: string | null;
  ctaLabel?: string | null;
};

// Brand-trust commitment badges
const featureBadges = [
  { icon: Leaf, label: '100% Thiên nhiên' },
  { icon: ShieldCheck, label: 'Cam kết chính hãng' },
  { icon: Sparkles, label: 'An toàn & Lành tính' },
];

const Hero = ({ title, subtitle, imageUrl, ctaHref, ctaLabel }: HeroProps) => (
  <section className="relative flex min-h-[44rem] overflow-hidden bg-brand-100 pt-20 sm:min-h-[48rem] lg:min-h-[54rem]">
    <div className="flex w-full flex-col lg:flex-row">
      {/* ── LEFT: Hero image ── */}
      <div className="relative min-h-[24rem] w-full shrink-0 lg:min-h-full lg:w-[54%]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          sizes="(min-width: 1024px) 54vw, 100vw"
          className="object-cover object-center"
        />
        {/* Fade edge into the right content panel */}
        <div className="absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-brand-100 to-transparent lg:block" />
      </div>

      {/* ── RIGHT: All typography + CTA in one cohesive column ── */}
      <div className="flex flex-1 flex-col justify-center bg-brand-100 px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
        <MotionReveal className="max-w-[26rem]">
          {/* Overline — brand category */}
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-500">
            Mỹ phẩm thiên nhiên
          </p>

          {/* Brand name — serif gold, large & prominent */}
          <h1 className="mt-3 font-display text-[2.6rem] font-semibold leading-[1.1] tracking-tight text-gold-500 sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>

          {/* USP badge pills — grouped directly under heading */}
          <div className="mt-7 flex flex-wrap gap-3">
            {featureBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-brand-300 bg-white/70 px-3.5 py-1.5 shadow-sm backdrop-blur-sm"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                  <Icon className="size-3" />
                </span>
                <span className="text-sm font-medium text-brand-800">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Subtitle / description */}
          <p className="mt-7 text-base leading-[1.75] text-brand-700">
            {subtitle}
          </p>

          {/* CTA button */}
          {ctaHref && ctaLabel ? (
            <Button
              href={ctaHref}
              variant="secondary"
              size="lg"
              className="mt-9 bg-[#1F3E35] font-semibold text-white shadow-md hover:bg-[#152a24] hover:shadow-lg"
              trailingIcon={<ArrowRight className="size-4" />}
            >
              {ctaLabel}
            </Button>
          ) : null}
        </MotionReveal>
      </div>
    </div>
  </section>
);

export { Hero };
export type { HeroProps };
