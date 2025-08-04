import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import conceptsRoute from './routes/concepts';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use('/api', conceptsRoute);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📊 Connected to MongoDB database`);
});