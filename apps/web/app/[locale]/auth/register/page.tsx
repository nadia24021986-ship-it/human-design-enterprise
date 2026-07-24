import { RegisterForm } from '@/presentation/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-semibold mb-6">Daftar Akun</h1>
      <RegisterForm />
    </main>
  );
}
