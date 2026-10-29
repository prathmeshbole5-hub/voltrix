import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Heart, 
  Star, 
  MapPin, 
  Zap, 
  Plug, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

/**
 * SCREEN 3: Charging Station Details
 * - Mobile: Matches Screen 3 from reference image
 * - Desktop: Professional two-column layout with photo hero & specs on left, pricing/connector booking card on right
 */
export default function StationDetailScreen({ 
  station, 
  onBack, 
  onBookNow,
  onOpenPricingOptions,
  selectedPricingModel = 'hourly',
  onSelectPricingModel,
  selectedConnectorId = 'ac_normal_7',
  onSelectConnector
}) {
  const [isFavorite, setIsFavorite] = useState(station?.isFavorite || false);

  const pricingTabs = [
    { id: 'hourly', label: 'Hourly' },
    { id: 'unit', label: 'Per Unit' },
    { id: 'percentage', label: 'Per %' }
  ];

  // Helper to format pricing label based on active pricing model
  const getPriceForConnector = (connector) => {
    if (selectedPricingModel === 'unit') {
      return `₹${connector.unitPrice} / unit`;
    }
    if (selectedPricingModel === 'percentage') {
      return `₹${connector.percentagePrice} / %`;
    }
    return `₹${connector.hourlyPrice} / hour`;
  };

  const currentConnector = station.connectors?.find(c => c.id === selectedConnectorId) || station.connectors?.[0];

  return (
    <div className="station-detail-root">
      {/* Back button breadcrumb banner for desktop & mobile */}
      <div className="station-breadcrumb-bar">
        <button 
          onClick={onBack} 
          className="back-nav-btn"
          id="station-detail-back-btn"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
          <span>Back to Stations</span>
        </button>

        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className={`favorite-action-btn ${isFavorite ? 'favorited' : ''}`}
          id="station-favorite-btn"
          title="Favorite Station"
        >
          <Heart size={18} fill={isFavorite ? '#48F542' : 'none'} color={isFavorite ? '#48F542' : '#71817D'} />
          <span className="desktop-only">{isFavorite ? 'Saved to Favorites' : 'Save Station'}</span>
        </button>
      </div>

      {/* Main Responsive Layout Grid */}
      <div className="station-detail-grid">
        {/* Left Column: Cover Hero & Station Info */}
        <div className="station-left-column">
          <div 
            className="station-cover-hero"
            style={{ backgroundImage: `url(${station.image || '/images/station-hero.jpg'})` }}
          >
            <div className="cover-hero-overlay" />
            <div className="cover-badges">
              <span className="live-badge">
                <span className="live-pulse-dot" />
                Live Telemetry Verified
              </span>
            </div>
          </div>

          <div className="station-info-card">
            <div className="station-title-row">
              <h1 className="station-main-title">{station.name}</h1>
            </div>

            <div className="station-meta-row">
              <div className="rating-box">
                <Star size={15} fill="#F5A623" color="#F5A623" />
                <strong>{station.rating}</strong>
                <span>({station.reviewCount} reviews)</span>
              </div>
              <div className="distance-box">
                <MapPin size={14} color="#71817D" />
                <span>{station.distance}</span>
              </div>
            </div>

            <div className="station-address-row">
              <MapPin size={15} color="#71817D" className="address-pin-icon" />
              <span>{station.address}</span>
            </div>

            {/* 3 Information Stat Cards in a row matching reference Screen 3 */}
            <div className="station-stat-cards-row">
              {/* Card 1: DC Fast 60 kW */}
              <div className="station-stat-card">
                <div className="stat-card-icon green">
                  <Zap size={20} strokeWidth={2.4} />
                </div>
                <div className="stat-card-title">DC Fast</div>
                <div className="stat-card-sub">(60 kW)</div>
              </div>

              {/* Card 2: AC Normal 7 kW */}
              <div className="station-stat-card">
                <div className="stat-card-icon green">
                  <Plug size={20} strokeWidth={2.4} />
                </div>
                <div className="stat-card-title">AC Normal</div>
                <div className="stat-card-sub">(7 kW)</div>
              </div>

              {/* Card 3: 6/6 Available */}
              <div className="station-stat-card highlight">
                <div className="stat-card-icon green">
                  <CheckCircle2 size={20} strokeWidth={2.4} />
                </div>
                <div className="stat-card-title">{station.availableSlots}/{station.totalSlots}</div>
                <div className="stat-card-sub green">Available</div>
              </div>
            </div>

            {/* Station Amenities (Desktop display) */}
            <div className="station-amenities-section">
              <h4 className="amenities-heading">Station Amenities</h4>
              <div className="amenities-pills">
                {station.amenities?.map((amenity, i) => (
                  <span key={i} className="amenity-chip">
                    <CheckCircle2 size={12} color="#006B48" />
                    <span>{amenity}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing Options, Connector Selection & Booking Panel */}
        <div className="station-right-column">
          <div className="booking-configurator-card">
            <div className="configurator-header">
              <div>
                <h2 className="configurator-title">Pricing & Connectors</h2>
                <p className="configurator-subtitle">Configure your charging options</p>
              </div>
              <button
                onClick={onOpenPricingOptions}
                className="view-pricing-details-btn"
                id="view-pricing-models-link"
              >
                Pricing Models Guide →
              </button>
            </div>

            {/* Segmented Pricing Model Tabs matching reference Screen 3 */}
            <div className="pricing-tabs-container">
              <label className="section-label">Select Pricing Model</label>
              <div className="pricing-tabs-pill-box">
                {pricingTabs.map(tab => {
                  const isTabActive = selectedPricingModel === tab.id;
                  return (
                    <button
                      key={tab.id}
                      id={`pricing-tab-${tab.id}`}
                      onClick={() => onSelectPricingModel(tab.id)}
                      className={`pricing-tab-btn ${isTabActive ? 'active' : ''}`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selectable Connectors List (AC 7 kW & DC 60 kW) with Radios */}
            <div className="connectors-selection-box">
              <label className="section-label">Select Available Connector</label>
              <div className="connectors-list">
                {station.connectors?.map(connector => {
                  const isSelected = selectedConnectorId === connector.id;
                  return (
                    <div
                      key={connector.id}
                      id={`connector-option-${connector.id}`}
                      onClick={() => onSelectConnector(connector.id)}
                      className={`connector-option-card ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="connector-info">
                        <div className="connector-type-name">
                          {connector.type} ({connector.power})
                        </div>
                        <div className="connector-speed-note">
                          {connector.speed}
                        </div>
                      </div>

                      <div className="connector-price-radio">
                        <span className="connector-rate">
                          {getPriceForConnector(connector)}
                        </span>
                        <div className={`radio-outer ${isSelected ? 'checked' : ''}`}>
                          {isSelected && <div className="radio-inner" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pricing Summary Box before Booking */}
            <div className="pre-booking-summary-box">
              <div className="summary-row">
                <span>Selected Connector:</span>
                <strong>{currentConnector?.type} ({currentConnector?.power})</strong>
              </div>
              <div className="summary-row">
                <span>Active Rate:</span>
                <strong>{getPriceForConnector(currentConnector)}</strong>
              </div>
              <div className="summary-row green">
                <span>Status:</span>
                <span className="status-live">Ready for booking</span>
              </div>
            </div>

            {/* Booking CTA Button (contained inside card on desktop; sticky on mobile) */}
            <div className="booking-cta-container">
              <button
                id="station-book-now-btn"
                onClick={onBookNow}
                className="station-book-now-btn"
              >
                <span>Book Now</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
