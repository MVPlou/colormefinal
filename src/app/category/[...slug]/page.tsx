import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryBySlug, getSubcategories, getColoringPagesByCategory } from '@/utils/api';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import Filter from '@/components/Filter';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    };
  }

  return {
    title: `${category.name} Coloring Pages | ColorMe.GG`,
    description: `Explore our collection of ${category.name} coloring pages. Free printable coloring sheets for kids and adults.`,
    openGraph: {
      title: `${category.name} Coloring Pages | ColorMe.GG`,
      description: `Discover and print free ${category.name} coloring pages. Perfect for kids and adults who love to color.`,
      type: 'website',
      url: `https://yoursite.com/category/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} Coloring Pages | ColorMe.GG`,
      description: `Free printable ${category.name} coloring pages for all ages. Start coloring now!`,
    },
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategoryBySlug(params.slug);
  
  if (!category) {
    return <div>Category not found</div>;
  }
  
  const subcategories = await getSubcategories(category.id);
  const coloringPages = await getColoringPagesByCategory(category.id);
  
  const breadcrumbItems = [
    { href: '/', label: 'Home' },
    { href: '/categories', label: 'Categories' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-8 py-8 bg-gray-100 rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center">{category.name} Coloring Pages</h1>
      <div className='mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0'>
      <div className='w-full sm:w-auto order-2 sm:order-1'>
        <BreadcrumbNav items={breadcrumbItems} currentPage={category.name} />
      </div>
      <div className='w-full sm:w-auto order-1 sm:order-2'>
        <Filter />
      </div>
    </div>
       {subcategories.length > 0 && (
        <nav aria-label="Subcategories" className="mb-8">
          <h2 className="sr-only">Subcategories</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {subcategories.map((subcat) => (
              <li key={subcat.slug}>
                <Link href={`/category/${subcat.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                    <CardContent className="p-4 text-center h-[192px] flex items-center justify-center">
                    <h3 className="font-semibold">{subcat.name}</h3>
                    </CardContent>
                    
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      
      <section aria-label={`${category.name} Coloring Pages`}>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {coloringPages.map((page) => (
            <li key={page.id}>
              <Link href={`/coloringpages/${page.slug}`}>
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
                    <h3 className="text-sm font-semibold truncate mt-2">{page.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}