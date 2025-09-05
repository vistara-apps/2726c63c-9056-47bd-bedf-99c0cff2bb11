import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LexiGuard - Your Rights, Simplified',
  description: 'Know what to say, instantly. State-specific legal rights and scenario-based scripts for law enforcement interactions.',
  keywords: 'legal rights, law enforcement, scripts, emergency, recording',
  authors: [{ name: 'LexiGuard Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#1e293b',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
