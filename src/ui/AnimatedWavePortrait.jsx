import React from 'react'
import { motion } from 'framer-motion'

/**
 * AnimatedWavePortrait (glitch-free)
 * - One bobbing container for ALL layers (base, arm, shine, eyelids) to avoid sub-pixel drift.
 * - GPU hints to keep it smooth.
 */
export default function AnimatedWavePortrait({
  src,
  alt = 'Waving portrait',
  width = 320,
  ratio = '2/3',                 // your 768x1152 ≈ 2:3
  skin = '#C58C5C',
  eyeL = { x: 46, y: 31, w: 10, h: 6.5 },
  eyeR = { x: 63, y: 31, w: 10, h: 6.5 },
  armClip = 'polygon(6% 33%, 25% 33%, 28% 57%, 22% 78%, 9% 78%, 6% 65%)',
  pivot = '22% 43%',
  waveDeg = 14,
  bobAmount = 3,                  // px
  duration = 3.2                  // seconds for a full neutral→wave→neutral
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
        .layer { position: absolute; inset: 0; }
        .gpu { will-change: transform; transform: translateZ(0); backface-visibility: hidden; }

        /* Blink (brief, near the end of each cycle so it feels natural) */
        @keyframes blink { 0%, 84%, 100% { transform: scaleY(0) } 90%, 92% { transform: scaleY(1) } }

        /* Shine across glasses */
        @keyframes shine { 0% { background-position: 120% 0 } 100% { background-position: -20% 0 } }

        /* Wave cycle: neutral -> wave -> neutral (holds at ends) */
        @keyframes waveCycle {
          0%   { transform: rotate(0deg) }
          22%  { transform: rotate(0deg) }
          35%  { transform: rotate(${waveDeg}deg) }
          48%  { transform: rotate(${-waveDeg * 0.75}deg) }
          60%  { transform: rotate(${waveDeg * 0.6}deg) }
          78%  { transform: rotate(0deg) }
          100% { transform: rotate(0deg) }
        }

        @media (prefers-reduced-motion: reduce) {
          .awp-bob, .awp-shine, .awp-eye, .awp-arm { animation: none !important; }
        }

        .awp-eye {
          position: absolute;
          transform: scaleY(0);
          transform-origin: 50% 0%;
          border-radius: 9999px;
          animation: blink ${duration}s steps(1,end) infinite;
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
          clip-path: ${armClip};
          transform-origin: ${pivot};
          animation: waveCycle ${duration}s ease-in-out infinite;
          pointer-events: none;
        }
      `}</style>

      {/* ONE bobbing wrapper for every layer to keep them perfectly aligned */}
      <motion.div
        className="layer gpu awp-bob"
        initial={{ y: 0, rotate: 0 }}
        animate={{ y: [0, -bobAmount, 0], rotate: [0, -0.25, 0.25, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Base image (no frame/crop) */}
        <img
          draggable={false}
          loading="eager"
          src={resolvedSrc}
          alt={alt}
          className="layer object-contain gpu"
          onError={(e) => { e.currentTarget.style.opacity = 0.4 }}
        />

        {/* Arm overlay (same image, clipped & animated) */}
        <div className="layer gpu awp-arm">
          <img
            draggable={false}
            src={resolvedSrc}
            alt=""
            aria-hidden="true"
            className="layer object-contain gpu"
          />
        </div>

        {/* Glasses shine */}
        <div className="awp-shine layer" />

        {/* Eyelids (blink) */}
        <div
          className="awp-eye"
          style={{
            left: `${eyeL.x - eyeL.w / 2}%`,
            top: `${eyeL.y}%`,
            width: `${eyeL.w}%`,
            height: `${eyeL.h}%`,
            background: skin,
            animationDelay: `${duration * 0.05}s`,
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
            animationDelay: `${duration * 0.45}s`,
          }}
        />
      </motion.div>
    </div>
  )
}
