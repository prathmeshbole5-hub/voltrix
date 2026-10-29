import React from 'react';

/**
 * Mobile System Status Bar (9:41, Cellular, Wi-Fi, Battery)
 */
export default function StatusBar({ variant = 'dark' }) {
  // variant 'light' = dark text on light bg (e.g. #152A27)
  // variant 'dark' = white text on dark bg (e.g. #FFFFFF)
  const isDarkContent = variant === 'light'; // dark icons on light background
  const color = isDarkContent ? '#152A27' : '#FFFFFF';

  return (
    <div 
      style={{
        width: '100%',
        height: '44px',
        padding: '12px 24px 0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 50,
        pointerEvents: 'none',
        userSelect: 'none'
      }}
    >
      {/* Time */}
      <span 
        style={{
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '-0.2px',
          color: color,
          fontFamily: 'var(--font-family-base)'
        }}
      >
        9:41
      </span>

      {/* Dynamic Island / Notch spacer */}
      <div 
        style={{
          width: '90px',
          height: '24px',
          backgroundColor: isDarkContent ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.4)',
          borderRadius: '16px',
          position: 'absolute',
          left: '50%',
          top: '8px',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: '8px',
          opacity: 0.35
        }}
      >
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00251F' }} />
      </div>

      {/* Status Icons: Cellular, Wifi, Battery */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: color }}>
        {/* Cellular Signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          <rect x="0.5" y="8" width="3" height="3" rx="0.5" fill={color} />
          <rect x="4.5" y="5.5" width="3" height="5.5" rx="0.5" fill={color} />
          <rect x="8.5" y="3" width="3" height="8" rx="0.5" fill={color} />
          <rect x="12.5" y="0.5" width="3" height="10.5" rx="0.5" fill={color} />
        </svg>

        {/* Wi-Fi Icon */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path 
            d="M7.5 10.5C8.05228 10.5 8.5 10.0523 8.5 9.5C8.5 8.94772 8.05228 8.5 7.5 8.5C6.94772 8.5 6.5 8.94772 6.5 9.5C6.5 10.0523 6.94772 10.5 7.5 10.5Z" 
            fill={color} 
          />
          <path 
            d="M4.5 6.8C5.3 6.1 6.3 5.7 7.5 5.7C8.7 5.7 9.7 6.1 10.5 6.8" 
            stroke={color} 
            strokeWidth="1.5" 
            strokeLinecap="round" 
          />
          <path 
            d="M1.8 4C3.4 2.6 5.3 1.9 7.5 1.9C9.7 1.9 11.6 2.6 13.2 4" 
            stroke={color} 
            strokeWidth="1.5" 
            strokeLinecap="round" 
          />
        </svg>

        {/* Battery Icon */}
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
          <rect x="0.75" y="0.75" width="19.5" height="10.5" rx="3.25" stroke={color} strokeWidth="1.2" />
          <rect x="2.5" y="2.5" width="13" height="7" rx="1.8" fill={color} />
          <path d="M22 4.5C22.6 4.9 23 5.4 23 6C23 6.6 22.6 7.1 22 7.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
