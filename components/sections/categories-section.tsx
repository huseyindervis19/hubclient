'use client'

import { useLanguage } from '@/components/language-provider'
import Link from 'next/link'
import { useLandingCategories } from '@/lib/hooks/useCategories'

export function CategoriesSection() {
  const { language, direction, message } = useLanguage()

  const { data, isLoading, error } = useLandingCategories(language)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const categories = data?.data || []

  return (
    <section className={`py-20 bg-secondary/50 ${direction === 'rtl' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          {message('categories.title', 'Categories')}
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {language === 'en'
            ? 'Browse our extensive collection of premium marble and stone products'
            : 'تصفح مجموعتنا الواسعة من منتجات الرخام والحجر الفاخرة'}
        </p>

        {isLoading && (
          <div className="text-center py-12">
            <p>{message('loading') || 'Loading...'}</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-500">
            <p>{message('error') || 'Failed to load categories'}</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="group cursor-pointer"
                >
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4 hover-lift">
                    <img
                      src={category.imageUrl ? `${baseUrl}${category.imageUrl}` : "/images/no_image.png"}
                      alt={category.translated.name}
                      className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 smooth-transition" />
                  </div>

                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent smooth-transition">
                    {category.translated.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-2">
                    {category.translated.description}
                  </p>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/categories"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover-lift"
              >
                {message('categories.showmore')}
              </Link>
            </div>
          </>
        )}

      </div>
    </section>
  )
}
