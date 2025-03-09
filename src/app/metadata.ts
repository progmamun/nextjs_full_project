import { Metadata } from 'next'

const defaultMetadata: Metadata = {
  title: {
    default: 'রবিবা, ছাত্রশিবির | Islamic Educational Platform',
    template: '%s | RubShibir'
  },
  description: 'RubShibir is an Islamic educational platform providing authentic Islamic knowledge and resources.',
  keywords: ['Islamic education', 'Islamic courses', 'Islamic studies', 'RubShibir', 'Online Islamic learning'],
  authors: [{ name: 'RubShibir Team' }],
  creator: 'RubShibir',
  publisher: 'RubShibir',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rubshibir.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rubshibir.vercel.app',
    siteName: 'RubShibir',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RubShibir - Islamic Educational Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'রবিবা, ছাত্রশিবির | Islamic Educational Platform',
    description: 'RubShibir is an Islamic educational platform providing authentic Islamic knowledge and resources.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'pflre2CMPzxZz4pjw9vKCEgKyzky2Mpt7yTSz-lFUkg',
    other: {
      'msvalidate.01': '900DDDABF9C5BB497C4822D010791EEA'
    }
  },
}

export default defaultMetadata 