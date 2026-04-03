import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import Footer from '../landing/Footer'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY_HERE',
          subject: `ClixFrame Contact: ${formData.subject}`,
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.'
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Sorry, something went wrong. Please try again later.'
      })
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-bg overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-bg flex justify-center">
        <div className="px-5 sm:px-8 lg:px-12 text-center" style={{ maxWidth: '700px' }}>
          <p className="font-accent text-xl sm:text-2xl text-ink/60 mb-4">Get in Touch</p>
          <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink font-bold leading-tight tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="font-body text-mid text-sm sm:text-base md:text-lg leading-relaxed">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full flex justify-center py-4 sm:py-6 bg-bg">
        <div className="w-12 sm:w-16 h-px bg-ink/15" />
      </div>

      {/* Contact Form Section */}
      <section className="py-12 sm:py-20 md:py-28 bg-paper flex justify-center">
        <div className="px-5 sm:px-8 lg:px-12" style={{ width: '100%', maxWidth: '600px' }}>
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
              <div>
                <label htmlFor="name" className="block font-subheading text-sm text-ink font-medium mb-2 sm:mb-3">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full h-11 sm:h-12 md:h-14 bg-bg border-b-2 border-ink/20 px-0 font-typewriter text-sm sm:text-base text-ink focus:outline-none focus:border-ink transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-subheading text-sm text-ink font-medium mb-2 sm:mb-3">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-11 sm:h-12 md:h-14 bg-bg border-b-2 border-ink/20 px-0 font-typewriter text-sm sm:text-base text-ink focus:outline-none focus:border-ink transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block font-subheading text-sm text-ink font-medium mb-2 sm:mb-3">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full h-11 sm:h-12 md:h-14 bg-bg border-b-2 border-ink/20 px-0 font-typewriter text-sm sm:text-base text-ink focus:outline-none focus:border-ink transition-colors"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-subheading text-sm text-ink font-medium mb-2 sm:mb-3">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-bg border-2 border-ink/20 p-3 sm:p-4 font-typewriter text-sm sm:text-base text-ink focus:outline-none focus:border-ink transition-colors resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            {/* Status Message */}
            {status.message && (
              <div className={`p-3 sm:p-4 border-l-4 ${status.type === 'success' ? 'border-ink bg-bg' : 'border-mid bg-bg'}`}>
                <p className="font-body text-sm text-ink">{status.message}</p>
              </div>
            )}

            <div className="text-center pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto font-subheading text-sm sm:text-base md:text-lg font-semibold bg-ink text-bg px-8 sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 rounded-full hover:bg-ink/90 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-ink/10" />

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 md:py-32 bg-bg flex justify-center">
        <div className="px-5 sm:px-8 lg:px-12" style={{ width: '100%', maxWidth: '900px' }}>
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14">
            <p className="font-accent text-xl sm:text-2xl text-ink/70 mb-4">FAQ</p>
            <h2 className="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-ink font-bold leading-tight tracking-tight">
              Common questions
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            <div>
              <h3 className="font-subheading text-base sm:text-lg text-ink font-semibold mb-2 sm:mb-3">How do I use ClixFrame?</h3>
              <p className="font-body text-mid text-sm leading-relaxed">
                Click "Start the Booth" on the homepage, choose a template and layout, then allow camera access to start capturing photos.
              </p>
            </div>

            <div>
              <h3 className="font-subheading text-base sm:text-lg text-ink font-semibold mb-2 sm:mb-3">Are my photos stored anywhere?</h3>
              <p className="font-body text-mid text-sm leading-relaxed">
                No! All photos are processed locally in your browser. We never upload or store your photos on any server.
              </p>
            </div>

            <div>
              <h3 className="font-subheading text-base sm:text-lg text-ink font-semibold mb-2 sm:mb-3">Is ClixFrame free?</h3>
              <p className="font-body text-mid text-sm leading-relaxed">
                Yes, ClixFrame is completely free to use with no hidden costs or premium tiers.
              </p>
            </div>

            <div>
              <h3 className="font-subheading text-base sm:text-lg text-ink font-semibold mb-2 sm:mb-3">What browsers are supported?</h3>
              <p className="font-body text-mid text-sm leading-relaxed">
                ClixFrame works on all modern browsers including Chrome, Firefox, Safari, and Edge.
              </p>
            </div>

            <div>
              <h3 className="font-subheading text-base sm:text-lg text-ink font-semibold mb-2 sm:mb-3">Can I use it on mobile?</h3>
              <p className="font-body text-mid text-sm leading-relaxed">
                Yes! ClixFrame is fully responsive and works on mobile devices with front or back camera.
              </p>
            </div>

            <div>
              <h3 className="font-subheading text-base sm:text-lg text-ink font-semibold mb-2 sm:mb-3">How long until I get a reply?</h3>
              <p className="font-body text-mid text-sm leading-relaxed">
                We typically respond within 24-48 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-ink/10" />

      {/* Footer Buffer */}
      <div className="w-full h-16 sm:h-24 md:h-32 bg-bg" />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default ContactPage
