import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { inter } from '@/config/fonts';

import './globals.css';
import { Providers } from '@/components';

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | SHOP',
    default: 'Home',
  },
  description: 'Una tienda virtual de productos de ropa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
