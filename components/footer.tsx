'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/language-provider'
import { useContactInfo } from '@/lib/hooks/useContactInfo'
import { useSocialLinks } from '@/lib/hooks/useSocialLinks'

// Social Icons
import {
  SiSnapchat,
  SiTiktok,
  SiFacebook,
  SiLinkedin,
  SiInstagram,
  SiX
} from 'react-icons/si'

/* -------------------------------------------------------------------------- */
/*                               Social Icons Map                              */
/* -------------------------------------------------------------------------- */

const SOCIAL_ICONS = {
  Snapchat: SiSnapchat,
  Tiktok: SiTiktok,
  Facebook: SiFacebook,
  Linkedin: SiLinkedin,
  Instagram: SiInstagram,
  X: SiX
} as const

type SocialIconName = keyof typeof SOCIAL_ICONS

/* -------------------------------------------------------------------------- */
/*                                   Footer                                    */
/* -------------------------------------------------------------------------- */

const Footer = () => {
  const { language, direction, message } = useLanguage()
  const { data: contactInfo } = useContactInfo(language)
  const { data: socialLinks } = useSocialLinks()

  const navLinks = [
    { key: 'home', href: '/' },
    { key: 'categories', href: '/categories' },
    { key: 'products', href: '/products' },
    { key: 'aboutus', href: '/aboutus' },
    { key: 'contact', href: '/contact' },
  ]

  return (
    <footer
      className={`bg-primary text-primary-foreground border-t border-border ${
        direction === 'rtl' ? 'rtl' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              {message('footer.company')}
            </h3>
            <p className="text-sm opacity-90">
              {message('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{message('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="opacity-80 hover:opacity-100 smooth-transition"
                  >
                    {message(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">{message('footer.contact')}</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>{contactInfo?.phone}</li>
              <li>{contactInfo?.email}</li>
              <li>{contactInfo?.translated?.address}</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">{message('footer.followUs')}</h4>
            <div className="flex gap-4">
              {socialLinks?.map((item, idx) => {
                const IconComponent = SOCIAL_ICONS[item.icon as SocialIconName]
                return (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-primary-foreground hover:text-primary rounded-lg smooth-transition"
                  >
                    {IconComponent ? (
                      <IconComponent className="w-5 h-5" />
                    ) : (
                      item.icon
                    )}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
          <p>
            © {new Date().getFullYear()} {message('footer.company')}.{' '}
            {message('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
