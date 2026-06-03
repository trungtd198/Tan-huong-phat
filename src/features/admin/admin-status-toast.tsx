'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

type AdminStatusToastProps = {
  description?: string;
  show?: boolean;
  title: string;
  type?: 'success' | 'warning' | 'error';
};

export const AdminStatusToast = ({
  description,
  show = false,
  title,
  type = 'success',
}: AdminStatusToastProps) => {
  useEffect(() => {
    if (!show) {
      return;
    }

    toast[type](title, {
      description,
      duration: 3500,
    });
  }, [description, show, title, type]);

  return null;
};

export type { AdminStatusToastProps };
