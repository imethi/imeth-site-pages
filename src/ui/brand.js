import React from 'react'

export const brand = {
  bg: 'bg-emerald-50 dark:bg-emerald-950',
  text: 'text-emerald-950 dark:text-emerald-50',
  accentBg: 'bg-emerald-700',
  // solid cards for better contrast (no transparency)
  card: 'bg-white dark:bg-emerald-900',
}

export const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-emerald-700/25 px-3 py-1 text-xs text-emerald-900 dark:text-emerald-100">
    {children}
  </span>
)

export const Card = ({ children, className = '' }) => (
  <div className={`rounded-2xl ${brand.card} shadow-sm ring-1 ring-black/5 dark:ring-white/10 p-6 ${className}`}>
    {children}
  </div>
)
