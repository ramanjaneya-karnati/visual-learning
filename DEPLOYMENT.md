# 🚀 Vercel Deployment Guide for Visual Learning

## 📋 Prerequisites

### 1. **Vercel Account**
- Sign up at [vercel.com](https://vercel.com)
- Install Vercel CLI: `npm i -g vercel`

### 2. **MongoDB Atlas Setup**
- Ensure your MongoDB Atlas cluster is running
- Get your connection string ready
- Whitelist Vercel's IP addresses in MongoDB Atlas

### 3. **Environment Variables**
You'll need to set these in Vercel dashboard:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/visual-learning?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# AI API Keys (Optional)
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key

# Environment
NODE_ENV=production
```

## 🔧 Deployment Steps

### Step 1: Prepare Your Repository
```bash
# Ensure all changes are committed
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 3: Deploy to Vercel
```bash
# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: visual-learning
# - Directory: ./
# - Override settings? No
```

### Step 4: Configure Environment Variables
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add all the environment variables listed above

### Step 5: Update CORS Settings
After deployment, update the CORS origins in `server/index.ts`:
```typescript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-actual-domain.vercel.app'] // Replace with your actual domain
    : ['http://localhost:3001', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
```

## 📁 Project Structure for Deployment

```
visual-learning/
├── client/                 # React frontend
│   ├── dist/              # Build output
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Express backend
│   ├── dist/              # Build output
│   ├── package.json
│   └── index.ts
├── vercel.json            # Vercel configuration
└── package.json           # Root package.json
```

## 🔧 Configuration Files

### `vercel.json`
- Configures builds for both client and server
- Sets up routing for API and static files
- Handles environment variables

### `client/vite.config.ts`
- Optimizes build for production
- Configures proxy for development
- Sets up code splitting

### `server/index.ts`
- Exports app for Vercel serverless functions
- Configures CORS for production
- Adds health check endpoints

## 🚀 Post-Deployment Steps

### 1. **Database Setup**
```bash
# Run database seeding (if needed)
vercel env pull .env.local
npm run server:seed
```

### 2. **Create Admin User**
```bash
# Create initial admin user
npm run server:create:secure-admin
```

### 3. **Test the Application**
- Visit your deployed URL
- Test all features:
  - Landing page
  - Concept browsing
  - Admin login
  - Visual metaphors
  - AI features

## 🔍 Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check TypeScript errors
   - Ensure all dependencies are installed
   - Verify environment variables

2. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure network access is enabled

3. **CORS Errors**
   - Update CORS origins in server/index.ts
   - Redeploy after changes

4. **API Routes Not Working**
   - Check vercel.json routing configuration
   - Verify server/index.ts exports

### Debug Commands:
```bash
# Check build logs
vercel logs

# Redeploy
vercel --prod

# Check environment variables
vercel env ls
```

## 📊 Monitoring

### Vercel Analytics
- Enable analytics in Vercel dashboard
- Monitor performance and errors
- Track user engagement

### Health Checks
- `/api/health` - Server status
- `/api` - API information

## 🔐 Security Considerations

1. **Environment Variables**
   - Never commit secrets to git
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **CORS Configuration**
   - Only allow necessary origins
   - Use HTTPS in production

3. **Rate Limiting**
   - Already configured in server
   - Monitor for abuse

## 🎯 Performance Optimization

1. **Client Build**
   - Code splitting configured
   - Vendor chunks separated
   - Source maps disabled for production

2. **Server Build**
   - TypeScript compilation optimized
   - Unused code elimination
   - Error handling configured

## 📝 Deployment Checklist

- [ ] All code committed and pushed
- [ ] Environment variables configured in Vercel
- [ ] MongoDB Atlas connection tested
- [ ] CORS origins updated for production
- [ ] Admin user created
- [ ] All features tested
- [ ] Performance monitoring enabled
- [ ] Error tracking configured

## 🆘 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test database connectivity
4. Review CORS configuration
5. Check build output for errors

Your Visual Learning app should now be successfully deployed on Vercel! 🚀 