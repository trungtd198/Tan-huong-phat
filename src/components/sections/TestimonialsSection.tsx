import { TestimonialCard, TrustBadges } from '@/components/common';
import { CardGrid } from '@/components/ui';
import { landingPageContent } from '@/data/landing-page';
import { testimonials } from '@/data/testimonials';

import { SectionHeader } from './SectionHeader';
import { SectionWrapper } from './SectionWrapper';

const TestimonialsSection = () => (
  <SectionWrapper id="testimonials" theme="dark">
    <SectionHeader
      badge={landingPageContent.testimonials.badge}
      badgeVariant="dark"
      title={landingPageContent.testimonials.title}
      subtitle={landingPageContent.testimonials.subtitle}
      theme="dark"
    />

    <CardGrid columns={3} gap="lg" responsive="desktop">
      {testimonials.map((review) => (
        <TestimonialCard key={review.id} testimonial={review} theme="dark" />
      ))}
    </CardGrid>

    <div className="mt-12">
      <TrustBadges
        badges={landingPageContent.testimonials.stats}
        variant="dark"
        columns={4}
      />
    </div>
  </SectionWrapper>
);

export { TestimonialsSection };
