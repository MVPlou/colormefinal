// src/app/layout.tsx
import React from 'react';
import ClientSearchWrapper from '@/components/ClientSearchWrapper';
import MobileFloatingNavbar from '@/components/MobileFloatingNavbar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import './globals.css';import { Inter, Fredoka } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const fredoka = Fredoka({ subsets: ['latin'], variable: '--font-fredoka' })



export const metadata = {
  title: 'Coloring Page Templates',
  description: 'Find and download coloring page templates',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const handleSearch = async (query: string) => {
    'use server'
    // Implement your server-side search logic here
    console.log('Server-side search for:', query);
    // For now, we'll just log the query
    // In a real application, you'd redirect to a search results page
  };

  return (
    <html lang="en">
      <body className={`${inter.className} ${fredoka.variable}`}>
        <div className="min-h-screen bg-white">
          <div className="py-8 px-4 bg-gray-100">
            <div className="max-w-6xl mx-auto">
              <ClientSearchWrapper  />
            </div>
          </div>
          <main className="max-w-6xl mx-auto px-4 py-8 mb-16 md:mb-8 ">
            {children}
          </main>
          <Footer />
          <MobileFloatingNavbar />
        </div>
      </body>
    </html>
  );
}