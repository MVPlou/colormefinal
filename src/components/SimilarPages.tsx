// src/components/SimilarPages.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";

interface ColoringPage {
  id: string;
  title: string;
  slug: string;
  thumbnail_url: string;

}

interface SimilarPagesProps {
  pages: ColoringPage[];
}

const SimilarPages: React.FC<SimilarPagesProps> = ({ pages }) => {
  return (
    <div className="mt-16 mb-8">
      <h2 className="text-2xl font-bold mb-6 font-fredoka text-purple-600 text-center">Similar Pages</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 justify-center text-center ">
        {pages.slice(0, 4).map((page) => (
          <Link key={page.slug} href={`/coloringpages/${page.slug}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-2">
              <div className="relative aspect-square">
                      <Image
                        src={page.thumbnail_url}
                        alt={`${page.title} coloring page thumbnail`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                <h3 className="text-sm font-semibold truncate mt-2 font-fredoka">{page.title}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarPages;