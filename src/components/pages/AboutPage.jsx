import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import Footer from '../landing/Footer'

function AboutPage() {
  return (
    <div className="min-h-screen bg-bg overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 sm:py-24 md:py-32 bg-bg flex justify-center">
        <div className="px-5 sm:px-8 lg:px-12 text-center" style={{ maxWidth: '800px' }}>
          <p className="font-accent text-xl sm:text-2xl text-ink/60 mb-4">About Us</p>
          <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink font-bold leading-tight tracking-tight mb-6">
            Capture moments,<br className="hidden sm:block" />create memories
          </h1>
          <p className="font-body text-mid text-base sm:text-lg leading-relaxed" style={{ maxWidth: '500px', margin: '0 auto' }}>
            ClixFrame is a free virtual photo booth that runs entirely in your browser. Fun, simple, and accessible to everyone.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full flex justify-center py-4 sm:py-6 bg-bg">
        <div className="w-12 sm:w-16 h-px bg-ink/15" />
      </div>

      {/* What is ClixFrame Section */}
      <section className="py-20 sm:py-28 md:py-36 bg-paper flex justify-center">
        <div className="px-5 sm:px-8 lg:px-12" style={{ width: '100%', maxWidth: '750px' }}>
          <div className="text-center">
            <p className="font-accent text-lg sm:text-xl text-ink/60 mb-3">The Story</p>
            <h2 className="font-hero text-2xl sm:text-3xl md:text-4xl text-ink font-bold leading-tight tracking-tight mb-8">
              What is ClixFrame?
            </h2>
            <div className="space-y-5 font-body text-mid text-base sm:text-lg leading-relaxed">
              <p>
                ClixFrame brings the classic photo booth experience to your browser. Whether you're at a party, hanging out with friends, or just having a moment of self-expression.
              </p>
              <p>
                No apps to download, no accounts to create. Just open the website, allow camera access, and start capturing memories in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-ink/10" />

      {/* Features Section */}
      <section className="py-20 sm:py-28 md:py-36 bg-bg flex justify-center">
        <div className="px-5 sm:px-8 lg:px-12" style={{ width: '100%', maxWidth: '900px' }}>
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="font-accent text-xl sm:text-2xl text-ink/70 mb-4">Features</p>
            <h2 className="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-ink font-bold leading-tight tracking-tight">
              Everything you need
            </h2>
          </div>

          {/* 2x2 Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
            <div className="p-6 sm:p-8 bg-paper border border-ink/10">
              <span className="font-typewriter text-sm text-ink/40 block mb-3">01</span>
              <h3 className="font-subheading text-lg sm:text-xl text-ink font-semibold mb-3">
                Multiple Templates
              </h3>
              <p className="font-body text-mid text-sm sm:text-base leading-relaxed">
                Choose from classic strips, polaroid, film, newspaper, and more frame styles.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-paper border border-ink/10">
              <span className="font-typewriter text-sm text-ink/40 block mb-3">02</span>
              <h3 className="font-subheading text-lg sm:text-xl text-ink font-semibold mb-3">
                Flexible Layouts
              </h3>
              <p className="font-body text-mid text-sm sm:text-base leading-relaxed">
                From classic 4-photo strips to grids and creative compositions.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-paper border border-ink/10">
              <span className="font-typewriter text-sm text-ink/40 block mb-3">03</span>
              <h3 className="font-subheading text-lg sm:text-xl text-ink font-semibold mb-3">
                Filters & Effects
              </h3>
              <p className="font-body text-mid text-sm sm:text-base leading-relaxed">
                Apply B&W, sepia, or vivid filters to set the perfect mood.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-paper border border-ink/10">
              <span className="font-typewriter text-sm text-ink/40 block mb-3">04</span>
              <h3 className="font-subheading text-lg sm:text-xl text-ink font-semibold mb-3">
                Stickers & Fun
              </h3>
              <p className="font-body text-mid text-sm sm:text-base leading-relaxed">
                Add stickers and emojis to make your strips uniquely yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-ink/10" />

      {/* Values Section */}
      <section className="py-20 sm:py-28 md:py-36 bg-paper flex justify-center">
        <div className="px-5 sm:px-8 lg:px-12" style={{ width: '100%', maxWidth: '1000px' }}>
          <div className="text-center mb-12 sm:mb-16">
            <p className="font-accent text-xl sm:text-2xl text-ink/70 mb-4">Our Promise</p>
            <h2 className="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-ink font-bold leading-tight tracking-tight">
              Built with care
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-10 sm:gap-12 text-center">
            <div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 border border-ink/20 flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="font-subheading text-base sm:text-lg text-ink font-semibold mb-3">Privacy First</h3>
              <p className="font-body text-mid text-sm sm:text-base leading-relaxed">
                All photos processed locally. We never upload or store your photos.
              </p>
            </div>

            <div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 border border-ink/20 flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className="font-subheading text-base sm:text-lg text-ink font-semibold mb-3">Instant & Easy</h3>
              <p className="font-body text-mid text-sm sm:text-base leading-relaxed">
                No downloads, no sign-ups. Just open and start capturing.
              </p>
            </div>

            <div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 border border-ink/20 flex items-center justify-center mx-auto mb-5 sm:mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="font-subheading text-base sm:text-lg text-ink font-semibold mb-3">Free Forever</h3>
              <p className="font-body text-mid text-sm sm:text-base leading-relaxed">
                No premium tiers, no watermarks, no hidden costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-ink/10" />

      {/* CTA Section */}
      <section className="py-24 sm:py-32 md:py-40 bg-ink flex justify-center">
        <div className="px-5 sm:px-8 lg:px-12 text-center" style={{ maxWidth: '700px' }}>
          <p className="font-accent text-xl sm:text-2xl md:text-3xl text-bg/60 mb-4 sm:mb-6">Ready to start?</p>
          <h2 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-bg font-bold leading-tight tracking-tight mb-4 sm:mb-6">
            Create memories that last
          </h2>
          <p className="font-body text-bg/50 text-sm sm:text-base md:text-lg leading-relaxed mb-10 sm:mb-12" style={{ maxWidth: '420px', margin: '0 auto' }}>
            No signup required. No downloads. Just open and start capturing moments.
          </p>
          <Link
            to="/templates"
            className="inline-block font-typewriter text-base sm:text-lg font-semibold uppercase tracking-wider bg-bg text-ink px-10 sm:px-14 py-4 sm:py-5 hover:bg-paper transition-all duration-300 hover:scale-[1.02]"
            style={{ letterSpacing: '0.08em' }}
          >
            Start the Booth
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default AboutPage
