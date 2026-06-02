import { Container, Heading, Paragraph } from '@/components/ui';
import { cn } from '@/lib/utils';

type PageHeroProps = {
  title: string;
  subtitle: string;
  imageUrl?: string;
  className?: string;
};

const PageHero = ({ title, subtitle, imageUrl, className }: PageHeroProps) => (
  <section
    className={cn(
      'relative overflow-hidden bg-sand-100 py-20 sm:py-24 lg:py-28',
      imageUrl && 'bg-sand-900',
      className,
    )}
  >
    {imageUrl ? (
      <>
        <img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-sand-50/85 to-sand-50" />
      </>
    ) : null}
    <Container size="lg" className="relative text-center">
      <Heading as="h1" className="text-sand-900">
        {title}
      </Heading>
      <Paragraph size="lg" className="mx-auto mt-6 max-w-3xl text-sand-600">
        {subtitle}
      </Paragraph>
    </Container>
  </section>
);

export { PageHero };
export type { PageHeroProps };
