import { Check, Sparkles } from 'lucide-react';

import { SectionActions, TrustBadges } from '@/components/common';
import { Container, GradientText, Heading, Paragraph } from '@/components/ui';
import { landingPageContent } from '@/data/landing-page';
import type { StatItem } from '@/types';

import { Navbar } from '../layouts/Navbar';
import { HeroEditorialCard } from './HeroEditorialCard';

type HeroAction = {
  label: string;
  href: string;
  id?: string;
};

type HeroSectionProps = {
  announcement?: string;
  title?: string;
  highlightedTitle?: string;
  description?: string;
  highlights?: string[];
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  trustBadges?: StatItem[];
  showNavbar?: boolean;
};

const HeroSection = ({
  announcement = landingPageContent.hero.announcement,
  title = landingPageContent.hero.title,
  highlightedTitle = landingPageContent.hero.highlightedTitle,
  description = landingPageContent.hero.description,
  highlights = landingPageContent.hero.highlights,
  primaryAction = landingPageContent.hero.primaryAction,
  secondaryAction = landingPageContent.hero.secondaryAction,
  trustBadges = landingPageContent.hero.trustBadges,
  showNavbar = true,
}: HeroSectionProps) => (
  <section className="relative flex min-h-screen flex-col overflow-hidden bg-hero-gradient text-white">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,130,104,0.16),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(212,188,120,0.12),_transparent_30%)]" />
      <div className="absolute -right-28 top-24 size-72 rounded-full border border-white/10" />
      <div className="absolute bottom-12 left-6 size-40 rounded-full border border-white/10 sm:left-16 sm:size-56" />
    </div>

    {showNavbar && (
      <Navbar position="fixed" transparent enableScrollTransition />
    )}

    <div className="relative z-10 flex flex-1 items-center">
      <Container className="py-28 sm:py-32 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="max-w-3xl">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="size-4 text-gold-400" strokeWidth={1.8} />
              <span className="text-sm text-sand-200">{announcement}</span>
            </div>

            <Heading
              as="h1"
              className="mb-6 text-white sm:text-5xl lg:text-7xl"
            >
              {title}
              <br />
              <GradientText className="leading-[1.08]">
                {highlightedTitle}
              </GradientText>
            </Heading>

            <Paragraph
              size="lg"
              tone="inverse"
              className="mb-10 max-w-2xl text-sand-300"
            >
              {description}
            </Paragraph>

            <SectionActions
              primaryAction={primaryAction}
              secondaryAction={secondaryAction}
              size="xl"
              className="mb-10"
            />

            <div className="mb-10 flex flex-col gap-3 text-sm text-sand-300 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="size-4 text-gold-400" strokeWidth={1.8} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <TrustBadges badges={trustBadges} variant="glass" columns={4} />
          </div>

          <HeroEditorialCard />
        </div>
      </Container>
    </div>

    <div className="relative z-10 flex justify-center pb-8">
      <span className="h-12 w-px bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
    </div>
  </section>
);

export { HeroSection };
export type { HeroAction, HeroSectionProps };
