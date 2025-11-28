'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/components/language-provider'
import { useTheme } from '@/components/theme-provider'
import { Menu, X, Sun, Moon, Globe } from 'lucide-react'

const Navbar = () => {
  const { language, setLanguage, direction, message } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { key: 'home', href: '/' },
    { key: 'categories', href: '/categories' },
    { key: 'products', href: '/products' },
    { key: 'aboutus', href: '/aboutus' },
    { key: 'contact', href: '/contact' },
  ]

  const navigationItems = navLinks.map(link => ({
    ...link,
    label: message(link.key)
  }))

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        direction === 'rtl' ? 'rtl' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
          <img
            src="/main-logo.png"
            alt="Logo"
            className="w-10 h-10 object-contain group-hover:scale-110 smooth-transition"
          />
          <span className="font-bold text-lg sm:text-xl text-foreground group-hover:text-accent smooth-transition">
            {message('compnay.name', 'Elegant Torch')}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navigationItems.map(item => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-primary smooth-transition relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent group-hover:w-full smooth-transition" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="p-2 hover:bg-secondary rounded-lg smooth-transition inline-flex items-center gap-1 text-sm font-medium"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{language === 'en' ? 'EN' : 'العربية'}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-secondary rounded-lg smooth-transition"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg smooth-transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navigationItems.map(item => (
              <Link
                key={item.key}
                href={item.href}
                className="block px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-lg smooth-transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar