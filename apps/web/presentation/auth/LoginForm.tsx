'use client';

import { useState, useTransition } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { loginAction } from '@/application/auth/actions';

export function LoginForm() {
  const params = useParams();
  const locale = params.locale as string;
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await loginAction(locale, formData);
      if (!result.success) {
        setError(result.message);
      }
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

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-primary text-primary-foreground py-2 font-medium disabled:opacity-50"
      >
        {isPending ? 'Memproses...' : 'Masuk'}
      </button>

      <div className="flex justify-between text-sm">
        <Link href={`/${locale}/forgot-password`} className="text-primary hover:underline">
          Lupa password?
        </Link>
        <Link href={`/${locale}/register`} className="text-primary hover:underline">
          Daftar akun
        </Link>
      </div>
    </form>
  );
}
