import type { Metadata } from 'next';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';

import './globals.css';

export const metadata: Metadata = {
  title: "Kim Dong's Publication Crawler",
  description: 'Crawl publication schedule from nxbkimdong.com.vn',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='font-inter'>
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
