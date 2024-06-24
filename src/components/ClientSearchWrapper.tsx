// src/components/ClientSearchWrapper.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import Image from 'next/image';
import { allColoringPages } from '@/data/mockColoringPages';

// Category hashtags
const categories = ['Animals', 'Nature', 'Fantasy', 'Characters', 'Vehicles', 'Space', 'Underwater', 'Holidays'];

const ClientSearchWrapper: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filteredPages, setFilteredPages] = useState<typeof allColoringPages>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const originalTopRef = useRef<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (typeof window !== 'undefined' && searchBarRef.current) {
        if (originalTopRef.current === null) {
          originalTopRef.current = searchBarRef.current.getBoundingClientRect().top + currentScrollY;
        }

        if (currentScrollY > originalTopRef.current) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }

      // Close dropdown if scrolling occurs
      if (currentScrollY !== lastScrollY) {
        setIsDropdownOpen(false);
      }

      lastScrollY = currentScrollY;
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    const lowercasedQuery = query.toLowerCase().trim();
    if (lowercasedQuery === '') {
      setFilteredPages([]);
      setIsDropdownOpen(false);
      setHasSearched(false);
    } else {
      const filtered = allColoringPages.filter(page =>
        page.title.toLowerCase().includes(lowercasedQuery) ||
        page.categories.some(category => category.toLowerCase().includes(lowercasedQuery))
      );
      setFilteredPages(filtered.slice(0, 6));
      setIsDropdownOpen(true);
      setHasSearched(true);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsDropdownOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    setFilteredPages([]);
    setIsDropdownOpen(false);
    setHasSearched(false);
    inputRef.current?.focus();
  };

  const handleCategoryClick = (category: string) => {
    setQuery(category);
  };

  const renderHashtagButtons = () => (
    <div className="flex flex-wrap gap-2 mt-2">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => handleCategoryClick(category)}
          className="px-2 py-1 text-xs bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-200"
        >
          #{category}
        </button>
      ))}
    </div>
  );

  return (
    <div className="w-full bg-gray-100">
      <div 
        ref={searchBarRef}
        className={`w-full transition-all duration-300 ease-in-out ${
          isSticky ? 'fixed top-0 left-0 right-0 z-50 bg-gray-100 shadow-md py-4' : ''
        }`}
      >
        <Link href="/" className="absolute left-10 top-9 -translate-y-1/2 hidden lg:block pt-1">
          <Image
            src="/colorme.gg.png"
            alt="ColorMe Logo"
            width={200}
            height={200}
            className="w-auto h-[70px]"
          />
        </Link>
        <div className="max-w-6xl mx-auto px-4 relative flex items-center">
          <div className="flex-grow">
            <form onSubmit={handleSearch} className="relative">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search for coloring pages..."
                value={query}
                onChange={handleInputChange}
                className="w-full pl-10 pr-10 py-2 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              {query && (
                <Button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-transparent p-1"
                >
                  <X className="text-gray-400" size={20} />
                </Button>
              )}
            </form>
            
            {isDropdownOpen && (
              <div 
                ref={dropdownRef} 
                className="absolute z-50 w-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Preview Results</h3>
                  {filteredPages.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {filteredPages.map((page) => (
                        <Link 
                          key={page.id} 
                          href={`/coloringpages/${page.id}`}
                          onClick={() => setIsDropdownOpen(false)}
                          className="block hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-150 ease-in-out"
                        >
                          <div className="aspect-square relative mb-2">
                            <Image 
                              src={page.imageSrc} 
                              alt={page.title}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-lg"
                            />
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-200 truncate">{page.title}</p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    hasSearched && <p className="text-sm text-gray-500 dark:text-gray-400">No results found for {query}</p>
                  )}
                  <div className="mt-4 text-center">
                    <Button
                      onClick={handleSearch}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      See all results
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4">
          {renderHashtagButtons()}
        </div>
      </div>
      
      {isSticky && <div style={{ height: '60px' }}></div>}
    </div>
  );
};

export default ClientSearchWrapper;