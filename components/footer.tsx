'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/language-provider'
import { useContactInfo } from '@/lib/hooks/useContactInfo'
import { useSocialLinks } from '@/lib/hooks/useSocialLinks'

export function Footer() {
  const { language, direction } = useLanguage()

  const { data: contactInfo } = useContactInfo(language)
  const { data: socialLinks } = useSocialLinks()

  const navLinks = [
    { key: 'home', href: '/' },
    { key: 'categories', href: '/categories' },
    { key: 'products', href: '/products' },
    { key: 'aboutus', href: '/aboutus' },
    { key: 'contact', href: '/contact' },
  ]

  const navigationLabels = {
    en: ['Home', 'Categories', 'Products', 'About Us', 'Contact'],
    ar: ['الرئيسية', 'الفئات', 'المنتجات', 'معلومات عنا', 'اتصل بنا'],
  }

  return (
    <footer
      className={`bg-primary text-primary-foreground border-t border-border ${direction === 'rtl' ? 'rtl' : ''}`}
    >
      <div className="container mx-auto px-4 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* ================= COMPANY INFO ================= */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              {language === 'en' ? 'Elegant Torch' : 'مؤسسة الشعلة الراقية'}
            </h3>
            <p className="text-sm opacity-90">
              {language === 'en'
                ? 'Premium marble and stone products for your home and business'
                : 'منتجات رخام وحجر فاخرة لمنزلك وعملك'}
            </p>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h4 className="font-semibold mb-4">
              {language === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h4>

            <ul className="space-y-2 text-sm">
              {navLinks.map((link, idx) => (
                <li key={link.href}>
                  <Link href={link.href} className="opacity-80 hover:opacity-100 smooth-transition">
                    {navigationLabels[language][idx]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= CONTACT INFO (DYNAMIC) ================= */}
          <div>
            <h4 className="font-semibold mb-4">
              {language === 'en' ? 'Contact' : 'اتصل'}
            </h4>

            <ul className="space-y-2 text-sm opacity-80">
              <li>{contactInfo?.phone}</li>
              <li>{contactInfo?.email}</li>
              <li>{contactInfo?.translated?.address}</li>
            </ul>
          </div>

          {/* ================= SOCIAL LINKS (DYNAMIC) ================= */}
          <div>
            <h4 className="font-semibold mb-4">
              {language === 'en' ? 'Follow Us' : 'تابعنا'}
            </h4>

            <div className="flex gap-4">
              {socialLinks?.map((item, idx) => {
                const Icon = require("lucide-react")[item.icon]

                return (
                  <a
                    key={idx}
                    href={item.url}
                    className="p-2 hover:bg-primary-foreground hover:text-primary rounded-lg smooth-transition"
                  >
                    {Icon ? <Icon className="w-5 h-5" /> : item.icon}
                  </a>
                )
              })}
            </div>
          </div>

        </div>

        {/* ================= FOOTER BOTTOM ================= */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
          <p>
            {language === 'en'
              ? `© ${new Date().getFullYear()} Elegant Torch. All rights reserved.`
              : `© ${new Date().getFullYear()} جميع الحقوق محفوظة , مؤسسة الشعلة الراقية.`}
          </p>
        </div>
      </div>
    </footer>
  )
}
