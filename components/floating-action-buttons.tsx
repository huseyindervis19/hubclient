'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from './language-provider'
import { useContactInfo } from '@/lib/hooks/useContactInfo'

export function FloatingActionButtons() {
  const [isMobile, setIsMobile] = useState(false)
  const { language, direction } = useLanguage()
  const { data: contactInfo } = useContactInfo(language)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const whatsapp = contactInfo?.whatsapp || ''
  const phone = contactInfo?.phone || ''

  return (
    <>
      {isMobile && (
        <a
          href={`tel:${phone}`}
          className="fixed bottom-8 left-8 z-40 w-16 h-16 rounded-full bg-blue-600 text-white shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        >
          {/* SVG */}
        </a>
      )}

      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full bg-green-600 text-white shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      >
        {/* SVG */}
      </a>
    </>
  )
}
