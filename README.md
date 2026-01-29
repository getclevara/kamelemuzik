# Kamele Muzik & Halana - Live Music Website

A premium, experiential website for Big Island Hawaii musician Jeremiah (Kamele Muzik / Halana).

## Features

- **Immersive Portal Entry** - Visitors choose between Solo (Kamele Muzik) or Full Band (Halana) experience
- **Dynamic Theme Switching** - Entire site transforms based on selected mode
- **Lead Generation Focused** - Professional booking form designed for corporate clients
- **Animated Sound Visualizer** - CSS-only audio wave animations
- **Ambient Background Effects** - Floating orbs and subtle grain texture
- **Mobile Responsive** - Works beautifully on all devices
- **SEO Optimized** - Meta tags for local Hawaii music searches

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deploy to Vercel

### Option 1: GitHub + Vercel (Recommended)

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" → Import your repository
4. Vercel auto-detects Next.js - just click Deploy
5. Your site is live!

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Customization

### Adding Real Images

Replace the placeholder photos by adding images to `/public/images/`:
- `solo-hero.jpg` - Main solo artist photo
- `band-hero.jpg` - Full band photo
- `gallery-1.jpg`, `gallery-2.jpg`, etc.

Then update the image paths in `app/page.js`.

### Form Integration

The booking form currently logs to console. To capture real leads, integrate with:

**Option A: Netlify Forms**
```html
<form name="booking" method="POST" data-netlify="true">
```

**Option B: Formspree**
```jsx
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

**Option C: Custom API Route**
Create `/app/api/booking/route.js` to handle submissions and send to your email.

### Social Links

Update the footer links in `app/page.js`:
- Instagram URL
- Facebook URL
- Email address
- Phone number

### Colors

Edit CSS variables in `app/globals.css`:
- `--solo-primary`, `--solo-secondary`, `--solo-accent` for Solo mode
- `--band-primary`, `--band-secondary`, `--band-accent` for Band mode

## Tech Stack

- **Next.js 14** - React framework
- **Tailwind CSS** - Utility classes (minimal use, mostly custom CSS)
- **Google Fonts** - Cormorant Garamond + Outfit
- **Pure CSS Animations** - No heavy animation libraries

## File Structure

```
kamele-muzik-site/
├── app/
│   ├── globals.css      # All styles
│   ├── layout.js        # Root layout + meta
│   └── page.js          # Main page component
├── public/
│   └── images/          # Add your images here
├── package.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Performance

- No heavy dependencies
- CSS-only animations
- Optimized for Core Web Vitals
- Images can use Next.js Image component for automatic optimization

---

Built with aloha for Kamele Muzik 🌺
