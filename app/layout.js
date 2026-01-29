import './globals.css'

export const metadata = {
  title: 'Kamele Muzik & Halana | Live Music for Every Occasion | Big Island, Hawaii',
  description: 'Premium live music experiences for corporate events, weddings, and private parties. Solo acoustic vibes or full band energy. Book Jeremiah, Big Island\'s most versatile musician.',
  keywords: 'Hawaii musician, Kona wedding music, corporate event entertainment, Big Island live music, acoustic solo, reggae band Hawaii',
  openGraph: {
    title: 'Kamele Muzik & Halana',
    description: 'Live music that transforms your event. Big Island, Hawaii.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
