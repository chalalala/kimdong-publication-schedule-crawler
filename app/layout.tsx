import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Kim Dong's Publication Crawler",
  description: 'Crawl publication schedule from nxbkimdong.com.vn',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='font-inter'>{children}</body>
    </html>
  );
}
