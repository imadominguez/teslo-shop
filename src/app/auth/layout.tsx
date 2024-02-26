import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect('/');
  }
  return (
    <main className="dark:bg-dark dark:text-dark-text relative flex min-h-screen justify-center bg-white dark:bg-bg-dark-100">
      <div className="w-full px-10 sm:w-[400px]">{children}</div>
    </main>
  );
}
