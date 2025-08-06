import express from 'express';
import mongoose from 'mongoose';
import Framework from '../models/Framework';
import Concept from '../models/Concept';

const router = express.Router();

// Get all frameworks with their concepts
router.get('/', async (req, res) => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('⚠️  Database not connected');
      return res.status(503).json({ 
        error: 'Database connection failed',
        message: 'Please check MongoDB Atlas configuration. See MONGODB_SETUP.md for instructions.'
      });
    }

    const frameworks = await Framework.find().populate('concepts');
    
    // Transform the data to match the expected format
    const transformedData = {
      frameworks: frameworks.map(framework => ({
        id: framework.id,
        name: framework.name,
        concepts: framework.concepts.map((concept: any) => ({
          id: concept.id,
          title: concept.title,
          description: concept.description,
          metaphor: concept.metaphor,
          difficulty: concept.difficulty,
          estimatedTime: concept.estimatedTime,
          story: concept.story || null
        }))
      }))
    };

    return res.json(transformedData);
  } catch (error) {
    console.error('Error fetching concepts:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Get concepts by framework ID
router.get('/:frameworkId', async (req, res) => {
  try {
    const { frameworkId } = req.params;
    
    // Try to find by the custom 'id' field first, then by _id
    let framework = await Framework.findOne({ id: frameworkId }).populate('concepts');
    
    if (!framework) {
      // If not found by custom id, try by _id
      framework = await Framework.findById(frameworkId).populate('concepts');
    }
    
    if (!framework) {
      return res.status(404).json({ error: 'Framework not found' });
    }

    const concepts = framework.concepts.map((concept: any) => ({
      id: concept.id,
      title: concept.title,
      description: concept.description,
      metaphor: concept.metaphor,
      difficulty: concept.difficulty,
      estimatedTime: concept.estimatedTime,
      story: concept.story || null
    }));

    return res.json({ concepts });
  } catch (error) {
    console.error('Error fetching concepts by framework:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific concept by ID
router.get('/:frameworkId/:conceptId', async (req, res) => {
  try {
    const { conceptId } = req.params;
    
    // Try to find by the custom 'id' field first, then by _id
    let concept = await Concept.findOne({ id: conceptId });
    
    if (!concept) {
      // If not found by custom id, try by _id
      concept = await Concept.findById(conceptId);
    }
    
    if (!concept) {
      return res.status(404).json({ error: 'Concept not found' });
    }

    return res.json({
      id: concept.id,
      title: concept.title,
      description: concept.description,
      metaphor: concept.metaphor,
      difficulty: concept.difficulty,
      estimatedTime: concept.estimatedTime,
      story: concept.story || null
    });
  } catch (error) {
    console.error('Error fetching concept:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;