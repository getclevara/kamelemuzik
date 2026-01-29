'use client';

import { useState, useEffect } from 'react';

// Sound wave visualizer component
function SoundWave({ color }) {
  return (
    <div className="sound-wave" style={{ color }}>
      {[...Array(9)].map((_, i) => (
        <div key={i} className="wave-bar" />
      ))}
    </div>
  );
}

// Portal entry screen
function Portal({ onSelect }) {
  return (
    <div className="portal-container">
      {/* Solo Side */}
      <div 
        className="portal-side portal-solo"
        onClick={() => onSelect('solo')}
      >
        <div className="portal-content">
          <SoundWave color="var(--solo-primary)" />
          <span style={{ 
            fontSize: '0.7rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.4em',
            opacity: 0.6,
            marginBottom: '1rem'
          }}>
            Solo Experience
          </span>
          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: 300,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            Kamele<br/><em>Muzik</em>
          </h2>
          <p style={{ 
            fontSize: '0.95rem', 
            opacity: 0.6, 
            maxWidth: '280px',
            lineHeight: 1.7
          }}>
            Intimate acoustic vibes.<br/>Perfect for relaxed atmospheres.
          </p>
          <div style={{ 
            marginTop: '2rem',
            padding: '0.75rem 2rem',
            border: '1px solid rgba(255,255,255,0.3)',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em'
          }}>
            Enter
          </div>
        </div>
        <div className="portal-divider" />
        
        {/* Floating elements */}
        <div className="floating-element" style={{
          width: '300px',
          height: '300px',
          background: 'var(--solo-primary)',
          top: '10%',
          left: '10%',
          animationDelay: '0s'
        }} />
        <div className="floating-element" style={{
          width: '200px',
          height: '200px',
          background: 'var(--solo-secondary)',
          bottom: '20%',
          right: '15%',
          animationDelay: '-7s'
        }} />
      </div>

      {/* Band Side */}
      <div 
        className="portal-side portal-band"
        onClick={() => onSelect('band')}
      >
        <div className="portal-content">
          <SoundWave color="var(--band-primary)" />
          <span style={{ 
            fontSize: '0.7rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.4em',
            opacity: 0.6,
            marginBottom: '1rem'
          }}>
            Full Band Experience
          </span>
          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: 300,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            Halana
          </h2>
          <p style={{ 
            fontSize: '0.95rem', 
            opacity: 0.6, 
            maxWidth: '280px',
            lineHeight: 1.7
          }}>
            Full band energy.<br/>Unforgettable celebrations.
          </p>
          <div style={{ 
            marginTop: '2rem',
            padding: '0.75rem 2rem',
            border: '1px solid rgba(255,255,255,0.3)',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em'
          }}>
            Enter
          </div>
        </div>
        <div className="portal-divider" />
        
        {/* Floating elements */}
        <div className="floating-element" style={{
          width: '350px',
          height: '350px',
          background: 'var(--band-primary)',
          top: '5%',
          right: '5%',
          animationDelay: '-3s'
        }} />
        <div className="floating-element" style={{
          width: '250px',
          height: '250px',
          background: 'var(--band-secondary)',
          bottom: '10%',
          left: '20%',
          animationDelay: '-10s'
        }} />
      </div>
    </div>
  );
}

