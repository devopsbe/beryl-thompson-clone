# Beryl Thompson Website

This repository contains the Beryl Thompson "Begin From Within" website.

## Features Implemented

- Responsive design that works on mobile and desktop
- Dark/light mode toggle with system preference detection
- Navigation menu with mobile toggle
- "A Journey to the Self" hero section
- About, Process, and Contact sections
- User Authentication with NextAuth.js (Email/Password and Google OAuth)
- User Profile management with image upload
- MongoDB integration for user data storage
- Deployment to Vercel

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- MongoDB & Mongoose
- NextAuth.js for authentication
- Vercel for deployment

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Vercel Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Set environment variables in the Vercel dashboard
4. Update Google OAuth settings to include your production callback URL

For detailed deployment instructions, see [google-oauth-instructions.md](./google-oauth-instructions.md).

## Authentication

The site supports two authentication methods:
- Email/Password
- Google OAuth

Users can sign up, sign in, and manage their profiles with uploaded profile pictures.

## License

This project is for non-commercial use only. Please respect the original content ownership.