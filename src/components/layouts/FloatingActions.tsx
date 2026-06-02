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
      className="flex size-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
    >
      <span className="text-xs font-bold">Z</span>
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
