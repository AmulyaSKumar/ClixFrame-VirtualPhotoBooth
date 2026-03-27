import React from 'react'

function Button({
  children,
  variant = 'primary', // 'primary' | 'outline' | 'ghost' | 'primary-light' | 'outline-light'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  onClick,
  disabled = false,
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'btn-landing',
    outline: 'btn-landing-outline',
    ghost: 'bg-transparent text-mid hover:text-ink hover:bg-ghost font-typewriter uppercase tracking-wider text-sm',
    'primary-light': 'btn-landing-light',
    'outline-light': 'btn-landing-outline-light',
  }

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: '',
    lg: 'btn-landing-lg',
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
