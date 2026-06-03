'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

type ProductSaveToastProps = {
  message: string;
  show?: boolean;
};

export const ProductSaveToast = ({
  message,
  show = false,
}: ProductSaveToastProps) => {
  useEffect(() => {
    if (!show) {
      return;
    }

    toast.success('Đã lưu sản phẩm', {
      description: message,
      duration: 3500,
    });
  }, [message, show]);

  return null;
};
