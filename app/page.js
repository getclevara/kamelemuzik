'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// ============================================
// CUSTOM SVG ICONS - No emojis
// ============================================

const Icons = {
  sunset: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="16" cy="20" r="6" />
      <path d="M16 10V8M24 20H26M6 20H8M22.5 13.5L24 12M9.5 13.5L8 12" />
      <path d="M4 26h24" strokeLinecap="round" />
    </svg>
  ),
  wave: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 16c2-4 4-6 6-6s4 4 6 4 4-4 6-4 4 2 6 6" strokeLinecap="round" />
      <path d="M2 22c2-4 4-6 6-6s4 4 6 4 4-4 6-4 4 2 6 6" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  mic: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="12" y="4" width="8" height="14" rx="4" />
      <path d="M8 14v2a8 8 0 0016 0v-2M16 24v4M12 28h8" strokeLinecap="round" />
    </svg>
  ),
  guitar: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="22" rx="8" ry="6" />
      <path d="M18 18L28 4M26 6l2-2M24 8l2-2" strokeLinecap="round" />
      <circle cx="12" cy="22" r="2" />
    </svg>
  ),
  fire: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 28c-6 0-10-4-10-10 0-8 10-14 10-14s10 6 10 14c0 6-4 10-10 10z" />
      <path d="M16 28c-2 0-4-2-4-5 0-4 4-7 4-7s4 3 4 7c0 3-2 5-4 5z" />
    </svg>
  ),
  users: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="10" r="4" />
      <circle cx="22" cy="12" r="3" />
      <path d="M4 26c0-4 4-7 8-7s8 3 8 7" />
      <path d="M20 26c0-3 2-5 5-5s5 2 5 5" opacity="0.6" />
    </svg>
  ),
  star: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 4l3.5 7.5 8.5 1-6.5 6 2 8.5-7.5-4.5-7.5 4.5 2-8.5-6.5-6 8.5-1z" />
    </svg>
  ),
  play: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  pause: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
    </svg>
  ),
  arrow: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  check: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  ),
  prev: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
    </svg>
  ),
  next: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
    </svg>
  )
};

// ============================================
// AUDIO WAVEFORM VISUALIZATION
// ============================================

function AudioWaveform({ color, isPlaying }) {
  const [bars, setBars] = useState([]);
  
  useEffect(() => {
    setBars([...Array(40)].map((_, i) => ({
      height: Math.sin(i * 0.3) * 20 + 25 + Math.random() * 15
    })));
  }, []);

  return (
    <div className="audio-waveform">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="wave-bar"
          style={{
            backgroundColor: color,
            height: `${bar.height}%`,
            opacity: 0.4 + (i % 3) * 0.2,
            animationDelay: `${i * 0.02}s`,
            animationPlayState: isPlaying ? 'running' : 'paused'
          }}
        />
      ))}
      <style jsx>{`
        .audio-waveform {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 3px;
          height: 64px;
        }
        .wave-bar {
          width: 3px;
          border-radius: 2px;
          transition: all 0.15s;
          animation: waveform 0.8s ease-in-out infinite;
        }
        @keyframes waveform {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.6); }
        }
      `}</style>
    </div>
  );
}

// ============================================
// MUSIC PLAYER COMPONENT
// ============================================

