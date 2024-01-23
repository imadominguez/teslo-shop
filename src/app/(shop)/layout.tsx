import { Footer, Sidebar, TopMenu } from '@/components';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className="mx-auto min-h-[calc(100vh-150px)] max-w-7xl md:px-10">
        {children}
      </div>
      <Footer />
    </main>
  );
}
