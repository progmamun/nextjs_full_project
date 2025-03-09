import type { Metadata } from "next";
import '@/styles/globals.css';
import BackToTop from "@/components/common/BackToTop";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from 'react-hot-toast';
import defaultMetadata from './metadata';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { inter, notoSansBengali } from '@/lib/fonts';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="bn" 
      suppressHydrationWarning 
      className={`${inter.variable} ${notoSansBengali.variable} dark`}
    >
      <head>
        <link rel="canonical" href="https://rubshibir.vercel.app" />
        <link rel="alternate" href="https://rubshibir.vercel.app" hrefLang="x-default" />
        <link rel="alternate" href="https://rubshibir.vercel.app" hrefLang="en" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msvalidate.01" content="900DDDABF9C5BB497C4822D010791EEA" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/icons/apple-touch-icon.png"
          as="image"
          type="image/png"
        />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body className={`min-h-screen bg-background text-foreground font-bengali`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="bottom-right"
            reverseOrder={false} 
          />
          <BackToTop />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