function MusicPlayer({ mode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  
  const colors = mode === 'solo' 
    ? { primary: '#E8A87C', secondary: '#C38D9E' }
    : { primary: '#7B9FFF', secondary: '#9B6EE8' };

  const tracks = mode === 'solo' 
    ? [
        { title: 'Island Breeze', duration: '3:42' },
        { title: 'Sunset Drive', duration: '4:15' },
        { title: 'Chill Sessions Vol. 1', duration: '5:20' }
      ]
    : [
        { title: 'Halana Live at Kona', duration: '6:12' },
        { title: 'Full Moon Party', duration: '4:45' },
        { title: 'Island Fusion', duration: '5:33' }
      ];

  return (
    <div className="music-player">
      <div className="player-glow" style={{ background: `linear-gradient(135deg, ${colors.primary}40, ${colors.secondary}40)` }} />
      
      <div className="player-content">
        <div className="player-layout">
          {/* Album art */}
          <div className="album-art" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
            <div className="album-icon">
              <Icons.wave />
            </div>
          </div>
          
          {/* Controls */}
          <div className="player-controls">
            <p className="now-playing">Now Playing</p>
            <h3 className="track-title">{tracks[currentTrack].title}</h3>
            
            <AudioWaveform color={colors.primary} isPlaying={isPlaying} />
            
            <div className="controls-row">
              <span className="time">0:00</span>
              <div className="buttons">
                <button className="control-btn" onClick={() => setCurrentTrack((currentTrack - 1 + tracks.length) % tracks.length)}>
                  <Icons.prev />
                </button>
                <button className="play-btn" style={{ background: colors.primary }} onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Icons.pause /> : <Icons.play />}
                </button>
                <button className="control-btn" onClick={() => setCurrentTrack((currentTrack + 1) % tracks.length)}>
                  <Icons.next />
                </button>
              </div>
              <span className="time">{tracks[currentTrack].duration}</span>
            </div>
          </div>
        </div>
        
        {/* Track list */}
        <div className="track-list">
          {tracks.map((track, i) => (
            <button
              key={i}
              onClick={() => { setCurrentTrack(i); setIsPlaying(true); }}
              className={`track-item ${i === currentTrack ? 'active' : ''}`}
            >
              <div className="track-info">
                <span 
                  className="track-num" 
                  style={{ 
                    background: i === currentTrack ? colors.primary : 'transparent',
                    color: i === currentTrack ? '#000' : 'inherit',
                    border: i === currentTrack ? 'none' : '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  {i + 1}
                </span>
                <span className="track-name">{track.title}</span>
              </div>
              <span className="track-duration">{track.duration}</span>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .music-player {
          position: relative;
        }
        .player-glow {
          position: absolute;
          inset: 0;
          opacity: 0.2;
          filter: blur(40px);
          border-radius: 20px;
        }
        .player-content {
          position: relative;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 1.5rem;
        }
        .player-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .player-layout {
            flex-direction: row;
            align-items: center;
          }
          .player-content {
            padding: 2rem;
          }
        }
        .album-art {
          width: 120px;
          height: 120px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        @media (min-width: 768px) {
          .album-art {
            width: 160px;
            height: 160px;
          }
        }
        .album-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .player-controls {
          flex: 1;
          width: 100%;
        }
        .now-playing {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          opacity: 0.5;
          margin-bottom: 0.25rem;
        }
        .track-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 400;
          margin-bottom: 1rem;
        }
        @media (min-width: 768px) {
          .track-title {
            font-size: 1.5rem;
          }
        }
        .controls-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1rem;
        }
        .time {
          font-size: 0.75rem;
          opacity: 0.5;
        }
        .buttons {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .control-btn {
          opacity: 0.5;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .control-btn:hover {
          opacity: 1;
        }
        .play-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s;
          color: #000;
        }
        .play-btn:hover {
          transform: scale(1.05);
        }
        .track-list {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.1);
          display: grid;
          gap: 0.5rem;
        }
        .track-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem;
          border-radius: 8px;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s;
        }
        .track-item:hover {
          background: rgba(255,255,255,0.05);
        }
        .track-item.active {
          background: rgba(255,255,255,0.1);
        }
        .track-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .track-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
        }
        .track-name {
          opacity: 0.6;
        }
        .track-item.active .track-name {
          opacity: 1;
        }
        .track-duration {
          font-size: 0.75rem;
          opacity: 0.4;
        }
      `}</style>
    </div>
  );
}

// ============================================
// PORTAL ENTRY SCREEN
// ============================================

function Portal({ onSelect }) {
  const [hoveredSide, setHoveredSide] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="portal-container">
      {/* SOLO SIDE */}
      <div 
        className={`portal-side ${hoveredSide === 'solo' ? 'expanded' : ''} ${hoveredSide === 'band' ? 'contracted' : ''}`}
        onMouseEnter={() => !isMobile && setHoveredSide('solo')}
        onMouseLeave={() => !isMobile && setHoveredSide(null)}
        onClick={() => onSelect('solo')}
      >
        <div className="portal-bg">
          <Image
            src="/images/solo-hero.jpg"
            alt="Kamele Muzik"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
            priority
          />
        </div>
        <div className="portal-overlay solo-overlay" />
        <div className="portal-grain" />
        
        <div className="portal-content">
          <p className="portal-label" style={{ color: '#E8A87C' }}>Solo Artist</p>
          <h2 className="portal-title">Kamele<br/><em>Muzik</em></h2>
          <p className="portal-desc">Intimate acoustic sets & chill vibes for any occasion</p>
          <div className="portal-cta">
            <span>Enter</span>
            <Icons.arrow />
          </div>
        </div>
        
        {!isMobile && <div className="portal-divider" />}
      </div>

      {/* BAND SIDE */}
      <div 
        className={`portal-side ${hoveredSide === 'band' ? 'expanded' : ''} ${hoveredSide === 'solo' ? 'contracted' : ''}`}
        onMouseEnter={() => !isMobile && setHoveredSide('band')}
        onMouseLeave={() => !isMobile && setHoveredSide(null)}
        onClick={() => onSelect('band')}
      >
        <div className="portal-bg">
          <Image
            src="/images/band-hero.jpg"
            alt="Halana Band"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="portal-overlay band-overlay" />
        <div className="portal-grain" />
        
        <div className="portal-content">
          <p className="portal-label" style={{ color: '#7B9FFF' }}>Full Band</p>
          <h2 className="portal-title">Halana</h2>
          <p className="portal-desc">Full band energy for unforgettable events</p>
          <div className="portal-cta">
            <span>Enter</span>
            <Icons.arrow />
          </div>
        </div>
      </div>

      <style jsx>{`
        .portal-container {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .portal-container {
            flex-direction: row;
          }
        }
        .portal-side {
          flex: 1;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          transition: flex 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .portal-side.expanded { flex: 1.4; }
        .portal-side.contracted { flex: 0.6; }
        @media (max-width: 767px) {
          .portal-side.expanded { flex: 1.15; }
          .portal-side.contracted { flex: 0.85; }
        }
        .portal-bg {
          position: absolute;
          inset: 0;
          transition: transform 0.7s ease;
        }
        .portal-side:hover .portal-bg {
          transform: scale(1.05);
        }
        .portal-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .solo-overlay {
          background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(120,70,30,0.4) 50%, rgba(0,0,0,0.8) 100%);
        }
        .band-overlay {
          background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(40,40,100,0.4) 50%, rgba(0,0,0,0.8) 100%);
        }
        .portal-grain {
          position: absolute;
          inset: 0;
          z-index: 2;
          opacity: 0.3;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
        .portal-content {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
        }
        @media (min-width: 768px) {
          .portal-content {
            padding: 2.5rem;
          }
        }
        .portal-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          margin-bottom: 0.75rem;
          opacity: 0.9;
        }
        .portal-title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 400;
          line-height: 1;
          margin-bottom: 0.75rem;
          color: white;
        }
        .portal-title em {
          font-style: italic;
          opacity: 0.7;
        }
        .portal-desc {
          font-size: 0.9rem;
          opacity: 0.6;
          max-width: 280px;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }
        .portal-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 100px;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          transition: all 0.3s;
          width: fit-content;
        }
        .portal-cta:hover {
          background: rgba(255,255,255,0.2);
        }
        .portal-divider {
          position: absolute;
          top: 0;
          right: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent);
          z-index: 20;
        }
      `}</style>
    </div>
  );
}

// ============================================
// MAIN SITE
// ============================================

export default function Home() {
  const [showPortal, setShowPortal] = useState(true);
  const [mode, setMode] = useState('solo');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', eventDate: '', eventType: '', message: ''
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
    console.log('Form submitted:', { mode, ...formData });
    setSubmitted(true);
  };

  const colors = mode === 'solo' 
    ? { primary: '#E8A87C', secondary: '#C38D9E', text: '#1a1410' }
    : { primary: '#7B9FFF', secondary: '#9B6EE8', text: '#fff' };

  const vibes = mode === 'solo' 
    ? [
        { Icon: Icons.sunset, title: 'Sunset Sessions', desc: 'Golden hour acoustics for oceanside venues and intimate gatherings' },
        { Icon: Icons.wave, title: 'Chill Vibes', desc: 'Laid-back reggae & R&B that lets the moment breathe' },
        { Icon: Icons.guitar, title: 'One Man Band', desc: 'Full sound, single performer — versatile for any space' },
        { Icon: Icons.mic, title: 'Private Events', desc: 'Weddings, proposals, dinners — music that fits the moment' }
      ]
    : [
        { Icon: Icons.fire, title: 'High Energy', desc: 'Fill the dance floor and keep the party moving all night' },
        { Icon: Icons.users, title: 'Full Production', desc: 'Complete band with vocals, rhythm, and lead' },
        { Icon: Icons.wave, title: 'Island Fusion', desc: 'Reggae, rock, and contemporary hits blended seamlessly' },
        { Icon: Icons.star, title: 'Grand Events', desc: 'Corporate galas, festivals, and milestone celebrations' }
      ];

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
      <div className={`main-site ${mode}-mode`}>
        {/* Background layers */}
        <div className="site-bg">
          <div className="bg-gradient" />
          <div className="bg-image" style={{ backgroundImage: `url(/images/${mode === 'solo' ? 'solo' : 'band'}-hero.jpg)` }} />
          <div className="bg-mesh">
            <div className="mesh-orb mesh-1" style={{ background: colors.primary }} />
            <div className="mesh-orb mesh-2" style={{ background: colors.secondary }} />
          </div>
          <div className="bg-grain" />
        </div>

        {/* Content */}
        <div className="site-content">
          {/* Nav */}
          <nav className="nav-bar">
            <div className="nav-logo" onClick={() => setShowPortal(true)}>
              {mode === 'solo' ? 'Kamele Muzik' : 'Halana'}
            </div>
            
            <div className="nav-toggle">
              <button className={`toggle-btn ${mode === 'solo' ? 'active' : ''}`} onClick={() => setMode('solo')}>Solo</button>
              <button className={`toggle-btn ${mode === 'band' ? 'active' : ''}`} onClick={() => setMode('band')}>Band</button>
            </div>

            <a href="#booking" className="nav-cta">Book Now</a>
          </nav>

          {/* Hero */}
          <section className="hero">
            <div className="hero-grid">
              <div className="hero-text">
                <p className="hero-location">Big Island, Hawaii</p>
                <h1 className="hero-title">
                  {mode === 'solo' ? (
                    <>Live Music,<br/><em>Your Way</em></>
                  ) : (
                    <>Unforgettable<br/><em>Energy</em></>
                  )}
                </h1>
                <p className="hero-subtitle">
                  {mode === 'solo' 
                    ? 'From intimate acoustic sets to dynamic one-man-band performances. Music that fits the moment.'
                    : 'Full band power for events that demand more. Four musicians, one unforgettable experience.'
                  }
                </p>
                <div className="hero-actions">
                  <a href="#booking" className="btn-primary" style={{ background: colors.primary, color: colors.text }}>
                    Book Now <Icons.arrow />
                  </a>
                  <a href="#listen" className="btn-secondary">Listen</a>
                </div>
              </div>
              
              <div className="hero-image">
                <div className="image-frame">
                  <Image
                    src={`/images/${mode === 'solo' ? 'solo' : 'band'}-hero.jpg`}
                    alt={mode === 'solo' ? 'Kamele Muzik' : 'Halana'}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                  <div className="image-overlay" />
                </div>
                <div className="image-deco-1" />
                <div className="image-deco-2" style={{ background: colors.primary }} />
              </div>
            </div>
          </section>

          {/* Listen */}
          <section id="listen" className="section listen-section">
            <div className="section-container">
              <div className="section-header">
                <p className="section-label">Listen</p>
                <h2 className="section-title">Hear the Sound</h2>
              </div>
              <MusicPlayer mode={mode} />
            </div>
          </section>

          {/* Experience */}
          <section className="section experience-section">
            <div className="section-container wide">
              <div className="section-header">
                <p className="section-label">The Experience</p>
                <h2 className="section-title">{mode === 'solo' ? 'Set the Mood' : 'Elevate Your Event'}</h2>
              </div>
              
              <div className="vibe-grid">
                {vibes.map((vibe, i) => (
                  <div key={i} className="vibe-card">
                    <div className="vibe-icon" style={{ background: `${colors.primary}15`, color: colors.primary }}>
                      <vibe.Icon />
                    </div>
                    <div className="vibe-text">
                      <h3 className="vibe-title">{vibe.title}</h3>
                      <p className="vibe-desc">{vibe.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonial */}
          <section className="section testimonial-section">
            <div className="section-container">
              <div className="testimonial-line" style={{ background: colors.primary }} />
              <blockquote className="testimonial-quote">
                {mode === 'solo' 
                  ? '"Jeremiah created the perfect atmosphere for our sunset wedding. Every single guest commented on the music."'
                  : '"Halana brought incredible energy to our corporate gala. The dance floor was packed all night."'
                }
              </blockquote>
              <cite className="testimonial-author">
                {mode === 'solo' ? '— Private Wedding, Kona Coast' : '— Annual Gala, Four Seasons'}
              </cite>
            </div>
          </section>

          {/* Booking */}
          <section id="booking" className="section booking-section">
            <div className="section-container narrow">
              <div className="section-header">
                <p className="section-label">Let's Talk</p>
                <h2 className="section-title">Book {mode === 'solo' ? 'Kamele Muzik' : 'Halana'}</h2>
              </div>

              <div className="booking-form-container">
                {!submitted ? (
                  <form className="booking-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleInputChange} required />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Phone</label>
                        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} />
                      </div>
                      <div className="form-group">
                        <label>Date</label>
                        <input type="date" name="eventDate" value={formData.eventDate} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Event Type</label>
                      <select name="eventType" value={formData.eventType} onChange={handleInputChange} required>
                        <option value="">Select</option>
                        <option value="wedding">Wedding / Reception</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="private">Private Party</option>
                        <option value="venue">Restaurant / Venue</option>
                        <option value="festival">Festival</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Tell Us About Your Event</label>
                      <textarea name="message" placeholder="Location, vibe, special requests..." rows={4} value={formData.message} onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="form-submit" style={{ background: colors.primary, color: colors.text }}>
                      Send Inquiry
                    </button>
                  </form>
                ) : (
                  <div className="form-success">
                    <div className="success-icon" style={{ borderColor: colors.primary, color: colors.primary }}>
                      <Icons.check />
                    </div>
                    <h3>Mahalo!</h3>
                    <p>We'll be in touch within 24 hours.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <div className="footer-content">
              <div className="footer-brand">
                <div className="footer-logo">{mode === 'solo' ? 'Kamele Muzik' : 'Halana'}</div>
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
      </div>

      <div className="grain-overlay" />
    </>
  );
}
