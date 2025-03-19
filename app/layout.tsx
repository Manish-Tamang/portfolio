import './globals.css';
import type { Metadata } from 'next';
import { Karla } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Container from '@/components/Container';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import localFont from 'next/font/local';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';
import CarbonAds from '@/components/carbonAds';

const karla = Karla({ subsets: ['latin'] });

const geist = localFont({
  src: [
    { path: '../public/fonts/Geist-Thin.otf', weight: '100', style: 'normal' },
    { path: '../public/fonts/Geist-ExtraLight.otf', weight: '200', style: 'normal' },
    { path: '../public/fonts/Geist-Light.otf', weight: '300', style: 'normal' },
    { path: '../public/fonts/Geist-Regular.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Geist-Medium.otf', weight: '500', style: 'normal' },
    { path: '../public/fonts/Geist-SemiBold.otf', weight: '600', style: 'normal' },
    { path: '../public/fonts/Geist-Bold.otf', weight: '700', style: 'normal' },
    { path: '../public/fonts/Geist-ExtraBold.otf', weight: '800', style: 'normal' },
    { path: '../public/fonts/Geist-Black.otf', weight: '900', style: 'normal' },
  ],
  variable: '--font-geist',
});

const lifeofapple = localFont({
  src: [{ path: '../public/fonts/Life-of-Apple.ttf', weight: '400', style: 'normal' }],
  variable: '--font-lifeofapple',
});

const ridemybike = localFont({
  src: [{ path: '../public/fonts/latinotype-ridemybike-pro-bold-italic.otf', weight: '700', style: 'italic' }],
  variable: '--font-ridemybike',
});

export const metadata: Metadata = {
  title: 'Manish Tamang - A young developer',
  description: "Hi, I'm Manish Gole Tamang, a 16-year-old from Itahari, Nepal, with a fervent passion for web development.",
  openGraph: {
    title: 'Manish Tamang - A young developer',
    description: "Hi, I'm Manish Gole Tamang, a 16-year-old from Itahari, Nepal, with a fervent passion for web development.",
    images: '/IMG-20250217-WA0011.jpg',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="description" content={metadata.description ?? ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <Script
          src="https://manish-analytics.vercel.app/script.js"
          data-website-id="d5fd3d82-d867-4e3d-badb-837ad2ff7f7d"
          strategy="afterInteractive"
        />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="87f8f3a2-7fad-4aed-b92d-5beeee4c4491"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${karla.className} ${geist.variable} ${lifeofapple.variable} ${ridemybike.variable} bg-white text-black dark:bg-[#09090B] dark:text-white antialiased`}
      >
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Container>
              <Toaster position="top-center" reverseOrder={false} />
              <Navbar />
              <CarbonAds className="fixed bottom-4 left-20 w-1/4 hidden md:block" />
              {children}
              <Footer />
            </Container>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
