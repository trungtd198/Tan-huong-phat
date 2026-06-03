import { Phone } from 'lucide-react';

import { siteConfig } from '@/config/site';

const FloatingActions = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3 md:hidden">
    {/* Zalo */}
    <a
      href={siteConfig.zalo}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat Zalo"
      className="flex size-12 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
    >
      {/* Zalo official logo SVG */}
      <svg viewBox="0 0 64 64" className="size-7 fill-white" aria-hidden="true">
        <path d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4zm-6.54 38.5H21.3V26.14h4.16V42.5zm-2.08-18.64a2.4 2.4 0 110-4.8 2.4 2.4 0 010 4.8zM44.7 42.5h-4.04v-8.22c0-1.96-.7-3.3-2.46-3.3-1.34 0-2.14.9-2.5 1.78-.13.31-.16.74-.16 1.18V42.5H31.4s.05-14.36 0-15.84h4.14v2.24c.55-.85 1.53-2.06 3.72-2.06 2.72 0 4.74 1.78 4.74 5.6V42.5h-.3z" />
      </svg>
    </a>

    {/* Call button */}
    <a
      href={`tel:${siteConfig.phoneRaw}`}
      id="floating-cta-call"
      aria-label={`Gọi ngay ${siteConfig.phone}`}
      className="flex animate-pulse-slow items-center space-x-2 rounded-full bg-brand-500 py-3 pl-4 pr-5 text-white shadow-xl transition-all hover:scale-105 hover:bg-brand-600 hover:shadow-glow-brand active:scale-95"
    >
      <Phone className="size-5 shrink-0" aria-hidden="true" />
      <span className="text-sm font-bold">Gọi Ngay</span>
    </a>
  </div>
);

export { FloatingActions };
