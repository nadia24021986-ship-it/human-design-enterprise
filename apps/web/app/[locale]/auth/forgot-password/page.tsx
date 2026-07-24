import { ForgotPasswordForm } from '@/presentation/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-semibold mb-2">Lupa Password</h1>
      <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
        Masukkan email kamu, kami kirim link untuk reset password.
      </p>
      <ForgotPasswordForm />
    </main>
  );
}
