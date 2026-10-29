import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Smartphone, 
  CreditCard, 
  Wallet, 
  Building2, 
  ShieldCheck, 
  ArrowRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { PAYMENT_METHODS } from '../data/mockData';

/**
 * SCREEN 6: Payment Method & Checkout
 * - Mobile: Exact match to Screen 6 from reference image
 * - Desktop: Professional responsive payment gateway checkout
 */
export default function PaymentMethodScreen({ 
  onBack, 
  onCompletePayment, 
  bookingDetails 
}) {
  const [selectedMethodId, setSelectedMethodId] = useState('upi');
  const [upiId, setUpiId] = useState('misbah@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const amount = bookingDetails?.totalCost || 80;

  const getMethodIcon = (id) => {
    switch (id) {
      case 'upi': return Smartphone;
      case 'card': return CreditCard;
      case 'wallet': return Wallet;
      case 'netbanking': return Building2;
      default: return CreditCard;
    }
  };

  const handleContinue = () => {
    setIsProcessing(true);
    setPaymentError(null);

    // Realistic secure payment handshake & verification
    setTimeout(() => {
      setIsProcessing(false);
      const transactionId = 'TXN_VOLT_' + Math.random().toString(36).substring(2, 9).toUpperCase();
      
      onCompletePayment({
        method: selectedMethodId,
        amount: amount,
        transactionId: transactionId,
        timestamp: new Date().toISOString(),
        status: 'PAID_VERIFIED'
      });
    }, 1200);
  };

  return (
    <div className="payment-screen-root">
      {/* Top Header */}
      <div className="screen-header-bar">
        <button 
          onClick={onBack} 
          className="header-back-btn"
          id="payment-back-btn"
          title="Back"
        >
          <ChevronLeft size={22} strokeWidth={2.4} />
          <span className="desktop-only">Back</span>
        </button>

        <h1 className="screen-header-title">
          Payment Method
        </h1>

        <div style={{ width: '40px' }} className="desktop-only" />
      </div>

      {/* Main Payment Container */}
      <div className="payment-screen-content">
        <div className="payment-card-wrapper">
          {/* Amount Due Pill */}
          <div className="payment-amount-banner">
            <div>
              <span className="amount-label">Amount Payable:</span>
              <h2 className="amount-value" id="payment-amount-display">₹{amount}</h2>
            </div>
            <div className="amount-meta">
              <span className="station-name-pill">{bookingDetails?.station?.name || 'GreenCharge Hub'}</span>
              <span className="booking-hours">{bookingDetails?.durationHours || 2} hours session</span>
            </div>
          </div>

          {/* Payment Method Cards matching reference Screen 6 */}
          <div className="payment-methods-list">
            {PAYMENT_METHODS.map(method => {
              const isSelected = selectedMethodId === method.id;
              const Icon = getMethodIcon(method.id);

              return (
                <div
                  key={method.id}
                  id={`payment-method-${method.id}`}
                  onClick={() => setSelectedMethodId(method.id)}
                  className={`payment-method-card ${isSelected ? 'selected' : ''}`}
                >
                  <div className="method-left">
                    <div className="method-icon-container">
                      <Icon size={20} strokeWidth={2.2} />
                    </div>

                    <div className="method-info">
                      <h3 className="method-title">{method.title}</h3>
                      <p className="method-subtitle">{method.subtitle}</p>
                    </div>
                  </div>

                  <div className={`radio-outer ${isSelected ? 'checked' : ''}`}>
                    {isSelected && <div className="radio-inner" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Conditional Detail Input for Selected Method */}
          {selectedMethodId === 'upi' && (
            <div className="payment-detail-input-box">
              <label className="input-label">Enter UPI ID / VPA</label>
              <div className="upi-input-group">
                <input 
                  type="text" 
                  value={upiId} 
                  onChange={(e) => setUpiId(e.target.value)} 
                  placeholder="e.g. mobile@upi"
                  className="upi-input"
                  id="upi-id-input"
                />
                <span className="upi-verify-tag">Verified</span>
              </div>
            </div>
          )}

          {/* 100% Secure Payments Card matching reference Screen 6 */}
          <div className="security-guarantee-card">
            <div className="security-badge-icon">
              <ShieldCheck size={22} strokeWidth={2.4} color="#006B48" />
            </div>

            <div className="security-text">
              <div className="security-title">100% secure payments</div>
              <div className="security-subtitle">Your data is safe with us.</div>
            </div>
          </div>

          {paymentError && (
            <div className="payment-error-banner">
              <AlertCircle size={16} />
              <span>{paymentError}</span>
            </div>
          )}

          {/* Action Button: Continue */}
          <div className="payment-action-footer">
            <button
              id="payment-continue-btn"
              onClick={handleContinue}
              disabled={isProcessing}
              className="payment-continue-btn"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className="spinner-icon" />
                  <span>Processing Secure Payment...</span>
                </>
              ) : (
                <>
                  <span>Continue • Pay ₹{amount}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
