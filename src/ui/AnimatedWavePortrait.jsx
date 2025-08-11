import React from 'react'
import { motion } from 'framer-motion'

/**
 * AnimatedWavePortrait
 * - Uses your single PNG/JPG and creates a waving effect by layering the same image:
 *   base image + clipped arm layer that rotates around an elbow pivot
 * - Gentle bob, glasses shine, and blinking eyelids
 *
 * Props:
 *   src     : image path (relative to public/) or absolute URL
 *   alt     : string alt
 *   width   : rendered width in px (height auto via aspect)
 *   ratio   : CSS aspect-ratio string (e.g. '2/3' for 768x1152). Default '2/3'
 *   skin    : eyelid color hex
 *   eyeL/R  : { x, y, w, h } in % of container for eyelid positioning
 *   armClip : CSS clip-path polygon for the waving arm (in %). Tweak to fit other crops.
 *   pivot   : transform-origin for the arm layer (e.g., '22% 42%')
 *   waveDeg : amplitude of wave rotation (deg)
 */
export default function AnimatedWavePortrait({
  src,
  alt = 'Waving portrait',
  width = 320,
  ratio = '2/3',                 // your 768x1152 image ≈ 2:3
  skin = '#C58C5C',
  // Defaults tuned for the “hand-up” image you sent. Nudge if needed.
  eyeL = { x: 46, y: 31, w: 10, h: 6.5 },
  eyeR = { x: 63, y: 31, w: 10, h: 6.5 },
  // Approx mask around the raised LEFT arm/hand (in % of the whole image)
  armClip = 'polygon(6% 33%, 25% 33%, 28% 57%, 22% 78%, 9% 78%, 6% 65%)',
  pivot = '22% 43%',             // elbow-ish pivot for rotation
  waveDeg = 14                   // +/- degrees
}) {
  const BASE = import.meta.env.BASE_URL || '/'
  const resolvedSrc = src?.startsWith('http') ? src : `${BASE}${src || ''}`

  return (
    <div
      style={{ width, aspectRatio: ratio }}
      className="relative select-none"
      aria-label="Animated waving portrait"
    >
      <style>{`
        @keyframes blink { 0%, 86%, 100% { transform: scaleY(0) } 92%, 94% { transform: scaleY(1) } }
        @keyframes shine { 0% { background-position: 120% 0 } 100% { background-position: -20% 0 } }
        /* Wave cycle: neutral(0-30%) -> wave(30-60%) -> neutral(60-100%) */
        @keyframes waveCycle {
          0%   { transform: rotate(0deg) }
          20%  { transform: rotate(0deg) }
          30%  { transform: rotate(${waveDeg}deg) }
          40%  { transform: rotate(${-waveDeg * 0.7}deg) }
          50%  { transform: rotate(${waveDeg * 0.6}deg) }
          60%  { transform: rotate(0deg) }
          100% { transform: rotate(0deg) }
        }
        @keyframes bob { 0%{ transform: translateY(0px) } 50%{ transform: translateY(-3px) } 100%{ transform: translateY(0px) } }

        @media (prefers-reduced-motion: reduce) {
          .awp-bob, .awp-shine, .awp-eye, .awp-arm { animation: none !important; }
        }

        .awp-eye {
          position: absolute;
          transform: scaleY(0);
          transform-origin: 50% 0%;
          border-radius: 9999px;
          animation: blink 4.8s steps(1,end) infinite;
          pointer-events: none;
        }
        .awp-shine {
          position: absolute; inset: 0; pointer-events: none; opacity: .35;
          background: linear-gradient(115deg, transparent 42%, rgba(255,255,255,.35) 50%, transparent 58%);
          background-size: 220% 100%;
          animation: shine 7.5s linear infinite;
          mix-blend-mode: screen;
          /* Ellipse over glasses area (tweak if crop changes) */
          clip-path: ellipse(40% 16% at 56% 33%);
        }
        .awp-arm {
          position: absolute; inset: 0; pointer-events: none;
          clip-path: ${armClip};
          transform-origin: ${pivot};
          animation: waveCycle 3.2s ease-in-out infinite;
        }
      `}</style>

      {/* base: gentle bob */}
      <motion.div
        className="absolute inset-0 awp-bob"
        initial={{ y: 0, rotate: 0 }}
        animate={{ y: [0, -2, 0], rotate: [0, -0.3, 0.3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Base image (no frame, no ring, contain to avoid crop) */}
        <img
          src={resolvedSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full object-contain"
          onError={(e) => { e.currentTarget.style.opacity = 0.4 }}
        />
      </motion.div>

      {/* Arm layer (same image, clipped & animated). Slightly above base. */}
      <div className="awp-arm">
        <img
          src={resolvedSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>

      {/* Glasses shine */}
      <div className="awp-shine" />

      {/* Eyelids for blink */}
      <div
        className="awp-eye"
        style={{
          left: `${eyeL.x - eyeL.w / 2}%`,
          top: `${eyeL.y}%`,
          width: `${eyeL.w}%`,
          height: `${eyeL.h}%`,
          background: skin,
          animationDelay: '0.15s',
        }}
      />
      <div
        className="awp-eye"
        style={{
          left: `${eyeR.x - eyeR.w / 2}%`,
          top: `${eyeR.y}%`,
          width: `${eyeR.w}%`,
          height: `${eyeR.h}%`,
          background: skin,
          animationDelay: '2.0s',
        }}
      />
    </div>
  )
}

