import { useState, useEffect, useRef } from 'react'

// SVG Icons as components
const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const MicIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
)

const CalendarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

const MusicIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/>
    <circle cx="18" cy="16" r="3"/>
  </svg>
)

const StarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

// Floating Particles Component
const FloatingParticles = ({ mode }) => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 30,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 15 + 15,
  }))

  return (
    <div className="particles-container">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

// Sound Waves Component
const SoundWaves = () => {
  const bars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    height: Math.random() * 100 + 20,
    delay: Math.random() * 2,
  }))

  return (
    <div className="sound-waves">
      {bars.map(bar => (
        <div
          key={bar.id}
          className="wave-bar"
          style={{
            '--wave-height': `${bar.height}px`,
            animationDelay: `${bar.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

// Portal Screen Component
const PortalScreen = ({ onSelectMode, soloImage, bandImage }) => {
  return (
    <div className="portal-screen">
      <h1 className="portal-title">Choose Your Experience</h1>
      <p className="portal-subtitle">Big Island Hawaii • Live Music</p>
      
      <div className="portal-choices">
        <div 
          className="portal-card solo-card"
          onClick={() => onSelectMode('solo')}
        >
          <img 
            src={soloImage} 
            alt="Kamele Muzik - Solo Performance"
            className="portal-card-image"
          />
          <div className="portal-card-content">
            <span className="portal-card-label">Solo Artist</span>
            <h3 className="portal-card-title">Kamele Muzik</h3>
            <p className="portal-card-desc">
              Intimate acoustic vibes perfect for dinners, cocktail hours, and small gatherings
            </p>
          </div>
          <div className="portal-card-arrow">
            <ArrowIcon />
          </div>
        </div>
        
        <div 
          className="portal-card band-card"
          onClick={() => onSelectMode('band')}
        >
          <img 
            src={bandImage} 
            alt="Halana - Full Band"
            className="portal-card-image"
          />
          <div className="portal-card-content">
            <span className="portal-card-label">Full Band</span>
            <h3 className="portal-card-title">Halana</h3>
            <p className="portal-card-desc">
              Full band energy for weddings, corporate events, and celebrations that need to move
            </p>
          </div>
          <div className="portal-card-arrow">
            <ArrowIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

// Navigation Component
const Navigation = ({ mode, onModeSwitch, onBackToPortal }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const brandName = mode === 'solo' ? 'Kamele Muzik' : 'Halana'

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo" onClick={onBackToPortal}>
        {brandName}
      </div>
      
      <ul className="nav-links">
        <li><a href="#about" className="nav-link">About</a></li>
        <li><a href="#services" className="nav-link">Services</a></li>
        <li><a href="#contact" className="nav-link">Contact</a></li>
      </ul>
      
      <a href="#contact">
        <button className="nav-cta">Book Now</button>
      </a>
      
      <button 
        className="mobile-nav-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  )
}

// Hero Section Component
const HeroSection = ({ mode, image }) => {
  const soloContent = {
    label: 'Solo Acoustic Artist',
    title: <>Chill Vibes for Your <span>Perfect Moment</span></>,
    description: "From intimate dinners to sunset cocktail hours, Kamele Muzik brings the perfect blend of Reggae, R&B, and acoustic soul to create unforgettable atmospheres across the Big Island.",
  }
  
  const bandContent = {
    label: 'Full Band Experience',
    title: <>Bringing the <span>Full Energy</span></>,
    description: "Halana delivers the complete live music experience for weddings, corporate events, and celebrations that deserve a full band sound. Four talented musicians creating moments you'll remember forever.",
  }
  
  const content = mode === 'solo' ? soloContent : bandContent

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-text">
          <span className="hero-label">{content.label}</span>
          <h1 className="hero-title">{content.title}</h1>
          <p className="hero-description">{content.description}</p>
          <div className="hero-buttons">
            <a href="#contact">
              <button className="btn-primary">Request Booking</button>
            </a>
            <a href="#services">
              <button className="btn-secondary">View Services</button>
            </a>
          </div>
        </div>
        
        <div className="hero-image-container">
          <div className="hero-image-wrapper">
            <img 
              src={image} 
              alt={mode === 'solo' ? 'Kamele Muzik' : 'Halana Band'}
              className="hero-image"
            />
          </div>
          <div className="hero-image-decoration"></div>
        </div>
      </div>
    </section>
  )
}

// Services Section Component
const ServicesSection = ({ mode }) => {
  const soloServices = [
    {
      icon: <MicIcon />,
      title: "Cocktail Hours",
      description: "Set the perfect mood as guests arrive. Smooth acoustic sounds that encourage conversation while creating an elevated atmosphere."
    },
    {
      icon: <CalendarIcon />,
      title: "Private Dinners",
      description: "Intimate background music for special dinners, anniversaries, and private celebrations where ambiance is everything."
    },
    {
      icon: <MusicIcon />,
      title: "Resort & Restaurant",
      description: "Regular appearances at Big Island's premier venues. Bring that signature sound to your establishment."
    },
    {
      icon: <StarIcon />,
      title: "Corporate Events",
      description: "Professional entertainment for company gatherings, networking events, and executive functions."
    }
  ]
  
  const bandServices = [
    {
      icon: <MicIcon />,
      title: "Wedding Celebrations",
      description: "From ceremony to reception, Halana brings the full experience - beautiful acoustics for vows, high energy for the dance floor."
    },
    {
      icon: <CalendarIcon />,
      title: "Corporate Events",
      description: "Make your company event unforgettable. Full band energy that gets people on their feet and creates lasting impressions."
    },
    {
      icon: <MusicIcon />,
      title: "Festivals & Concerts",
      description: "Stage-ready performances with a full sound system. We bring the energy that moves large crowds."
    },
    {
      icon: <StarIcon />,
      title: "Private Parties",
      description: "Birthdays, anniversaries, lūʻau celebrations - when you need the full band experience for your special occasion."
    }
  ]
  
  const services = mode === 'solo' ? soloServices : bandServices

  return (
    <section className="services" id="services">
      <div className="section-header">
        <span className="section-label">What We Offer</span>
        <h2 className="section-title">Perfect for Every Occasion</h2>
      </div>
      
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// About Section Component
const AboutSection = ({ mode, image }) => {
  const soloAbout = {
    title: "The Artist Behind the Music",
    paragraphs: [
      "I'm Jeremiah, and music has been my passion since I was introduced to it at a young age. Based in Hilo, Hawaii, I've spent years developing a style that leans towards those 'Chill Vibes' - the kind of music that makes you want to relax and truly feel the moment.",
      "My sound draws from Reggae, R&B, and Acoustic traditions, blending them into something uniquely Hawaiian yet universally appealing. Whether it's a beachside dinner or a corporate gathering on the Kona side, I bring the same dedication to creating the perfect atmosphere."
    ],
    stats: [
      { number: "15+", label: "Years Experience" },
      { number: "500+", label: "Events Played" },
      { number: "100%", label: "Aloha Spirit" }
    ]
  }
  
  const bandAbout = {
    title: "Four Musicians, One Sound",
    paragraphs: [
      "Halana brings together four talented musicians who share a deep love for Hawaiian music and culture. Together, we create a full, rich sound that honors tradition while bringing fresh energy to every performance.",
      "From traditional Hawaiian melodies to contemporary hits, our repertoire spans genres and generations. We're equipped for venues of all sizes, from intimate garden weddings to grand ballroom celebrations across the Big Island."
    ],
    stats: [
      { number: "4", label: "Musicians" },
      { number: "200+", label: "Weddings" },
      { number: "100%", label: "Aloha Spirit" }
    ]
  }
  
  const about = mode === 'solo' ? soloAbout : bandAbout

  return (
    <section className="about" id="about">
      <div className="about-content">
        <div className="about-image">
          <img 
            src={image} 
            alt={mode === 'solo' ? 'Kamele Muzik' : 'Halana Band'}
          />
        </div>
        
        <div className="about-text">
          <span className="section-label">Our Story</span>
          <h2 className="section-title">{about.title}</h2>
          {about.paragraphs.map((p, i) => (
            <p key={i} className="about-description">{p}</p>
          ))}
          
          <div className="about-stats">
            {about.stats.map((stat, i) => (
              <div key={i} className="stat">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Section Component  
const ContactSection = ({ mode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    location: '',
    details: ''
  })
  
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, this would send to a backend/email service
    console.log('Booking Request:', formData)
    setSubmitted(true)
  }

  const eventTypes = mode === 'solo' 
    ? ['Cocktail Hour', 'Private Dinner', 'Restaurant/Bar', 'Corporate Event', 'House Party', 'Other']
    : ['Wedding', 'Corporate Event', 'Festival', 'Private Party', 'Lūʻau', 'Other']

  if (submitted) {
    return (
      <section className="contact" id="contact">
        <div className="contact-container">
          <div className="section-header">
            <span className="section-label">Mahalo!</span>
            <h2 className="section-title">Request Received</h2>
          </div>
          <div className="contact-form" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
              We'll be in touch within 24 hours to discuss your event.
            </p>
            <button 
              className="btn-primary"
              onClick={() => setSubmitted(false)}
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <div className="section-header">
          <span className="section-label">Get Started</span>
          <h2 className="section-title">Request a Booking</h2>
        </div>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Your Name *</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full name"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="email@example.com"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(808) 555-0123"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Event Type *</label>
              <select
                name="eventType"
                className="form-select"
                value={formData.eventType}
                onChange={handleChange}
                required
              >
                <option value="">Select event type</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Event Date *</label>
              <input
                type="date"
                name="date"
                className="form-input"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Location / Venue</label>
              <input
                type="text"
                name="location"
                className="form-input"
                value={formData.location}
                onChange={handleChange}
                placeholder="Venue name or area (Kona, Hilo, etc.)"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Event Details</label>
            <textarea
              name="details"
              className="form-textarea"
              value={formData.details}
              onChange={handleChange}
              placeholder="Tell us about your event - guest count, duration, any special requests or song preferences..."
            />
          </div>
          
          <button type="submit" className="form-submit">
            Send Booking Request
          </button>
        </form>
      </div>
    </section>
  )
}

// Footer Component
const FooterSection = ({ mode }) => {
  const brandName = mode === 'solo' ? 'Kamele Muzik' : 'Halana'
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">{brandName}</div>
        
        <ul className="footer-links">
          <li><a href="#about" className="footer-link">About</a></li>
          <li><a href="#services" className="footer-link">Services</a></li>
          <li><a href="#contact" className="footer-link">Contact</a></li>
        </ul>
        
        <div className="footer-social">
          <a href="https://instagram.com/kamelemuzik" className="social-link" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </a>
          <a href="https://facebook.com/kamelemuzik" className="social-link" target="_blank" rel="noopener noreferrer">
            <FacebookIcon />
          </a>
          <a href="mailto:booking@kamelemuzik.com" className="social-link">
            <MailIcon />
          </a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {brandName}. Big Island, Hawaii. All rights reserved.</p>
      </div>
    </footer>
  )
}

// Mode Switcher Component
const ModeSwitcher = ({ mode, onModeSwitch }) => {
  return (
    <div className="mode-switcher">
      <button 
        className={`mode-option ${mode === 'solo' ? 'active' : ''}`}
        onClick={() => onModeSwitch('solo')}
      >
        Solo
      </button>
      <button 
        className={`mode-option ${mode === 'band' ? 'active' : ''}`}
        onClick={() => onModeSwitch('band')}
      >
        Full Band
      </button>
    </div>
  )
}

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState('portal') // 'portal', 'solo', 'band'
  const [mode, setMode] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionText, setTransitionText] = useState('')
  
  // Image paths - these will be in the public folder
  const soloImage = '/solo.jpg'
  const bandImage = '/band.jpg'

  const handleSelectMode = (selectedMode) => {
    setIsTransitioning(true)
    setTransitionText(selectedMode === 'solo' ? 'Kamele Muzik' : 'Halana')
    
    setTimeout(() => {
      setMode(selectedMode)
      setCurrentView('main')
      document.body.className = `${selectedMode}-mode`
    }, 600)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 1200)
  }

  const handleModeSwitch = (newMode) => {
    if (newMode === mode) return
    
    setIsTransitioning(true)
    setTransitionText(newMode === 'solo' ? 'Kamele Muzik' : 'Halana')
    
    setTimeout(() => {
      setMode(newMode)
      document.body.className = `${newMode}-mode`
    }, 600)
    
    setTimeout(() => {
      setIsTransitioning(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1200)
  }

  const handleBackToPortal = () => {
    setIsTransitioning(true)
    setTransitionText('Choose Your Experience')
    
    setTimeout(() => {
      setCurrentView('portal')
      setMode(null)
      document.body.className = ''
    }, 600)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 1200)
  }

  const currentImage = mode === 'solo' ? soloImage : bandImage

  return (
    <div className="app-container">
      <FloatingParticles mode={mode} />
      <SoundWaves />
      
      {/* Transition Overlay */}
      <div className={`transition-overlay ${isTransitioning ? 'active' : ''}`}>
        <span className="transition-text">{transitionText}</span>
      </div>
      
      {/* Portal View */}
      {currentView === 'portal' && (
        <PortalScreen 
          onSelectMode={handleSelectMode}
          soloImage={soloImage}
          bandImage={bandImage}
        />
      )}
      
      {/* Main Site View */}
      {currentView === 'main' && mode && (
        <div className="main-site">
          <Navigation 
            mode={mode} 
            onModeSwitch={handleModeSwitch}
            onBackToPortal={handleBackToPortal}
          />
          <HeroSection mode={mode} image={currentImage} />
          <ServicesSection mode={mode} />
          <AboutSection mode={mode} image={currentImage} />
          <ContactSection mode={mode} />
          <FooterSection mode={mode} />
          <ModeSwitcher mode={mode} onModeSwitch={handleModeSwitch} />
        </div>
      )}
    </div>
  )
}

export default App
