'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { useCreateContactRequest } from '../../lib/hooks/useContactRequest'
import { useContactInfo } from '../../lib/hooks/useContactInfo'

const ContactPage = () => {
  const { language, direction, message } = useLanguage()
  const { data: contactInfo } = useContactInfo(language)
  const createContactRequest = useCreateContactRequest()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const inputFields = [
    {
      name: 'name',
      placeholder: message('contact.form.name', 'Your Name'),
      type: 'text',
      isHalfWidth: true
    },
    {
      name: 'email',
      placeholder: message('contact.form.email', 'Email Address'),
      type: 'email',
      isHalfWidth: true
    },
    {
      name: 'phone',
      placeholder: message('contact.form.phone', 'Phone Number'),
      type: 'tel',
      isHalfWidth: false
    },
  ]

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
      setFormData({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={direction === 'rtl' ? 'rtl' : ''}>
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 slide-in-up">
            {message('contact.title', 'Contact Us')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl slide-in-up" style={{ animationDelay: '0.1s' }}>
            {message(
              'contact.hero.subtitle',
              'Get in touch with our team for inquiries, quotes, and consultations'
            )}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {!contactInfo ? (
            <p className="text-center text-muted-foreground mb-16">
              {message('loading', 'Loading contact information...')}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="text-center slide-in-up">
                <div className="inline-block p-4 bg-secondary rounded-lg mb-4">
                  <MapPin className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {message('contact.address', 'Address')}
                </h3>
                <p className="text-muted-foreground">
                  {contactInfo.translated?.address}
                </p>
              </div>

              <div className="text-center slide-in-up">
                <div className="inline-block p-4 bg-secondary rounded-lg mb-4">
                  <Phone className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {message('contact.phone', 'Phone')}
                </h3>
                <p className="text-muted-foreground">
                  {contactInfo.phone}
                </p>
              </div>

              <div className="text-center slide-in-up">
                <div className="inline-block p-4 bg-secondary rounded-lg mb-4">
                  <Mail className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {message('contact.email', 'Email')}
                </h3>
                <p className="text-muted-foreground">
                  {contactInfo.email}
                </p>
              </div>

              <div className="text-center slide-in-up">
                <div className="inline-block p-4 bg-secondary rounded-lg mb-4">
                  <Clock className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {message('contact.hours', 'Working Hours')}
                </h3>
                <p className="text-muted-foreground">
                  {message('contact.working.hours', 'Sat–Thu: 9AM – 6PM')}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-full flex flex-col">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {message('contact.form.title', 'Send us a Message')}
              </h2>
              {submitted && (
                <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold fade-in">
                  {message('contact.form.success', 'Message sent successfully!')}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inputFields.filter(f => f.isHalfWidth).map((field) => (
                    <input
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent bg-background text-foreground smooth-transition"
                    />
                  ))}
                </div>
                {inputFields.filter(f => !f.isHalfWidth).map((field) => (
                  <input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent bg-background text-foreground smooth-transition"
                  />
                ))}
                <textarea
                  name="message"
                  placeholder={message('contact.form.message', 'Your Message')}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent bg-background text-foreground smooth-transition"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover-lift"
                  disabled={createContactRequest.isPending}
                >
                  {createContactRequest.isPending
                    ? message('contact.form.submitting', 'Submitting...')
                    : message('contact.form.submit', 'Send Message')}
                </button>
              </form>
            </div>

            <div className="slide-in-up h-full flex flex-col" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {message('contact.location.title', 'Find Us')}
              </h2>
              <div className="flex-1 bg-secondary rounded-lg overflow-hidden hover-lift">
                {contactInfo ? (
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    allowFullScreen
                    style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${contactInfo.latitude},${contactInfo.longitude}&z=15&output=embed`}
                  ></iframe>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    {message('loading', 'Loading map...')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage