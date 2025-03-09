import { Inter, Tiro_Bangla, Noto_Sans_Bengali } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--font-inter',
})

export const tiroBangla = Tiro_Bangla({
  subsets: ['bengali'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-tiro-bangla',
})

export const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-bengali',
}) 