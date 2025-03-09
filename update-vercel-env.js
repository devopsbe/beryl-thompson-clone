// Instructions for updating Vercel environment variables
console.log(`
=== VERCEL ENVIRONMENT VARIABLES SETUP ===

Run the following commands to set up your environment variables in Vercel:

1. MongoDB URI:
   npx vercel env add MONGODB_URI
   Value: your_mongodb_connection_string

2. NextAuth Secret:
   npx vercel env add NEXTAUTH_SECRET
   Value: your_nextauth_secret

3. NextAuth URL:
   npx vercel env add NEXTAUTH_URL
   Value: https://beryl-thompson.vercel.app

4. Google Client ID:
   npx vercel env add GOOGLE_CLIENT_ID
   Value: your_google_client_id

5. Google Client Secret:
   npx vercel env add GOOGLE_CLIENT_SECRET
   Value: your_google_client_secret

After setting these variables, redeploy your application:
   npx vercel --prod

Remember to update your Google OAuth settings to include:
https://beryl-thompson.vercel.app/api/auth/callback/google
`); 