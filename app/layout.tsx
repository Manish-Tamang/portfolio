import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Container from '@/components/Container';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import localFont from 'next/font/local'

const inter = Inter({ subsets: ['latin'] });
const geist = localFont({
  src: [
    {
      path: '../public/fonts/Geist-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/Geist-ExtraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/Geist-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Geist-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Geist-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Geist-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Geist-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Geist-ExtraBold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/Geist-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: 'Manish Tamang - A young developer',
  description: 'Hi, I\'m Manish Gole Tamang, a 16-year-old from Itahari, Nepal, with a fervent passion for web development.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="description" content={metadata.description ?? ''} />
      </head>
      <body className={`${geist.variable} font-geist bg-white text-black dark:bg-gray-950 dark:text-white antialiased`}> {/* Added font-geist class here */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Container>
            <Navbar />
            {children}
            <Footer />
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}