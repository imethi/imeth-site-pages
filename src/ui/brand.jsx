import React from 'react'

export const brand = {
  bg: 'bg-slate-50 dark:bg-slate-950',
  text: 'text-slate-950 dark:text-slate-50',
  accentBg: 'bg-indigo-600',
  card: 'bg-white dark:bg-slate-900',
}

export const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-indigo-600/25 px-3 py-1 text-xs text-slate-900 dark:text-slate-100">
    {children}
  </span>
)

export const Card = ({ children, className = '' }) => (
  <div className={`rounded-2xl ${brand.card} shadow-sm ring-1 ring-black/5 dark:ring-white/10 p-6 ${className}`}>
    {children}
  </div>
)
