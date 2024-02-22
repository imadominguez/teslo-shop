import { Footer, Sidebar, TopMenu } from '@/components';
import { Toaster } from 'sonner';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="dark:bg-bg-dark-100 bg-bg-100 dark:text-text-dark-100 relative min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className="mx-auto min-h-[calc(100vh-400px)] max-w-7xl sm:px-5 md:px-10">
        {children}
      </div>
      <Footer />
      <Toaster richColors />
    </main>
  );
}
