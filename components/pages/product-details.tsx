'use client'

import { useLanguage } from '@/components/language-provider'
import { useState } from 'react'
import Link from 'next/link'
import { useProductById } from '@/lib/hooks/useProducts'
import { motion, easeOut } from 'motion/react'
import { Heart } from 'lucide-react'

interface ProductDetailsProps {
  productId: number
}

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: easeOut, when: 'beforeChildren', staggerChildren: 0.08 }
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: easeOut } },
}

const ProductDetails = ({ productId }: ProductDetailsProps) => {
  const { language, direction, message } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const { data, isLoading, isError } = useProductById(productId, language)
  const product = data?.data
  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p>{message('loading', 'Loading...')}</p>
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">{message('loading.error', 'Failed to load data.')}</h1>
      </div>
    )
  }

  const translated = product.translated || {}
  const name = translated.name
  const description = translated.description
  const images = product.images || []

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <section className={`py-12 ${direction === 'rtl' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <Link
          href="/products"
          className="text-primary hover:text-accent mb-8 inline-flex items-center gap-2"
        >
          <span>←</span>
          <span>{message('product.back', 'Back to Products')}</span>
        </Link>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Left - Images */}
          <motion.div className="space-y-4" variants={cardVariants}>
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden bg-secondary/10 shadow-[0_25px_60px_rgba(15,23,42,0.15)] group">
              <motion.img
                src={images[currentImageIndex] ? `${baseUrl}${images[currentImageIndex]}` : '/images/no_image.png'}
                alt={name}
                className="w-full h-full object-cover smooth-transition group-hover:scale-105"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5, ease: easeOut }}
              />

              {/* Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg smooth-transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg smooth-transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Favorite */}
              <button className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full smooth-transition shadow-lg">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl border-2 overflow-hidden smooth-transition ${idx === currentImageIndex ? 'border-accent' : 'border-border'}`}
                >
                  <img
                    src={img ? `${baseUrl}${img}` : '/images/no_image.png'}
                    alt={`${name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right - Details */}
          <motion.div className="space-y-6" variants={cardVariants}>
            <h1 className="text-4xl font-bold">{name}</h1>

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 space-y-4 shadow-[0_20px_40px_rgba(15,23,42,0.1)]">
              <h3 className="font-bold text-lg">{message('product.specs', 'Specifications')}</h3>
              <p className="text-lg text-muted-foreground">{description}</p>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductDetails
