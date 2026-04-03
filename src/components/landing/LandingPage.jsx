import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import HeroSection from './HeroSection'
import Footer from './Footer'

function LandingPage() {
  return (
    <div className="landing-page bg-bg overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Divider between Hero and Features */}
      <div className="w-full flex justify-center py-8 sm:py-12 bg-bg">
        <div className="w-12 sm:w-16 h-px bg-ink/15" />
      </div>

      {/* Features Section */}
      <section id="features" className="pt-12 pb-24 sm:pt-16 sm:pb-32 md:pt-20 md:pb-40 bg-paper flex justify-center">
        <div className="px-6 sm:px-8 lg:px-12" style={{ width: '100%', maxWidth: '1100px' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p className="font-accent text-xl sm:text-2xl text-ink/70 mb-4">How it works</p>
            <h2 className="font-hero text-3xl sm:text-4xl md:text-5xl text-ink font-bold leading-tight tracking-tight">
              Three simple steps
            </h2>
          </div>

          {/* Numbered Features */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', textAlign: 'center' }}>
            {/* Feature 1 */}
            <div className="group" style={{ padding: '2rem 1rem' }}>
              <span className="font-hero text-7xl sm:text-8xl md:text-9xl font-bold text-ink/[0.07] leading-none transition-all duration-300 group-hover:text-ink/[0.12]" style={{ display: 'block' }}>
                01
              </span>
              <h3 className="font-subheading text-xl sm:text-2xl text-ink font-semibold" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                Strike a pose
              </h3>
              <p className="font-body text-mid text-sm sm:text-base leading-relaxed" style={{ maxWidth: '260px', margin: '0 auto' }}>
                Your camera counts down and captures four photos automatically. Just smile and have fun.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group" style={{ padding: '2rem 1rem' }}>
              <span className="font-hero text-7xl sm:text-8xl md:text-9xl font-bold text-ink/[0.07] leading-none transition-all duration-300 group-hover:text-ink/[0.12]" style={{ display: 'block' }}>
                02
              </span>
              <h3 className="font-subheading text-xl sm:text-2xl text-ink font-semibold" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                Pick your style
              </h3>
              <p className="font-body text-mid text-sm sm:text-base leading-relaxed" style={{ maxWidth: '260px', margin: '0 auto' }}>
                Choose from filters, frames, and layouts. Add stickers to make each strip uniquely yours.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group" style={{ padding: '2rem 1rem' }}>
              <span className="font-hero text-7xl sm:text-8xl md:text-9xl font-bold text-ink/[0.07] leading-none transition-all duration-300 group-hover:text-ink/[0.12]" style={{ display: 'block' }}>
                03
              </span>
              <h3 className="font-subheading text-xl sm:text-2xl text-ink font-semibold" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                Download & share
              </h3>
              <p className="font-body text-mid text-sm sm:text-base leading-relaxed" style={{ maxWidth: '260px', margin: '0 auto' }}>
                Get your photo strip instantly. Save it to your device or share directly to social media.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer / Visual Break */}
      <div className="h-px w-full bg-ink/10" />

      {/* CTA Section */}
      <section className="py-28 sm:py-36 md:py-44 bg-ink relative flex justify-center overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10 px-6 sm:px-8 lg:px-12" style={{ width: '100%', maxWidth: '700px', textAlign: 'center' }}>
          <p className="font-accent text-2xl sm:text-3xl text-bg/60 mb-6">Ready to start?</p>

          <h2 className="font-hero text-4xl sm:text-5xl md:text-6xl text-bg font-bold leading-tight tracking-tight mb-6">
            Create memories that last
          </h2>

          <p className="font-body text-bg/50 text-base sm:text-lg leading-relaxed" style={{ maxWidth: '420px', margin: '0 auto 3rem auto' }}>
            No signup required. No downloads. Just open and start capturing moments.
          </p>

          <Link
            to="/templates"
            className="inline-block font-subheading text-base sm:text-lg font-semibold bg-bg text-ink px-12 sm:px-16 py-4 sm:py-5 rounded-full hover:bg-paper transition-all duration-300 hover:scale-[1.03] shadow-xl hover:shadow-2xl"
          >
            Start the Booth
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginTop: '3rem' }} className="text-bg/30">
            <span className="font-typewriter text-xs uppercase tracking-widest">Free</span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%' }} className="bg-bg/20" />
            <span className="font-typewriter text-xs uppercase tracking-widest">No signup</span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%' }} className="bg-bg/20" />
            <span className="font-typewriter text-xs uppercase tracking-widest">Instant</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default LandingPage
