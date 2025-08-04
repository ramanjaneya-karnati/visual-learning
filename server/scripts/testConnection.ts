import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const testConnection = async () => {
  try {
    console.log('🔗 Testing MongoDB Atlas connection...');
    console.log('📡 Connection string:', MONGODB_URI?.replace(/\/\/.*@/, '//***:***@'));
    
    await mongoose.connect(MONGODB_URI || '');
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Test database operations
    const db = mongoose.connection.db;
    if (db) {
      const collections = await db.listCollections().toArray();
      console.log('📊 Available collections:', collections.map(c => c.name));
    } else {
      console.log('⚠️  Database not accessible');
    }
    
    await mongoose.disconnect();
    console.log('✅ Connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your MONGODB_URI in .env file');
    console.log('2. Verify username and password');
    console.log('3. Make sure your IP is whitelisted in Atlas');
    console.log('4. Check if your cluster is running');
  }
};

testConnection(); 