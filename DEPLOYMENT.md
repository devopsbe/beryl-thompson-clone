# Deployment Guide for Beryl Thompson Website

This document provides instructions for deploying the Beryl Thompson website to Vercel.

## Prerequisites

- A Vercel account (https://vercel.com)
- Node.js and npm installed locally
- Git repository with your code

## Environment Variables

The following environment variables need to be set up in Vercel:

- `MONGODB_URI`: Your MongoDB connection string
- `NEXTAUTH_SECRET`: A secret for NextAuth.js (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL`: The URL of your deployed application (e.g., https://your-app.vercel.app)
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
- `EMAIL_SERVER_HOST`: SMTP server host for email functionality
- `EMAIL_SERVER_PORT`: SMTP server port
- `EMAIL_SERVER_USER`: SMTP server username
- `EMAIL_SERVER_PASSWORD`: SMTP server password
- `EMAIL_FROM`: Email address to send from

## Deployment Steps

### Option 1: Deploy using Vercel CLI

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Login to Vercel:
   ```
   vercel login
   ```

3. Run the deployment script:
   ```
   ./deploy.sh
   ```

4. Deploy to Vercel:
   ```
   vercel --prod
   ```

### Option 2: Deploy using Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).

2. Log in to your Vercel account.

3. Click "New Project" and import your repository.

4. Configure the project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. Add the environment variables listed above.

6. Click "Deploy".

## Post-Deployment

After deployment, you need to:

1. Update Google OAuth settings to include your production callback URL:
   - Go to the Google Cloud Console
   - Navigate to your project
   - Go to "Credentials" > "OAuth 2.0 Client IDs"
   - Add `https://your-app.vercel.app/api/auth/callback/google` to the authorized redirect URIs

2. Test the deployed application:
   - Test authentication
   - Test MongoDB connection
   - Test email functionality

## Troubleshooting

If you encounter issues during deployment:

1. Check the Vercel deployment logs for errors.
2. Verify that all environment variables are correctly set.
3. Ensure your MongoDB instance is accessible from Vercel's servers.
4. Check that your Google OAuth credentials are correctly configured.

## Updating the Deployed Application

To update the deployed application:

1. Push your changes to the Git repository.
2. Vercel will automatically deploy the changes.

Alternatively, you can manually trigger a deployment using the Vercel CLI:
```
vercel --prod
``` 