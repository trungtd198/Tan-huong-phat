import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';

import { SiteLayout } from '@/components/layouts/SiteLayout';
import { PageHero } from '@/components/sections/PageHero';
import { Button, Container, Heading } from '@/components/ui';
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
    href: `tel:${siteConfig.phoneRaw}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    label: 'Địa chỉ',
    value: siteConfig.address,
  },
  {
    icon: Clock,
    label: 'Giờ làm việc',
    value: siteConfig.workingHours,
  },
];

const ContactPage = () => (
  <SiteLayout activeHref="/contact">
    <PageHero
      title="Liên hệ"
      subtitle="Chúng tôi luôn sẵn sàng lắng nghe. Gửi tin nhắn và đội ngũ Tân Hương Phát sẽ phản hồi sớm nhất có thể."
    />

    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Heading className="text-sand-900">
              Gửi tin nhắn cho chúng tôi
            </Heading>
            <form className="mt-8 space-y-6">
              <label className="block">
                <span className="text-sm font-semibold text-sand-900">
                  Họ và tên
                </span>
                <input
                  type="text"
                  placeholder="Nhập họ và tên"
                  className="mt-3 h-12 w-full rounded-md border border-sand-300 bg-white px-4 text-sm text-sand-900 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-sand-900">
                  Địa chỉ email
                </span>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="mt-3 h-12 w-full rounded-md border border-sand-300 bg-white px-4 text-sm text-sand-900 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-sand-900">
                  Số điện thoại
                </span>
                <input
                  type="tel"
                  placeholder={siteConfig.phone}
                  className="mt-3 h-12 w-full rounded-md border border-sand-300 bg-white px-4 text-sm text-sand-900 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-sand-900">
                  Nội dung
                </span>
                <textarea
                  placeholder="Hãy cho chúng tôi biết bạn cần hỗ trợ gì..."
                  rows={6}
                  className="mt-3 w-full rounded-md border border-sand-300 bg-white px-4 py-3 text-sm text-sand-900 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40"
                />
              </label>
              <Button
                type="submit"
                variant="gold"
                fullWidth
                leadingIcon={<Send className="size-4" />}
              >
                Gửi tin nhắn
              </Button>
            </form>
          </div>

          <div>
            <Heading className="text-sand-900">Thông tin liên hệ</Heading>
            <div className="mt-8 space-y-7">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const value = (
                  <span className="mt-1 block text-lg font-medium text-sand-900">
                    {item.value}
                  </span>
                );

                return (
                  <div key={item.label} className="flex gap-5">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-sand-100 text-gold-500">
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase text-sand-600">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} className="hover:text-brand-600">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 flex min-h-[20rem] items-center justify-center rounded-lg bg-sand-100 p-8 text-center">
              <div>
                <MapPin className="mx-auto size-12 text-gold-500" />
                <Heading as="h4" className="mt-6 text-sand-900">
                  Ghé thăm địa chỉ của chúng tôi
                </Heading>
                <p className="mt-4 text-sand-600">{siteConfig.address}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  </SiteLayout>
);

export default ContactPage;
