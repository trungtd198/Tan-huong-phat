import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { Logo } from '@/components/common';
import { Container, Heading, Paragraph } from '@/components/ui';
import type { FooterLinkGroup, SocialLink } from '@/config/navigation';
import { footerLinkGroups, socialLinks } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const socialIconMap: Record<string, ReactNode> = {
  Facebook: (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className="size-5 fill-current"
      aria-hidden="true"
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  ),
  Instagram: (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className="size-5 fill-current"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  YouTube: (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className="size-5 fill-current"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

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
                className="inline-flex size-10 items-center justify-center rounded-lg bg-white/10 text-white/75 transition-colors duration-300 hover:bg-white/15 hover:text-white"
              >
                {socialIconMap[social.label] ?? (
                  <span className="text-xs font-semibold">
                    {social.shortLabel}
                  </span>
                )}
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
