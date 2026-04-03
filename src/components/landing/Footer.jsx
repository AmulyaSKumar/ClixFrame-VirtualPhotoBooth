import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bg py-16 sm:py-20 md:py-24">
      <div className="px-6 sm:px-8 lg:px-12" style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 md:gap-8">

          {/* Brand */}
          <div className="text-center md:text-left">
            <Link to="/" className="font-logo text-2xl sm:text-3xl font-bold text-ink tracking-tight hover:opacity-70 transition-opacity">
              ClixFrame
            </Link>
            <p className="font-body text-mid text-sm mt-2" style={{ maxWidth: '280px' }}>
              Virtual photo booth. Free, private, and fun.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-6 sm:gap-10">
            <Link
              to="/"
              className="font-typewriter text-xs sm:text-sm text-mid hover:text-ink transition-colors uppercase tracking-wider"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="font-typewriter text-xs sm:text-sm text-mid hover:text-ink transition-colors uppercase tracking-wider"
            >
              About
            </Link>
            <Link
              to="/privacy"
              className="font-typewriter text-xs sm:text-sm text-mid hover:text-ink transition-colors uppercase tracking-wider"
            >
              Privacy
            </Link>
            <Link
              to="/contact"
              className="font-typewriter text-xs sm:text-sm text-mid hover:text-ink transition-colors uppercase tracking-wider"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-ink/10 my-10 sm:my-12" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="font-body text-mid text-xs sm:text-sm">
            &copy; {currentYear} ClixFrame. All rights reserved.
          </p>
          <p className="font-typewriter text-xs text-mid/50 uppercase tracking-widest">
            Made with care
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
