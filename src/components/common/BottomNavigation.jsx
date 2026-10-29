import React from 'react';
import { Home, MapPin, Calendar, User } from 'lucide-react';

/**
 * Pixel-Accurate Fixed Bottom Navigation Bar
 * Tabs: Home, Map, Bookings, Profile
 */
export default function BottomNavigation({ 
  activeTab = 'home', 
  onTabChange = () => {} 
}) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav 
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E4ECE8',
        padding: '8px 16px 20px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 40,
        boxShadow: '0 -4px 16px rgba(0, 37, 31, 0.04)'
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        const activeColor = '#006B48';
        const inactiveColor = '#71817D';

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              flex: 1,
              padding: '4px 0',
              transition: 'all 0.2s ease',
              color: isActive ? activeColor : inactiveColor
            }}
          >
            <div style={{ position: 'relative' }}>
              <Icon 
                size={22} 
                strokeWidth={isActive ? 2.4 : 1.8} 
                color={isActive ? activeColor : inactiveColor} 
              />
            </div>
            <span 
              style={{
                fontSize: '11px',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? activeColor : inactiveColor,
                letterSpacing: '-0.1px'
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
