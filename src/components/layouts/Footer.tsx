import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

import { Logo } from '@/components/common';
import { Container, Heading, Paragraph } from '@/components/ui';
import type { FooterLinkGroup, SocialLink } from '@/config/navigation';
import { footerLinkGroups, socialLinks } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export interface FooterProps {
  description?: string;
  linkGroups?: FooterLinkGroup[];
  socials?: SocialLink[];
  className?: string;
}

const Footer = ({
  description = siteConfig.description,
  linkGroups = footerLinkGroups,
  socials = socialLinks,
  className,
}: FooterProps) => (
  <footer
    className={cn(
      'relative overflow-hidden border-t border-white/10 bg-[#0d1a16] py-14 text-white/75 sm:py-16',
      className,
    )}
  >
    {/* Decorative diamond accent — bottom-right corner */}
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-10 -right-10 size-52 opacity-[0.06]"
      viewBox="0 0 200 200"
      fill="none"
    >
      <path
        d="M100 10 L190 100 L100 190 L10 100 Z"
        fill="currentColor"
        className="text-gold-400"
      />
      <path
        d="M100 35 L165 100 L100 165 L35 100 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-gold-300"
      />
    </svg>
    <Container>
      <div className="mb-10 grid gap-10 lg:grid-cols-[1.1fr_0.8fr_1.2fr_0.8fr]">
        <div className="space-y-5">
          <Link href="/" className="inline-flex" aria-label={siteConfig.name}>
            <Logo variant="dark" />
          </Link>
          <Paragraph
            size="sm"
            tone="inverse"
            className="max-w-md text-white/70"
          >
            {description}
          </Paragraph>
        </div>

        {linkGroups.map((group) => (
          <div key={group.title}>
            <Heading as="h4" className="mb-4 text-base text-white">
              {group.title}
            </Heading>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li key={`${group.title}-${item.href}`}>
                  <a
                    href={item.href}
                    className="text-sm text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <Heading as="h4" className="mb-4 text-base text-white">
            Thông tin liên hệ
          </Heading>
          <div className="space-y-3 text-sm text-white/70">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-500" />
              <span>{siteConfig.address}</span>
            </div>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="flex gap-3 transition-colors duration-300 hover:text-white"
            >
              <Phone className="mt-0.5 size-4 shrink-0 text-gold-500" />
              <span>{siteConfig.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex gap-3 transition-colors duration-300 hover:text-white"
            >
              <Mail className="mt-0.5 size-4 shrink-0 text-gold-500" />
              <span>{siteConfig.email}</span>
            </a>
          </div>
        </div>

        <div>
          <Heading as="h4" className="mb-4 text-base text-white">
            Theo dõi chúng tôi
          </Heading>
          <div className="flex flex-wrap gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  social.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                aria-label={social.label}
                className="inline-flex size-10 items-center justify-center rounded-lg bg-white/10 text-xs font-semibold text-white/75 transition-colors duration-300 hover:bg-white/15 hover:text-white"
              >
                {social.shortLabel}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <span>
          {new Date().getFullYear()} {siteConfig.name} Mỹ phẩm thiên nhiên. Bảo
          lưu mọi quyền.
        </span>
        <span className="flex gap-6">
          <a href="/privacy" className="hover:text-white/75">
            Chính sách bảo mật
          </a>
          <a href="/terms" className="hover:text-white/75">
            Điều khoản dịch vụ
          </a>
        </span>
      </div>
    </Container>
  </footer>
);

export { Footer };
