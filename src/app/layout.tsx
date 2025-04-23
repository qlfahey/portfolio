import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientThemeProvider from '@/components/ClientThemeProvider';
import EasterEggs from '@/components/EasterEggs';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Quinn Fahey | Software Engineer',
  description: 'Full-stack engineer specializing in commerce, AI, and developer tools.',
};

// Ensure page starts at the top and clear any hash
const scrollToTop = `
  if (typeof window !== 'undefined') {
    // Clear any existing hash
    if (window.location.hash) {
      window.history.replaceState('', document.title, window.location.pathname + window.location.search);
    }
    // Scroll to top
    window.scrollTo(0, 0);
    // Disable scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scrollToTop }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ClientThemeProvider>
          {children}
          <EasterEggs />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
