'use client';

import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

const LoginSubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-espresso-900 px-4 text-sm font-bold text-white transition hover:bg-espresso-800 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>Đang đăng nhập...</span>
        </>
      ) : (
        'Đăng nhập'
      )}
    </button>
  );
};

export { LoginSubmitButton };
