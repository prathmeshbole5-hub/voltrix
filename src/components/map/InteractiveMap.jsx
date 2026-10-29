import React, { useState } from 'react';
import { Navigation, Plus, Minus } from 'lucide-react';

/**
 * Pixel-Accurate Custom Vector Map of Bengaluru (Koramangala, Indiranagar, BTM Layout)
 * Displays charging station markers and user location beacon matching Screen 2.
 */
export default function InteractiveMap({ 
  selectedStationId = 'st_greencharge_hub', 
  onSelectStation = () => {} 
}) {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 1.8));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.8));
  const handleCenterUser = () => {
    setZoom(1);
  };

  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#F3F7F5',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* Scalable Map Canvas */}
      <svg 
        viewBox="0 0 400 480" 
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          transform: `scale(${zoom})`,
          transition: 'transform 0.3s cubic-bezier(0.2, 0, 0, 1)'
        }}
      >
        {/* Background Land */}
        <rect width="400" height="480" fill="#F4F8F6" />

        {/* Green Parks / Open Areas */}
        <path d="M40 80 Q100 60 140 100 T120 180 Q80 200 40 160 Z" fill="#E2F1EA" opacity="0.8" />
        <path d="M260 120 Q320 90 380 140 T360 220 Q280 240 250 180 Z" fill="#E2F1EA" opacity="0.8" />
        <path d="M20 320 Q80 280 160 320 T140 420 Q60 440 20 380 Z" fill="#E2F1EA" opacity="0.8" />
        <path d="M220 360 Q300 320 370 370 T350 460 Q260 470 210 420 Z" fill="#E2F1EA" opacity="0.8" />

        {/* Water Bodies (e.g. Agara Lake / Bellandur outline) */}
        <path d="M300 240 Q340 230 380 250 T390 310 Q330 320 290 280 Z" fill="#E0EFF6" />

        {/* Road Grid Network */}
        {/* Major Highways & Ring Roads */}
        <path d="M-20 180 C80 160 220 200 420 170" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
        <path d="M-20 180 C80 160 220 200 420 170" stroke="#DFE7E3" strokeWidth="6" strokeLinecap="round" />

        <path d="M120 -20 C140 160 160 320 150 500" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
        <path d="M120 -20 C140 160 160 320 150 500" stroke="#DFE7E3" strokeWidth="7" strokeLinecap="round" />

        <path d="M-20 340 C120 330 260 360 420 330" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
        <path d="M-20 340 C120 330 260 360 420 330" stroke="#DFE7E3" strokeWidth="7" strokeLinecap="round" />

        <path d="M280 -20 C270 140 290 320 290 500" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
        <path d="M280 -20 C270 140 290 320 290 500" stroke="#DFE7E3" strokeWidth="6" strokeLinecap="round" />

        {/* Secondary Cross Streets */}
        <line x1="30" y1="60" x2="380" y2="90" stroke="#E6EFEA" strokeWidth="4" />
        <line x1="10" y1="240" x2="390" y2="250" stroke="#E6EFEA" strokeWidth="4" />
        <line x1="20" y1="410" x2="390" y2="400" stroke="#E6EFEA" strokeWidth="4" />
        <line x1="60" y1="0" x2="70" y2="480" stroke="#E6EFEA" strokeWidth="4" />
        <line x1="210" y1="0" x2="220" y2="480" stroke="#E6EFEA" strokeWidth="4" />
        <line x1="350" y1="0" x2="340" y2="480" stroke="#E6EFEA" strokeWidth="4" />

        {/* Diagonal Arterial Connectors */}
        <path d="M40 40 Q160 180 340 380" stroke="#FFFFFF" strokeWidth="7" />
        <path d="M40 40 Q160 180 340 380" stroke="#D7E3DD" strokeWidth="4" />

        {/* Area Names Labels (Matching reference image) */}
        <text 
          x="180" 
          y="150" 
          fontFamily="var(--font-family-base)" 
          fontSize="15" 
          fontWeight="700" 
          fill="#3B4F4A"
          textAnchor="middle"
        >
          Bengaluru
        </text>

        <text 
          x="310" 
          y="150" 
          fontFamily="var(--font-family-base)" 
          fontSize="9.5" 
          fontWeight="600" 
          letterSpacing="0.8" 
          fill="#869994"
          textAnchor="middle"
        >
          INDIRANAGAR
        </text>

        <text 
          x="220" 
          y="285" 
          fontFamily="var(--font-family-base)" 
          fontSize="9.5" 
          fontWeight="600" 
          letterSpacing="0.8" 
          fill="#869994"
          textAnchor="middle"
        >
          KORAMANGALA
        </text>

        <text 
          x="215" 
          y="350" 
          fontFamily="var(--font-family-base)" 
          fontSize="9.5" 
          fontWeight="600" 
          letterSpacing="0.8" 
          fill="#869994"
          textAnchor="middle"
        >
          BTM LAYOUT
        </text>

        {/* User Current Location Indicator (Blue Dot with pulsing radar ring) */}
        <g transform="translate(195, 175)">
          <circle r="16" fill="rgba(0, 122, 255, 0.18)">
            <animate attributeName="r" values="8;20;8" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle r="7" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />
          <circle r="5" fill="#007AFF" />
        </g>

        {/* Extra Charging Marker Pins from Mock Data */}
        {/* Additional pin at Indiranagar */}
        <g 
          transform="translate(180, 85)" 
          style={{ cursor: 'pointer' }}
          onClick={() => onSelectStation('st_voltcharge_indiranagar')}
        >
          <circle r="16" fill="#006B48" filter="drop-shadow(0 4px 8px rgba(0,107,72,0.35))" />
          <path d="M180 77 L176 86 H180 L179 92 L185 84 H181 L182 77 Z" fill="#FFFFFF" transform="translate(-180, -85)" />
        </g>

        {/* Pin West */}
        <g transform="translate(110, 120)">
          <circle r="15" fill="#006B48" filter="drop-shadow(0 4px 8px rgba(0,107,72,0.3))" />
          <path d="M110 113 L107 120 H110 L109 126 L114 119 H111 L112 113 Z" fill="#FFFFFF" transform="translate(-110, -120)" />
        </g>

        {/* Pin South-West */}
        <g transform="translate(120, 205)">
          <circle r="15" fill="#006B48" filter="drop-shadow(0 4px 8px rgba(0,107,72,0.3))" />
          <path d="M120 198 L117 205 H120 L119 211 L124 204 H121 L122 198 Z" fill="#FFFFFF" transform="translate(-120, -205)" />
        </g>

        {/* Pin North-East */}
        <g transform="translate(330, 115)">
          <circle r="15" fill="#006B48" filter="drop-shadow(0 4px 8px rgba(0,107,72,0.3))" />
          <path d="M330 108 L327 115 H330 L329 121 L334 114 H331 L332 108 Z" fill="#FFFFFF" transform="translate(-330, -115)" />
        </g>

        {/* Pin East (Koramangala East) */}
        <g transform="translate(360, 220)">
          <circle r="15" fill="#006B48" filter="drop-shadow(0 4px 8px rgba(0,107,72,0.3))" />
          <path d="M360 213 L357 220 H360 L359 226 L364 219 H361 L362 213 Z" fill="#FFFFFF" transform="translate(-360, -220)" />
        </g>

        {/* Primary Station Pin (GreenCharge Hub Koramangala) */}
        <g 
          transform="translate(195, 240)" 
          style={{ cursor: 'pointer' }}
          onClick={() => onSelectStation('st_greencharge_hub')}
        >
          {/* Active selection glow ring */}
          {selectedStationId === 'st_greencharge_hub' && (
            <circle r="23" fill="none" stroke="#48F542" strokeWidth="2.5" opacity="0.85">
              <animate attributeName="r" values="21;26;21" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
          <circle 
            r="17" 
            fill="#006B48" 
            stroke="#FFFFFF" 
            strokeWidth="2.5"
            filter="drop-shadow(0 6px 12px rgba(0,107,72,0.4))" 
          />
          {/* Lightning Bolt */}
          <path d="M195 231 L190.5 241 H195 L193.5 248 L200.5 239 H196 L197.5 231 Z" fill="#FFFFFF" transform="translate(-195, -240)" />
        </g>
      </svg>

      {/* Floating Map Controls */}
      <div 
        style={{
          position: 'absolute',
          right: '16px',
          top: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 10
        }}
      >
        <button
          onClick={handleCenterUser}
          title="My Location"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#006B48'
          }}
        >
          <Navigation size={18} />
        </button>
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#152A27'
          }}
        >
          <Plus size={18} />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#152A27'
          }}
        >
          <Minus size={18} />
        </button>
      </div>
    </div>
  );
}
