import { getCurrentUser } from '@/application/auth/actions';
import { logoutAction } from '@/application/auth/actions';
import { redirect } from 'next/navigation';

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 gap-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="text-center">
        <p>Halo, {user.fullName}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <p className="text-sm text-muted-foreground">
          Role: <span className="font-medium">{user.role}</span>
        </p>
      </div>

      <form action={logoutAction.bind(null, locale)}>
        <button
          type="submit"
          className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm"
        >
          Keluar
        </button>
      </form>
    </main>
  );
}
