# Google OAuth Configuration for Production

Follow these steps to update your Google OAuth settings for the production environment:

## 1. Access Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to "APIs & Services" > "Credentials"

## 2. Edit OAuth 2.0 Client

1. Find and click on your OAuth 2.0 Client ID
2. Under "Authorized redirect URIs", add:
   ```
   https://beryl-thompson.vercel.app/api/auth/callback/google
   ```
3. Save your changes

## 3. Update the Production Environment Variables

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to the "Environment Variables" tab
3. Add or update these variables:
   - `NEXTAUTH_URL`: `https://beryl-thompson.vercel.app`
   - `GOOGLE_CLIENT_ID`: Your Google Client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google Client Secret
   - `MONGODB_URI`: Your MongoDB connection string
   - `NEXTAUTH_SECRET`: A secure random string for session encryption

## 4. Update Project Name (Optional)

To change your project name in Vercel:

1. Go to your project in the Vercel dashboard
2. Click on the "Settings" tab
3. In the "Project Name" section, click "Edit"
4. Change the name to "beryl-thompson"
5. If you want to update the domain, go to "Domains" and add a new domain or edit the existing one

## 5. Redeploy Your Application

After making these changes, redeploy your application by running:

```bash
npx vercel --prod
```

This will ensure all your changes take effect in the production environment. 