import React, { useState } from 'react';
import { 
  Home, 
  MapPin, 
  Zap, 
  Calendar, 
  User, 
  Wallet, 
  Bell, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import VoltrixLogo from './VoltrixLogo';

export default function Navbar({ 
  currentRoute, 
  onRouteChange, 
  user, 
  chargingSession 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const isCharging = chargingSession && chargingSession.status === 'active';

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Find Chargers', icon: MapPin },
    { id: 'pricing_options', label: 'Pricing', icon: Zap },
    { id: 'booking_summary', label: 'My Bookings', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleNavClick = (routeId) => {
    onRouteChange(routeId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="voltrix-main-header">
      <div className="header-inner">
        {/* Left: Brand Identity */}
        <div className="header-brand" onClick={() => handleNavClick('home')}>
          <VoltrixLogo variant="light" size="medium" horizontal={true} />
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="desktop-nav-menu">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`desktop-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={16} strokeWidth={isActive ? 2.4 : 1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Active Live Session Indicator Chip */}
          {isCharging && (
            <button
              onClick={() => handleNavClick('charging_session')}
              className={`live-charging-pill ${currentRoute === 'charging_session' ? 'active' : ''}`}
              title="View live active charging session"
            >
              <span className="live-pulse-dot" />
              <Zap size={14} fill="#48F542" color="#48F542" />
              <span>Charging ({chargingSession.currentBattery || 42}%)</span>
            </button>
          )}
        </nav>

        {/* Right: Quick User & Wallet Actions */}
        <div className="header-right-actions">
          {/* FastWallet Balance Button */}
          <button 
            className="wallet-quick-badge"
            onClick={() => handleNavClick('profile')}
            title="FastWallet Balance"
          >
            <div className="wallet-badge-icon">
              <Wallet size={15} color="#006B48" />
            </div>
            <div className="wallet-badge-text">
              <span className="wallet-label">Wallet</span>
              <span className="wallet-val">₹{user?.walletBalance?.toFixed(0) || '1,250'}</span>
            </div>
          </button>

          {/* Notifications Bell */}
          <div style={{ position: 'relative' }}>
            <button
              className="header-icon-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications"
            >
              <Bell size={18} />
              <span className="notification-badge" />
            </button>

            {/* Notification Popover Dropdown */}
            {showNotifications && (
              <div className="notifications-popover">
                <div className="popover-header">
                  <h4>Notifications</h4>
                  <button onClick={() => setShowNotifications(false)}>
                    <X size={14} />
                  </button>
                </div>
                <div className="popover-list">
                  <div className="popover-item unread">
                    <div className="item-icon green">
                      <Zap size={14} />
                    </div>
                    <div className="item-content">
                      <p><strong>Charger Available:</strong> GreenCharge Hub now has 6/6 bays open.</p>
                      <span className="item-time">5m ago</span>
                    </div>
                  </div>
                  <div className="popover-item">
                    <div className="item-icon blue">
                      <ShieldCheck size={14} />
                    </div>
                    <div className="item-content">
                      <p><strong>FastWallet Topup:</strong> ₹500 credited via UPI successfully.</p>
                      <span className="item-time">2h ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <button 
            className="user-profile-avatar-btn"
            onClick={() => handleNavClick('profile')}
            title={`${user?.name || 'Misbah'} - Profile`}
          >
            <div className="avatar-circle">
              {user?.initial || 'M'}
            </div>
            <div className="avatar-info desktop-only">
              <span className="avatar-name">{user?.name || 'Misbah'}</span>
              <span className="avatar-sub">Tata Nexon EV</span>
            </div>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-menu-toggle mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown-menu">
          <div className="mobile-menu-user-row" onClick={() => handleNavClick('profile')}>
            <div className="avatar-circle">{user?.initial || 'M'}</div>
            <div>
              <div style={{ fontWeight: 700, color: '#152A27' }}>Hello, {user?.name || 'Misbah'} 👋</div>
              <div style={{ fontSize: '12px', color: '#71817D' }}>Drive the change</div>
            </div>
          </div>

          <div className="mobile-menu-links">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} color={isActive ? '#006B48' : '#71817D'} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {isCharging && (
              <button
                onClick={() => handleNavClick('charging_session')}
                className="mobile-nav-link active charging"
              >
                <Zap size={18} color="#48F542" />
                <span>Active Charging Session ({chargingSession.currentBattery}%)</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('welcome')}
              className="mobile-nav-link welcome"
            >
              <ArrowRight size={18} color="#006B48" />
              <span>Welcome Screen / Intro</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
