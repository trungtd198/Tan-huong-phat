'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { BaseCard, CardGrid, Heading, Paragraph } from '@/components/ui';
import { landingPageContent } from '@/data/landing-page';
import { cn } from '@/lib/utils';
import type { FAQItem } from '@/types';

import { SectionHeader } from './SectionHeader';
import { SectionWrapper } from './SectionWrapper';

type FAQSectionProps = {
  id?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
};

const FAQSection = ({
  id = landingPageContent.faq.id,
  badge = landingPageContent.faq.badge,
  title = landingPageContent.faq.title,
  subtitle = landingPageContent.faq.subtitle,
  items = landingPageContent.faq.items,
}: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <SectionWrapper id={id} theme="light">
      <SectionHeader
        badge={badge}
        badgeVariant="accent"
        title={title}
        subtitle={subtitle}
      />

      <CardGrid columns={2} gap="sm" responsive="desktop">
        {items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <BaseCard
              key={item.question}
              variant="default"
              hover={false}
              className={cn(
                'border transition-colors duration-300',
                isOpen && 'border-sand-300 shadow-md',
              )}
            >
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 text-left"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
              >
                <Heading as="h3" className="text-sand-900">
                  {item.question}
                </Heading>
                <span
                  className={cn(
                    'mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-sand-200 bg-sand-50 transition-transform duration-300',
                    isOpen && 'rotate-180',
                  )}
                >
                  <ChevronDown className="size-4 text-sand-700" />
                </span>
              </button>

              <div
                className={cn(
                  'grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out',
                  isOpen
                    ? 'mt-5 grid-rows-[1fr] opacity-100'
                    : 'mt-0 grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="overflow-hidden">
                  <Paragraph size="sm" className="max-w-xl text-sand-600">
                    {item.answer}
                  </Paragraph>
                </div>
              </div>
            </BaseCard>
          );
        })}
      </CardGrid>
    </SectionWrapper>
  );
};

export { FAQSection };
export type { FAQSectionProps };
