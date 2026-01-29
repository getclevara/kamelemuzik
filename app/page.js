'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Icons
const Icons = {
  play: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>,
  pause: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>,
  arrow: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  chevronDown: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>,
  check: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
};

// Portal
function Portal({ onSelect }) {
  const [hoveredSide, setHoveredSide] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="portal-wrapper">
      <div className={`portal-container ${isMobile ? 'mobile' : ''}`}>
        {/* SOLO */}
        <div 
          className={`portal-side ${hoveredSide === 'solo' ? 'expanded' : ''} ${hoveredSide === 'band' ? 'contracted' : ''}`}
          onMouseEnter={() => setHoveredSide('solo')}
          onMouseLeave={() => setHoveredSide(null)}
          onClick={() => onSelect('solo')}
        >
          <div className="portal-image">
            <Image src="/images/solo-hero.jpg" alt="Kamele Muzik" fill style={{ objectFit: 'cover', objectPosition: 'center 15%' }} priority />
          </div>
          <div className="portal-gradient" />
          <div className="portal-content">
            <p className="portal-label solo-label">Solo Artist</p>
            <h2 className="portal-title">Kamele Muzik</h2>
            <p className={`portal-desc ${hoveredSide === 'band' ? 'hidden' : ''}`}>Intimate acoustic vibes. Sunset sessions. One artist, endless possibilities.</p>
            <button className={`portal-btn solo-btn ${hoveredSide === 'band' ? 'hidden' : ''}`}>ENTER <Icons.arrow /></button>
          </div>
        </div>

        {/* BAND */}
        <div 
          className={`portal-side ${hoveredSide === 'band' ? 'expanded' : ''} ${hoveredSide === 'solo' ? 'contracted' : ''}`}
          onMouseEnter={() => setHoveredSide('band')}
          onMouseLeave={() => setHoveredSide(null)}
          onClick={() => onSelect('band')}
        >
          <div className="portal-image">
            <Image src="/images/band-hero.jpg" alt="Halana" fill style={{ objectFit: 'cover' }} priority />
          </div>
          <div className="portal-gradient" />
          <div className="portal-content">
            <p className="portal-label band-label">Full Band</p>
            <h2 className="portal-title">Halana</h2>
            <p className={`portal-desc ${hoveredSide === 'solo' ? 'hidden' : ''}`}>Four musicians. Full energy. Unforgettable celebrations.</p>
            <button className={`portal-btn band-btn ${hoveredSide === 'solo' ? 'hidden' : ''}`}>ENTER <Icons.arrow /></button>
          </div>
        </div>
      </div>
      {!isMobile && <div className="portal-divider" />}
    </div>
  );
}

