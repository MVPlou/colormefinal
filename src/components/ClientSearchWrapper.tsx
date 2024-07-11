'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/utils/supabase';
import debounce from 'lodash/debounce';

// Category hashtags
const categories = ['Animals', 'Nature', 'Fantasy', 'Characters', 'Vehicles', 'Space', 'Underwater', 'Holidays'];

const ClientSearchWrapper: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filteredPages, setFilteredPages] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const originalTopRef = useRef<number | null>(null);
  const router = useRouter();

  const debouncedSearch = useRef(
    debounce(async (searchQuery: string) => {
      if (searchQuery.trim() === '') {
        setFilteredPages([]);
        setIsDropdownOpen(false);
        setHasSearched(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('coloring_pages')
          .select('id, title, image_url, slug')
          .ilike('title', `%${searchQuery}%`)
          .limit(6);

        if (error) throw error;

        setFilteredPages(data || []);
        setIsDropdownOpen(true);
        setHasSearched(true);
      } catch (error) {
        console.error('Error searching coloring pages:', error);
        // You might want to set an error state here and display it to the user
      } finally {
        setIsLoading(false);
      }
    }, 300)
  ).current;

  useEffect(() => {
    if (query.trim() !== '') {
      debouncedSearch(query);
    } else {
      setFilteredPages([]);
      setIsDropdownOpen(false);
      setHasSearched(false);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsDropdownOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim() !== '') {
      setIsDropdownOpen(true);
      debouncedSearch(newQuery);
    } else {
      setIsDropdownOpen(false);
      setFilteredPages([]);
    }
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
    <div className="md:flex md:justify-content-center md:flex-wrap md:gap-2 mt-2 overflow-x-auto md:overflow-x-visible whitespace-nowrap md:whitespace-normal pb-2 px-4 md:px-0 scrollbar-hide">
      <div className="inline-flex md:flex md:flex-wrap gap-2">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category)}
            className="px-2 py-1 text-xs bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-200 flex-shrink-0"
          >
            #{category}
          </button>
        ))}
      </div>
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
          <p className='font-fredoka font-bold  text-3xl'>COLORME.</p><p className='text-3xl font-fredoka font-bold  text-purple-600'>GG</p>
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
            
            {(isDropdownOpen || isLoading) && query.trim() !== '' && (
              <div 
                ref={dropdownRef} 
                className="absolute z-50 w-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Preview Results</h3>
                  {isLoading ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
                  ) : filteredPages.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {filteredPages.map((page) => (
                        <Link 
                          key={page.id} 
                          href={`/coloringpages/${page.slug}`}
                          onClick={() => setIsDropdownOpen(false)}
                          className="block hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition duration-150 ease-in-out"
                        >
                          <div className="aspect-square relative mb-2">
                            <Image 
                              src={page.image_url} 
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
        {/* <div className="max-w-6xl mx-auto px-4 mt-2">
          {renderHashtagButtons()}
        </div> */}
      </div>
      
      {isSticky && <div style={{ height: '60px' }}></div>}
    </div>
  );
};

export default ClientSearchWrapper;