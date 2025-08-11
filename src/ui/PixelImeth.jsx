import React from 'react'

/**
 * PixelImeth — a tiny animated pixel avatar in scrubs with stethoscope.
 * Props: size (px), scrub, hair, skin, accent colors
 */
export default function PixelImeth({
  size = 160,
  scrubs = '#1fb6a6',       // teal scrubs
  scrubsDark = '#15908a',   // pants
  hair = '#2b2b2b',
  skin = '#f1c27d',
  shoe = '#6b7280',
  scope = '#9aa0a6',        // stethoscope tube
  scopeHead = '#e5e7eb'     // stethoscope chest piece
}) {
  // helper to place 1x1 "pixels" in a 24x24 grid
  const P = ({ x, y, c }) => <rect x={x} y={y} width="1" height="1" fill={c} />
  const many = (coords, c) => coords.map(([x, y], i) => <P key={c + i} x={x} y={y} c={c} />)

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      shapeRendering="crispEdges"
      className="select-none drop-shadow-xl"
      aria-label="Animated pixel avatar"
    >
      <style>{`
        @keyframes floaty { 0%{ transform: translateY(0) } 50%{ transform: translateY(-1.5px) } 100%{ transform: translateY(0) } }
        @keyframes swing  { 0%{ transform: rotate(3deg) } 50%{ transform: rotate(-3deg) } 100%{ transform: rotate(3deg) } }
        @keyframes blink  { 0%, 2%, 60%, 62%, 100% { opacity: 0 } 1% { opacity: 1 } 61% { opacity: 1 } }
        @media (prefers-reduced-motion: reduce) {
          .anim-float, .anim-swing { animation: none !important; }
        }
        .anim-float { animation: floaty 3.6s ease-in-out infinite; }
        .anim-scope { transform-origin: 12px 10px; animation: swing 3.4s ease-in-out infinite; }
        .blink { animation: blink 6s steps(1, end) infinite; }
      `}</style>

      {/* Whole figure */}
      <g className="anim-float">
        {/* Hair */}
        {many([
          [8,4],[9,4],[10,4],[11,4],[12,4],[13,4],[14,4],[15,4],
          [8,5],[15,5],[9,5],[14,5],
          [9,6],[14,6]
        ], hair)}

        {/* Face */}
        {(() => {
          const px = []
          for (let y = 5; y <= 9; y++) {
            for (let x = 9; x <= 14; x++) px.push([x, y])
          }
          return many(px, skin)
        })()}

        {/* Eyes (black), then eyelids overlay that blinks */}
        {many([[10,7],[13,7]], '#111827')}
        <g className="blink">{many([[10,7],[13,7]], skin)}</g>

        {/* Neck */}
        {many([[11,10],[12,10]], skin)}

        {/* Scrubs top */}
        {(() => {
          const px = []
          for (let y = 11; y <= 15; y++) for (let x = 7; x <= 16; x++) px.push([x,y])
          // V-neck cutout
          return (
            <>
              {many(px, scrubs)}
              {many([[11,11],[12,11]], skin)}
            </>
          )
        })()}

        {/* Arms */}
        {many([[6,12],[6,13],[6,14],[17,12],[17,13],[17,14]], skin)}

        {/* Pants */}
        {(() => {
          const px = []
          for (let y = 16; y <= 19; y++) for (let x = 8; x <= 15; x++) px.push([x,y])
          return many(px, scrubsDark)
        })()}

        {/* Shoes */}
        {many([[8,21],[9,21],[10,21],[13,21],[14,21],[15,21]], shoe)}

        {/* Stethoscope (tube + chest piece); slight swing */}
        <g className="anim-scope">
          {/* tube around neck (pixel style) */}
          {many([[10,10],[9,11],[9,12],[9,13],[10,14],[11,14],[13,14],[14,13],[14,12],[14,11]], scope)}
          {/* earpieces hint */}
          {many([[10,10],[13,10]], '#374151')}
          {/* chest piece */}
          <rect x="12" y="15" width="2" height="2" fill={scopeHead} />
          <rect x="12" y="15" width="2" height="2" fill="none" stroke="#cbd5e1" strokeWidth="0.25"/>
        </g>

        {/* Subtle highlight on scrubs (adds a bit of depth) */}
        {many([[7,12],[8,12],[9,12],[10,12],[7,13],[8,13]], '#26c2b3')}
      </g>
    </svg>
  )
}

