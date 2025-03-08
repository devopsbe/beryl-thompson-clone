import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Services - Begin From Within',
  description: 'Discover the transformative services offered by Beryl Thompson to guide you on your journey to the self.',
  keywords: ['services', 'spiritual guidance', 'personal growth', 'self-discovery', 'Begin From Within'],
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
}; 