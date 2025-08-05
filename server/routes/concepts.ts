import express from 'express';
import Framework from '../models/Framework';
import Concept from '../models/Concept';

const router = express.Router();

// Get all frameworks with their concepts
router.get('/concepts', async (req, res) => {
  try {
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
router.get('/concepts/:frameworkId', async (req, res) => {
  try {
    const { frameworkId } = req.params;
    const framework = await Framework.findOne({ id: frameworkId }).populate('concepts');
    
    if (!framework) {
      return res.status(404).json({ error: 'Not found' });
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
router.get('/concepts/:frameworkId/:conceptId', async (req, res) => {
  try {
    const { conceptId } = req.params;
    const concept = await Concept.findOne({ id: conceptId });
    
    if (!concept) {
      return res.status(404).json({ error: 'Not found' });
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