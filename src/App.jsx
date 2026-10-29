import React, { useState, useEffect } from 'react';
import { 
  CHARGING_STATIONS, 
  INITIAL_USER, 
  INITIAL_CHARGING_SESSION 
} from './data/mockData';

import Navbar from './components/common/Navbar';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import StationDetailScreen from './screens/StationDetailScreen';
import PricingOptionsScreen from './screens/PricingOptionsScreen';
import BookingSummaryScreen from './screens/BookingSummaryScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import ChargingSessionScreen from './screens/ChargingSessionScreen';
import ProfileScreen from './screens/ProfileScreen';

import './App.css';

/**
 * VOLTRIX Customer-Facing Real EV Charging Website
 * Real responsive application without presentation showcase wrappers or mobile simulators.
 */
export default function App() {
  // Hash-aware genuine browser routing
  const getInitialRoute = () => {
    const hash = window.location.hash.replace('#', '');
    const validRoutes = [
      'welcome', 
      'home', 
      'map', 
      'station_detail', 
      'pricing_options', 
      'booking_summary', 
      'payment_method', 
      'charging_session', 
      'profile'
    ];
    if (hash && validRoutes.includes(hash)) {
      return hash;
    }
    return 'home'; // Real application opens directly into Home / Discovery
  };

  const [currentScreen, setCurrentScreen] = useState(getInitialRoute);
  
  // Real Application Data State
  const [stations] = useState(CHARGING_STATIONS);
  const [selectedStation, setSelectedStation] = useState(CHARGING_STATIONS[0]);
  const [selectedConnectorId, setSelectedConnectorId] = useState('ac_normal_7');
  const [selectedPricingModel, setSelectedPricingModel] = useState('hourly');
  const [bookingDetails, setBookingDetails] = useState({
    durationHours: 2,
    estimatedEnergyKwh: 14,
    totalCost: 80,
    station: CHARGING_STATIONS[0],
    connector: CHARGING_STATIONS[0].connectors[1]
  });
  const [chargingSession, setChargingSession] = useState(INITIAL_CHARGING_SESSION);
  const [user] = useState(INITIAL_USER);

  // Sync route with browser URL hash & history
  const navigateTo = (route, updateHistory = true) => {
    setCurrentScreen(route);
    if (updateHistory) {
      window.location.hash = route;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== currentScreen) {
        setCurrentScreen(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentScreen]);

  const selectedConnector = selectedStation?.connectors?.find(c => c.id === selectedConnectorId) || 
                            selectedStation?.connectors?.[0];

  // Real Flow Navigation Handlers
  const handleGetStarted = () => navigateTo('home');
  const handleLogin = () => navigateTo('profile');
  
  const handleOpenStationDetails = (station) => {
    setSelectedStation(station);
    // ensure connector is valid for station
    if (station.connectors && station.connectors.length > 0) {
      setSelectedConnectorId(station.connectors[0].id);
    }
    navigateTo('station_detail');
  };

  const handleBookNow = () => {
    setBookingDetails({
      station: selectedStation,
      connector: selectedConnector,
      durationHours: 2,
      estimatedEnergyKwh: selectedConnector?.type?.includes('DC') ? 120 : 14,
      totalCost: selectedConnector?.type?.includes('DC') ? 240 : 80
    });
    navigateTo('booking_summary');
  };

  const handleOpenPricingOptions = () => navigateTo('pricing_options');
  
  const handleProceedToPayment = (details) => {
    setBookingDetails(prev => ({ ...prev, ...details }));
    navigateTo('payment_method');
  };

  const handleCompletePayment = (_paymentResult) => {
    // Transition to live charging session with real station & connector data
    setChargingSession({
      ...INITIAL_CHARGING_SESSION,
      sessionId: 'ses_volt_' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      stationName: selectedStation.name,
      stationId: selectedStation.id,
      connector: `${selectedConnector?.type} (${selectedConnector?.power})`,
      currentBattery: 42,
      timeElapsedSeconds: 4320, // 1h 12m
      energyDeliveredKwh: 6.5,
      estimatedCost: 117,
      status: 'active',
      startTime: new Date().toISOString()
    });
    navigateTo('charging_session');
  };

  const handleStopSessionComplete = (_receipt) => {
    setChargingSession(prev => ({ ...prev, status: 'completed' }));
    navigateTo('profile');
  };

  // Render Current Real Screen View
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen 
            onGetStarted={handleGetStarted}
            onLogin={handleLogin}
          />
        );
      case 'home':
      case 'map':
        return (
          <HomeScreen 
            stations={stations}
            selectedStation={selectedStation}
            onSelectStation={(s) => setSelectedStation(s)}
            onOpenStationDetails={handleOpenStationDetails}
            onNavigateTab={(tab) => {
              if (tab === 'profile') navigateTo('profile');
              if (tab === 'home') navigateTo('home');
              if (tab === 'map') navigateTo('home');
              if (tab === 'bookings') navigateTo('booking_summary');
            }}
          />
        );
      case 'station_detail':
        return (
          <StationDetailScreen 
            station={selectedStation}
            onBack={() => navigateTo('home')}
            onBookNow={handleBookNow}
            onOpenPricingOptions={handleOpenPricingOptions}
            selectedPricingModel={selectedPricingModel}
            onSelectPricingModel={setSelectedPricingModel}
            selectedConnectorId={selectedConnectorId}
            onSelectConnector={setSelectedConnectorId}
          />
        );
      case 'pricing_options':
        return (
          <PricingOptionsScreen 
            onBack={() => navigateTo(selectedStation ? 'station_detail' : 'home')}
            selectedPricingModel={selectedPricingModel}
            onSelectPricingModel={(modelId) => {
              setSelectedPricingModel(modelId);
            }}
          />
        );
      case 'booking_summary':
        return (
          <BookingSummaryScreen 
            station={selectedStation}
            connector={selectedConnector}
            pricingModelId={selectedPricingModel}
            onBack={() => navigateTo('station_detail')}
            onProceedToPayment={handleProceedToPayment}
            onChangePricingOption={handleOpenPricingOptions}
          />
        );
      case 'payment_method':
        return (
          <PaymentMethodScreen 
            onBack={() => navigateTo('booking_summary')}
            onCompletePayment={handleCompletePayment}
            bookingDetails={bookingDetails}
          />
        );
      case 'charging_session':
        return (
          <ChargingSessionScreen 
            session={chargingSession}
            onBack={() => navigateTo('home')}
            onStopSessionComplete={handleStopSessionComplete}
          />
        );
      case 'profile':
        return (
          <ProfileScreen 
            user={user}
            onNavigateTab={(tab) => {
              if (tab === 'home') navigateTo('home');
              if (tab === 'map') navigateTo('home');
              if (tab === 'profile') navigateTo('profile');
              if (tab === 'bookings') navigateTo('booking_summary');
            }}
            onLogout={() => navigateTo('welcome')}
          />
        );
      default:
        return (
          <HomeScreen 
            stations={stations} 
            selectedStation={selectedStation}
            onSelectStation={(s) => setSelectedStation(s)}
            onOpenStationDetails={handleOpenStationDetails} 
          />
        );
    }
  };

  const showNavbar = currentScreen !== 'welcome';

  return (
    <div className={`voltrix-web-app ${currentScreen === 'charging_session' ? 'theme-dark' : 'theme-light'}`}>
      {/* Top Customer-Facing Responsive Navigation */}
      {showNavbar && (
        <Navbar 
          currentRoute={currentScreen}
          onRouteChange={(route) => navigateTo(route)}
          user={user}
          chargingSession={chargingSession}
        />
      )}

      {/* Main Full-Viewport Customer Content Area */}
      <main className="voltrix-main-content">
        {renderScreen()}
      </main>
    </div>
  );
}
