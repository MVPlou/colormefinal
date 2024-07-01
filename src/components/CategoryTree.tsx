import React from 'react'
import Link from 'next/link'
import { Category, getSubcategories } from '@/utils/api'

interface CategoryTreeProps {
  parentId: string | null
  level: number
}

export async function CategoryTree({ parentId, level }: CategoryTreeProps) {
  const categories = parentId !== null ? await getSubcategories(parentId) : await getSubcategories('root')

  if (categories.length === 0) return null

  return (
    <ul className={`space-y-2 ${level > 0 ? 'ml-4' : ''}`}>
      {categories.map((category: Category) => (
        <li key={category.id}>
          <Link href={`/category/${category.slug}`} className="hover:text-blue-500">
            {category.name}
          </Link>
          {/* Recursively render subcategories */}
          <CategoryTree parentId={category.id} level={level + 1} />
        </li>
      ))}
    </ul>
  )
}