'use client';

import { useState, useTransition } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { registerAction } from '@/application/auth/actions';

export function RegisterForm() {
  const params = useParams();
  const locale = params.locale as string;
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await registerAction(locale, formData);
      if (!result.success) {
        setError(result.message);
      }
    });
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium mb-1">
          Nama Lengkap
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
        />
      </div>

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
          minLength={8}
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
          Konfirmasi Password
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

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-primary text-primary-foreground py-2 font-medium disabled:opacity-50"
      >
        {isPending ? 'Memproses...' : 'Daftar'}
      </button>

      <p className="text-sm text-center">
        Sudah punya akun?{' '}
        <Link href={`/${locale}/login`} className="text-primary hover:underline">
          Masuk
        </Link>
      </p>
    </form>
  );
}
