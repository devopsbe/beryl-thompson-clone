import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Classes - Begin From Within',
  description: 'Explore our pre-recorded class subscriptions and deepen your journey to the self with our extensive library of content.',
  keywords: ['classes', 'online learning', 'spiritual growth', 'self-discovery', 'Begin From Within'],
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
}; 