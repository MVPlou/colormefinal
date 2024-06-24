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
  imageUrl: string;
  categories: string[];
}

// Mock data - extensive list of coloring pages
const allColoringPages: ColoringPage[] = [
  { id: '1', title: 'Flower Garden', imageUrl: '/api/placeholder/200/200', categories: ['Nature', 'Plants'] },
  { id: '2', title: 'Cute Animals', imageUrl: '/api/placeholder/200/200', categories: ['Animals', 'Cute'] },
  { id: '3', title: 'Space Adventure', imageUrl: '/api/placeholder/200/200', categories: ['Space', 'Sci-Fi'] },
  { id: '4', title: 'Underwater World', imageUrl: '/api/placeholder/200/200', categories: ['Nature', 'Sea Life'] },
  { id: '5', title: 'Magical Forest', imageUrl: '/api/placeholder/200/200', categories: ['Nature', 'Fantasy'] },
  { id: '6', title: 'Dinosaur Land', imageUrl: '/api/placeholder/200/200', categories: ['Animals', 'Prehistoric'] },
  { id: '7', title: 'Princess Castle', imageUrl: '/api/placeholder/200/200', categories: ['Fantasy', 'Buildings'] },
  { id: '8', title: 'Superhero City', imageUrl: '/api/placeholder/200/200', categories: ['Fantasy', 'Urban'] },
  { id: '9', title: 'Tropical Beach', imageUrl: '/api/placeholder/200/200', categories: ['Nature', 'Landscape'] },
  { id: '10', title: 'Farm Animals', imageUrl: '/api/placeholder/200/200', categories: ['Animals', 'Rural'] },
  { id: '11', title: 'Enchanted Garden', imageUrl: '/api/placeholder/200/200', categories: ['Nature', 'Fantasy'] },
  { id: '12', title: 'Wild Safari', imageUrl: '/api/placeholder/200/200', categories: ['Animals', 'Nature'] },
  { id: '13', title: 'Outer Space Exploration', imageUrl: '/api/placeholder/200/200', categories: ['Space', 'Sci-Fi'] },
  { id: '14', title: 'Fairy Tale Characters', imageUrl: '/api/placeholder/200/200', categories: ['Fantasy', 'Characters'] },
  { id: '15', title: 'Ocean Creatures', imageUrl: '/api/placeholder/200/200', categories: ['Animals', 'Sea Life'] },
  { id: '16', title: 'Forest Friends', imageUrl: '/api/placeholder/200/200', categories: ['Animals', 'Nature'] },
  { id: '17', title: 'Magical Unicorns', imageUrl: '/api/placeholder/200/200', categories: ['Fantasy', 'Animals'] },
  { id: '18', title: 'Cityscape', imageUrl: '/api/placeholder/200/200', categories: ['Urban', 'Buildings'] },
  { id: '19', title: 'Jungle Exploration', imageUrl: '/api/placeholder/200/200', categories: ['Nature', 'Adventure'] },
  { id: '20', title: 'Fairy Garden', imageUrl: '/api/placeholder/200/200', categories: ['Fantasy', 'Nature'] },
];

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<ColoringPage[]>([]);

  useEffect(() => {
    // Simple search function - filters pages based on title or categories
    const searchResults = allColoringPages.filter(page =>
      page.title.toLowerCase().includes(query.toLowerCase()) ||
      page.categories.some(category => category.toLowerCase().includes(query.toLowerCase()))
    );
    setResults(searchResults);
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 font-fredoka text-center text-purple-600">Search Results for "{query}"</h1>
      {results.length === 0 ? (
        <p className="text-lg">No results found. Try a different search term.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map((page) => (
            <Link key={page.id} href={`/coloringpages/${page.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-2">
                  <div className="relative aspect-square">
                    <Image
                      src={page.imageUrl}
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
      )}
    </div>
  );
}