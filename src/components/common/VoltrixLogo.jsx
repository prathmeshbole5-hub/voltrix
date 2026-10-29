import React from 'react';

/**
 * VOLTRIX Brand Logo Component
 * Pixel-accurate vector representation matching reference image:
 * - Sleek electric car silhouette + vertical battery with lightning bolt
 * - Geometric "VOLTRIX" wordmark
 * - Tagline "FIND • CHARGE • GO"
 */
export default function VoltrixLogo({ 
  variant = 'light', // 'light' (for white bg) | 'dark' (for dark teal bg) | 'compact'
  size = 'medium',   // 'small' | 'medium' | 'large'
  showTagline = true,
  horizontal = false,
  className = '' 
}) {
  const isDark = variant === 'dark';

  const strokeColor = isDark ? '#48F542' : '#006B48';
  const textColor = isDark ? '#FFFFFF' : '#152A27';
  const taglineColor = isDark ? '#A0B2AC' : '#71817D';
  const glowFilter = isDark ? 'drop-shadow(0 0 8px rgba(72, 245, 66, 0.45))' : 'none';

  const scale = size === 'small' ? 0.75 : size === 'large' ? 1.25 : 1;

  if (horizontal) {
    return (
      <div 
        className={`voltrix-logo-horizontal ${className}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          userSelect: 'none',
          cursor: 'pointer'
        }}
      >
        <svg 
          width="44" 
          height="32" 
          viewBox="0 0 110 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: glowFilter, flexShrink: 0 }}
        >
          <rect x="46" y="3" width="18" height="24" rx="3.5" stroke={strokeColor} strokeWidth="2.2" fill="none" />
          <path d="M51 1.5H59" stroke={strokeColor} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M56 6.5L50.5 15H55.5L54 22.5L60 14H55L56 6.5Z" fill={strokeColor} />
          <path d="M6 38C12 36 22 28 36 26C45 24.8 55 24.8 65 26C80 28 92 36 104 38" stroke={strokeColor} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M94 36.5C98 37.2 103 38.5 106 41" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M16 36.5C12 37.2 7 38.5 4 41" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span 
            style={{
              fontFamily: "'Space Grotesk', var(--font-family-base)",
              fontSize: '18px',
              fontWeight: 800,
              letterSpacing: '0.18em',
              color: textColor,
              lineHeight: 1.1,
              textTransform: 'uppercase'
            }}
          >
            VOLTRIX
          </span>
          {showTagline && (
            <span 
              style={{
                fontSize: '8px',
                fontWeight: 700,
                letterSpacing: '0.28em',
                color: taglineColor,
                marginTop: '1px',
                textTransform: 'uppercase'
              }}
            >
              FIND • CHARGE • GO
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`voltrix-logo-container ${className}`} 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'center center'
      }}
    >
      {/* Sleek EV Car Silhouette with Battery & Lightning Bolt */}
      <svg 
        width="110" 
        height="48" 
        viewBox="0 0 110 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: glowFilter }}
      >
        {/* Battery Outline centered above */}
        <rect 
          x="46" 
          y="3" 
          width="18" 
          height="24" 
          rx="3.5" 
          stroke={strokeColor} 
          strokeWidth="2.2" 
          fill="none" 
        />
        {/* Battery Terminal Cap */}
        <path 
          d="M51 1.5H59" 
          stroke={strokeColor} 
          strokeWidth="2.4" 
          strokeLinecap="round" 
        />
        {/* Lightning Bolt inside Battery */}
        <path 
          d="M56 6.5L50.5 15H55.5L54 22.5L60 14H55L56 6.5Z" 
          fill={strokeColor} 
        />

        {/* Dynamic Sleek EV Car Body Profile Silhouette */}
        <path 
          d="M6 38C12 36 22 28 36 26C45 24.8 55 24.8 65 26C80 28 92 36 104 38" 
          stroke={strokeColor} 
          strokeWidth="2.2" 
          strokeLinecap="round" 
        />
        {/* Aerodynamic Front Fender Line */}
        <path 
          d="M94 36.5C98 37.2 103 38.5 106 41" 
          stroke={strokeColor} 
          strokeWidth="1.8" 
          strokeLinecap="round" 
        />
        {/* Aerodynamic Rear Deck Line */}
        <path 
          d="M16 36.5C12 37.2 7 38.5 4 41" 
          stroke={strokeColor} 
          strokeWidth="1.8" 
          strokeLinecap="round" 
        />
      </svg>

      {/* Brand Wordmark */}
      <div 
        style={{
          fontFamily: "'Space Grotesk', var(--font-family-base)",
          fontSize: '22px',
          fontWeight: 700,
          letterSpacing: '0.22em',
          color: textColor,
          lineHeight: 1.1,
          marginTop: '2px',
          textTransform: 'uppercase'
        }}
      >
        VOLTRIX
      </div>

      {/* Brand Tagline */}
      {showTagline && (
        <div 
          style={{
            fontFamily: "var(--font-family-base)",
            fontSize: '8.5px',
            fontWeight: 600,
            letterSpacing: '0.36em',
            color: taglineColor,
            marginTop: '4px',
            textTransform: 'uppercase'
          }}
        >
          FIND • CHARGE • GO
        </div>
      )}
    </div>
  );
}
