'use client'

import { useLanguage } from '@/components/language-provider'
import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useCreateContactRequest } from '../../lib/hooks/useContactRequest'

export function ContactPage() {
  const { language, direction } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const createContactRequest = useCreateContactRequest()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createContactRequest.mutateAsync(formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      console.error('Error submitting contact request:', error)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: { en: 'Address', ar: 'العنوان' },
      details: { en: 'Jeddah, Saudi Arabia', ar: 'جدة، المملكة العربية السعودية' },
    },
    {
      icon: Phone,
      title: { en: 'Phone', ar: 'الهاتف' },
      details: { en: '+966 12 345 6789', ar: '+966 12 345 6789' },
    },
    {
      icon: Mail,
      title: { en: 'Email', ar: 'البريد الإلكتروني' },
      details: { en: 'info@marblecompany.sa', ar: 'info@marblecompany.sa' },
    },
    {
      icon: Clock,
      title: { en: 'Hours', ar: 'الساعات' },
      details: { en: 'Mon-Fri: 9AM - 6PM', ar: 'الأحد - الخميس: 9 صباحاً - 6 مساءً' },
    },
  ]

  return (
    <div className={`${direction === 'rtl' ? 'rtl' : ''}`}>
      {/* Hero */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 slide-in-up">
            {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl slide-in-up" style={{ animationDelay: '0.1s' }}>
            {language === 'en'
              ? 'Get in touch with our team for inquiries, quotes, and consultations'
              : 'تواصل مع فريقنا للاستفسارات والعروض والاستشارات'}
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon
              return (
                <div key={idx} className="text-center slide-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="inline-block p-4 bg-secondary rounded-lg mb-4">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{info.title[language]}</h3>
                  <p className="text-muted-foreground">{info.details[language]}</p>
                </div>
              )
            })}
          </div>

          {/* Contact Form & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="slide-in-up">
              <h2 className="text-3xl font-bold text-primary mb-6">
                {language === 'en' ? 'Send us a Message' : 'أرسل لنا رسالة'}
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg font-semibold fade-in">
                  {language === 'en' ? 'Message sent successfully! We will contact you soon.' : 'تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.'}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder={language === 'en' ? 'Your Name' : 'اسمك'}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground smooth-transition"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={language === 'en' ? 'Your Email' : 'بريدك الإلكتروني'}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground smooth-transition"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder={language === 'en' ? 'Phone Number' : 'رقم الهاتف'}
                    value={formData.phone}
                    onChange={handleChange}
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground smooth-transition"
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder={language === 'en' ? 'Subject' : 'الموضوع'}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground smooth-transition"
                  />
                </div>

                <textarea
                  name="message"
                  placeholder={language === 'en' ? 'Your Message' : 'رسالتك'}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground smooth-transition"
                />

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover-lift button-pulse"
                  disabled={createContactRequest.isPending}
                >
                  {createContactRequest.isPending
                    ? language === 'en' ? 'Sending...' : 'جارٍ الإرسال...'
                    : language === 'en' ? 'Send Message' : 'إرسال الرسالة'}
                </button>
              </form>
            </div>

            {/* Location Image */}
            <div className="slide-in-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-3xl font-bold text-primary mb-6">
                {language === 'en' ? 'Find Us' : 'ابحث عنا'}
              </h2>
              <div className="w-full h-96 bg-secondary rounded-lg overflow-hidden hover-lift">
                <img
                  src="/jeddah-marble-store-location.jpg"
                  alt="Marble store location in Jeddah"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
