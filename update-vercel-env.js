// Script to update environment variables in Vercel
// Usage: node update-vercel-env.js

require('dotenv').config({ path: '.env.local' });
const { execSync } = require('child_process');

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'ignore' });
} catch (error) {
  console.error('Vercel CLI is not installed. Please install it with: npm i -g vercel');
  process.exit(1);
}

// Environment variables to update
const envVars = [
  'MONGODB_URI',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'EMAIL_SERVER_HOST',
  'EMAIL_SERVER_PORT',
  'EMAIL_SERVER_USER',
  'EMAIL_SERVER_PASSWORD',
  'EMAIL_FROM'
];

console.log('Updating Vercel environment variables...');

// Update each environment variable
envVars.forEach(varName => {
  const value = process.env[varName];
  
  if (!value) {
    console.warn(`Warning: ${varName} is not defined in .env.local`);
    return;
  }
  
  try {
    // Add the environment variable to Vercel
    execSync(`vercel env add ${varName}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error updating ${varName}: ${error.message}`);
  }
});

console.log('Environment variables update complete!');
console.log('Note: You may need to redeploy your application for changes to take effect.');
console.log('Run: vercel --prod'); 