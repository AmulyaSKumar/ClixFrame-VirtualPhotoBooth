import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar({ variant = 'default' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // Determine if we're on a dark background (for CTA sections)
  const isDark = variant === 'dark'
  const isTransparent = variant === 'transparent'

  const bgClass = isDark
    ? 'bg-ink'
    : isTransparent
      ? 'bg-transparent'
      : 'bg-bg'

  const textClass = isDark ? 'text-bg' : 'text-ink'
  const mutedClass = isDark ? 'text-bg/60' : 'text-mid'
  const borderClass = isDark ? 'border-bg/10' : 'border-ink/10'

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { path: '/about', label: 'About' },
    { path: '/privacy', label: 'Privacy' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <header className={`${bgClass} ${!isTransparent ? 'border-b ' + borderClass : ''} sticky top-0 z-50`}>
      <div className="px-5 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Logo */}
        <Link
          to="/"
          className={`font-logo text-xl sm:text-2xl font-bold ${textClass} tracking-tight hover:opacity-70 transition-opacity`}
        >
          Clix<span className="font-accent text-2xl sm:text-3xl">frame</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-typewriter text-xs uppercase tracking-wider transition-colors ${
                isActive(link.path)
                  ? textClass
                  : `${mutedClass} hover:${textClass}`
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/templates"
            className={`font-typewriter text-xs font-semibold uppercase tracking-wider px-5 py-2.5 transition-all hover:scale-[1.02] ${
              isDark
                ? 'bg-bg text-ink hover:bg-paper'
                : 'bg-ink text-bg hover:bg-ink/90'
            }`}
            style={{ letterSpacing: '0.08em' }}
          >
            Start Booth
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            to="/templates"
            className={`font-typewriter text-xs font-semibold uppercase px-4 py-2 ${
              isDark
                ? 'bg-bg text-ink'
                : 'bg-ink text-bg'
            }`}
            style={{ letterSpacing: '0.06em' }}
          >
            Start
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 ${textClass}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className={`md:hidden ${isDark ? 'bg-ink' : 'bg-bg'} border-t ${borderClass} px-5 py-4`}>
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-typewriter text-sm uppercase tracking-wider py-2 transition-colors ${
                  isActive(link.path)
                    ? textClass
                    : mutedClass
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-ink/10">
              <Link
                to="/templates"
                onClick={() => setIsMenuOpen(false)}
                className={`block text-center font-typewriter text-sm font-semibold uppercase px-5 py-3 ${
                  isDark
                    ? 'bg-bg text-ink'
                    : 'bg-ink text-bg'
                }`}
                style={{ letterSpacing: '0.08em' }}
              >
                Start the Booth
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
