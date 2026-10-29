import React, { useState } from 'react';
import { 
  Calendar, 
  Wallet, 
  Clock, 
  MapPin, 
  Car, 
  HelpCircle, 
  Settings, 
  ChevronRight, 
  Leaf, 
  LogOut, 
  X, 
  CheckCircle2 
} from 'lucide-react';
import BottomNavigation from '../components/common/BottomNavigation';
import { INITIAL_USER } from '../data/mockData';

/**
 * SCREEN 8: User Profile & Account Management
 * - Mobile: Exact match to Screen 8 from reference image
 * - Desktop: Professional comprehensive account dashboard
 */
export default function ProfileScreen({ 
  user = INITIAL_USER, 
  onNavigateTab,
  onLogout 
}) {
  const [activeModal, setActiveModal] = useState(null);
  const [walletAmount, setWalletAmount] = useState(user.walletBalance || 1250);
  const [topupAmount, setTopupAmount] = useState('500');
  const [topupSuccess, setTopupSuccess] = useState(false);

  const menuItems = [
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'wallet', label: 'Wallet & Payments', icon: Wallet },
    { id: 'history', label: 'Charging History', icon: Clock },
    { id: 'saved', label: 'Saved Locations', icon: MapPin },
    { id: 'vehicle', label: 'Vehicle Management', icon: Car },
    { id: 'support', label: 'Support & Help', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleTopup = (e) => {
    e.preventDefault();
    const val = parseFloat(topupAmount);
    if (!isNaN(val) && val > 0) {
      setWalletAmount(prev => prev + val);
      setTopupSuccess(true);
      setTimeout(() => setTopupSuccess(false), 2500);
    }
  };

  return (
    <div className="profile-screen-root">
      <div className="profile-scroll-container">
        {/* User Profile Header Card matching reference Screen 8 */}
        <div className="profile-user-hero">
          <div className="profile-avatar-large">
            {user.initial || user.name.charAt(0)}
          </div>

          <div className="profile-user-details">
            <h1 className="profile-greeting">
              Hello, {user.name} 👋
            </h1>
            <p className="profile-motto">
              Drive the change
            </p>
          </div>
        </div>

        {/* Quick Vehicle & FastWallet Cards (Desktop & Mobile) */}
        <div className="profile-quick-cards-grid">
          {/* Card 1: FastWallet Balance */}
          <div 
            className="profile-summary-box wallet-highlight"
            onClick={() => setActiveModal('wallet')}
          >
            <div className="box-header">
              <span className="box-label">FastWallet Balance</span>
              <Wallet size={16} color="#006B48" />
            </div>
            <div className="box-main-val">₹{walletAmount.toFixed(0)}</div>
            <div className="box-action-link">+ Top Up via UPI</div>
          </div>

          {/* Card 2: Primary EV Vehicle */}
          <div 
            className="profile-summary-box vehicle-highlight"
            onClick={() => setActiveModal('vehicle')}
          >
            <div className="box-header">
              <span className="box-label">Active Vehicle</span>
              <Car size={16} color="#006B48" />
            </div>
            <div className="box-main-val">{user.vehicle?.model || 'Tata Nexon EV Max'}</div>
            <div className="box-sub-info">{user.vehicle?.regNumber || 'KA 01 MJ 4290'} • CCS2</div>
          </div>
        </div>

        {/* List of Profile & Account Options matching reference Screen 8 */}
        <div className="profile-menu-section">
          <div className="profile-menu-list">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  id={`profile-menu-${item.id}`}
                  onClick={() => setActiveModal(item.id)}
                  className="profile-menu-row"
                >
                  <div className="menu-row-left">
                    <Icon size={19} color="#006B48" strokeWidth={1.9} />
                    <span className="menu-row-label">{item.label}</span>
                  </div>

                  <ChevronRight size={17} color="#9EB0A9" strokeWidth={2} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Environmental Message Card matching reference Screen 8 */}
        <div className="eco-banner-container">
          <div className="eco-banner-card">
            <div className="eco-leaf-icon">
              <Leaf size={19} strokeWidth={2.4} color="#006B48" />
            </div>

            <div className="eco-banner-text">
              <div className="eco-title">Together for a cleaner tomorrow</div>
              <div className="eco-subtitle">Lower emissions. A greener India.</div>
            </div>
          </div>
        </div>

        {/* Logout Row */}
        <div className="profile-logout-box">
          <button
            onClick={onLogout}
            className="profile-logout-btn"
            id="profile-logout-btn"
          >
            <LogOut size={16} />
            <span>Sign Out from VOLTRIX</span>
          </button>
        </div>
      </div>

      {/* Mobile Fixed Bottom Navigation matching reference Screen 8 */}
      <div className="mobile-only">
        <BottomNavigation activeTab="profile" onTabChange={onNavigateTab} />
      </div>

      {/* Interactive Detail Modal Dialog */}
      {activeModal && (
        <div 
          className="modal-backdrop-overlay"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="profile-detail-modal-card"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-top-bar">
              <h3 className="modal-title">
                {menuItems.find(m => m.id === activeModal)?.label}
              </h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="modal-close-btn"
                id="modal-close-btn"
              >
                <X size={16} />
              </button>
            </div>

            <div className="modal-content-body">
              {/* Vehicle Management */}
              {activeModal === 'vehicle' && (
                <div className="vehicle-details-view">
                  <div className="vehicle-card-highlight">
                    <div className="vehicle-reg-tag">{user.vehicle.regNumber}</div>
                    <h4 className="vehicle-model-title">{user.vehicle.model}</h4>
                    <p className="vehicle-variant">{user.vehicle.variant}</p>
                    <div className="vehicle-specs-grid">
                      <div className="spec-item">
                        <span className="spec-name">Port Type</span>
                        <strong className="spec-val">{user.vehicle.chargingPort}</strong>
                      </div>
                      <div className="spec-item">
                        <span className="spec-name">Battery Capacity</span>
                        <strong className="spec-val">{user.vehicle.batteryCapacity} kWh</strong>
                      </div>
                      <div className="spec-item">
                        <span className="spec-name">Compatible Speeds</span>
                        <strong className="spec-val">AC Normal & DC Fast</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Wallet & Payments */}
              {activeModal === 'wallet' && (
                <div className="wallet-details-view">
                  <div className="wallet-card-green">
                    <span className="wallet-title-sub">VOLTRIX FastWallet</span>
                    <div className="wallet-big-number">₹{walletAmount.toFixed(2)}</div>
                    <span className="wallet-status">Auto-pay Enabled for Instant Charging</span>
                  </div>

                  <form onSubmit={handleTopup} className="wallet-topup-form">
                    <label className="topup-label">Add Funds via UPI (Instant Credit)</label>
                    <div className="topup-input-row">
                      <span className="currency-prefix">₹</span>
                      <input 
                        type="number"
                        value={topupAmount}
                        onChange={(e) => setTopupAmount(e.target.value)}
                        className="topup-amount-input"
                        id="wallet-topup-input"
                        min="100"
                        step="50"
                      />
                      <button 
                        type="submit" 
                        className="topup-submit-btn"
                        id="wallet-topup-btn"
                      >
                        Add Money
                      </button>
                    </div>

                    <div className="quick-amount-chips">
                      {['200', '500', '1000', '2000'].map(amt => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setTopupAmount(amt)}
                          className="amt-chip"
                        >
                          +₹{amt}
                        </button>
                      ))}
                    </div>

                    {topupSuccess && (
                      <div className="topup-success-note">
                        <CheckCircle2 size={16} color="#008C5A" />
                        <span>Successfully added ₹{topupAmount} to FastWallet!</span>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* My Bookings */}
              {activeModal === 'bookings' && (
                <div className="bookings-details-view">
                  <div className="active-booking-item">
                    <div className="booking-status-tag">Upcoming Slot</div>
                    <h4>GreenCharge Hub - Bay 2</h4>
                    <p>12th Main Road, Koramangala, Bengaluru</p>
                    <div className="booking-meta-line">
                      <span>Connector: AC Normal (7 kW)</span>
                      <span>Duration: 2 hours</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Charging History */}
              {activeModal === 'history' && (
                <div className="history-details-view">
                  <div className="history-item">
                    <div className="history-header">
                      <strong>VoltCharge Express (HAL 2nd Stage)</strong>
                      <span className="history-cost">₹117</span>
                    </div>
                    <div className="history-meta">
                      <span>Yesterday, 3:00 PM</span>
                      <span>•</span>
                      <span>6.5 kWh delivered</span>
                    </div>
                  </div>
                  <div className="history-item">
                    <div className="history-header">
                      <strong>GreenCharge Hub (Koramangala)</strong>
                      <span className="history-cost">₹80</span>
                    </div>
                    <div className="history-meta">
                      <span>24 Oct 2026</span>
                      <span>•</span>
                      <span>14.0 kWh delivered</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Saved Locations */}
              {activeModal === 'saved' && (
                <div className="saved-details-view">
                  <div className="saved-item">
                    <MapPin size={16} color="#006B48" />
                    <div>
                      <strong>Home Charger (Koramangala 4th Block)</strong>
                      <p>7 kW AC Wallbox</p>
                    </div>
                  </div>
                  <div className="saved-item">
                    <MapPin size={16} color="#006B48" />
                    <div>
                      <strong>Office (Ecospace, Bellandur)</strong>
                      <p>60 kW DC Fast Station</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Support & Settings */}
              {(activeModal === 'support' || activeModal === 'settings') && (
                <div className="support-settings-view">
                  <p>
                    24x7 Voltrix Charging Helpline: <strong>1800-VOLTRIX (1800-865-8749)</strong>
                  </p>
                  <p style={{ marginTop: '8px', color: '#71817D' }}>
                    Version 2.4.0 • Verified TLS 1.3 Encryption • Server Region: Bengaluru (asia-south1)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
