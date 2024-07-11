'use client'
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from '@/utils/supabase';

interface ColoringPage {
  id: string;
  title: string;
  image_url: string;
  slug: string;
}

const SkeletonCard = () => (
  <Card className="overflow-hidden">
    <CardContent className="p-2">
      <div className="relative aspect-square bg-gray-200 animate-pulse rounded-md"></div>
      <div className="h-4 bg-gray-200 rounded mt-2 animate-pulse"></div>
      <div className="h-3 bg-gray-200 rounded mt-1 w-2/3 animate-pulse"></div>
    </CardContent>
  </Card>
);

const ITEMS_PER_PAGE = 20;

const SearchResultsContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<ColoringPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchResults = useCallback(async (reset = false) => {
    if (reset) {
      setPage(1);
      setResults([]);
    }
    setIsLoading(true);
    setError(null);

    try {
      const { data, error, count } = await supabase
        .from('coloring_pages')
        .select('id, title, image_url, slug', { count: 'exact' })
        .ilike('title', `%${query}%`)
        .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)
        .order('title', { ascending: true });

      if (error) throw error;

      setResults(prev => reset ? data : [...prev, ...data]);
      setHasMore(count !== null && page * ITEMS_PER_PAGE < count);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('An error occurred while fetching results. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    fetchResults(true);
  }, [fetchResults]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    fetchResults();
  };

  const renderContent = () => {
    if (error) {
      return <p className="text-lg text-center text-red-500">{error}</p>;
    }

    if (results.length === 0 && !isLoading) {
      return <p className="text-lg text-center">No results found. Try a different search term.</p>;
    }

    return (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map((page) => (
            <Link key={page.id} href={`/coloringpages/${page.slug}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-2">
                  <div className="relative aspect-square">
                    <Image
                      src={page.image_url}
                      alt={page.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <h2 className="text-sm font-semibold truncate mt-2 font-fredoka">{page.title}</h2>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {[...Array(5)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}
        {hasMore && !isLoading && (
          <div className="mt-8 text-center">
            <Button onClick={loadMore} className="bg-purple-600 hover:bg-purple-700 text-white">
              Load More
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 font-fredoka text-center text-purple-600">Search Results for &quot;{query}&quot;</h1>
      {renderContent()}
    </div>
  );
};

export default function SearchResults() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}