'use client';

import { CheckCircle2, Loader2, Send, XCircle } from 'lucide-react';
import { type FormEvent, useState } from 'react';

import { Button } from '@/components/ui';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const ContactForm = () => {
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? 'Gửi thất bại');
      }

      setState('success');
      form.reset();
    } catch (err) {
      setState('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Đã có lỗi xảy ra. Vui lòng thử lại.',
      );
    }
  };

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-green-50 text-green-500">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="mt-5 font-display text-xl font-bold text-brand-900">
          Gửi tin nhắn thành công!
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-sand-500">
          Cảm ơn bạn đã liên hệ với Tân Hương Phát. Chúng tôi sẽ phản hồi trong
          thời gian sớm nhất.
        </p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="mt-6 text-sm font-semibold text-gold-600 underline-offset-4 hover:underline"
        >
          Gửi tin nhắn khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <label className="block">
        <span className="text-[10px] font-bold uppercase tracking-wider text-sand-400">
          Họ và tên <span className="text-red-400">*</span>
        </span>
        <input
          name="name"
          type="text"
          required
          placeholder="Nhập họ và tên của bạn"
          className="mt-1.5 h-12 w-full rounded-xl border border-sand-200 bg-sand-50 px-4 text-sm text-brand-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-300/40"
        />
      </label>

      <label className="block">
        <span className="text-[10px] font-bold uppercase tracking-wider text-sand-400">
          Địa chỉ email <span className="text-red-400">*</span>
        </span>
        <input
          name="email"
          type="email"
          required
          placeholder="your.email@example.com"
          className="mt-1.5 h-12 w-full rounded-xl border border-sand-200 bg-sand-50 px-4 text-sm text-brand-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-300/40"
        />
      </label>

      <label className="block">
        <span className="text-[10px] font-bold uppercase tracking-wider text-sand-400">
          Số điện thoại
        </span>
        <input
          name="phone"
          type="tel"
          placeholder="Ví dụ: 0888 296 822"
          className="mt-1.5 h-12 w-full rounded-xl border border-sand-200 bg-sand-50 px-4 text-sm text-brand-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-300/40"
        />
      </label>

      <label className="block">
        <span className="text-[10px] font-bold uppercase tracking-wider text-sand-400">
          Nội dung <span className="text-red-400">*</span>
        </span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Hãy cho chúng tôi biết bạn cần hỗ trợ gì..."
          className="mt-1.5 w-full rounded-xl border border-sand-200 bg-sand-50 px-4 py-3 text-sm text-brand-900 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-300/40"
        />
      </label>

      {state === 'error' && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-100 bg-red-50 p-3.5 text-sm text-red-600">
          <XCircle className="mt-0.5 size-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <Button
        type="submit"
        variant="gold"
        fullWidth
        disabled={state === 'submitting'}
        leadingIcon={
          state === 'submitting' ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )
        }
      >
        {state === 'submitting' ? 'Đang gửi...' : 'Gửi tin nhắn'}
      </Button>
    </form>
  );
};

export { ContactForm };
