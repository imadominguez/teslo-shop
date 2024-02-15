import { Footer, Sidebar, TopMenu } from '@/components';
import { Toaster } from 'sonner';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="dark:bg-dark relative min-h-screen bg-white dark:text-dark-text">
      <TopMenu />
      <Sidebar />
      <div className="mx-auto min-h-[calc(100vh-150px)] max-w-7xl md:px-10">
        {children}
      </div>
      <Footer />
      <Toaster richColors />
    </main>
  );
}
