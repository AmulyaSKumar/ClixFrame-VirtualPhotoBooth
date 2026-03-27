import React from 'react'
import HeroSection from './HeroSection'
import Button from './Button'

function LandingPage({ onStartBooth }) {
  return (
    <div className="landing-page bg-bg overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection onStartBooth={onStartBooth} />

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28 md:py-32 lg:py-40 bg-paper border-t border-b border-ink relative">
        <div className="landing-container px-5 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center sm:text-left space-y-4 sm:space-y-5 lg:space-y-6 mb-12 sm:mb-16 lg:mb-20">
            <p className="font-accent text-lg sm:text-xl lg:text-2xl text-ink">Why choose us</p>
            <h2 className="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-ink font-semibold leading-tight tracking-tight">
              Simple. Beautiful. Memorable.
            </h2>
            <p className="font-body text-mid text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
              Create stunning photo booth experiences in seconds. No downloads, no signups, just pure fun.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {/* Feature 1 */}
            <div className="landing-card-bordered p-6 sm:p-8 lg:p-10 text-left space-y-4 sm:space-y-5 animate-slide-up">
              <span className="font-typewriter text-[11px] sm:text-xs text-mid tracking-widest uppercase">01 — Capture</span>
              <div className="flex items-start gap-4 sm:gap-5">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-ink flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="font-subheading text-lg sm:text-xl lg:text-2xl text-ink">Instant Capture</h3>
                  <p className="font-body text-mid text-sm sm:text-base leading-relaxed">
                    Strike a pose and let the countdown begin. Four photos captured automatically with perfect timing.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="landing-card-bordered p-6 sm:p-8 lg:p-10 text-left space-y-4 sm:space-y-5 animate-slide-up delay-100">
              <span className="font-typewriter text-[11px] sm:text-xs text-mid tracking-widest uppercase">02 — Style</span>
              <div className="flex items-start gap-4 sm:gap-5">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-ink flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="font-subheading text-lg sm:text-xl lg:text-2xl text-ink">Fun Filters</h3>
                  <p className="font-body text-mid text-sm sm:text-base leading-relaxed">
                    Choose from vintage, modern, or playful styles. Add personal touches to make each strip unique.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="landing-card-bordered p-6 sm:p-8 lg:p-10 text-left space-y-4 sm:space-y-5 animate-slide-up delay-200 sm:col-span-2 lg:col-span-1">
              <span className="font-typewriter text-[11px] sm:text-xs text-mid tracking-widest uppercase">03 — Share</span>
              <div className="flex items-start gap-4 sm:gap-5">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-ink flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="font-subheading text-lg sm:text-xl lg:text-2xl text-ink">Download & Share</h3>
                  <p className="font-body text-mid text-sm sm:text-base leading-relaxed">
                    Get your photo strip instantly. Save it, share on social media, or send to friends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Dark */}
      <section className="py-20 sm:py-28 md:py-32 lg:py-40 bg-ink relative overflow-hidden">
        <div className="landing-container px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center space-y-5 sm:space-y-7 lg:space-y-8 max-w-2xl mx-auto">
            <p className="font-accent text-lg sm:text-xl lg:text-2xl text-bg/80">Ready?</p>
            <h2 className="font-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-bg font-semibold leading-tight tracking-tight">
              Create Memories That Last
            </h2>
            <p className="font-body text-bg/70 text-sm sm:text-base lg:text-lg max-w-md leading-relaxed">
              No signup required. Just open the booth and start capturing moments that last forever.
            </p>
            <div className="pt-4 sm:pt-6 flex flex-col items-center gap-4 sm:gap-5">
              <button
                onClick={onStartBooth}
                className="btn-cta-light"
              >
                <span className="btn-cta-inner text-sm sm:text-base">Start the Booth</span>
              </button>
              <p className="font-typewriter text-[11px] sm:text-xs text-bg/50 tracking-wider uppercase">
                No signup · Free · Instant
              </p>
            </div>
          </div>
        </div>

        {/* Decorative corners - hidden on small mobile, visible on larger screens */}
        <div className="hidden sm:block absolute top-6 sm:top-10 left-6 sm:left-10 w-14 sm:w-20 lg:w-24 h-14 sm:h-20 lg:h-24 cta-bracket cta-bracket-tl" />
        <div className="hidden sm:block absolute top-6 sm:top-10 right-6 sm:right-10 w-14 sm:w-20 lg:w-24 h-14 sm:h-20 lg:h-24 cta-bracket cta-bracket-tr" />
        <div className="hidden sm:block absolute bottom-6 sm:bottom-10 left-6 sm:left-10 w-14 sm:w-20 lg:w-24 h-14 sm:h-20 lg:h-24 cta-bracket cta-bracket-bl" />
        <div className="hidden sm:block absolute bottom-6 sm:bottom-10 right-6 sm:right-10 w-14 sm:w-20 lg:w-24 h-14 sm:h-20 lg:h-24 cta-bracket cta-bracket-br" />
      </section>
    </div>
  )
}

export default LandingPage
