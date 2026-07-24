'use client';

import { useState, useTransition } from 'react';
import { forgotPasswordAction } from '@/application/auth/actions';

export function ForgotPasswordForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setMessage(null);
    startTransition(async () => {
      const result = await forgotPasswordAction(formData);
      setMessage(result.message);
      setIsSuccess(result.success);
    });
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
        />
      </div>

      {message && (
        <p className={`text-sm ${isSuccess ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-primary text-primary-foreground py-2 font-medium disabled:opacity-50"
      >
        {isPending ? 'Mengirim...' : 'Kirim Link Reset'}
      </button>
    </form>
  );
}
