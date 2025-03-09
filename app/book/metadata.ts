import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Book - Begin From Within',
  description: 'Explore Beryl Thompson\'s writing on the journey to the self and personal transformation.',
  keywords: ['book', 'spiritual literature', 'self-help', 'personal growth', 'Begin From Within'],
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
}; 