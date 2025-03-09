import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Begin From Within - Beryl Thompson',
  description: 'Begin From Within is a personal system of self-management that allows anyone who is intentional to shift the energy of their experiences from discord to harmony.',
  keywords: ['spiritual growth', 'self-discovery', 'journey to the self', 'Begin From Within', 'Beryl Thompson'],
  authors: [{ name: 'Beryl Thompson' }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
}; 