// Main site content
export default function Home() {
  const [showPortal, setShowPortal] = useState(true);
  const [mode, setMode] = useState('solo');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    venue: '',
    guestCount: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handlePortalSelect = (selectedMode) => {
    setMode(selectedMode);
    setShowPortal(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you'd integrate with your form handler (Netlify Forms, Formspree, etc.)
    console.log('Form submitted:', { mode, ...formData });
    setSubmitted(true);
  };

  const toggleMode = () => {
    setMode(mode === 'solo' ? 'band' : 'solo');
  };

  const soloVibes = [
    { icon: '☀️', name: 'Sunset Sessions', desc: 'Golden hour acoustic sets perfect for oceanside venues and intimate gatherings.' },
    { icon: '🌴', name: 'Chill Vibes', desc: 'Laid-back reggae and R&B that lets your guests relax and connect.' },
    { icon: '🎸', name: 'Acoustic Soul', desc: 'Raw, emotional performances that create memorable moments.' },
    { icon: '🌺', name: 'Island Romance', desc: 'Perfect backdrop for proposals, anniversaries, and romantic dinners.' }
  ];

  const bandVibes = [
    { icon: '🔥', name: 'High Energy', desc: 'Get the crowd moving with dynamic performances and dance floor anthems.' },
    { icon: '🎤', name: 'Full Production', desc: 'Complete band experience with vocals, rhythm, and lead instruments.' },
    { icon: '🌊', name: 'Island Fusion', desc: 'Blend of reggae, rock, and contemporary hits that everyone loves.' },
    { icon: '✨', name: 'Grand Events', desc: 'Designed for corporate galas, large weddings, and milestone celebrations.' }
  ];

  const vibes = mode === 'solo' ? soloVibes : bandVibes;

  if (showPortal) {
    return (
      <>
        <Portal onSelect={handlePortalSelect} />
        <div className="grain-overlay" />
      </>
    );
  }

  return (
    <>
      <div className={`main-container ${mode}-mode`}>
        {/* Ambient Background */}
        <div className="ambient-bg">
          <div className="ambient-orb" />
          <div className="ambient-orb" />
          <div className="ambient-orb" />
        </div>

        {/* Navigation */}
        <nav className="nav-bar">
          <div 
            className="logo"
            onClick={() => setShowPortal(true)}
            title="Return to portal"
          >
            {mode === 'solo' ? 'Kamele Muzik' : 'Halana'}
          </div>
          
          <div className="mode-toggle">
            <span 
              className={`toggle-label ${mode === 'solo' ? 'active' : ''}`}
              onClick={() => setMode('solo')}
            >
              Solo
            </span>
            <div 
              className={`toggle-switch ${mode === 'band' ? 'band' : ''}`}
              onClick={toggleMode}
            />
            <span 
              className={`toggle-label ${mode === 'band' ? 'active' : ''}`}
              onClick={() => setMode('band')}
            >
              Band
            </span>
          </div>

          <a href="#booking" className="nav-cta">
            Book Now
          </a>
        </nav>

        {/* Hero Section */}
        <section className="hero">
          <span className="hero-tagline">Big Island, Hawaii</span>
          <h1 className="hero-title">
            {mode === 'solo' ? (
              <>Live Music<br/><em>Your Way</em></>
            ) : (
              <>Unforgettable<br/><em>Energy</em></>
            )}
          </h1>
          <p className="hero-subtitle">
            {mode === 'solo' 
              ? 'One artist. Endless possibilities. From intimate acoustic sets to dynamic one-man-band performances that captivate any crowd.'
              : 'Full band power for events that demand more. Halana brings the complete live music experience to your celebration.'
            }
          </p>
          <SoundWave color={mode === 'solo' ? 'var(--solo-primary)' : 'var(--band-primary)'} />
          <a 
            href="#booking" 
            className={`hero-cta ${mode}-cta`}
          >
            Start Your Inquiry
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </section>

        {/* Experience Section */}
        <section className="experience-section">
          <div className="section-header">
            <span className="section-label">The Experience</span>
            <h2 className="section-title">
              {mode === 'solo' ? 'Set the Perfect Mood' : 'Elevate Your Event'}
            </h2>
          </div>

          <div className="vibe-grid">
            {vibes.map((vibe, i) => (
              <div 
                key={i} 
                className={`vibe-card ${mode}-card`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="vibe-icon">{vibe.icon}</span>
                <h3 className="vibe-name">{vibe.name}</h3>
                <p className="vibe-desc">{vibe.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="testimonial-section">
          <blockquote className="testimonial-quote">
            {mode === 'solo' 
              ? '"Jeremiah created the perfect atmosphere for our sunset wedding. Every guest commented on how beautiful the music was."'
              : '"Halana had everyone on the dance floor all night. They made our corporate gala absolutely unforgettable."'
            }
          </blockquote>
          <cite className="testimonial-author">
            {mode === 'solo' ? '— Sarah & Mike, Kona Wedding' : '— Pacific Financial Group, Annual Gala'}
          </cite>
        </section>

        {/* Booking Section */}
        <section id="booking" className="booking-section">
          <div className="section-header">
            <span className="section-label">Let's Create Something Special</span>
            <h2 className="section-title">Book {mode === 'solo' ? 'Kamele Muzik' : 'Halana'}</h2>
          </div>

          <div className="booking-container">
            {!submitted ? (
              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="Full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      placeholder="(808) 000-0000"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Event Date</label>
                    <input
                      type="date"
                      name="eventDate"
                      className="form-input"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Event Type</label>
                    <select
                      name="eventType"
                      className="form-select"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding / Reception</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="private">Private Party</option>
                      <option value="restaurant">Restaurant / Venue</option>
                      <option value="festival">Festival / Concert</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Guest Count</label>
                    <select
                      name="guestCount"
                      className="form-select"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                    >
                      <option value="">Approximate guests</option>
                      <option value="intimate">Under 25 (Intimate)</option>
                      <option value="small">25-50</option>
                      <option value="medium">50-100</option>
                      <option value="large">100-200</option>
                      <option value="xlarge">200+</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Venue / Location</label>
                  <input
                    type="text"
                    name="venue"
                    className="form-input"
                    placeholder="Venue name or general location (Kona, Hilo, etc.)"
                    value={formData.venue}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tell Us About Your Vision</label>
                  <textarea
                    name="message"
                    className="form-textarea"
                    placeholder="What's the vibe you're going for? Any special requests, song preferences, or details we should know?"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                <button type="submit" className={`form-submit ${mode}-submit`}>
                  Send Inquiry
                </button>
              </form>
            ) : (
              <div className="booking-form">
                <div className="success-message">
                  <div className="success-icon" style={{ 
                    color: mode === 'solo' ? 'var(--solo-primary)' : 'var(--band-primary)' 
                  }}>
                    ✓
                  </div>
                  <h3 className="success-title">Mahalo!</h3>
                  <p className="success-text">
                    Your inquiry has been received. We'll be in touch within 24 hours to discuss your event and create something special together.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-logo">
            {mode === 'solo' ? 'Kamele Muzik' : 'Halana'}
          </div>
          <p className="footer-tagline">Live Music for Every Occasion • Big Island, Hawaii</p>
          <div className="footer-links">
            <a href="https://instagram.com/kamelemuzik" target="_blank" rel="noopener noreferrer" className="footer-link">
              Instagram
            </a>
            <a href="https://facebook.com/kamelemuzik" target="_blank" rel="noopener noreferrer" className="footer-link">
              Facebook
            </a>
            <a href="mailto:kamelemuzik@email.com" className="footer-link">
              Email
            </a>
            <a href="tel:+18080000000" className="footer-link">
              Call
            </a>
          </div>
        </footer>
      </div>

      {/* Grain Overlay */}
      <div className="grain-overlay" />
    </>
  );
}
