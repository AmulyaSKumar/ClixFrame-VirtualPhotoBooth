import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import Footer from '../landing/Footer'

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 sm:py-24 md:py-32 bg-bg flex justify-center">
        <div className="px-5 sm:px-8 lg:px-12 text-center" style={{ maxWidth: '800px' }}>
          <p className="font-accent text-xl sm:text-2xl text-ink/60 mb-4">Legal</p>
          <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink font-bold leading-tight tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="font-typewriter text-xs sm:text-sm text-mid uppercase tracking-widest">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full flex justify-center py-4 sm:py-6 bg-bg">
        <div className="w-12 sm:w-16 h-px bg-ink/15" />
      </div>

      {/* Privacy Highlight */}
      <section className="py-20 sm:py-28 md:py-36 bg-paper flex justify-center">
        <div className="px-5 sm:px-8 lg:px-12" style={{ width: '100%', maxWidth: '950px' }}>
          <div>
            <p className="font-accent text-lg sm:text-xl text-ink/60 mb-3">Our Core Principle</p>
            <h2 className="font-hero text-2xl sm:text-3xl md:text-4xl text-ink font-bold leading-tight tracking-tight mb-8">
              Your photos stay with you
            </h2>
            <div className="space-y-5 font-body text-mid text-base sm:text-lg leading-relaxed" style={{ maxWidth: '700px' }}>
              <p>
                All photos are processed locally in your browser. We never upload, store, or have access to any photos you capture.
              </p>
              <p>
                Your memories are yours alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-ink/10" />

      {/* Content Section */}
      <section className="pt-20 pb-28 sm:pt-28 sm:pb-36 md:pt-36 md:pb-44 bg-bg flex justify-center">
        <div className="px-5 sm:px-8 lg:px-12" style={{ width: '100%', maxWidth: '950px' }}>
          <div className="space-y-16 sm:space-y-20 md:space-y-24">

            {/* Overview */}
            <div>
              <div className="flex items-center gap-4 mb-5 sm:mb-6">
                <span className="font-typewriter text-sm text-ink/40">01</span>
                <h2 className="font-subheading text-xl sm:text-2xl text-ink font-semibold">Overview</h2>
              </div>
              <p className="font-body text-mid text-base sm:text-lg leading-relaxed">
                ClixFrame ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our virtual photo booth web application.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <div className="flex items-center gap-4 mb-5 sm:mb-6">
                <span className="font-typewriter text-sm text-ink/40">02</span>
                <h2 className="font-subheading text-xl sm:text-2xl text-ink font-semibold">Information We Collect</h2>
              </div>
              <div className="space-y-8">
                <div className="border-l-2 border-ink/20 pl-5 sm:pl-6">
                  <h3 className="font-subheading text-lg text-ink font-medium mb-3">Camera Access</h3>
                  <p className="font-body text-mid text-base sm:text-lg leading-relaxed">
                    We request access to your device's camera solely to capture photos within the app. Photos are processed entirely in your browser and are never uploaded to our servers.
                  </p>
                </div>
                <div className="border-l-2 border-ink/20 pl-5 sm:pl-6">
                  <h3 className="font-subheading text-lg text-ink font-medium mb-3">Local Storage</h3>
                  <p className="font-body text-mid text-base sm:text-lg leading-relaxed">
                    We may use your browser's local storage to save your preferences and session data. This data remains on your device.
                  </p>
                </div>
                <div className="border-l-2 border-ink/20 pl-5 sm:pl-6">
                  <h3 className="font-subheading text-lg text-ink font-medium mb-3">Analytics</h3>
                  <p className="font-body text-mid text-base sm:text-lg leading-relaxed">
                    We may use third-party analytics services to understand how users interact with our app. This data is anonymized and used solely to improve the user experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Third-Party Services */}
            <div>
              <div className="flex items-center gap-4 mb-5 sm:mb-6">
                <span className="font-typewriter text-sm text-ink/40">03</span>
                <h2 className="font-subheading text-xl sm:text-2xl text-ink font-semibold">Third-Party Services</h2>
              </div>
              <p className="font-body text-mid text-base sm:text-lg leading-relaxed mb-5">
                Our app may include:
              </p>
              <ul className="space-y-4 font-body text-mid text-base sm:text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-ink mt-1">•</span>
                  <span><strong className="text-ink">Google AdSense:</strong> We display advertisements through Google AdSense. Google may use cookies to serve ads based on your prior visits.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ink mt-1">•</span>
                  <span><strong className="text-ink">Google Analytics:</strong> We may use Google Analytics to collect anonymized usage data to help improve our service.</span>
                </li>
              </ul>
            </div>

            {/* Cookies */}
            <div>
              <div className="flex items-center gap-4 mb-5 sm:mb-6">
                <span className="font-typewriter text-sm text-ink/40">04</span>
                <h2 className="font-subheading text-xl sm:text-2xl text-ink font-semibold">Cookies</h2>
              </div>
              <p className="font-body text-mid text-base sm:text-lg leading-relaxed">
                We and our third-party partners may use cookies and similar tracking technologies. Cookies are small text files stored on your device. You can control cookie settings through your browser preferences.
              </p>
            </div>

            {/* Children's Privacy */}
            <div>
              <div className="flex items-center gap-4 mb-5 sm:mb-6">
                <span className="font-typewriter text-sm text-ink/40">05</span>
                <h2 className="font-subheading text-xl sm:text-2xl text-ink font-semibold">Children's Privacy</h2>
              </div>
              <p className="font-body text-mid text-base sm:text-lg leading-relaxed">
                Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <div className="flex items-center gap-4 mb-5 sm:mb-6">
                <span className="font-typewriter text-sm text-ink/40">06</span>
                <h2 className="font-subheading text-xl sm:text-2xl text-ink font-semibold">Your Rights</h2>
              </div>
              <p className="font-body text-mid text-base sm:text-lg leading-relaxed">
                Since we don't store your photos or personal data on our servers, there is no personal data for us to delete or provide. Your photos remain entirely under your control on your device.
              </p>
            </div>

            {/* Changes */}
            <div>
              <div className="flex items-center gap-4 mb-5 sm:mb-6">
                <span className="font-typewriter text-sm text-ink/40">07</span>
                <h2 className="font-subheading text-xl sm:text-2xl text-ink font-semibold">Policy Changes</h2>
              </div>
              <p className="font-body text-mid text-base sm:text-lg leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center gap-4 mb-5 sm:mb-6">
                <span className="font-typewriter text-sm text-ink/40">08</span>
                <h2 className="font-subheading text-xl sm:text-2xl text-ink font-semibold">Contact Us</h2>
              </div>
              <p className="font-body text-mid text-base sm:text-lg leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our <Link to="/contact" className="text-ink underline hover:no-underline">Contact page</Link>.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default PrivacyPage
