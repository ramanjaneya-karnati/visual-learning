import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Concept from '../models/Concept';
import Framework from '../models/Framework';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/visual-learning';

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Concept.deleteMany({});
    await Framework.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Read the JSON file
    const filePath = path.join(__dirname, '../data/concepts.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Process each framework
    for (const frameworkData of data.frameworks) {
      console.log(`📚 Processing framework: ${frameworkData.name}`);

      // Create concepts for this framework
      const conceptIds: mongoose.Types.ObjectId[] = [];
      
      for (const conceptData of frameworkData.concepts) {
        const concept = new Concept({
          id: conceptData.id,
          title: conceptData.title,
          description: conceptData.description,
          metaphor: conceptData.metaphor,
          difficulty: conceptData.difficulty,
          estimatedTime: conceptData.estimatedTime,
          story: conceptData.story || null
        });

        const savedConcept = await concept.save();
        conceptIds.push(savedConcept._id as mongoose.Types.ObjectId);
        console.log(`  ✅ Created concept: ${conceptData.title}`);
      }

      // Create framework
      const framework = new Framework({
        id: frameworkData.id,
        name: frameworkData.name,
        concepts: conceptIds
      });

      await framework.save();
      console.log(`  ✅ Created framework: ${frameworkData.name} with ${conceptIds.length} concepts`);
    }

    console.log('🎉 Database seeding completed successfully!');
    
    // Display summary
    const conceptCount = await Concept.countDocuments();
    const frameworkCount = await Framework.countDocuments();
    console.log(`📊 Summary: ${frameworkCount} frameworks, ${conceptCount} concepts`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
};

// Run the seeding script
seedDatabase(); 