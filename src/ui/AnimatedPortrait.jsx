import React from 'react'
import { motion } from 'framer-motion'

/**
 * AnimatedPortrait
 * - Gentle bob/breathe
 * - Blinking eyelids (positioned with percentages)
 * - Subtle glasses shine sweep
 *
 * Props:
 *   src        : image URL (required)
 *   alt        : string
 *   width      : rendered width in px (height auto)
 *   skin       : eyelid color (match your skin tone)
 *   eyeL / eyeR: { x, y, w, h } positions as percentages of container (tune if needed)
 */
export default function AnimatedPortrait({
  src,
  alt = 'Portrait',
  width = 260,
  skin = '#C58C5C',
  // tweak these if you change the image or crop; these work nicely for your portrait
  eyeL = { x: 36, y: 34.5, w: 8.5, h: 7.5 },
  eyeR = { x: 63.5, y: 34.5, w: 8.5, h: 7.5 },
}) {
  const BASE = import.meta.env.BASE_URL || '/'
  const resolvedSrc = src?.startsWith('http') ? src : `${BASE}${src || ''}`

  return (
    <div
      style={{ width, aspectRatio: '3/4' }}
      className="relative select-none"
      aria-label="Animated portrait"
    >
      <style>{`
        @keyframes blink { 0%, 92%, 100% { transform: scaleY(0) } 93%, 96% { transform: scaleY(1) } }
        @keyframes shine {
          0% { background-position: 120% 0 }
          100% { background-position: -20% 0 }
        }
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
          /* clip to glasses region (ellipse over eyes area) */
          clip-path: ellipse(40% 16% at 50% 37%);
        }
      `}</style>

      {/* Bob/breathe & micro-tilt */}
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

      {/* Glasses shine */}
      <div className="ap-shine" />

      {/* Eyelids (blink) */}
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

