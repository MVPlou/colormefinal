import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SimilarPages from '@/components/SimilarPages';
import { Printer, Download, Share2 } from 'lucide-react';
import { getColoringPageBySlug, getSimilarPages } from '@/utils/api';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const coloringPage = await getColoringPageBySlug(params.slug);
  
  if (!coloringPage) {
    return {
      title: 'Coloring Page Not Found',
      description: 'The requested coloring page could not be found.',
    };
  }

  return {
    title: `${coloringPage.title} Coloring Page | Free Printable Coloring Pages`,
    description: `Download and print the ${coloringPage.title} coloring page. Perfect for kids and adults who love ${coloringPage.category.name} themed coloring activities.`,
    openGraph: {
      title: `${coloringPage.title} Coloring Page | Free Printable Coloring Pages`,
      description: `Download and print the ${coloringPage.title} coloring page. Perfect for kids and adults who love ${coloringPage.category.name} themed coloring activities.`,
      images: [{ url: coloringPage.image_url, width: 1200, height: 630, alt: coloringPage.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${coloringPage.title} Coloring Page | Free Printable Coloring Pages`,
      description: `Download and print the ${coloringPage.title} coloring page. Perfect for kids and adults who love ${coloringPage.category.name} themed coloring activities.`,
      images: [coloringPage.image_url],
    },
  };
}

export default async function ColoringPageDetails({ params }: { params: { slug: string } }) {
  const coloringPage = await getColoringPageBySlug(params.slug);

  if (!coloringPage) {
    return <main><h1>Coloring page not found</h1></main>;
  }

  const similarPages = await getSimilarPages(coloringPage.category_id, coloringPage.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: coloringPage.title,
    image: coloringPage.image_url,
    datePublished: coloringPage.created_at,
    author: {
      '@type': 'Organization',
      name: 'Your Website Name',
    },
    genre: coloringPage.category.name,
    interactionStatistic: [
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/DownloadAction',
        userInteractionCount: coloringPage.prints_count,
      },
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/LikeAction',
        userInteractionCount: coloringPage.likes_count,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-5xl mx-auto">
        {/* Add the 728x90 ad space below the navbar */}
        <div className="w-full flex justify-center my-1">
          <div className="rounded-lg w-[728px] h-[90px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600">
            <div className="text-center">
              <p>Advertisement Space</p>
              <p className="text-sm">(728x90)</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2">
              <Card className="overflow-hidden dark:bg-gray-800">
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-4">
                    <Image
                      src={coloringPage.image_url}
                      alt={coloringPage.title}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
                      priority
                    />
                  </div>
                  <h1 className="text-2xl mb-4 dark:text-white font-fredoka">{coloringPage.title}</h1>
                  <div className="flex flex-wrap gap-2">
                    <Button className="flex-grow sm:flex-grow-0">
                      <Printer className="mr-2 h-4 w-4" aria-hidden="true" /> Print
                    </Button>
                    <Button variant="outline" className="flex-grow sm:flex-grow-0 dark:text-gray-300 dark:border-gray-600">
                      <Download className="mr-2 h-4 w-4" aria-hidden="true" /> Download
                    </Button>
                    <Button className="flex-grow sm:flex-grow-0">
                      <Share2 className="mr-2 h-4 w-4" aria-hidden="true" /> Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            <aside className="space-y-6">
              <Card className="dark:bg-gray-800">
                <CardContent className="p-4">
                  <h2 className="text-xl mb-4 dark:text-white font-fredoka">Details</h2>
                  <ul className="space-y-2 dark:text-gray-300">
                    <li>Category: {coloringPage.category.name}</li>
                    <li>Downloads: {coloringPage.prints_count}</li>
                    <li>Likes: {coloringPage.likes_count}</li>
                    <li>Added: <time dateTime={coloringPage.created_at}>{new Date(coloringPage.created_at).toLocaleDateString()}</time></li>
                  </ul>
                </CardContent>
              </Card>

              {coloringPage.tags && coloringPage.tags.length > 0 && (
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
              )}

              <div className="w-full h-[300px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg">
                <div className="text-center">
                  <p>Advertisement Space</p>
                  <p className="text-sm">(300x250)</p>
                </div>
              </div>
            </aside>
          </div>

          <section>
            <SimilarPages pages={similarPages} />
          </section>
        </div>
      </main>
    </>
  );
}