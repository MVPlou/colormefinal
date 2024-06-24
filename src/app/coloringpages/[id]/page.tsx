// src/app/coloringpages/[id]/page.tsx
import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Mock data - replace with actual data fetching logic
const coloringPage = {
  id: '96172-flowersgarden',
  title: 'Flowers Garden',
  imageUrl: '/api/placeholder/400/400',
  category: 'Nature',
  downloads: 1975,
  addedDate: 'June 19, 2024',
  tags: ['flowers', 'garden', 'nature', 'spring', 'coloring'],
};

export default function ColoringPageDetails() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Image and main info */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <div className="aspect-square relative mb-4">
                <Image 
                  src={coloringPage.imageUrl} 
                  alt={coloringPage.title} 
                  layout="fill" 
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
              <h1 className="text-2xl font-bold mb-4">{coloringPage.title}</h1>
              <div className="flex flex-wrap gap-2">
                <Button className="flex-grow sm:flex-grow-0">🖨️ Download PDF</Button>
                <Button variant="outline" className="flex-grow sm:flex-grow-0">🖼️ Download PNG</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Details, Tags, and Ad Space */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Details</h2>
              <ul className="space-y-2">
                <li><strong>Category:</strong> {coloringPage.category}</li>
                <li><strong>Downloads:</strong> {coloringPage.downloads}</li>
                <li><strong>Added:</strong> {coloringPage.addedDate}</li>
                <li><strong>ID:</strong> {coloringPage.id}</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {coloringPage.tags.map(tag => (
                  <span key={tag} className="bg-gray-200 px-3 py-1 rounded-full text-sm">{tag}</span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ad Space */}
          <div className="w-full h-[269px] bg-gray-200 flex items-center justify-center text-gray-500 border border-gray-300 rounded-lg">
            <p>Ad Space</p>
            <p className="text-sm">(300x250)</p>
          </div>
        </div>
      </div>

      {/* Additional sections can be added here, such as related coloring pages or comments */}
    </div>
  );
}