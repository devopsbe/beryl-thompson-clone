import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Begin From Within',
  description: 'Get in touch with Beryl Thompson to start your journey to the self or ask any questions you may have about Begin From Within.',
  keywords: ['contact', 'spiritual guidance', 'journey to the self', 'Begin From Within'],
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
}; 