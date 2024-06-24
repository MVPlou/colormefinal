// src/components/TrendingCarousel.tsx
'use client'

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TrendingPage {
  id: string;
  title: string;
  imageUrl: string;
}

const trendingPages: TrendingPage[] = [
  { id: '1', title: 'Unicorn Dreams', imageUrl: '/api/placeholder/200/200' },
  { id: '2', title: 'Jungle Adventure', imageUrl: '/api/placeholder/200/200' },
  { id: '3', title: 'Ocean Wonders', imageUrl: '/api/placeholder/200/200' },
  { id: '4', title: 'Space Explorers', imageUrl: '/api/placeholder/200/200' },
  { id: '5', title: 'Enchanted Forest', imageUrl: '/api/placeholder/200/200' },
  { id: '6', title: 'Dinosaur World', imageUrl: '/api/placeholder/200/200' },
  { id: '7', title: 'Fairy Tale Castle', imageUrl: '/api/placeholder/200/200' },
  { id: '8', title: 'Underwater Kingdom', imageUrl: '/api/placeholder/200/200' },
  // Duplicate the array to create a seamless loop
  { id: '9', title: 'Unicorn Dreams', imageUrl: '/api/placeholder/200/200' },
  { id: '10', title: 'Jungle Adventure', imageUrl: '/api/placeholder/200/200' },
  { id: '11', title: 'Ocean Wonders', imageUrl: '/api/placeholder/200/200' },
  { id: '12', title: 'Space Explorers', imageUrl: '/api/placeholder/200/200' },
  { id: '13', title: 'Enchanted Forest', imageUrl: '/api/placeholder/200/200' },
  { id: '14', title: 'Dinosaur World', imageUrl: '/api/placeholder/200/200' },
  { id: '15', title: 'Fairy Tale Castle', imageUrl: '/api/placeholder/200/200' },
  { id: '16', title: 'Underwater Kingdom', imageUrl: '/api/placeholder/200/200' },
];

const TrendingCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let isPaused = false;
    let scrollPosition = 0;

    const scroll = () => {
      if (!isPaused) {
        scrollPosition += 0.5; // Reduced scroll speed
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Trending Coloring Pages</h2>
      <div 
        ref={scrollRef}
        className="flex overflow-x-hidden"
        style={{ 
          width: '100%',
          whiteSpace: 'nowrap'
        }}
      >
        {trendingPages.map((page, index) => (
          <Link 
            key={`${page.id}-${index}`} 
            href={`/coloringpages/${page.id}`} 
            className="inline-block w-48 flex-shrink-0 mr-4 transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg h-64">
              <div className="relative h-48">
                <Image
                  src={page.imageUrl}
                  alt={page.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-2 h-16 flex items-center">
                <h3 className="text-sm font-semibold line-clamp-2">{page.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingCarousel;