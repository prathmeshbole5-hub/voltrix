// Voltrix Mock Database & State Stores

export const INITIAL_USER = {
  id: 'usr_volt_01',
  name: 'Misbah',
  initial: 'M',
  email: 'misbah@voltrix.energy',
  phone: '+91 98450 12345',
  avatar: null,
  walletBalance: 1250.0,
  vehicle: {
    model: 'Tata Nexon EV Max',
    variant: 'XZ+ Lux (40.5 kWh)',
    regNumber: 'KA 01 MJ 4290',
    batteryCapacity: 40.5,
    chargingPort: 'CCS2 / Type 2',
    currentBattery: 42
  }
};

export const CHARGING_STATIONS = [
  {
    id: 'st_greencharge_hub',
    name: 'GreenCharge Hub',
    address: '12th Main Road, Koramangala, Bengaluru',
    distance: '1.2 km',
    distanceValue: 1.2,
    rating: 4.6,
    reviewCount: 124,
    availability: '6/6 Available',
    availableSlots: 6,
    totalSlots: 6,
    isFavorite: false,
    image: '/images/station-hero.jpg',
    amenities: ['24/7 Access', 'Restroom', 'Cafe', 'Covered Bay', 'Wi-Fi'],
    coords: { lat: 12.9344, lng: 77.6192, x: 52, y: 55 },
    connectors: [
      {
        id: 'dc_fast_60',
        type: 'DC Fast',
        power: '60 kW',
        connectorType: 'CCS2',
        available: 3,
        total: 3,
        hourlyPrice: 120,
        unitPrice: 28,
        percentagePrice: 12,
        speed: '10% to 80% in 45 mins'
      },
      {
        id: 'ac_normal_7',
        type: 'AC Normal',
        power: '7 kW',
        connectorType: 'Type 2 AC',
        available: 3,
        total: 3,
        hourlyPrice: 40,
        unitPrice: 18,
        percentagePrice: 8,
        speed: 'Full charge in 6 hours'
      }
    ]
  },
  {
    id: 'st_voltcharge_indiranagar',
    name: 'VoltCharge Express',
    address: '100ft Road, HAL 2nd Stage, Indiranagar, Bengaluru',
    distance: '3.4 km',
    distanceValue: 3.4,
    rating: 4.8,
    reviewCount: 89,
    availability: '4/6 Available',
    availableSlots: 4,
    totalSlots: 6,
    isFavorite: true,
    image: '/images/station-hero.jpg',
    amenities: ['Cafe & Lounge', 'EV Wash', 'Free Wi-Fi'],
    coords: { lat: 12.9719, lng: 77.6412, x: 68, y: 32 },
    connectors: [
      {
        id: 'dc_super_120',
        type: 'DC Fast',
        power: '120 kW',
        connectorType: 'CCS2',
        available: 2,
        total: 3,
        hourlyPrice: 150,
        unitPrice: 32,
        percentagePrice: 15,
        speed: '10% to 80% in 25 mins'
      },
      {
        id: 'ac_normal_22',
        type: 'AC Normal',
        power: '22 kW',
        connectorType: 'Type 2 AC',
        available: 2,
        total: 3,
        hourlyPrice: 55,
        unitPrice: 20,
        percentagePrice: 9,
        speed: 'Full charge in 2.5 hours'
      }
    ]
  },
  {
    id: 'st_ecopower_btm',
    name: 'EcoPower BTM',
    address: 'Outer Ring Road, BTM 2nd Stage, Bengaluru',
    distance: '2.1 km',
    distanceValue: 2.1,
    rating: 4.5,
    reviewCount: 156,
    availability: '2/4 Available',
    availableSlots: 2,
    totalSlots: 4,
    isFavorite: false,
    image: '/images/station-hero.jpg',
    amenities: ['Shopping Mall', 'ATM', 'Covered Parking'],
    coords: { lat: 12.9166, lng: 77.6101, x: 42, y: 72 },
    connectors: [
      {
        id: 'dc_fast_50',
        type: 'DC Fast',
        power: '50 kW',
        connectorType: 'CCS2',
        available: 1,
        total: 2,
        hourlyPrice: 110,
        unitPrice: 26,
        percentagePrice: 11,
        speed: '10% to 80% in 50 mins'
      },
      {
        id: 'ac_normal_7_btm',
        type: 'AC Normal',
        power: '7 kW',
        connectorType: 'Type 2 AC',
        available: 1,
        total: 2,
        hourlyPrice: 40,
        unitPrice: 18,
        percentagePrice: 8,
        speed: 'Full charge in 6 hours'
      }
    ]
  }
];

export const PRICING_MODELS = [
  {
    id: 'hourly',
    title: 'Hourly Charging',
    iconName: 'Clock',
    description: 'Pay for the time you charge. Ideal for long stops.',
    exampleAC: 'AC: ₹40/hour',
    exampleDC: 'DC: ₹120/hour',
    rateUnit: '/hour',
    acRate: 40,
    dcRate: 120
  },
  {
    id: 'unit',
    title: 'Per Unit Charging',
    iconName: 'Zap',
    description: 'Pay per kWh of energy consumed. Transparent and fair.',
    exampleAC: 'AC: ₹18/unit',
    exampleDC: 'DC: ₹28/unit',
    rateUnit: '/unit',
    acRate: 18,
    dcRate: 28
  },
  {
    id: 'percentage',
    title: 'Per Percentage Charging',
    iconName: 'Percent',
    description: 'Pay for the battery percentage charged. Great for quick top-ups.',
    exampleAC: 'AC: ₹8/%',
    exampleDC: 'DC: ₹12/%',
    rateUnit: '/%',
    acRate: 8,
    dcRate: 12
  }
];

export const PAYMENT_METHODS = [
  {
    id: 'upi',
    title: 'UPI',
    subtitle: 'Pay via UPI ID, Google Pay, PhonePe, etc.',
    iconName: 'Smartphone',
    isDefault: true
  },
  {
    id: 'card',
    title: 'Credit / Debit Card',
    subtitle: 'Visa, Mastercard, RuPay',
    iconName: 'CreditCard',
    isDefault: false
  },
  {
    id: 'wallet',
    title: 'Wallet',
    subtitle: 'Paytm, Amazon Pay, etc.',
    iconName: 'Wallet',
    isDefault: false
  },
  {
    id: 'netbanking',
    title: 'Net Banking',
    subtitle: 'All major banks',
    iconName: 'Building2',
    isDefault: false
  }
];

export const INITIAL_CHARGING_SESSION = {
  sessionId: 'ses_volt_7829',
  stationId: 'st_greencharge_hub',
  stationName: 'GreenCharge Hub',
  connector: 'AC (7 kW)',
  connectorType: 'Type 2 AC',
  currentBattery: 42,
  targetBattery: 100,
  chargingPower: '2.8 kW',
  chargingPowerValue: 2.8,
  timeElapsedSeconds: 4320, // 1h 12m
  energyDeliveredKwh: 6.5,
  estimatedCost: 117,
  status: 'active', // 'active' | 'stopping' | 'completed'
  startTime: '2026-10-29T15:03:00'
};
