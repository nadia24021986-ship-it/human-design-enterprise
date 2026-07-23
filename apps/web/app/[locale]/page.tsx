import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('common');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-semibold">{t('appName')}</h1>
      <p className="text-muted-foreground mt-2">{t('welcome')}</p>
    </main>
  );
}
