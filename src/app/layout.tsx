import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title:
    'FIBA Asia Cup 2025 🇱🇧 | Live Basketball Scores & Updates | #YallaLebnen',
  description:
    'Follow the FIBA Asia Cup 2025 live! 🏀 Get real-time scores, standings, news and live streams. Support Lebanon 🇱🇧 with #YallaLebnen. The ultimate destination for Asian basketball tournament updates.',
  keywords:
    'FIBA Asia Cup 2025, Lebanon basketball, YallaLebnen, live basketball scores, Asia basketball tournament, Lebanon national team, basketball standings, live stream basketball',
  authors: [{ name: 'FIBA Asia Cup 2025' }],
  creator: 'FIBA Asia Cup 2025',
  publisher: 'FIBA Asia Cup 2025',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://leb-basketball-site-next.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FIBA Asia Cup 2025 🇱🇧 | Live Basketball Updates | #YallaLebnen',
    description:
      'Follow the FIBA Asia Cup 2025 live! 🏀 Get real-time scores, standings, news and live streams. Support Lebanon 🇱🇧 with #YallaLebnen.',
    url: 'https://leb-basketball-site-next.vercel.app',
    siteName: 'FIBA Asia Cup 2025',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FIBA Asia Cup 2025 - Lebanon Basketball 🇱🇧 #YallaLebnen',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIBA Asia Cup 2025 🇱🇧 | Live Basketball Updates | #YallaLebnen',
    description:
      'Follow the FIBA Asia Cup 2025 live! 🏀 Get real-time scores, standings, news and live streams. Support Lebanon 🇱🇧 with #YallaLebnen.',
    images: ['/og-image.jpg'],
    creator: '@FIBAAsiaCup',
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#16a34a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FIBA Asia Cup 2025" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <main>
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
