// src/app/search/page.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";

interface ColoringPage {
  id: string;
  title: string;
  imageSrc: string;
  categories: string[];
}

// Mock data - extensive list of coloring pages
const allColoringPages: ColoringPage[] = [
  { id: '1', title: 'Flower Garden', imageSrc:'/Fantasy-Worlds.png', categories: ['Nature', 'Plants'] },
  { id: '2', title: 'Cute Animals', imageSrc:'/Fantasy-Worlds.png', categories: ['Animals', 'Cute'] },
  { id: '3', title: 'Space Adventure', imageSrc:'/Fantasy-Worlds.png', categories: ['Space', 'Sci-Fi'] },
  { id: '4', title: 'Underwater World', imageSrc:'/Fantasy-Worlds.png', categories: ['Nature', 'Sea Life'] },
  { id: '5', title: 'Magical Forest', imageSrc:'/Fantasy-Worlds.png', categories: ['Nature', 'Fantasy'] },
  { id: '6', title: 'Dinosaur Land', imageSrc:'/Fantasy-Worlds.png', categories: ['Animals', 'Prehistoric'] },
  { id: '7', title: 'Princess Castle', imageSrc:'/Fantasy-Worlds.png', categories: ['Fantasy', 'Buildings'] },
  { id: '8', title: 'Superhero City', imageSrc:'/Fantasy-Worlds.png', categories: ['Fantasy', 'Urban'] },
  { id: '9', title: 'Tropical Beach', imageSrc:'/Fantasy-Worlds.png', categories: ['Nature', 'Landscape'] },
  { id: '10', title: 'Farm Animals', imageSrc:'/Fantasy-Worlds.png', categories: ['Animals', 'Rural'] },
  { id: '11', title: 'Enchanted Garden', imageSrc:'/Fantasy-Worlds.png', categories: ['Nature', 'Fantasy'] },
];

const SkeletonCard = () => (
  <Card className="overflow-hidden">
    <CardContent className="p-2">
      <div className="relative aspect-square bg-gray-200 animate-pulse rounded-md"></div>
      <div className="h-4 bg-gray-200 rounded mt-2 animate-pulse"></div>
      <div className="h-3 bg-gray-200 rounded mt-1 w-2/3 animate-pulse"></div>
    </CardContent>
  </Card>
);

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<ColoringPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate a delay to show the skeleton loader (remove this in production)
    setTimeout(() => {
      const searchResults = allColoringPages.filter(page =>
        page.title.toLowerCase().includes(query.toLowerCase()) ||
        page.categories.some(category => category.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(searchResults);
      setIsLoading(false);
    }, 1000); // Simulated 1-second delay
  }, [query]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      );
    }

    if (results.length === 0) {
      return <p className="text-lg text-center">No results found. Try a different search term.</p>;
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {results.map((page) => (
          <Link key={page.id} href={`/coloringpages/${page.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-2">
                <div className="relative aspect-square">
                  <Image
                    src={page.imageSrc}
                    alt={page.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h2 className="text-sm font-semibold truncate mt-2 font-fredoka">{page.title}</h2>
                <p className="text-xs text-gray-500 mt-1">{page.categories.join(', ')}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 font-fredoka text-center text-purple-600">Search Results for {query}</h1>
      {renderContent()}
    </div>
  );
}