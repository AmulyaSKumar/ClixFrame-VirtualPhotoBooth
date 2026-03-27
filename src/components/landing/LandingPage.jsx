import React from 'react'
import HeroSection from './HeroSection'

function LandingPage({ onStartBooth }) {
  return (
    <div className="landing-page bg-bg overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection onStartBooth={onStartBooth} />

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 md:py-28 lg:py-32 bg-paper">
        <div className="flex flex-col items-center justify-center px-5 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-3xl">
            <p className="font-accent text-xl sm:text-2xl text-ink mb-3">Why choose us</p>
            <h2 className="font-hero text-3xl sm:text-4xl md:text-5xl text-ink font-bold leading-tight tracking-tight mb-4">
              Simple. Beautiful. Memorable.
            </h2>
            <p className="font-body text-mid text-base sm:text-lg leading-relaxed">
              Create stunning photo booth experiences in seconds. No downloads, no signups, just pure fun.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl w-full">
            {/* Feature 1 */}
            <div className="bg-bg rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-14 h-14 bg-ghost/50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-subheading text-xl sm:text-2xl text-ink font-semibold mb-3">Instant Capture</h3>
              <p className="font-body text-mid text-sm sm:text-base leading-relaxed">
                Strike a pose and let the countdown begin. Four photos captured automatically.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-bg rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-14 h-14 bg-ghost/50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="font-subheading text-xl sm:text-2xl text-ink font-semibold mb-3">Fun Filters</h3>
              <p className="font-body text-mid text-sm sm:text-base leading-relaxed">
                Choose from vintage, modern, or playful styles. Make each strip unique.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-bg rounded-2xl p-6 sm:p-8 text-center">
              <div className="w-14 h-14 bg-ghost/50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="font-subheading text-xl sm:text-2xl text-ink font-semibold mb-3">Download & Share</h3>
              <p className="font-body text-mid text-sm sm:text-base leading-relaxed">
                Get your photo strip instantly. Save it or share on social media.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer between sections */}
      <div className="h-8 sm:h-12 md:h-16 bg-paper" />

      {/* CTA Section */}
      <section className="py-20 sm:py-28 md:py-32 lg:py-40 bg-ink">
        <div className="flex flex-col items-center justify-center px-5 sm:px-6 lg:px-8 text-center">
          <p className="font-accent text-xl sm:text-2xl text-bg/80 mb-4">Ready?</p>

          <h2 className="font-hero text-3xl sm:text-4xl md:text-5xl text-bg font-bold leading-tight tracking-tight mb-5">
            Create Memories That Last
          </h2>

          <p className="font-body text-bg/70 text-base sm:text-lg max-w-lg leading-relaxed mb-8">
            No signup required. Just open the booth and start capturing moments that last forever.
          </p>

          <button
            onClick={onStartBooth}
            className="font-subheading text-base sm:text-lg font-semibold bg-bg text-ink px-8 sm:px-12 py-3.5 sm:py-4 rounded-full hover:bg-bg/90 transition-all hover:scale-[1.02] shadow-lg mb-5"
          >
            Start the Booth
          </button>

          <p className="font-body text-xs sm:text-sm text-bg/50 tracking-wide">
            No signup · Free · Instant
          </p>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
