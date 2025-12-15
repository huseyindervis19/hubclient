'use client'

import { useLanguage } from '@/components/language-provider'
import { useAboutUs } from '@/lib/hooks/useAboutUs'
import Link from 'next/link'

const AboutUsSection = () => {
  const { language, direction, message } = useLanguage()
  const { data: response, isLoading } = useAboutUs(language)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL


  if (isLoading || !response?.data) {
    return (
      <section className={`py-20 bg-secondary/50 ${direction === 'rtl' ? 'rtl' : ''}`}>
        <div className="container mx-auto px-4 text-center">
          <p>{message('loading') || 'Loading...'}</p>
        </div>
      </section>
    )
  }
  const aboutUs = response.data 
  const translated = aboutUs.translated

  return (
    <section className={`py-20 bg-secondary/50 ${direction === 'rtl' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="h-96 rounded-lg overflow-hidden hover-lift">
            <img
              src={aboutUs.imageUrl ? `${baseUrl}${aboutUs.imageUrl}` : "/images/no_image.png"}
              alt={translated.mission}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground slide-in-up">
              {message('aboutus.title')}
            </h2>
            <p className="text-lg text-foreground/90 mb-4 slide-in-up">
              {translated.story}
            </p>
            <p className="text-lg text-foreground/80 mb-8 slide-in-up">
              {translated.mission}
            </p>
            <Link
              href="/aboutus"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover-lift"
            >
              {message('aboutus.readmore')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUsSection