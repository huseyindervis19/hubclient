'use client'

import { useLanguage } from '@/components/language-provider'
import { useContactInfo } from '../../lib/hooks/useContactInfo'
import { useState } from 'react'
import { useCreateContactRequest } from '../../lib/hooks/useContactRequest'

const ContactSection = () => {
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
      console.error('Error submitting contact request:', error)
    }
  }

  const fields = [
    {
      name: 'name',
      placeholder: message('contact.form.name', 'Your Name'),
      type: 'text'
    },
    {
      name: 'email',
      placeholder: message('contact.form.email', 'Email Address'),
      type: 'email'
    },
    {
      name: 'phone',
      placeholder: message('contact.form.phone', 'Phone Number'),
      type: 'tel'
    },
  ]

  return (
    <section className={`py-20 bg-secondary/50 ${direction === 'rtl' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          {message('contact.title', 'Contact Us')}
        </h2>

        <p className="text-center text-muted-foreground mb-12">
          {message('contact.subtitle', 'Have a question? We would love to hear from you.')}
        </p>

        {submitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold fade-in">
            {message('contact.form.success', 'Message sent successfully!')}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.slice(0, 2).map((field) => (
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

          {fields.slice(2).map((field) => (
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

        {contactInfo && (
          <div className="mt-12 pt-12 border-t border-border">
            <p className="text-center text-muted-foreground mb-6">
              {message('contact.direct', 'Or contact us directly:')}
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <p className="font-semibold text-foreground">
                  {message('contact.phone', 'Phone')}
                </p>
                <p className="text-muted-foreground">{contactInfo.phone}</p>
              </div>

              <div>
                <p className="font-semibold text-foreground">
                  {message('contact.email', 'Email')}
                </p>
                <p className="text-muted-foreground">{contactInfo.email}</p>
              </div>

              <div>
                <p className="font-semibold text-foreground">
                  {message('contact.whatsapp', 'WhatsApp')}
                </p>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  className="text-accent hover:underline"
                >
                  {contactInfo.whatsapp}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ContactSection