import React from 'react';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';
import VoltrixLogo from '../components/common/VoltrixLogo';

/**
 * SCREEN 1: Welcome / Onboarding
 * Responsive real screen:
 * - Mobile (< 768px): Exact full-bleed mobile onboarding matching reference image
 * - Desktop (>= 768px): Premium commercial EV charging portal landing experience
 */
export default function WelcomeScreen({ onGetStarted, onLogin }) {
  return (
    <div className="welcome-screen-root">
      {/* Background Hero Image with atmospheric gradient */}
      <div 
        className="welcome-bg-image"
        style={{
          backgroundImage: 'url(/images/welcome-hero.jpg)'
        }}
      />
      <div className="welcome-vignette-overlay" />

      {/* Main Content Area */}
      <div className="welcome-container">
        {/* Brand Header */}
        <header className="welcome-top">
          <VoltrixLogo variant="dark" size="medium" />
        </header>

        {/* Center / Bottom Hero Section */}
        <div className="welcome-body">
          {/* Feature Highlights on Desktop */}
          <div className="welcome-badges desktop-only">
            <span className="welcome-badge">
              <Zap size={13} color="#48F542" />
              <span>Fast DC & Normal AC Charging</span>
            </span>
            <span className="welcome-badge">
              <Shield size={13} color="#48F542" />
              <span>100% Verified Telemetry</span>
            </span>
            <span className="welcome-badge">
              <Sparkles size={13} color="#48F542" />
              <span>Transparent 3-Tier Pricing</span>
            </span>
          </div>

          <h1 className="welcome-headline">
            Find. Book. Charge.
          </h1>

          <p className="welcome-subtext">
            Your all-in-one EV charging platform.
          </p>

          {/* Action CTAs */}
          <div className="welcome-actions">
            <button
              onClick={onGetStarted}
              className="welcome-primary-btn"
              id="welcome-get-started-btn"
            >
              <span>Get Started</span>
              <ArrowRight size={18} strokeWidth={2.4} />
            </button>

            <div className="welcome-login-row">
              <span>Already have an account?</span>{' '}
              <button
                onClick={onLogin}
                className="welcome-login-link"
                id="welcome-login-btn"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
