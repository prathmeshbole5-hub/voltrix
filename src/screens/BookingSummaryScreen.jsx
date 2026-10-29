import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  MapPin, 
  Lock, 
  Minus, 
  Plus, 
  Zap, 
  ArrowRight
} from 'lucide-react';
import { PRICING_MODELS } from '../data/mockData';

/**
 * SCREEN 5: Booking Summary & Estimation
 * - Mobile: Exact match to Screen 5 from reference image
 * - Desktop: Centered responsive checkout card with dynamic calculations
 */
export default function BookingSummaryScreen({ 
  station, 
  connector, 
  pricingModelId = 'hourly', 
  onBack, 
  onProceedToPayment,
  onChangePricingOption 
}) {
  const [durationHours, setDurationHours] = useState(2);

  const selectedModel = PRICING_MODELS.find(m => m.id === pricingModelId) || PRICING_MODELS[0];
  const isDC = connector?.type?.includes('DC');
  const powerKw = isDC ? 60 : 7;
  const ratePerHour = isDC ? 120 : 40;

  // Real calculation based on model and duration
  const estimatedEnergyKwh = powerKw * durationHours;
  let totalCost = 80;

  if (selectedModel.id === 'hourly') {
    totalCost = ratePerHour * durationHours;
  } else if (selectedModel.id === 'unit') {
    const unitRate = isDC ? 28 : 18;
    totalCost = Math.round(estimatedEnergyKwh * unitRate);
  } else if (selectedModel.id === 'percentage') {
    // 40.5 kWh battery: 1 hour of 7kW is ~17%
    const percentCharged = Math.min(100, Math.round((estimatedEnergyKwh / 40.5) * 100));
    const percentRate = isDC ? 12 : 8;
    totalCost = percentCharged * percentRate;
  }

  const handleMinus = () => {
    if (durationHours > 1) setDurationHours(prev => prev - 1);
  };

  const handlePlus = () => {
    if (durationHours < 8) setDurationHours(prev => prev + 1);
  };

  const handleProceed = () => {
    onProceedToPayment({
      station,
      connector,
      pricingModel: selectedModel,
      durationHours,
      estimatedEnergyKwh,
      totalCost
    });
  };

  return (
    <div className="booking-summary-root">
      {/* Top Header */}
      <div className="screen-header-bar">
        <button 
          onClick={onBack} 
          className="header-back-btn"
          id="booking-summary-back-btn"
          title="Back"
        >
          <ChevronLeft size={22} strokeWidth={2.4} />
          <span className="desktop-only">Back</span>
        </button>

        <h1 className="screen-header-title">
          Booking Summary
        </h1>

        <div style={{ width: '40px' }} className="desktop-only" />
      </div>

      {/* Main Content Body */}
      <div className="booking-summary-container">
        <div className="summary-card-wrapper">
          {/* Station Summary Card matching reference Screen 5 */}
          <div className="station-brief-card">
            <div 
              className="station-brief-thumbnail"
              style={{ backgroundImage: `url(${station.image || '/images/station-hero.jpg'})` }}
            />

            <div className="station-brief-info">
              <h3 className="brief-station-name">{station.name}</h3>

              <div className="brief-station-meta">
                <span className="meta-item">
                  <MapPin size={11} color="#71817D" />
                  {station.distance}
                </span>
                <span>•</span>
                <span className="meta-item">
                  <Star size={11} fill="#F5A623" color="#F5A623" />
                  <strong>{station.rating}</strong> ({station.reviewCount})
                </span>
              </div>

              <div className="brief-connector-badge">
                <Zap size={12} color="#006B48" />
                <span>{connector?.type || 'AC Normal'} ({connector?.power || '7 kW'})</span>
              </div>
            </div>
          </div>

          {/* Charging Option row matching reference Screen 5 */}
          <div className="charging-option-section">
            <span className="section-label">Charging Option</span>

            <div 
              id="change-pricing-option-row"
              onClick={onChangePricingOption}
              className="charging-option-selector-row"
            >
              <div className="option-title-with-radio">
                <div className="radio-outer checked">
                  <div className="radio-inner" />
                </div>
                <span className="option-model-name">{selectedModel.title}</span>
              </div>

              <div className="option-rate-arrow">
                <span className="rate-value">
                  {selectedModel.id === 'hourly' && `₹${ratePerHour} / hour`}
                  {selectedModel.id === 'unit' && `₹${isDC ? 28 : 18} / unit`}
                  {selectedModel.id === 'percentage' && `₹${isDC ? 12 : 8} / %`}
                </span>
                <ChevronRight size={17} color="#71817D" />
              </div>
            </div>
          </div>

          {/* Duration Selector row with - and + matching reference Screen 5 */}
          <div className="duration-selector-row">
            <span className="duration-label">Duration</span>

            <div className="duration-stepper-box">
              <button
                id="duration-minus-btn"
                onClick={handleMinus}
                className="stepper-btn"
                disabled={durationHours <= 1}
                aria-label="Decrease duration"
              >
                <Minus size={13} strokeWidth={2.4} />
              </button>

              <span className="duration-display-val" id="duration-display">
                {durationHours} {durationHours === 1 ? 'hour' : 'hours'}
              </span>

              <button
                id="duration-plus-btn"
                onClick={handlePlus}
                className="stepper-btn"
                disabled={durationHours >= 8}
                aria-label="Increase duration"
              >
                <Plus size={13} strokeWidth={2.4} />
              </button>
            </div>
          </div>

          {/* Estimated Energy row matching reference Screen 5 */}
          <div className="summary-calc-row">
            <span className="calc-label">Estimated Energy</span>
            <span className="calc-val" id="estimated-energy-val">~ {estimatedEnergyKwh} kWh</span>
          </div>

          {/* Total Estimated Cost row matching reference Screen 5 */}
          <div className="total-cost-row">
            <span className="total-label">Total Estimated Cost</span>
            <span className="total-amount" id="total-cost-amount">₹{totalCost}</span>
          </div>

          {/* Proceed to Payment Action Button */}
          <div className="proceed-payment-cta-wrapper">
            <button
              id="proceed-to-payment-btn"
              onClick={handleProceed}
              className="proceed-to-payment-btn"
            >
              <span>Proceed to Payment</span>
              <ArrowRight size={18} />
            </button>

            {/* Secure Payment indicator */}
            <div className="secure-payment-indicator">
              <Lock size={13} color="#8A9A94" />
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
