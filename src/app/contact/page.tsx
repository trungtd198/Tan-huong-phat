import { Clock, Mail, MapPin, Phone } from 'lucide-react';

import { ContactForm } from '@/components/common/ContactForm';
import { SiteLayout } from '@/components/layouts/SiteLayout';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: 'Liên hệ | Tân Hương Phát',
  description:
    'Liên hệ Tân Hương Phát để được hỗ trợ sản phẩm và trao đổi hợp tác.',
};

const contactItems = [
  {
    icon: Phone,
    label: 'Điện thoại',
    value: siteConfig.phone,
    sub: 'Hỗ trợ miễn phí 24/7',
    href: `tel:${siteConfig.phoneRaw}`,
    span: false,
  },
  {
    icon: Mail,
    label: 'Email',
    value: siteConfig.email,
    sub: 'Giải đáp nhanh chóng',
    href: `mailto:${siteConfig.email}`,
    span: false,
  },
  {
    icon: MapPin,
    label: 'Trụ sở',
    value: siteConfig.address,
    sub: null,
    href: null,
    span: true,
  },
  {
    icon: Clock,
    label: 'Giờ hoạt động',
    value: 'Thứ Hai - Thứ Bảy: 08:00 - 17:00',
    sub: 'Nghỉ Chủ nhật và các ngày lễ Tết',
    href: null,
    span: true,
  },
];

const ContactPage = () => (
  <SiteLayout activeHref="/contact">
    <PageHero
      title="Liên hệ"
      subtitle="Chúng tôi luôn sẵn sàng lắng nghe. Hãy gửi tin nhắn và đội ngũ tư vấn viên của Tân Hương Phát sẽ phản hồi tới bạn sớm nhất có thể."
    />

    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          {/* ── Left: Contact Form ── */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-sand-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-2xl font-bold text-brand-900">
                Gửi tin nhắn cho chúng tôi
              </h2>
              <p className="mt-1 text-xs text-sand-400">
                Vui lòng để lại thông tin, chúng tôi sẽ tư vấn nhanh chóng.
              </p>

              <ContactForm />
            </div>
          </div>

          {/* ── Right: Contact Info ── */}
          <div className="space-y-8 lg:col-span-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-900">
                Thông tin liên hệ
              </h2>
              <p className="mt-1 text-xs text-sand-400">
                Các phương thức liên lạc trực tiếp tới Tân Hương Phát
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div
                    key={item.label}
                    className={[
                      'flex gap-4 rounded-2xl border border-sand-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-gold-200 hover:shadow-md',
                      item.span ? 'sm:col-span-2' : '',
                    ].join(' ')}
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sand-50 text-gold-500">
                      <Icon className="size-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-sand-400">
                        {item.label}
                      </p>
                      <p className="text-xs font-bold text-brand-900">
                        {item.value}
                      </p>
                      {item.sub && (
                        <p className="text-[10px] text-sand-400">{item.sub}</p>
                      )}
                    </div>
                  </div>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className={item.span ? 'sm:col-span-2' : ''}
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={item.label}
                    className={item.span ? 'sm:col-span-2' : ''}
                  >
                    {content}
                  </div>
                );
              })}
            </div>

            {/* Location card */}
            <div className="border-gold-200/40 relative overflow-hidden rounded-3xl border bg-sand-50 p-8 text-center shadow-sm">
              <div className="bg-gold-100/40 pointer-events-none absolute -bottom-10 -right-10 size-40 rounded-full blur-2xl" />
              <div className="relative z-10 space-y-3">
                <div className="border-gold-200 mx-auto flex size-14 items-center justify-center rounded-full border bg-white text-gold-500 shadow-sm">
                  <MapPin className="size-6" />
                </div>
                <h4 className="font-display text-lg font-bold text-brand-900">
                  Ghé thăm địa chỉ của chúng tôi
                </h4>
                <p className="mx-auto max-w-sm text-xs leading-relaxed text-sand-500">
                  {siteConfig.address}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-600 transition-colors hover:text-brand-900"
                >
                  Xem bản đồ chi tiết
                  <svg
                    className="size-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  </SiteLayout>
);

export default ContactPage;
