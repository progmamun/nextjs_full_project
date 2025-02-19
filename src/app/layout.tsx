import type { Metadata } from "next";
import { Tiro_Bangla } from 'next/font/google';
import '@/styles/globals.css';
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/common/BackToTop";
import Navigation from "@/components/layout/Navigation";
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Toaster } from "@/components/ui/toaster";

const tiroBangla = Tiro_Bangla({ subsets: ['bengali'], weight: '400' });

export const metadata: Metadata = {
  title: "রবিবা, শিবির",
  description: "বাংলাদেশ ইসলামী ছাত্র শিবির, রবিবা শাখা",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className={tiroBangla.className + "min-h-screen bg-background text-foreground"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          {children}
          <Toaster />
          <BackToTop />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
