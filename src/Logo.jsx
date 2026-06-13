import React from 'react'

/**
 * Name logo: an interlocking "TV" monogram + the full wordmark.
 * Drawn with currentColor so it inherits the header colour (white, composited
 * with mix-blend difference) and stays legible over any theme or the moving
 * 3D object beneath it.
 */
export default function Logo({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 372 64"
      role="img"
      aria-label="Thushan Vithana"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* monogram frame */}
      <rect x="1" y="1" width="62" height="62" rx="5" stroke="currentColor" strokeWidth="1.4" />
      {/* interlocking T + V */}
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M16 19 H40" />
        <path d="M28 19 V45" />
        <path d="M34 19 L44 45 L54 19" />
      </g>

      {/* wordmark */}
      <text
        x="82"
        y="30"
        fontFamily="'Times New Roman', Georgia, serif"
        fontSize="27"
        letterSpacing="1.5"
        fill="currentColor"
      >
        Thushan Vithana
      </text>
      <text
        x="83"
        y="50"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="9.5"
        letterSpacing="5.5"
        fill="currentColor"
        opacity="0.6"
      >
        CREATIVE TECHNOLOGIST
      </text>
    </svg>
  )
}
