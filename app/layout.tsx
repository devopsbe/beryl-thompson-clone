import { Inter } from 'next/font/google';
import './globals.css';

// Import layout components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import dynamic from 'next/dynamic';
import { SessionProvider } from '@/components/auth/SessionProvider';

// Dynamically import InfoBox with no SSR
const InfoBox = dynamic(() => import('@/components/InfoBox'), { ssr: false });

// Import metadata
import { metadata, viewport } from './metadata';

// Load fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Custom font declarations since Georgia isn't available in next/font/google
const georgia = {
  variable: '--font-georgia',
};

// Script to avoid theme flicker on page load
const themeScript = `
  (function() {
    try {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        document.documentElement.classList.add(storedTheme);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.add('light');
      }
    } catch (e) {}
  })();
`;

// Re-export metadata and viewport
export { metadata, viewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${georgia.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="flex flex-col min-h-screen bg-background dark:bg-background-dark text-secondary dark:text-white transition-colors duration-300" suppressHydrationWarning>
        <SessionProvider>
          <ThemeProvider>
            {/* Skip to content link for accessibility */}
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-primary focus:text-white focus:z-50">
              Skip to content
            </a>
            <Header />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
            {/* Floating Info Box */}
            <InfoBox />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
} 