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
    <main className="relative flex min-h-screen justify-center bg-white dark:bg-dark dark:text-dark-text">
      <div className="w-full px-10 sm:w-[450px]">{children}</div>
    </main>
  );
}
