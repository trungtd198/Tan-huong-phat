'use client';

import { Toaster } from 'sonner';

export const AdminToaster = () => (
  <Toaster
    richColors
    closeButton
    position="top-right"
    toastOptions={{
      className: 'font-sans',
    }}
  />
);
