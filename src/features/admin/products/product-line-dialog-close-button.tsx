'use client';

import type { ReactNode } from 'react';

type ProductLineDialogCloseButtonProps = {
  children: ReactNode;
  className: string;
  title?: string;
};

export const ProductLineDialogCloseButton = ({
  children,
  className,
  title,
}: ProductLineDialogCloseButtonProps) => (
  <button
    type="button"
    title={title}
    className={className}
    onClick={(event) => {
      const details = event.currentTarget.closest('details');

      if (details) {
        details.open = false;
      }
    }}
  >
    {children}
  </button>
);
