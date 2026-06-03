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
      'relative overflow-hidden bg-sand-100 py-32 sm:py-40 lg:py-52 min-h-[28rem] sm:min-h-[34rem] lg:min-h-[42rem] flex items-center',
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
          className="absolute inset-0 size-full object-cover"
        />
        {/* Overlay tối nhẹ phía dưới để chữ dễ đọc, ảnh vẫn hiện rõ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </>
    ) : null}
    <Container size="lg" className="relative text-center">
      <Heading
        as="h1"
        className={cn(imageUrl ? 'text-white drop-shadow-lg' : 'text-sand-900')}
      >
        {title}
      </Heading>
      <Paragraph
        size="lg"
        className={cn(
          'mx-auto mt-6 max-w-3xl',
          imageUrl ? 'text-white/90 drop-shadow' : 'text-sand-600',
        )}
      >
        {subtitle}
      </Paragraph>
    </Container>
  </section>
);

export { PageHero };
export type { PageHeroProps };
