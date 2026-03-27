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

  // Rotate phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % rotatingPhrases.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  // Trigger animations on mount
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen relative bg-bg">
      {/* Content */}
      <div className="relative z-10 landing-container min-h-screen flex flex-col px-5 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="py-5 sm:py-6 flex items-center justify-between border-b border-ink/10">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <span className="font-logo text-xl sm:text-2xl md:text-3xl text-ink font-bold tracking-tight">
              Clix<span className="font-accent text-ink">frame</span>
            </span>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex-1 flex items-center py-10 sm:py-12 lg:py-0">
          <div className="w-full grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
            {/* Left: Text Content - appears FIRST on mobile */}
            <div className={`space-y-6 sm:space-y-8 lg:space-y-10 text-center lg:text-left order-1 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              {/* Main Headline */}
              <div className="space-y-4 sm:space-y-6">
                <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-ink font-semibold leading-[1.15] tracking-tight">
                  Strike a Pose.
                  <br />
                  <span className="mt-2 inline-block">Frame the Moment.</span>
                </h1>

                {/* Rotating Subline */}
                <div className="h-10 sm:h-12 md:h-14 flex items-center justify-center lg:justify-start mt-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="font-subheading text-base sm:text-lg md:text-xl lg:text-2xl text-mid">Perfect for</span>
                    <div className="relative h-8 sm:h-10 md:h-11 w-36 sm:w-48 md:w-56 overflow-hidden">
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
                          <span className="font-accent text-xl sm:text-2xl md:text-3xl text-ink whitespace-nowrap">
                            {phrase}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start pt-2 ${isVisible ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
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
              <p className={`font-body text-mid text-sm sm:text-base italic leading-relaxed ${isVisible ? 'animate-slide-up delay-300' : 'opacity-0'}`}>
                "Because the best memories aren't just clicked—they're kept."
              </p>

              {/* Social Proof */}
              <div className={`flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start ${isVisible ? 'animate-slide-up delay-400' : 'opacity-0'}`}>
                <div className="social-proof-badge">
                  10,000+ memories
                </div>
                <div className="social-proof-badge">
                  No signup
                </div>
                <div className="social-proof-badge">
                  Instant fun
                </div>
              </div>
            </div>

            {/* Right: Demo Preview - appears SECOND on mobile */}
            <div className={`flex justify-center order-2 mt-4 sm:mt-0 ${isVisible ? 'animate-slide-in-right delay-300' : 'opacity-0'}`}>
              <DemoPreview className="w-44 sm:w-52 md:w-60 lg:w-72" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
