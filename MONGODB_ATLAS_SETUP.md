# MongoDB Atlas Setup Guide

## 🚀 Setting up MongoDB Atlas for Visual Learning App

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project called "Visual Learning"

### Step 2: Create a Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region close to you
5. Click "Create"

### Step 3: Set Up Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password (save these!)
4. Select "Read and write to any database"
5. Click "Add User"

### Step 4: Set Up Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string

### Step 6: Update Environment Variables
Replace the placeholder in `server/.env` with your actual connection string:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/visual-learning?retryWrites=true&w=majority
PORT=4000
NODE_ENV=development
```

### Step 7: Test Connection
Run the seeding script to populate your database:

```bash
cd server
npm run seed
```

### Step 8: Verify Data
Check your MongoDB Atlas dashboard to see the populated collections:
- `frameworks` - Contains React, Angular, and Advanced Patterns
- `concepts` - Contains all the learning concepts with stories

## 🔧 Troubleshooting

### Connection Issues
- Make sure your IP is whitelisted in Network Access
- Verify username/password in connection string
- Check that the cluster is running

### Database Structure
The app creates two collections:
- **frameworks**: Contains framework metadata and references to concepts
- **concepts**: Contains all concept data including stories and metadata

## 📊 Data Migration
The seeding script will automatically:
1. Clear existing data (if any)
2. Import all concepts from `server/data/concepts.json`
3. Create proper relationships between frameworks and concepts
4. Preserve all story data and metadata

## 🎯 Next Steps
After setup:
1. Run `npm run dev` to start the server
2. The API will now fetch from MongoDB Atlas instead of JSON files
3. All data will be persistent and accessible from anywhere 