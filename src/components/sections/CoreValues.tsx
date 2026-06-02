import { Heading, Paragraph } from '@/components/ui';
import { brandFeatures } from '@/data/reference-layout';

import { MotionReveal } from './MotionReveal';

const CoreValues = () => (
  <section className="bg-sand-50 px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <MotionReveal className="mx-auto max-w-3xl text-center">
        <Heading className="text-sand-900">Giá trị cốt lõi</Heading>
        <Paragraph className="mx-auto mt-5 max-w-2xl text-sand-500">
          Tân Hương Phát theo đuổi vẻ đẹp tự nhiên bằng lựa chọn thành phần có
          chủ đích, quy trình ổn định và trải nghiệm chăm sóc tinh tế.
        </Paragraph>
      </MotionReveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {brandFeatures.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <MotionReveal key={feature.title} delay={index * 0.08}>
              <article className="group h-full rounded-2xl border border-sand-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-md">
                {/* Icon circle — sage green ring on hover */}
                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500 ring-1 ring-brand-100 transition duration-300 group-hover:bg-brand-100 group-hover:ring-brand-300">
                  <Icon className="size-6 stroke-[1.6]" />
                </div>

                <Heading as="h4" className="font-display text-sand-900">
                  {feature.title}
                </Heading>
                <Paragraph size="sm" className="mt-3 text-sand-500">
                  {feature.description}
                </Paragraph>
              </article>
            </MotionReveal>
          );
        })}
      </div>
    </div>
  </section>
);

export { CoreValues };
