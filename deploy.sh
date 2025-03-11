#!/bin/bash

# Deployment script for Beryl Thompson website

echo "Starting deployment process..."

# 1. Run tests if they exist
if [ -f "package.json" ] && grep -q "\"test\":" "package.json"; then
  echo "Running tests..."
  npm test
fi

# 2. Build the application
echo "Building the application..."
npm run build

# 3. Check for build errors
if [ $? -ne 0 ]; then
  echo "Build failed. Please fix the errors and try again."
  exit 1
fi

# 4. Verify environment variables
echo "Checking environment variables..."
if [ ! -f ".env.local" ]; then
  echo "Warning: .env.local file not found. Make sure to set up environment variables in Vercel."
fi

# 5. Deploy to Vercel
echo "Deploying to Vercel..."
echo "To deploy to Vercel, run one of the following commands:"
echo "  - For production: vercel --prod"
echo "  - For preview: vercel"
echo ""
echo "Make sure you have the Vercel CLI installed (npm i -g vercel) and are logged in (vercel login)."

echo "Deployment preparation complete!" 