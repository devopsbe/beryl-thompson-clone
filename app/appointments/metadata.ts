import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Appointments - Begin From Within',
  description: 'Book a free introduction call with Beryl Thompson and start your personalized journey to the self.',
  keywords: ['appointments', 'scheduling', 'spiritual guidance', 'personal growth', 'Begin From Within'],
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
}; 