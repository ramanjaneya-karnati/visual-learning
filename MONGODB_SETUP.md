# MongoDB Atlas Setup for Vercel Deployment

## 🔧 **MongoDB Atlas Configuration**

### **Step 1: Network Access**
1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com)
2. Select your cluster
3. Click **"Network Access"** in the left sidebar
4. Click **"Add IP Address"**
5. Click **"Allow Access from Anywhere"** (for testing) or add Vercel's IP ranges
6. Click **"Confirm"**

### **Step 2: Database User**
1. Go to **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set a strong password
5. Select **"Built-in Role"** → **"Read and write to any database"**
6. Click **"Add User"**

### **Step 3: Get Connection String**
1. Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `visual-learning`

### **Step 4: Update Vercel Environment**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **"Settings"** → **"Environment Variables"**
4. Update `MONGODB_URI` with your connection string

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **"MongoServerSelectionError"**
   - Check Network Access settings
   - Ensure IP is whitelisted

2. **"Authentication failed"**
   - Verify database username and password
   - Check if user has correct permissions

3. **"Connection timeout"**
   - Check if connection string is correct
   - Verify cluster is running

### **Alternative: Use MongoDB Atlas Data API**

If direct connection fails, you can use MongoDB Atlas Data API:

1. Enable Data API in your cluster
2. Get API key from Database Access
3. Use Data API endpoints instead of direct connection

## 🚀 **Test Connection**

After setup, test your connection:

```bash
curl https://your-vercel-domain.vercel.app/api/db-test
```

You should see:
```json
{
  "status": "Database Test",
  "connectionState": "connected",
  "readyState": 1,
  "hasMongoUri": true,
  "environment": "production"
}
```

## 📝 **Connection String Format**

Your connection string should look like:
```
mongodb+srv://username:password@cluster.mongodb.net/visual-learning?retryWrites=true&w=majority
```

## 🔒 **Security Note**

For production, consider:
- Using specific IP ranges instead of "Allow Access from Anywhere"
- Creating a dedicated database user with minimal permissions
- Using environment variables for sensitive data 