#!/bin/bash

echo "🚀 Starting Visual Learning deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

# Build the application
echo "📦 Building application..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment completed!"
echo "📋 Next steps:"
echo "1. Configure environment variables in Vercel dashboard"
echo "2. Update CORS origins with your actual domain"
echo "3. Test all features"
echo "4. Create admin user if needed" 