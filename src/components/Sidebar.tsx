'use client';
import React from 'react';
import Link from 'next/link';
import { Home, Search, Heart, Settings } from 'lucide-react';

const Sidebar = () => {
  const sidebarItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Search, label: 'Search', href: '/search' },
    { icon: Heart, label: 'Favorites', href: '/favorites' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className="sidebar bg-gray-800 text-white h-screen fixed left-0 top-0 w-16 hover:w-64 transition-all duration-300 ease-in-out overflow-hidden">
      <div className="h-full overflow-y-auto">
        <div className="text-2xl font-bold mb-8 p-4 whitespace-nowrap">
         
        </div>
        <nav>
          <ul className="space-y-2 px-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href} 
                  className="flex items-center hover:bg-gray-700 rounded h-10 overflow-hidden group"
                >
                  <div className="w-12 flex justify-center items-center flex-shrink-0 h-10 group-hover:w-12 transition-all duration-300">
                    <item.icon size={20} />
                  </div>
                  <span className="ml-3 whitespace-nowrap opacity-0 sidebar-text">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <style jsx>{`
        .sidebar:hover .sidebar-text {
          opacity: 1;
          transition: opacity 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;