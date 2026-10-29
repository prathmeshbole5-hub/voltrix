import React from 'react';
import { ChevronLeft, Clock, Zap, Percent, Check, ArrowRight } from 'lucide-react';
import { PRICING_MODELS } from '../data/mockData';

/**
 * SCREEN 4: Pricing Options
 * - Mobile: Matches Screen 4 from reference image
 * - Desktop: Comprehensive responsive pricing tier comparison
 */
export default function PricingOptionsScreen({ 
  onBack, 
  selectedPricingModel = 'hourly', 
  onSelectPricingModel 
}) {
  const tabs = [
    { id: 'hourly', label: 'Hourly' },
    { id: 'unit', label: 'Per Unit' },
    { id: 'percentage', label: 'Per %' }
  ];

  const getIcon = (id) => {
    switch(id) {
      case 'hourly': return Clock;
      case 'unit': return Zap;
      case 'percentage': return Percent;
      default: return Zap;
    }
  };

  return (
    <div className="pricing-screen-root">
      {/* Top Header / Breadcrumbs */}
      <div className="screen-header-bar">
        <button 
          onClick={onBack} 
          className="header-back-btn"
          id="pricing-back-btn"
          title="Back"
        >
          <ChevronLeft size={22} strokeWidth={2.4} />
          <span className="desktop-only">Back</span>
        </button>

        <h1 className="screen-header-title">
          Pricing Options
        </h1>

        <div style={{ width: '40px' }} className="desktop-only" />
      </div>

      {/* Main Pricing Options Container */}
      <div className="pricing-screen-content">
        {/* Segmented Model Filter Tabs matching reference Screen 4 */}
        <div className="pricing-segmented-tabs">
          {tabs.map(tab => {
            const isTabActive = selectedPricingModel === tab.id;
            return (
              <button
                key={tab.id}
                id={`model-filter-tab-${tab.id}`}
                onClick={() => onSelectPricingModel(tab.id)}
                className={`segmented-tab-btn ${isTabActive ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Subtitle */}
        <p className="pricing-options-subtitle">
          Choose the option that works best for you
        </p>

        {/* 3 Model Cards List */}
        <div className="pricing-cards-container">
          {PRICING_MODELS.map(model => {
            const isSelected = selectedPricingModel === model.id;
            const Icon = getIcon(model.id);

            return (
              <div
                key={model.id}
                id={`pricing-model-card-${model.id}`}
                onClick={() => onSelectPricingModel(model.id)}
                className={`pricing-model-card ${isSelected ? 'selected' : ''}`}
              >
                {/* Top Row: Icon + Title + Radio Indicator */}
                <div className="model-card-header">
                  <div className="model-card-title-box">
                    <div className="model-icon-bubble">
                      <Icon size={18} strokeWidth={2.4} />
                    </div>
                    <h3 className="model-card-title">{model.title}</h3>
                  </div>

                  <div className={`radio-outer ${isSelected ? 'checked' : ''}`}>
                    {isSelected && <div className="radio-inner" />}
                  </div>
                </div>

                {/* Description */}
                <p className="model-card-description">
                  {model.description}
                </p>

                {/* Example Pricing Breakdown matching reference Screen 4 */}
                <div className="model-rates-row">
                  <span className="rate-item">{model.exampleAC}</span>
                  <span className="rate-divider">|</span>
                  <span className="rate-item">{model.exampleDC}</span>
                </div>

                {isSelected && (
                  <div className="active-model-indicator">
                    <Check size={14} color="#008C5A" strokeWidth={3} />
                    <span>Currently Active Pricing Model</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Continue Button to return with selected model */}
        <div className="pricing-action-footer">
          <button
            onClick={onBack}
            className="pricing-confirm-btn"
            id="confirm-pricing-model-btn"
          >
            <span>Apply Selected Model</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