// Main Site
export default function Home() {
  const [showPortal, setShowPortal] = useState(true);
  const [mode, setMode] = useState('solo');
  const [isPlaying, setIsPlaying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', eventDate: '', eventType: '', message: '' });

  const isSolo = mode === 'solo';
  const accent = isSolo ? '#F59E0B' : '#3B82F6';

  const services = isSolo ? [
    { title: 'Sunset Sessions', desc: 'Golden hour acoustic sets for oceanside venues. Perfect for cocktail hours and romantic evenings.' },
    { title: 'One Man Band', desc: 'Full sound from a single performer. Guitar, loops, and vocals creating a complete musical experience.' },
    { title: 'Private Events', desc: 'Weddings, proposals, intimate dinners. Personalized setlists for your special moments.' },
    { title: 'Restaurant Residencies', desc: 'Regular bookings for venues wanting consistent, quality live entertainment.' }
  ] : [
    { title: 'High Energy Shows', desc: 'Pack the dance floor all night. Four musicians bringing non-stop energy to your celebration.' },
    { title: 'Corporate Events', desc: 'Professional entertainment for galas, conferences, and company celebrations.' },
    { title: 'Weddings & Receptions', desc: 'From ceremony to last dance. Full production for your biggest day.' },
    { title: 'Festivals & Concerts', desc: 'Stage-ready performances for large venues and outdoor events.' }
  ];

  const tracks = isSolo 
    ? ['Island Breeze', 'Sunset Drive', 'Chill Sessions', 'Acoustic Soul', 'Paradise']
    : ['Live at Kona', 'Full Moon Party', 'Island Fusion', 'Dance Floor', 'Encore'];

  if (showPortal) {
    return <Portal onSelect={(m) => { setMode(m); setShowPortal(false); }} />;
  }

  return (
    <div className="main-site">
      {/* NAV - BIG BUTTONS */}
      <nav className="nav">
        <button onClick={() => setShowPortal(true)} className="nav-logo">
          {isSolo ? 'Kamele Muzik' : 'Halana'}
        </button>
        
        <div className="nav-center">
          <div className="nav-toggle">
            <button onClick={() => setMode('solo')} className={`nav-toggle-btn ${isSolo ? 'active' : ''}`}>SOLO</button>
            <button onClick={() => setMode('band')} className={`nav-toggle-btn ${!isSolo ? 'active' : ''}`}>BAND</button>
          </div>
        </div>
        
        <a href="#booking" className="nav-book" style={{ borderColor: accent }}>BOOK NOW</a>
      </nav>

      {/* HERO - Full bleed image */}
      <section className="hero">
        <div className="hero-image">
          <Image src={`/images/${isSolo ? 'solo' : 'band'}-hero.jpg`} alt={isSolo ? 'Kamele Muzik' : 'Halana'} fill style={{ objectFit: 'cover', objectPosition: isSolo ? 'center 15%' : 'center' }} priority />
        </div>
        <div className="hero-overlay" />
        <div className="hero-overlay-side" />
        
        <div className="hero-content">
          <p className="hero-location" style={{ color: accent }}>Big Island, Hawaii</p>
          <h1 className="hero-title">
            {isSolo ? <>Live Music,<br/><span className="hero-title-fade">Your Way</span></> : <>Unforgettable<br/><span className="hero-title-fade">Energy</span></>}
          </h1>
          <p className="hero-subtitle">
            {isSolo ? 'From intimate acoustic sets to dynamic one-man-band performances. Music crafted for your moment.' : 'Full band power for events that demand more. Four musicians bringing the complete live experience.'}
          </p>
          <div className="hero-actions">
            <a href="#booking" className="hero-btn-primary" style={{ background: accent }}>BOOK NOW <Icons.arrow /></a>
            <a href="#listen" className="hero-btn-secondary">LISTEN</a>
          </div>
        </div>
        
        <div className="hero-scroll">
          <span>SCROLL</span>
          <Icons.chevronDown />
        </div>
      </section>

      {/* LISTEN */}
      <section id="listen" className="section-listen">
        <div className="listen-container">
          <div className="listen-grid">
            <div className="player-wrapper">
              <div className="player-bg" style={{ background: `linear-gradient(135deg, ${accent}40, ${accent}10)` }} />
              <div className="player">
                <div>
                  <p className="player-label" style={{ color: accent }}>Now Playing</p>
                  <h3 className="player-track">{tracks[0]}</h3>
                  <p className="player-artist">{isSolo ? 'Kamele Muzik' : 'Halana'}</p>
                </div>
                <div className="player-waveform">
                  {[...Array(50)].map((_, i) => (
                    <div key={i} className="wave-bar" style={{ background: accent, height: `${20 + Math.sin(i * 0.3) * 30 + (i % 5) * 8}%`, opacity: 0.4 + (i % 3) * 0.2 }} />
                  ))}
                </div>
                <div className="player-controls">
                  <span className="player-time">0:00</span>
                  <button onClick={() => setIsPlaying(!isPlaying)} className="player-play" style={{ background: accent }}>
                    {isPlaying ? <Icons.pause /> : <Icons.play />}
                  </button>
                  <span className="player-time">3:42</span>
                </div>
              </div>
            </div>
            
            <div className="tracks">
              <p className="tracks-label" style={{ color: accent }}>Tracks</p>
              <div className="tracks-list">
                {tracks.map((track, i) => (
                  <button key={i} className={`track-item ${i === 0 ? 'active' : ''}`}>
                    <div className="track-info">
                      <span className="track-num" style={{ background: i === 0 ? accent : 'transparent', color: i === 0 ? '#000' : 'white', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.2)' }}>{i + 1}</span>
                      <span className="track-name">{track}</span>
                    </div>
                    <span className="track-duration">{3 + i}:{20 + i * 7}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-services">
        <div className="services-container">
          <div className="section-header">
            <p className="section-label" style={{ color: accent }}>Services</p>
            <h2 className="section-title">{isSolo ? 'Set the Mood' : 'Elevate Your Event'}</h2>
          </div>
          <div className="services-grid">
            {services.map((item, i) => (
              <div key={i} className="service-card">
                <div className="service-num" style={{ background: `${accent}20`, color: accent }}>{i + 1}</div>
                <h3 className="service-title">{item.title}</h3>
                <p className="service-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="section-testimonial">
        <div className="testimonial-container">
          <div className="testimonial-line" style={{ background: accent }} />
          <blockquote className="testimonial-quote">
            {isSolo ? '"Jeremiah created the perfect atmosphere for our sunset wedding. Every single guest commented on how beautiful the music was."' : '"Halana brought incredible energy to our corporate gala. The dance floor was packed from start to finish."'}
          </blockquote>
          <cite className="testimonial-author">{isSolo ? '— KONA COAST WEDDING' : '— FOUR SEASONS GALA'}</cite>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="section-booking">
        <div className="booking-container">
          <div className="section-header">
            <p className="section-label" style={{ color: accent }}>Get Started</p>
            <h2 className="section-title">Book {isSolo ? 'Kamele Muzik' : 'Halana'}</h2>
          </div>

          {!submitted ? (
            <form className="booking-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div className="form-row">
                <input type="text" name="name" placeholder="Your name" className="form-input" required />
                <input type="email" name="email" placeholder="Email address" className="form-input" required />
              </div>
              <div className="form-row">
                <input type="tel" name="phone" placeholder="Phone number" className="form-input" />
                <input type="date" name="eventDate" className="form-input" required />
              </div>
              <select name="eventType" className="form-select" required>
                <option value="">Event type</option>
                <option value="wedding">Wedding / Reception</option>
                <option value="corporate">Corporate Event</option>
                <option value="private">Private Party</option>
                <option value="venue">Restaurant / Venue</option>
              </select>
              <textarea name="message" placeholder="Tell us about your event..." rows={4} className="form-textarea" />
              <button type="submit" className="form-submit" style={{ background: accent }}>SEND INQUIRY</button>
            </form>
          ) : (
            <div className="form-success">
              <div className="success-icon" style={{ borderColor: accent, color: accent }}><Icons.check /></div>
              <h3>Mahalo!</h3>
              <p>We'll be in touch within 24 hours.</p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">{isSolo ? 'Kamele Muzik' : 'Halana'}</div>
            <p>Live Music • Big Island, Hawaii</p>
          </div>
          <div className="footer-links">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">YouTube</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
