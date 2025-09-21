import React, { useState, useEffect, useRef } from 'react';
import { Search, Zap, Car, Battery, CreditCard, Smartphone, Globe, Shield, ChevronRight, Star, MapPin, Clock, TrendingUp, Wifi, Bluetooth, Settings, Bell } from 'lucide-react';

const SmartVehicles2050 = () => {
  const [vehicles, setVehicles] = useState([]);
  const [telemetry, setTelemetry] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('crypto');
  const [location, setLocation] = useState('Neo-Warangal, IN');
  const [isConnected, setIsConnected] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const canvasRef = useRef(null);

  // Enhanced EV data with accurate model-specific images and custom generated SVGs
  const mockEVData = [
    // ... (Insert the full mockEVData array from your input here)
    // For brevity, not repeated in this code block; use your supplied array.
  ];

  // Filter and set vehicles based on search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setVehicles(mockEVData);
    } else {
      setVehicles(
        mockEVData.filter(
          v =>
            v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.type.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery]); // Only depends on searchQuery

  // Fake telemetry update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const t = {};
      mockEVData.forEach((v) => {
        t[v.id] = {
          speed: Math.round(Math.random() * 120 + 20),
          charge: Math.max(0, Math.round(v.battery * (0.5 + Math.random() * 0.5))),
          range: Math.max(0, Math.round(v.range * (0.5 + Math.random() * 0.5))),
        };
      });
      setTelemetry(t);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Payment methods
  const paymentMethods = [
    { id: 'crypto', icon: <CreditCard size={20} />, label: 'Crypto Wallet' },
    { id: 'phone', icon: <Smartphone size={20} />, label: 'Phone NFC' },
    { id: 'card', icon: <CreditCard size={20} />, label: 'Card' },
  ];

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui' }}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', padding: 24, borderBottom: '1px solid #334155' }}>
        <Car size={32} style={{ marginRight: 16 }} stroke="#38bdf8" />
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: 1 }}>Smart Vehicles 2050</h1>
        <div style={{ flex: 1 }} />
        <Wifi color={isConnected ? "#38bdf8" : "#334155"} style={{ marginRight: 16 }} />
        <Bluetooth color="#38bdf8" style={{ marginRight: 16 }} />
        <Bell style={{ marginRight: 16 }} />
        {notifications > 0 && (
          <span style={{
            background: "#ef4444",
            color: "#fff",
            borderRadius: "50%",
            padding: "2px 8px",
            fontSize: 12,
            marginRight: 16
          }}>{notifications}</span>
        )}
        <Settings style={{ marginRight: 16 }} />
        <MapPin size={24} color="#fbbf24" />
        <span style={{ marginLeft: 6 }}>{location}</span>
      </header>

      {/* Search Bar */}
      <section style={{ display: 'flex', alignItems: 'center', padding: '24px 32px', borderBottom: '1px solid #334155' }}>
        <Search size={22} style={{ marginRight: 12, color: '#94a3b8' }} />
        <input
          type="text"
          placeholder="Search vehicles, brands, features..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            background: 'rgba(30,41,59,0.6)',
            border: 'none',
            padding: 12,
            borderRadius: 8,
            color: '#e2e8f0',
            fontSize: 18,
            width: 340,
            marginRight: 28
          }}
        />
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 15, color: '#94a3b8', marginRight: 18 }}>Payment:</span>
        {paymentMethods.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPayment(p.id)}
            style={{
              background: selectedPayment === p.id ? '#38bdf8' : 'transparent',
              color: selectedPayment === p.id ? '#fff' : '#94a3b8',
              border: '1px solid #334155',
              padding: '8px 16px',
              borderRadius: 6,
              marginRight: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 500
            }}
          >
            {p.icon}
            <span style={{ marginLeft: 6 }}>{p.label}</span>
          </button>
        ))}
      </section>

      {/* Vehicles Grid */}
      <main style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: 32,
        padding: '32px 48px',
        background: '#1e293b'
      }}>
        {vehicles.map(vehicle => (
          <div key={vehicle.id} style={{
            background: '#0f172a',
            borderRadius: 16,
            boxShadow: `0 4px 16px 0 ${vehicle.color}33`,
            border: `1.5px solid ${vehicle.color}77`,
            padding: 22,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 420
          }}>
            {/* Image with SVG fallback */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 160, marginBottom: 12 }}>
              <img
                src={vehicle.image}
                alt={vehicle.name}
                style={{ width: 220, height: 110, objectFit: 'contain', borderRadius: 8, background: '#1e293b' }}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = vehicle.customSvg || vehicle.fallbackImage;
                }}
              />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: vehicle.color, marginBottom: 2 }}>{vehicle.name}</h2>
            <span style={{ fontSize: 15, color: '#94a3b8', marginBottom: 10 }}>{vehicle.brand} • {vehicle.type}</span>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
              <span title="Acceleration" style={{ display: 'flex', alignItems: 'center', color: '#eab308', fontSize: 14 }}>
                <Zap size={16} style={{ marginRight: 4 }} />
                {vehicle.acceleration}s 0-60
              </span>
              <span title="Range" style={{ display: 'flex', alignItems: 'center', color: '#38bdf8', fontSize: 14 }}>
                <TrendingUp size={16} style={{ marginRight: 4 }} />
                {vehicle.range} mi
              </span>
              <span title="Efficiency" style={{ display: 'flex', alignItems: 'center', color: '#22d3ee', fontSize: 14 }}>
                <Star size={16} style={{ marginRight: 4 }} />
                {vehicle.efficiency}%
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <Battery size={18} color="#38bdf8" style={{ marginRight: 4 }} />
              <span>{telemetry[vehicle.id]?.charge ?? vehicle.battery} kWh</span>
              <span style={{ margin: '0 12px' }}>|</span>
              <Clock size={16} style={{ marginRight: 4, color: '#f59e42' }} />
              <span>{vehicle.chargingSpeed} DC</span>
              <span style={{ margin: '0 12px' }}>|</span>
              <Shield size={16} style={{ marginRight: 4, color: '#a3e635' }} />
              <span>{vehicle.availability}</span>
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              {vehicle.features.map((f, idx) => (
                <span key={idx} style={{
                  background: vehicle.color + '13',
                  color: vehicle.color,
                  borderRadius: 5,
                  padding: '3px 9px',
                  fontSize: 13,
                  fontWeight: 500
                }}>{f}</span>
              ))}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 'auto'
            }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>
                {vehicle.currency === 'USD' ? '$' : vehicle.currency}{vehicle.price.toLocaleString()}
              </span>
              <button style={{
                background: `linear-gradient(90deg, ${vehicle.color}cc, #334155 120%)`,
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '9px 20px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}>
                Reserve <ChevronRight size={18} style={{ marginLeft: 3 }} />
              </button>
            </div>
          </div>
        ))}
      </main>
      {/* Optionally, add a canvas or telemetry visualization using canvasRef */}
    </div>
  );
};

export default SmartVehicles2050;