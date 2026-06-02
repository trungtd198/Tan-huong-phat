import type { IconValue } from '@/types';

type IconSlotProps = {
  icon?: IconValue;
  className?: string;
};

const IconSlot = ({ icon, className }: IconSlotProps) => {
  if (!icon) {
    return null;
  }

  if (typeof icon === 'string') {
    return <span className={className}>{icon}</span>;
  }

  const Icon = icon;

  return <Icon aria-hidden="true" className={className} strokeWidth={1.7} />;
};

export { IconSlot };
export type { IconSlotProps };
