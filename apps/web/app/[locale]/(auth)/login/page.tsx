import { LoginForm } from '@/presentation/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-semibold mb-6">Masuk</h1>
      <LoginForm />
    </main>
  );
}
