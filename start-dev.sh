#!/bin/bash

# Make script executable with: chmod +x start-dev.sh

# Navigate to project directory
cd "$(dirname "$0")"

# Display project status
echo "Starting Beryl Thompson Website Development Server"
echo "------------------------------------------------"
echo "Project path: $(pwd)"
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "------------------------------------------------"

# Start the Next.js development server
npm run dev 