'use client'

import { useLanguage } from '@/components/language-provider'
import { useAboutUs } from '@/lib/hooks/useAboutUs'

const AboutUsPage = () => {
  const { language, direction, message } = useLanguage()
  const { data: response, isLoading } = useAboutUs(language)

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
  const data = aboutUs.translated

  return (
    <div className={direction === 'rtl' ? 'rtl' : ''}>
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 slide-in-up">
            {message('about.hero.title') || 'About Our Company'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl slide-in-up">
            {message('about.hero.subtitle') || 'A legacy of excellence in marble and stone craftsmanship'}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold text-foreground mb-6 slide-in-up">
            {message('about.story.title') || 'Our Story'}
          </h2>
          <div className="space-y-4 text-lg text-foreground/90 slide-in-up">
            <p>{data.story}</p>
            <p>{data.mission}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center slide-in-up">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {message('about.mission.title') || 'Our Mission'}
              </h3>
              <p className="text-foreground/80">{data.mission}</p>
            </div>
            <div className="text-center slide-in-up">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {message('about.vision.title') || 'Our Vision'}
              </h3>
              <p className="text-foreground/80">{data.vision}</p>
            </div>
            <div className="text-center slide-in-up">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {message('about.values.title') || 'Our Values'}
              </h3>
              <p className="text-foreground/80">{data.values}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default AboutUsPage