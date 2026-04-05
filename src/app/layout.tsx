import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Yazzed Shop Mart | Premium E-Commerce Experience',
    template: '%s | Yazzed Shop Mart'
  },
  description: 'Shop the latest in fashion, electronics, and daily essentials at Yazzed Shop Mart. Best prices and 3000 EGP free shipping.',
  keywords: ['e-commerce', 'yazzed', 'shopping', 'egp', 'deals', 'fashion', 'electronics'],
  authors: [{ name: 'Yazzed Shop Mart Team' }],
  creator: 'Yazzed Shop Mart',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-gray-900`}>
        <Navbar />
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
