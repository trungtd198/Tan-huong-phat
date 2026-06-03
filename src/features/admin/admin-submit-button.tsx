'use client';

import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

type AdminSubmitButtonProps = {
  children: ReactNode;
  className: string;
  pendingTitle?: string;
  pendingDescription?: string;
  title?: string;
};

export const AdminSubmitButton = ({
  children,
  className,
  pendingTitle = 'Đang xử lý',
  pendingDescription = 'Vui lòng chờ trong giây lát.',
  title,
}: AdminSubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-espresso-900/70 px-4 text-white backdrop-blur-sm">
          <div className="flex min-w-64 flex-col items-center gap-4 rounded-lg border border-white/10 bg-espresso-900 px-8 py-7 text-center shadow-xl">
            <Loader2 className="size-8 animate-spin text-gold-500" />
            <div>
              <p className="text-sm font-bold uppercase tracking-wider">
                {pendingTitle}
              </p>
              <p className="mt-2 text-xs text-white/65">{pendingDescription}</p>
            </div>
          </div>
        </div>
      ) : null}
      <button
        type="submit"
        title={title}
        disabled={pending}
        className={`${className} disabled:cursor-not-allowed disabled:opacity-70`}
      >
        {children}
      </button>
    </>
  );
};

export type { AdminSubmitButtonProps };
