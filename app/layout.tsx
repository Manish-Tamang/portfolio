import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Container from '@/components/Container';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={`${inter.className} bg-white text-black dark:bg-gray-950 dark:text-white antialiased`}> {/* Added font-geist class here */}
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