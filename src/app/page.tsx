// src/app/page.tsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card"
import ClientSearchWrapper from '@/components/ClientSearchWrapper';
import TrendingCarousel from '@/components/TrendingCarousel';

const coloringPages = [
  { id: '1', title: 'Flowers Garden', imageUrl: '/api/placeholder/200/200' },
  { id: '2', title: 'Cute Animals', imageUrl: '/api/placeholder/200/200' },
  { id: '3', title: 'Space Adventure', imageUrl: '/api/placeholder/200/200' },
  { id: '4', title: 'Underwater World', imageUrl: '/api/placeholder/200/200' },
  { id: '5', title: 'Magical Forest', imageUrl: '/api/placeholder/200/200' },
  { id: '6', title: 'Dinosaur Land', imageUrl: '/api/placeholder/200/200' },
  { id: '1', title: 'Flowers Garden', imageUrl: '/api/placeholder/200/200' },
  { id: '2', title: 'Cute Animals', imageUrl: '/api/placeholder/200/200' },
  { id: '3', title: 'Space Adventure', imageUrl: '/api/placeholder/200/200' },
  { id: '4', title: 'Underwater World', imageUrl: '/api/placeholder/200/200' },
  { id: '5', title: 'Magical Forest', imageUrl: '/api/placeholder/200/200' },
  { id: '6', title: 'Dinosaur Land', imageUrl: '/api/placeholder/200/200' },
  { id: '1', title: 'Flowers Garden', imageUrl: '/api/placeholder/200/200' },
  { id: '2', title: 'Cute Animals', imageUrl: '/api/placeholder/200/200' },
  { id: '3', title: 'Space Adventure', imageUrl: '/api/placeholder/200/200' },
  { id: '4', title: 'Underwater World', imageUrl: '/api/placeholder/200/200' },
  { id: '5', title: 'Magical Forest', imageUrl: '/api/placeholder/200/200' },
  { id: '6', title: 'Dinosaur Land', imageUrl: '/api/placeholder/200/200' },
  { id: '1', title: 'Flowers Garden', imageUrl: '/api/placeholder/200/200' },
  { id: '2', title: 'Cute Animals', imageUrl: '/api/placeholder/200/200' },
  { id: '3', title: 'Space Adventure', imageUrl: '/api/placeholder/200/200' },
  { id: '4', title: 'Underwater World', imageUrl: '/api/placeholder/200/200' },
  { id: '5', title: 'Magical Forest', imageUrl: '/api/placeholder/200/200' },
  { id: '6', title: 'Dinosaur Land', imageUrl: '/api/placeholder/200/200' },
  { id: '1', title: 'Flowers Garden', imageUrl: '/api/placeholder/200/200' },
  { id: '2', title: 'Cute Animals', imageUrl: '/api/placeholder/200/200' },
  { id: '3', title: 'Space Adventure', imageUrl: '/api/placeholder/200/200' },
  { id: '4', title: 'Underwater World', imageUrl: '/api/placeholder/200/200' },
  { id: '5', title: 'Magical Forest', imageUrl: '/api/placeholder/200/200' },
  { id: '6', title: 'Dinosaur Land', imageUrl: '/api/placeholder/200/200' },
  { id: '1', title: 'Flowers Garden', imageUrl: '/api/placeholder/200/200' },
  { id: '2', title: 'Cute Animals', imageUrl: '/api/placeholder/200/200' },
  { id: '3', title: 'Space Adventure', imageUrl: '/api/placeholder/200/200' },
  { id: '4', title: 'Underwater World', imageUrl: '/api/placeholder/200/200' },
  { id: '5', title: 'Magical Forest', imageUrl: '/api/placeholder/200/200' },
  { id: '6', title: 'Dinosaur Land', imageUrl: '/api/placeholder/200/200' },
  { id: '1', title: 'Flowers Garden', imageUrl: '/api/placeholder/200/200' },
  { id: '2', title: 'Cute Animals', imageUrl: '/api/placeholder/200/200' },
  { id: '3', title: 'Space Adventure', imageUrl: '/api/placeholder/200/200' },
  { id: '4', title: 'Underwater World', imageUrl: '/api/placeholder/200/200' },
  { id: '5', title: 'Magical Forest', imageUrl: '/api/placeholder/200/200' },
  { id: '6', title: 'Dinosaur Land', imageUrl: '/api/placeholder/200/200' },
  { id: '1', title: 'Flowers Garden', imageUrl: '/api/placeholder/200/200' },
  { id: '2', title: 'Cute Animals', imageUrl: '/api/placeholder/200/200' },
  { id: '3', title: 'Space Adventure', imageUrl: '/api/placeholder/200/200' },
  { id: '4', title: 'Underwater World', imageUrl: '/api/placeholder/200/200' },
  { id: '5', title: 'Magical Forest', imageUrl: '/api/placeholder/200/200' },
  { id: '6', title: 'Dinosaur Land', imageUrl: '/api/placeholder/200/200' },
  { id: '1', title: 'Flowers Garden', imageUrl: '/api/placeholder/200/200' },
  { id: '2', title: 'Cute Animals', imageUrl: '/api/placeholder/200/200' },
  { id: '3', title: 'Space Adventure', imageUrl: '/api/placeholder/200/200' },
  { id: '4', title: 'Underwater World', imageUrl: '/api/placeholder/200/200' },
  { id: '5', title: 'Magical Forest', imageUrl: '/api/placeholder/200/200' },
  { id: '6', title: 'Dinosaur Land', imageUrl: '/api/placeholder/200/200' },
  // ... (other items)
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 rounded ">  
      <TrendingCarousel />
      
      <div className="max-w-6xl mx-auto px-4 py-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">All Coloring Pages</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {coloringPages.map((page) => (
            <Card key={page.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-48">
              <CardContent className="p-2">
                <img src={page.imageUrl} alt={page.title} className="w-full h-48 object-cover mb-2 rounded" />
                <h2 className="text-sm font-semibold truncate">{page.title}</h2>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}