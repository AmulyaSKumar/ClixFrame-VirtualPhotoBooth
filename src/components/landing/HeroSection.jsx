import React, { useState, useEffect } from 'react'
import Button from './Button'
import DemoPreview from './DemoPreview'

const rotatingPhrases = [
  'parties',
  'college fests',
  'friend hangouts',
  'unforgettable nights',
]

function HeroSection({ onStartBooth }) {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % rotatingPhrases.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen relative bg-bg">
      <div className="relative z-10 landing-container min-h-screen flex flex-col px-5 sm:px-6 lg:px-8">
        {/* Navigation / Header */}
        <nav className="py-5 sm:py-6 flex items-center justify-between">
          <span className="font-logo text-2xl sm:text-2xl md:text-3xl text-ink font-bold tracking-tight">
            Clix<span className="font-accent text-3xl sm:text-3xl md:text-4xl">frame</span>
          </span>
        </nav>

        {/* Hero Content - Added more top margin on mobile */}
        <div className="flex-1 flex items-center mt-6 sm:mt-0">
          <div className="w-full grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
            {/* Left: Text Content */}
            <div className={`space-y-6 sm:space-y-8 lg:space-y-10 text-center lg:text-left order-1 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              {/* Main Headline */}
              <div className="space-y-4 sm:space-y-5">
                <h1 className="font-hero text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl text-ink font-bold leading-[1.1] tracking-tight">
                  Strike a Pose.
                  <br />
                  <span className="mt-1 inline-block">Frame the Moment.</span>
                </h1>

                {/* Rotating Subline */}
                <div className="h-10 sm:h-12 md:h-14 flex items-center justify-center lg:justify-start">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="font-body text-base sm:text-lg md:text-xl text-mid">Perfect for</span>
                    <div className="relative h-8 sm:h-10 md:h-11 w-40 sm:w-48 md:w-56 overflow-hidden">
                      {rotatingPhrases.map((phrase, index) => (
                        <div
                          key={phrase}
                          className={`absolute inset-0 flex items-center transition-all duration-500 ${
                            index === currentPhrase
                              ? 'opacity-100 translate-y-0'
                              : index === (currentPhrase - 1 + rotatingPhrases.length) % rotatingPhrases.length
                              ? 'opacity-0 -translate-y-full'
                              : 'opacity-0 translate-y-full'
                          }`}
                        >
                          <span className="font-accent text-2xl sm:text-2xl md:text-3xl text-ink whitespace-nowrap">
                            {phrase}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start ${isVisible ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
                <Button variant="primary" size="lg" onClick={onStartBooth} className="w-full sm:w-auto">
                  Start the Booth
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto"
                >
                  See How It Works
                </Button>
              </div>

              {/* Emotional tagline */}
              <p className={`font-body text-mid text-sm sm:text-base italic leading-relaxed max-w-md mx-auto lg:mx-0 ${isVisible ? 'animate-slide-up delay-300' : 'opacity-0'}`}>
                "Because the best memories aren't just clicked—they're kept."
              </p>

              {/* Social Proof */}
              <div className={`flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start ${isVisible ? 'animate-slide-up delay-400' : 'opacity-0'}`}>
                <div className="font-body text-xs sm:text-sm text-mid bg-ghost/50 px-3 py-1.5 rounded-full">
                  10,000+ memories
                </div>
                <div className="font-body text-xs sm:text-sm text-mid bg-ghost/50 px-3 py-1.5 rounded-full">
                  No signup
                </div>
                <div className="font-body text-xs sm:text-sm text-mid bg-ghost/50 px-3 py-1.5 rounded-full">
                  Instant fun
                </div>
              </div>
            </div>

            {/* Right: Demo Preview */}
            <div className={`flex justify-center order-2 mt-4 sm:mt-0 ${isVisible ? 'animate-slide-in-right delay-300' : 'opacity-0'}`}>
              <DemoPreview className="w-40 sm:w-52 md:w-60 lg:w-72" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
