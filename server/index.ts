import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { loginLimiter, generalLimiter, securityHeaders, csrfProtection, sanitizeInput } from './middleware/security';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Security middleware
app.use(helmet());
app.use(securityHeaders);
app.use(generalLimiter);

// CORS configuration - allow all origins for now
const corsOptions = {
  origin: '*', // Allow all origins
  credentials: false, // Disable credentials since we're allowing all origins
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Input sanitization
app.use(sanitizeInput);

// Database connection check middleware
app.use('/api/concepts', async (req, res, next) => {
  // Check if database is connected
  const isConnected = mongoose.connection.readyState === 1;
  
  if (!isConnected) {
    console.log('⚠️  Database not ready, state:', mongoose.connection.readyState);
    
    // Try to reconnect if disconnected
    if (mongoose.connection.readyState === 0) {
      try {
        console.log('🔄 Attempting to reconnect to database...');
        await connectWithRetry();
      } catch (error) {
        console.error('❌ Reconnection failed:', (error as Error).message);
      }
    }
    
    // If still not connected after retry, return error
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        error: 'Database connection not ready',
        message: 'Please try again in a few seconds',
        readyState: mongoose.connection.readyState
      });
    }
  }
  return next();
});

// Connect to MongoDB with debugging and graceful error handling
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/visual-learning';
console.log('🔍 MongoDB URI check:', {
  hasUri: !!process.env.MONGODB_URI,
  uriLength: process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0,
  environment: process.env.NODE_ENV || 'development'
});

// MongoDB connection options
const options: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Initialize MongoDB connection with retry logic
const connectWithRetry = async () => {
  const maxRetries = 5;
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      console.log(`🔍 Attempting MongoDB connection (attempt ${retries + 1}/${maxRetries})...`);
      
      await mongoose.connect(mongoUri, options);
      
      console.log('✅ Connected to MongoDB');
      console.log('📊 Database name:', mongoose.connection.name);
      console.log('🔗 Connection state:', mongoose.connection.readyState);
      
      return true;
    } catch (error) {
      retries++;
      console.error(`❌ MongoDB connection attempt ${retries} failed:`, (error as Error).message);
      
      if (retries < maxRetries) {
        console.log(`⏳ Retrying in ${retries * 1000}ms...`);
        await new Promise(resolve => setTimeout(resolve, retries * 1000));
      } else {
        console.error('❌ Max retries reached, MongoDB connection failed');
        return false;
      }
    }
  }
  return false; // Fallback return
};

// Initialize connection
try {
  console.log('🔍 Initialize mongodb connection....');
  mongoose.set('strictQuery', false);
  
  // Start connection process
  connectWithRetry();

  const db = mongoose.connection;
  db.once('open', () => {
    console.log('✅ Connection has been established successfully.');
  });

  db.on('error', (error) => {
    console.error('❌ MongoDB connection error:', error);
    console.error('🔍 Error details:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
  });

  db.on('disconnected', () => {
    console.log('⚠️  MongoDB disconnected');
  });

  db.on('reconnected', () => {
    console.log('🔄 MongoDB reconnected');
  });

} catch (error) {
  console.error('❌ Unable to connect to the database:', error);
  console.log('⚠️  Server will continue without database connection');
}

// Import routes
import conceptsRoutes from './routes/concepts';
import adminRoutes from './routes/admin';

// Apply CSRF protection to admin routes
app.use('/api/admin/login', loginLimiter, csrfProtection);
app.use('/api/admin', csrfProtection);

// Routes
app.use('/api/concepts', conceptsRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Keep-alive endpoint to prevent cold starts
app.get('/api/keep-alive', (req, res) => {
  res.json({ 
    status: 'alive',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Database connection test endpoint
app.get('/api/db-test', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const dbStatus = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    res.json({
      status: 'Database Test',
      connectionState: dbStatus[dbState as keyof typeof dbStatus],
      readyState: dbState,
      hasMongoUri: !!process.env.MONGODB_URI,
      mongoUriLength: process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0,
      mongoUriPrefix: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) + '...' : 'none',
      environment: process.env.NODE_ENV || 'development',
      databaseName: mongoose.connection.name || 'unknown'
    });
  } catch (error) {
    res.status(500).json({ error: 'Database test failed', details: error });
  }
});

// Root endpoint
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Learnify API',
    version: '1.0.0',
    status: 'running'
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  });
}

// Export for Vercel
export default app;