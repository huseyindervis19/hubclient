'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { Language } from '@/lib/types/rw'
import translationsData from '../lib/mock/translations.json'

const translations = translationsData.data as Record<string, Record<string, string>>

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  direction: 'ltr' | 'rtl'
  message: (key: string, defaultValue?: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('language') as Language | null
    const initial = stored || 'en'
    setLanguageState(initial)
    updateLanguage(initial)
  }, [])

  const updateLanguage = (lang: Language) => {
    const html = document.documentElement
    html.lang = lang
    html.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    updateLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const message = (key: string, defaultValue?: string): string => {
    const langPack = translations[language] as Record<string, string>
    const enPack = translations['en'] as Record<string, string>

    if (key in langPack) return langPack[key]
    if (key in enPack) return enPack[key]
    if (defaultValue) return defaultValue

    return key
  }

  if (!mounted) return null

  const direction = language === 'ar' ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider value={{ language, setLanguage, direction, message }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
