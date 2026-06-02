'use client';

import { Loader2 } from 'lucide-react';
import { type MouseEvent, useState } from 'react';

type ProductAdminSubmitButtonProps = {
  children: string;
};

export const ProductAdminSubmitButton = ({
  children,
}: ProductAdminSubmitButtonProps) => {
  const [pending, setPending] = useState(false);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.form?.checkValidity()) {
      setPending(true);
    }
  };

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-2 rounded-md bg-espresso-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-espresso-800 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
      {pending ? 'Đang lưu...' : children}
    </button>
  );
};

export type { ProductAdminSubmitButtonProps };
