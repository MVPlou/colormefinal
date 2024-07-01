import React from 'react';
import ClientSearchWrapper from '@/components/ClientSearchWrapper';
import MobileFloatingNavbar from '@/components/MobileFloatingNavbar';
import Footer from '@/components/Footer';
import './globals.css';
import { Inter, Fredoka } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const fredoka = Fredoka({ 
  subsets: ['latin'], 
  variable: '--font-fredoka',
  display: 'swap',
})

export const metadata = {
  title: 'Coloring Page Templates',
  description: 'Find and download coloring page templates',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fredoka.variable} ${inter.variable}`}>
      <body className="font-sans bg-white flex flex-col min-h-screen">
        <div className="py-4 px-4 bg-gray-100 shadow-md">
          <div className="max-w-6xl mx-auto">
            <ClientSearchWrapper />
          </div>
        </div>
        <main className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
          {children}
        </main>
        <Footer />
        <MobileFloatingNavbar />
      </body>
    </html>
  );
}