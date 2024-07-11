// src/utils/api.ts
import { supabase } from './supabase';

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string;
}

export interface ColoringPage {
  id: string;
  title: string;
  slug: string;
  thumbnail_url: string;
  category_id: string;
  likes_count: number;
  prints_count: number;
}

export interface DetailedColoringPage {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  thumbnail_url: string;
  description: string;
  category_id: string;
  likes_count: number;
  prints_count: number;
  created_at: string;
  tags: string[];
  category: Category;
}

export async function getTopLevelCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, image_url , slug')
    .is('parent_id', null)
    .order('name');

  if (error) {
    console.error('Error fetching top-level categories:', error);
    return [];
  }

  return data || [];
}

export async function getAllColoringPages(): Promise<ColoringPage[]> {
  const { data, error } = await supabase
    .from('coloring_pages')
    .select('id, title, slug, thumbnail_url, category_id, likes_count, prints_count')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching coloring pages:', error);
    return [];
  }

  return data || [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }

  return data;
}

export async function getSubcategories(parentId: string): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, image_url , slug')
    .eq('parent_id', parentId)
    .order('name');

  if (error) {
    console.error('Error fetching subcategories:', error);
    return [];
  }

  return data || [];
}

export async function getColoringPagesByCategory(categoryId: string): Promise<ColoringPage[]> {
  const { data, error } = await supabase
    .from('coloring_pages')
    .select('id, title, slug, image_url, thumbnail_url, category_id, likes_count, prints_count')
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching coloring pages by category:', error);
    return [];
  }

  return data || [];
}

export async function getColoringPageBySlug(slug: string): Promise<DetailedColoringPage | null> {
  const { data, error } = await supabase
    .from('coloring_pages')
    .select(`
      *,
      category:categories(id, name, slug)
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching coloring page:', error);
    return null;
  }

  return data as DetailedColoringPage;
}

export async function getSimilarPages(categoryId: string, currentPageSlug: string, limit: number = 5): Promise<ColoringPage[]> {
  const { data, error } = await supabase
    .from('coloring_pages')
    .select('id, title, slug, thumbnail_url, category_id, likes_count, prints_count')
    .eq('category_id', categoryId)
    .neq('slug', currentPageSlug)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching similar pages:', error);
    return [];
  }

  return data || [];
}