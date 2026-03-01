import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tilago - Premium Digital Marketplace',
  description: 'Buy and sell premium digital products including stream alerts, editing assets, overlays, templates, and custom design services.',
  keywords: 'digital marketplace, stream alerts, editing assets, overlays, templates, design services',
  openGraph: {
    title: 'Tilago - Premium Digital Marketplace',
    description: 'Buy and sell premium digital products including stream alerts, editing assets, overlays, templates, and custom design services.',
    url: 'https://tilago.com',
    siteName: 'Tilago',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}