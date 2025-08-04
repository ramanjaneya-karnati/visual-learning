import fs from 'fs';
import path from 'path';

console.log('🚀 MongoDB Atlas Setup Helper');
console.log('==============================\n');

console.log('📋 Follow these steps to set up MongoDB Atlas:');
console.log('1. Go to https://www.mongodb.com/atlas');
console.log('2. Create a free account and new project');
console.log('3. Create a FREE cluster (M0 tier)');
console.log('4. Set up database user with read/write permissions');
console.log('5. Add your IP to Network Access (or allow from anywhere)');
console.log('6. Get your connection string from the "Connect" button\n');

console.log('🔧 Once you have your connection string:');
console.log('1. Open server/.env file');
console.log('2. Replace the MONGODB_URI with your actual connection string');
console.log('3. Run: npm run test:db (to test connection)');
console.log('4. Run: npm run seed (to populate database)');
console.log('5. Run: npm run dev (to start the server)\n');

// Check if .env exists and show current setup
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const mongoUri = envContent.match(/MONGODB_URI=(.+)/)?.[1];
  
  if (mongoUri && !mongoUri.includes('your-username')) {
    console.log('✅ MONGODB_URI is configured in .env file');
    console.log('🔗 Connection string format looks correct');
  } else {
    console.log('⚠️  MONGODB_URI needs to be updated in .env file');
    console.log('📝 Please replace the placeholder with your actual connection string');
  }
} else {
  console.log('❌ .env file not found');
  console.log('📝 Please create server/.env file with your MongoDB Atlas connection string');
}

console.log('\n📚 For detailed instructions, see: MONGODB_ATLAS_SETUP.md'); 