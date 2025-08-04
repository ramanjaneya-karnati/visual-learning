import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/database';
import conceptsRoute from './routes/concepts';
import adminRoute from './routes/admin';
import { 
  loginLimiter, 
  generalLimiter, 
  securityHeaders, 
  csrfProtection, 
  sanitizeInput 
} from './middleware/security';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(securityHeaders);
app.use(generalLimiter);

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Input sanitization
app.use(sanitizeInput);

// Routes
app.use('/api', conceptsRoute);
app.use('/api/admin/login', loginLimiter, csrfProtection, adminRoute);
app.use('/api/admin', csrfProtection, adminRoute);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📊 Connected to MongoDB database`);
});