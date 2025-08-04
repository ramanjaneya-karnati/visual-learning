import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/visual-learning';

const createSecureAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      console.log(`Username: ${existingAdmin.username}`);
      console.log(`Email: ${existingAdmin.email}`);
      console.log('🔄 Deleting existing admin and creating new secure admin...');
      
      // Delete existing admin
      await Admin.deleteOne({ _id: existingAdmin._id });
      console.log('✅ Existing admin deleted');
    }

    // Create new secure admin
    const admin = new Admin({
      username: 'admin',
      email: 'admin@visual-learning.com',
      password: 'admin123', // This will be hashed by the pre-save hook
      role: 'super-admin',
      isActive: true
    });

    await admin.save();
    console.log('✅ Secure admin user created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Email: admin@visual-learning.com');
    console.log('\n🔒 Password is now securely hashed with salt');

  } catch (error) {
    console.error('❌ Error creating secure admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
};

createSecureAdmin(); 