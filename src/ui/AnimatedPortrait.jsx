import React from 'react'
import { motion } from 'framer-motion'

/**
 * AnimatedPortrait
 * - Gentle bob/breathe
 * - Blinking eyelids
 * - Subtle glasses shine sweep
 *
 * Props:
 *   src        : image URL (public/ path or absolute)
 *   alt        : string
 *   width      : rendered width in px (height auto via aspect)
 *   skin       : eyelid color
 *   eyeL/eyeR  : { x, y, w, h } in percentages to position lids
 */
export default function AnimatedPortrait({
  src,
  alt = 'Portrait',
  width = 280,
  skin = '#C58C5C',
  eyeL = { x: 36, y: 34.5, w: 8.5, h: 7.5 },
  eyeR = { x: 63.5, y: 34.5, w: 8.5, h: 7.5 },
}) {
  const BASE = import.meta.env.BASE_URL || '/'
  const resolvedSrc = src?.startsWith('http') ? src : `${BASE}${src || ''}`

  return (
    <div style={{ width, aspectRatio: '3/4' }} className="relative select-none" aria-label="Animated portrait">
      <style>{`
        @keyframes blink { 0%, 92%, 100% { transform: scaleY(0) } 93%, 96% { transform: scaleY(1) } }
        @keyframes shine { 0% { background-position: 120% 0 } 100% { background-position: -20% 0 } }
        @media (prefers-reduced-motion: reduce) {
          .ap-bob, .ap-shine, .ap-eye { animation: none !important; }
        }
        .ap-eye {
          position: absolute;
          transform: scaleY(0);
          transform-origin: 50% 0%;
          border-radius: 9999px;
          animation: blink 4.6s steps(1,end) infinite;
          opacity: 1;
          pointer-events: none;
        }
        .ap-shine {
          position: absolute; inset: 0; pointer-events: none; opacity: .35;
          background: linear-gradient(115deg, transparent 42%, rgba(255,255,255,.35) 50%, transparent 58%);
          background-size: 220% 100%;
          animation: shine 7.5s linear infinite;
          mix-blend-mode: screen;
          clip-path: ellipse(40% 16% at 50% 37%);
        }
      `}</style>

      <motion.div
        className="absolute inset-0 ap-bob"
        initial={{ y: 0, rotate: 0 }}
        animate={{ y: [0, -4, 0], rotate: [0, -0.4, 0.4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src={resolvedSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover rounded-2xl ring-1 ring-white/10"
          onError={(e) => { e.currentTarget.style.opacity = 0.4 }}
        />
      </motion.div>

      <div className="ap-shine" />

      <div
        className="ap-eye"
        style={{
          left: `${eyeL.x - eyeL.w / 2}%`,
          top: `${eyeL.y}%`,
          width: `${eyeL.w}%`,
          height: `${eyeL.h}%`,
          background: skin,
          animationDelay: '0.2s',
        }}
      />
      <div
        className="ap-eye"
        style={{
          left: `${eyeR.x - eyeR.w / 2}%`,
          top: `${eyeR.y}%`,
          width: `${eyeR.w}%`,
          height: `${eyeR.h}%`,
          background: skin,
          animationDelay: '2.1s',
        }}
      />
    </div>
  )
}
