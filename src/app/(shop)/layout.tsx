import { Footer, Sidebar, TopMenu } from '@/components';
import { Toaster } from 'sonner';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen bg-white dark:bg-dark dark:text-dark-text">
      <TopMenu />
      <Sidebar />
      <div className="mx-auto min-h-[calc(100vh-150px)] max-w-7xl sm:px-5 md:px-10">
        {children}
      </div>
      <Footer />
      <Toaster richColors />
    </main>
  );
}
