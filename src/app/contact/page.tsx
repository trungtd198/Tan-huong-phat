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

const ContactPage = () => (
  <SiteLayout activeHref="/contact">
    <PageHero
      title="Liên hệ & Hợp tác"
      subtitle="Chúng tôi luôn sẵn sàng lắng nghe. Hãy gửi tin nhắn và đội ngũ tư vấn viên của Tân Hương Phát sẽ phản hồi sớm nhất."
      overline="LIÊN HỆ VỚI CHÚNG TÔI"
      breadcrumb={[{ label: 'Trang chủ', href: '/' }, { label: 'Liên hệ' }]}
    />

    {/* ── Main contact section ── */}
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          {/* LEFT: Dark info card */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl bg-charcoal-900 p-8 text-white sm:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-500">
                THÔNG TIN
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">
                Liên hệ trực tiếp
              </h2>
              <div className="mt-4 h-[3px] w-10 rounded-full bg-amber-500" />

              <div className="mt-8 space-y-6">
                {/* Phone */}
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="group flex items-start gap-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-500 transition group-hover:bg-amber-500 group-hover:text-white">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                      Điện thoại
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-white">
                      {siteConfig.phone}
                    </p>
                    <p className="text-xs text-white/40">
                      Hỗ trợ T2 - T7, 08:00 - 17:30
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-start gap-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-500 transition group-hover:bg-amber-500 group-hover:text-white">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                      Email
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-white">
                      {siteConfig.email}
                    </p>
                    <p className="text-xs text-white/40">
                      Giải đáp trong vòng 24h
                    </p>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-500">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                      Địa chỉ
                    </p>
                    <p className="mt-0.5 text-sm font-semibold leading-relaxed text-white">
                      {siteConfig.address}
                    </p>
                  </div>
                </div>

                {/* Working hours */}
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-amber-500">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                      Giờ làm việc
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-white">
                      Thứ Hai – Thứ Bảy
                    </p>
                    <p className="text-xs text-white/60">
                      08:00 – 17:30 (Nghỉ CN & lễ)
                    </p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-10 border-t border-white/10 pt-8">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
                  KẾT NỐI VỚI CHÚNG TÔI
                </p>
                <div className="flex gap-3">
                  {[
                    {
                      label: 'Facebook',
                      href: siteConfig.facebook || '#',
                      icon: 'FB',
                    },
                    {
                      label: 'Zalo',
                      href: siteConfig.zalo || '#',
                      icon: 'ZL',
                    },
                    {
                      label: 'YouTube',
                      href: 'https://youtube.com',
                      icon: 'YT',
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex size-10 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-white/70 transition hover:bg-amber-500 hover:text-white"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-ivory-100 p-8 sm:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-600">
                GỬI TIN NHẮN
              </p>
              <h2 className="mt-3 text-2xl font-bold text-charcoal-900">
                Chúng tôi luôn lắng nghe
              </h2>
              <div className="mt-4 h-[3px] w-10 rounded-full bg-amber-500" />
              <p className="mt-4 text-sm text-charcoal-800/60">
                Vui lòng để lại thông tin, đội ngũ tư vấn sẽ liên hệ bạn trong
                thời gian sớm nhất.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>

    {/* ── Map section ── */}
    <section className="bg-ivory-100 py-12">
      <Container>
        <div className="overflow-hidden rounded-2xl shadow-sm">
          <iframe
            title="Tân Hương Phát Location"
            src={`https://maps.google.com/maps?q=${encodeURIComponent('475/6E/15 Bạch Đằng, Tân Sơn Hòa, Tân Bình, TP.HCM')}&output=embed`}
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
        <p className="mt-4 text-center text-xs text-charcoal-700/50">
          📍 {siteConfig.address}
        </p>
      </Container>
    </section>
  </SiteLayout>
);

export default ContactPage;
