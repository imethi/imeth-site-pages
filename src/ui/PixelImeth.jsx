import React from 'react'

/**
 * PixelImeth v2 — taller, right-facing walk cycle in scrubs with stethoscope.
 * Crisp SVG "pixel art" (no image files). Scales cleanly. Accessible to prefers-reduced-motion.
 *
 * Props:
 *  - size: number (px)
 *  - direction: 'right' | 'left'    // mirrors sprite
 *  - skin, hair, beard, glasses, scrubsTop, scrubsPant, shoe, scope, scopeHead: color overrides
 */
export default function PixelImeth({
  size = 196,
  direction = 'right',
  skin = '#C58C5C',        // warm medium-brown
  hair = '#1b1b1b',
  beard = '#2a2118',
  glasses = '#D4AF37',     // gold frame
  scrubsTop = '#16b1a4',
  scrubsPant = '#119189',
  shoe = '#6b7280',
  scope = '#9aa0a6',
  scopeHead = '#e5e7eb',
}) {
  // helpers to place 1x1 "pixels" on a 24x32 grid
  const Px = ({ x, y, c }) => <rect x={x} y={y} width="1" height="1" fill={c} />
  const many = (pts, c) => pts.map(([x, y], i) => <Px key={`${c}-${i}-${x}-${y}`} x={x} y={y} c={c} />)
  const rectBlock = (x1, x2, y1, y2, c) => {
    const pts = []
    for (let y = y1; y <= y2; y++) for (let x = x1; x <= x2; x++) pts.push([x, y])
    return many(pts, c)
  }

  // Flip for direction
  const flip = direction === 'left' ? -1 : 1
  const originX = direction === 'left' ? 24 : 0

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 32"
      shapeRendering="crispEdges"
      className="select-none drop-shadow-xl"
      aria-label="Animated pixel avatar in scrubs walking"
    >
      <style>{`
        @keyframes bob { 0%{ transform: translateY(0px) } 50%{ transform: translateY(-1.2px) } 100%{ transform: translateY(0px) } }
        @keyframes armL { 0%{ transform: rotate(10deg) } 50%{ transform: rotate(-10deg) } 100%{ transform: rotate(10deg) } }
        @keyframes armR { 0%{ transform: rotate(-10deg) } 50%{ transform: rotate(10deg) } 100%{ transform: rotate(-10deg) } }
        @keyframes legL { 0%{ transform: rotate(-12deg) } 50%{ transform: rotate(12deg) } 100%{ transform: rotate(-12deg) } }
        @keyframes legR { 0%{ transform: rotate(12deg) } 50%{ transform: rotate(-12deg) } 100%{ transform: rotate(12deg) } }
        @keyframes swingScope { 0%{ transform: rotate(4deg) } 50%{ transform: rotate(-4deg) } 100%{ transform: rotate(4deg) } }
        @keyframes blink { 0%, 92%, 100% { opacity: 1 } 93%, 96% { opacity: 0 } }
        @media (prefers-reduced-motion: reduce) {
          .anim-bob, .anim-armL, .anim-armR, .anim-legL, .anim-legR, .anim-scope, .blink { animation: none !important; }
        }
        .anim-bob { animation: bob 820ms ease-in-out infinite; }
        .anim-armL { transform-origin: 8px 15px; animation: armL 820ms ease-in-out infinite; }
        .anim-armR { transform-origin: 16px 15px; animation: armR 820ms ease-in-out infinite; }
        .anim-legL { transform-origin: 10px 22px; animation: legL 820ms ease-in-out infinite; }
        .anim-legR { transform-origin: 14px 22px; animation: legR 820ms ease-in-out infinite; }
        .anim-scope { transform-origin: 12px 13px; animation: swingScope 1200ms ease-in-out infinite; }
        .blink { animation: blink 4.2s steps(1,end) infinite; }
      `}</style>

      {/* Mirror horizontally for left/right */}
      <g transform={`translate(${originX} 0) scale(${flip} 1)`}>
        {/* Whole body slight bob */}
        <g className="anim-bob">
          {/* ---- HAIR (rounded top) ---- */}
          {rectBlock(7, 16, 3, 4, hair)}
          {many([[7,5],[16,5],[8,5],[15,5],[9,5],[14,5]], hair)}

          {/* ---- FACE ---- */}
          {rectBlock(8, 15, 6, 10, skin)}
          {rectBlock(9, 14, 5, 5, skin)}
          {/* nose hint */}
          {many([[12,8]], '#8b5e3c')}

          {/* ---- GLASSES (gold frame + clear lenses) ---- */}
          {/* frame top */}
          {many([[9,7],[10,7],[12,7],[13,7]], glasses)}
          {/* sides */}
          {many([[9,8],[13,8]], glasses)}
          {/* bridge */}
          {many([[11,7]], glasses)}
          {/* lenses (very light fill) */}
          {many([[9,8],[10,8],[12,8],[13,8]], '#f9fafb')}
          {/* temples */}
          {many([[8,7],[14,7]], glasses)}

          {/* eyes under lenses */}
          {many([[10,8],[13,8]], '#111827')}
          {/* blink overlay */}
          <g className="blink">{many([[10,8],[13,8]], skin)}</g>

          {/* ---- BEARD + MUSTACHE ---- */}
          {/* beard sides + chin */}
          {rectBlock(8, 9, 10, 11, beard)}
          {rectBlock(14, 15, 10, 11, beard)}
          {rectBlock(10, 11, 11, 11, beard)}
          {rectBlock(12, 13, 11, 11, beard)}
          {/* mustache */}
          {many([[10,9],[11,9],[12,9],[13,9]], beard)}

          {/* neck */}
          {rectBlock(11, 12, 12, 12, skin)}

          {/* ---- SCRUBS TOP (V-neck) ---- */}
          {rectBlock(6, 17, 13, 17, scrubsTop)}
          {rectBlock(6, 17, 14, 18, scrubsTop)}
          {/* V-neck cutout */}
          {many([[11,13],[12,13]], skin)}

          {/* ---- STETHOSCOPE (slight swing) ---- */}
          <g className="anim-scope">
            {/* tube loop */}
            {many([[10,12],[9,13],[9,14],[9,15],[10,16],[11,16],[13,16],[14,15],[14,14],[14,13]], scope)}
            {/* earpiece nubs */}
            {many([[10,12],[13,12]], '#424a56')}
            {/* chest piece */}
            {rectBlock(12, 13, 17, 17, scopeHead)}
            <rect x="12" y="17" width="2" height="1" fill="none" stroke="#cbd5e1" strokeWidth="0.25"/>
          </g>

          {/* ---- ARMS (separate for swing) ---- */}
          <g className="anim-armL">
            {many([[6,15],[6,16],[6,17]], skin)}
            {/* cuff hint */}
            {many([[7,15]], scrubsTop)}
          </g>
          <g className="anim-armR">
            {many([[17,15],[17,16],[17,17]], skin)}
            {many([[16,15]], scrubsTop)}
          </g>

          {/* ---- PANTS ---- */}
          {rectBlock(8, 15, 19, 22, scrubsPant)}

          {/* ---- LEGS (swing groups) ---- */}
          <g className="anim-legL">
            {rectBlock(9, 10, 19, 22, scrubsPant)}
            {/* shoe */}
            {many([[9,23],[10,23]], shoe)}
          </g>
          <g className="anim-legR">
            {rectBlock(13, 14, 19, 22, scrubsPant)}
            {many([[13,23],[14,23]], shoe)}
          </g>

          {/* subtle top highlight on scrubs */}
          {many([[7,14],[8,14],[7,15],[8,15]], '#1cc0b2')}
        </g>
      </g>
    </svg>
  )
}
