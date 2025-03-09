import { Inter, Tiro_Bangla } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--font-inter',
})

export const tiroBangla = Tiro_Bangla({
  weight: '400',
  subsets: ['bengali'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--font-tiro-bangla',
}) 