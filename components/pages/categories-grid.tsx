'use client'

import { useLanguage } from '@/components/language-provider'
import Link from 'next/link'
import { useState } from 'react'
import { useAllCategories } from '@/lib/hooks/useCategories'

const CategoriesGrid = () => {
  const { language, direction, message } = useLanguage()
  const { data, isLoading, error } = useAllCategories(language)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  if (isLoading) {
    return (
      <section className="py-20 text-center text-lg">
        {message('loading', 'Loading...')}
      </section>
    )
  }

  if (error || !data?.data) {
    return (
      <section className="py-20 text-center text-lg text-red-500">
        {message('loading.error', 'Failed to load data.')}
      </section>
    )
  }

  const categories = data.data

  return (
    <section className={`py-20 ${direction === 'rtl' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl  font-bold text-center mb-4 text-foreground">
          {message('categories.all', 'All Categories')}
        </h1>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {message(
            'categories.all.subtitle',
            'Browse our complete selection of marble and stone categories'
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group"
            >
              <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-accent smooth-transition hover-lift h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={category.imageUrl ? `${baseUrl}${category.imageUrl}` : '/images/no_image.png'}
                    alt={category.translated.name}
                    className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 smooth-transition" />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-accent smooth-transition">
                    {category.translated.name}
                  </h3>

                  <p className="text-sm text-muted-foreground group-hover:text-foreground/80 smooth-transition flex-1">
                    {category.translated.description}
                  </p>

                  <button className="mt-4 w-full px-4 py-2 bg-accent text-accent-foreground rounded font-semibold hover:bg-accent/90 transition-colors text-sm scale-in">
                    {message('categories.viewproducts', 'View Products')}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoriesGrid