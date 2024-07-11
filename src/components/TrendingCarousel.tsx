// src/components/TrendingCarousel.tsx
'use client'

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface TrendingPage {
  id: string;
  title: string;
  imageSrc: string;
}

const trendingPages: TrendingPage[] = [
  { id: '1', title: 'Unicorn Dreams', imageSrc: '/Fantasy-Worlds.png' },
  { id: '1', title: 'Unicorn Dreams', imageSrc: '/Fantasy-Worlds.png' },
  { id: '1', title: 'Unicorn Dreams', imageSrc: '/Fantasy-Worlds.png' },
  { id: '1', title: 'Unicorn Dreams', imageSrc: '/Fantasy-Worlds.png' },
  { id: '1', title: 'Unicorn Dreams', imageSrc: '/Fantasy-Worlds.png' },
  { id: '1', title: 'Unicorn Dreams', imageSrc: '/Fantasy-Worlds.png' },
  { id: '1', title: 'Unicorn Dreams', imageSrc: '/Fantasy-Worlds.png' },
  { id: '1', title: 'Unicorn Dreams', imageSrc: '/Fantasy-Worlds.png' },
  { id: '1', title: 'Unicorn Dreams', imageSrc: '/Fantasy-Worlds.png' },
  { id: '1', title: 'Unicorn Dreams', imageSrc: '/Fantasy-Worlds.png' },
  { id: '1', title: 'Unicorn Dreams', imageSrc: '/Fantasy-Worlds.png' },
  { id: '1', title: 'Unicorn Dreams', imageSrc: '/Fantasy-Worlds.png' },

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
    <div className="max-w-6xl mx-auto px-5 py-5 my-8">
      <h2 className="text-3xl font-semibold  mb-4 text-center ">Trending Coloring Pages</h2>
      <div 
        ref={scrollRef}
        className="flex overflow-x-hidden scrollbar-hide"
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
                  src={page.imageSrc}
                  alt={page.title}
                  layout="fill"
                  objectFit="cover"
                  sizes='(max-width: 768px) 100vw, 1280px'
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