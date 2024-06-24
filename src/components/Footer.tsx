// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Coloring Pages</h3>
            <p className="text-sm">Discover and download beautiful coloring pages for all ages.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-blue-500 dark:hover:text-blue-400">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-500 dark:hover:text-blue-400">About Us</Link></li>
              <li><Link href="/categories" className="hover:text-blue-500 dark:hover:text-blue-400">Categories</Link></li>
              <li><Link href="/contact" className="hover:text-blue-500 dark:hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-blue-500 dark:hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-blue-500 dark:hover:text-blue-400">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-blue-500 dark:hover:text-blue-400">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400"><Facebook size={24} /></a>
              <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400"><Twitter size={24} /></a>
              <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400"><Instagram size={24} /></a>
              <a href="#" className="hover:text-blue-500 dark:hover:text-blue-400"><Youtube size={24} /></a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Coloring Pages. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;