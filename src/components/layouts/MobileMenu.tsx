import { Button } from '@/components/ui';
import type { NavAction, NavItem } from '@/config/navigation';
import { cn } from '@/lib/utils';

export interface MobileMenuProps {
  items: NavItem[];
  isOpen: boolean;
  activeHref?: string;
  cta?: NavAction;
  theme?: 'light' | 'dark';
  onClose: () => void;
}

const panelThemeStyles = {
  light: 'border-sand-200 bg-sand-50/95 shadow-lg backdrop-blur-xl',
  dark: 'border-white/10 bg-espresso-900/95 backdrop-blur-lg',
};

const itemThemeStyles = {
  light: {
    base: 'text-sand-600 hover:bg-white hover:text-sand-900',
    active: 'bg-white text-sand-900 shadow-sm',
  },
  dark: {
    base: 'text-sand-300 hover:bg-white/5 hover:text-white',
    active: 'bg-white/10 text-white',
  },
};

const MobileMenu = ({
  items,
  isOpen,
  activeHref,
  cta,
  theme = 'dark',
  onClose,
}: MobileMenuProps) => (
  <div
    className={cn(
      'absolute inset-x-0 top-full border-t md:hidden',
      'transition-all duration-300',
      panelThemeStyles[theme],
      isOpen
        ? 'visible translate-y-0 opacity-100'
        : 'invisible -translate-y-4 opacity-0',
    )}
  >
    <div className="mx-auto max-w-7xl space-y-1 px-5 py-4">
      {items.map((item) => {
        const isActive = activeHref === item.href;

        return (
          <a
            key={item.href}
            href={item.href}
            onClick={onClose}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'block rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-300',
              itemThemeStyles[theme].base,
              isActive && itemThemeStyles[theme].active,
            )}
          >
            {item.label}
          </a>
        );
      })}

      {cta && (
        <div className="pt-3">
          <Button href={cta.href} variant="gold" fullWidth>
            {cta.label}
          </Button>
        </div>
      )}
    </div>
  </div>
);

export { MobileMenu };
