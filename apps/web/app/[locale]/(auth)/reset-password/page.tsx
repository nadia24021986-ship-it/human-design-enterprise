import { ResetPasswordForm } from '@/presentation/auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-semibold mb-6">Buat Password Baru</h1>
      <ResetPasswordForm />
    </main>
  );
}

