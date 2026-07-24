'use client';

import { useState, useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { resetPasswordAction } from '@/application/auth/actions';

export function ResetPasswordForm() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setMessage(null);
    startTransition(async () => {
      const result = await resetPasswordAction(formData);
      setMessage(result.message);
      setIsSuccess(result.success);
      if (result.success) {
        setTimeout(() => router.push(`/${locale}/login`), 1500);
      }
    });
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password Baru
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
          Konfirmasi Password Baru
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
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
        {isPending ? 'Memproses...' : 'Ubah Password'}
      </button>
    </form>
  );
}
