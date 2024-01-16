import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className="mx-auto max-w-7xl">{children}</div>
      <Footer />
    </main>
  );
}
