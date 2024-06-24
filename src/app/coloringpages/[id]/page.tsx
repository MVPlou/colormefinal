// src/app/coloringpages/[id]/page.tsx
import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SimilarPages from '@/components/SimilarPages';

// Mock data - replace with actual data fetching logic
const coloringPage = {
  id: '96172-flowersgarden',
  title: 'Flowers Garden',
  imageSrc: '/Fantasy-Worlds.png',
  category: 'Nature',
  downloads: 1975,
  addedDate: 'June 19, 2024',
  tags: ['flowers', 'garden', 'nature', 'spring', 'coloring'],
};

// Mock similar pages - replace with actual data fetching logic
const similarPages = [
  { id: '1', title: 'Butterfly Garden', imageSrc: '/Fantasy-Worlds.png' },
  { id: '2', title: 'Spring Meadow', imageSrc: '/Fantasy-Worlds.png' },
  { id: '3', title: 'Tropical Paradise', imageSrc: '/Fantasy-Worlds.png' },
  { id: '4', title: 'Forest Animals', imageSrc: '/Fantasy-Worlds.png' },
  { id: '5', title: 'Seaside Adventure', imageSrc: '/api/placeholder/200/200' },
];

export default function ColoringPageDetails() {
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Image and main info */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="aspect-square relative mb-4">
                <Image 
                  src={coloringPage.imageSrc} 
                  alt={coloringPage.title} 
                  layout="fill" 
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
              <h1 className="text-2xl font-bold mb-4 dark:text-white font-fredoka">{coloringPage.title}</h1>
              <div className="flex flex-wrap gap-2">
                <Button className="flex-grow sm:flex-grow-0">🖨️ Download PDF</Button>
                <Button variant="outline" className="flex-grow sm:flex-grow-0 dark:text-gray-300 dark:border-gray-600">🖼️ Download PNG</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Details, Tags, and Ad Space */}
        <div className="space-y-6">
          <Card className="dark:bg-gray-800">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white font-fredoka">Details</h2>
              <ul className="space-y-2 dark:text-gray-300">
                <li><strong>Category:</strong> {coloringPage.category}</li>
                <li><strong>Downloads:</strong> {coloringPage.downloads}</li>
                <li><strong>Added:</strong> {coloringPage.addedDate}</li>
                <li><strong>ID:</strong> {coloringPage.id}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4 dark:text-white font-fredoka">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {coloringPage.tags.map(tag => (
                  <span key={tag} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm dark:text-gray-300">{tag}</span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ad Space */}
          <div className="w-full h-[300px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg">
            <div className="text-center">
              <p>Advertisement Space</p>
              <p className="text-sm">(300x250)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Pages section */}
      <SimilarPages pages={similarPages} />
    </div>
  );
}