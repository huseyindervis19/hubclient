'use client'

import { useLanguage } from '@/components/language-provider'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useAllProducts } from '@/lib/hooks/useProducts'

const ProductsGrid = () => {
  const { language, direction, message } = useLanguage()

  const { data, isLoading } = useAllProducts(language)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const searchParams = useSearchParams()
  const categoryId = searchParams.get('category')

  if (isLoading) return <p className="text-center py-20">Loading...</p>

  const allProducts = data?.data || []

  const filteredProducts = categoryId
    ? allProducts.filter((p) => p.categoryId === parseInt(categoryId))
    : allProducts

  return (
    <section className={`py-20 ${direction === 'rtl' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4 text-foreground">
          {message('our.products', 'Our Products')}
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {message('products.all.title', 'Browse our collection of premium marble and stone products')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-lg overflow-hidden border border-border hover:border-accent hover-lift smooth-transition flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.mainImage ? `${baseUrl}${product.mainImage}` : '/images/no_image.png'}
                  alt={product.translated.name}
                  className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                />

                <button className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full smooth-transition shadow-lg">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-accent smooth-transition">
                  {product.translated.name}
                </h3>

                <p className="text-sm text-muted-foreground mb-3 flex-1">
                  {product.translated.description}
                </p>

                <Link
                  href={`/products/${product.id}`}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90 transition-colors text-sm text-center"
                >
                  {message('products.viewdetails', 'View Details')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default ProductsGrid