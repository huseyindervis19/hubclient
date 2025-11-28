'use client'

import { useLanguage } from '@/components/language-provider'
import { useHomeSlider } from '@/lib/hooks/useHomeSlider'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const HeroSection = () => {
  const { language, direction, message } = useLanguage()
  const { homeSlider, loading } = useHomeSlider(language)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (homeSlider.length === 0) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % homeSlider.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [homeSlider.length])

  if (loading || homeSlider.length === 0) {
    return (
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-muted flex items-center justify-center">
        <p className="text-foreground">{message('loading', 'Loading...')}</p>
      </section>
    )
  }

  const slide = homeSlider[currentSlide]

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {homeSlider.map((s, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={s.imageUrl ? `${baseUrl}${s.imageUrl}` : '/images/no_image.png'}
              alt={s.translated.title || message('hero.alt', 'Hero Image')}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="relative z-50 flex flex-col items-center justify-center text-center h-full px-4">
        <p className="text-white text-3xl md:text-5xl font-bold mb-6" style={{ direction }}>
          {message('hero.topText', 'Premium Natural Marble Collections')}
        </p>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          {slide.translated.title}
        </h1>

        <p className="text-lg md:text-2xl text-white/90 mb-8">
          {slide.translated.subTitle}
        </p>

        <Link
          href={slide.ctaLink || '/products'}
          className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg"
        >
          {slide.translated.ctaText}
        </Link>
      </div>

      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + homeSlider.length) % homeSlider.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white hidden md:block"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % homeSlider.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white hidden md:block"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {homeSlider.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-accent w-8' : 'bg-white/50 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection