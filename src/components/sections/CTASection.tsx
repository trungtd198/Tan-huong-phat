import { SectionActions } from '@/components/common';
import {
  BaseCard,
  Container,
  GradientText,
  Heading,
  Overline,
  Paragraph,
} from '@/components/ui';
import { landingPageContent } from '@/data/landing-page';

type CTAAction = {
  label: string;
  href: string;
  id?: string;
};

type CTASectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  highlightedTitle?: string;
  description?: string;
  primaryAction?: CTAAction;
  secondaryAction?: CTAAction;
  benefits?: string[];
};

const CTASection = ({
  id = landingPageContent.cta.id,
  eyebrow = landingPageContent.cta.eyebrow,
  title = landingPageContent.cta.title,
  highlightedTitle = landingPageContent.cta.highlightedTitle,
  description = landingPageContent.cta.description,
  primaryAction = landingPageContent.cta.primaryAction,
  secondaryAction = landingPageContent.cta.secondaryAction,
  benefits = landingPageContent.cta.benefits,
}: CTASectionProps) => (
  <section
    id={id}
    className="relative overflow-hidden bg-hero-gradient py-20 sm:py-24 lg:py-32"
  >
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,188,120,0.16),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(244,130,104,0.18),_transparent_28%)]" />

    <Container size="md" className="relative z-10">
      <BaseCard
        variant="glass"
        hover={false}
        className="overflow-hidden border-white/10 bg-white/5 p-0"
      >
        <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10 lg:p-12">
          <div>
            <Overline className="mb-4 text-gold-300">{eyebrow}</Overline>

            <Heading as="h2" className="mb-4 text-white">
              {title}
              <br />
              <GradientText className="bg-gold-gradient">
                {highlightedTitle}
              </GradientText>
            </Heading>

            <Paragraph
              size="lg"
              tone="inverse"
              className="max-w-2xl text-sand-300"
            >
              {description}
            </Paragraph>
          </div>

          <SectionActions
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            size="lg"
            layout="stacked"
            className="lg:min-w-[260px]"
          />
        </div>

        <div className="border-t border-white/10 px-8 py-5 sm:px-10 lg:px-12">
          <div className="flex flex-wrap gap-3 text-sm text-sand-300">
            {benefits.map((benefit) => (
              <span
                key={benefit}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </BaseCard>
    </Container>
  </section>
);

export { CTASection };
export type { CTAAction, CTASectionProps };
