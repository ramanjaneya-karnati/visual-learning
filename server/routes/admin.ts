import express from 'express';
import mongoose from 'mongoose';
import Admin from '../models/Admin';
import Concept from '../models/Concept';
import Framework from '../models/Framework';
import { auth, generateToken } from '../middleware/auth';
import aiService from '../services/aiService';

const router = express.Router();

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username, isActive: true });
    if (!admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    const token = generateToken(admin._id as string);
    return res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Get admin profile
router.get('/profile', auth, async (req: any, res) => {
  return res.json({ admin: req.admin });
});

// Get all frameworks with concepts (for admin dashboard)
router.get('/frameworks', auth, async (req, res) => {
  try {
    const frameworks = await Framework.find().populate('concepts');
    return res.json({ frameworks });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Get single framework
router.get('/frameworks/:id', auth, async (req, res) => {
  try {
    const framework = await Framework.findOne({ id: req.params.id }).populate('concepts');
    if (!framework) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.json({ framework });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Create new framework
router.post('/frameworks', auth, async (req, res) => {
  try {
    const { id, name } = req.body;
    
    // Check if framework with same ID already exists
    const existingFramework = await Framework.findOne({ id });
    if (existingFramework) {
      return res.status(400).json({ error: 'Bad request' });
    }

    const framework = new Framework({ id, name, concepts: [] });
    await framework.save();
    return res.status(201).json({ framework });
  } catch (error) {
    console.error('Error creating framework:', error);
    return res.status(400).json({ error: 'Bad request' });
  }
});

// Update framework
router.put('/frameworks/:id', auth, async (req, res) => {
  try {
    const { name } = req.body;
    
    const framework = await Framework.findOneAndUpdate(
      { id: req.params.id },
      { name },
      { new: true, runValidators: true }
    );
    
    if (!framework) {
      return res.status(404).json({ error: 'Not found' });
    }
    
    return res.json({ framework });
  } catch (error) {
    console.error('Error updating framework:', error);
    return res.status(400).json({ error: 'Bad request' });
  }
});

// Delete framework (only if it has no concepts)
router.delete('/frameworks/:id', auth, async (req, res) => {
  try {
    const framework = await Framework.findOne({ id: req.params.id }).populate('concepts');
    
    if (!framework) {
      return res.status(404).json({ error: 'Not found' });
    }

    // Check if framework has concepts
    if (framework.concepts && framework.concepts.length > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete framework with existing concepts. Please move or delete all concepts first.' 
      });
    }

    await Framework.findByIdAndDelete(framework._id);
    return res.json({ message: 'Framework deleted successfully' });
  } catch (error) {
    console.error('Error deleting framework:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Get all concepts
router.get('/concepts', auth, async (req, res) => {
  try {
    const concepts = await Concept.find().sort({ createdAt: -1 });
    return res.json({ concepts });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Get single concept
router.get('/concepts/:id', auth, async (req, res) => {
  try {
    const concept = await Concept.findById(req.params.id);
    if (!concept) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.json({ concept });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Create new concept
router.post('/concepts', auth, async (req, res) => {
  try {
    const concept = new Concept(req.body);
    await concept.save();
    return res.status(201).json({ concept });
  } catch (error) {
    return res.status(400).json({ error: 'Bad request' });
  }
});

// Update concept
router.put('/concepts/:id', auth, async (req, res) => {
  try {
    const { framework, ...conceptData } = req.body;
    
    // Update the concept
    const concept = await Concept.findByIdAndUpdate(
      req.params.id,
      conceptData,
      { new: true, runValidators: true }
    );
    
    if (!concept) {
      return res.status(404).json({ error: 'Not found' });
    }

    // If framework is provided, update the framework relationship
    if (framework) {
      // Remove concept from all frameworks first
      await Framework.updateMany(
        { concepts: concept._id },
        { $pull: { concepts: concept._id } }
      );

      // Add concept to the specified framework
      const targetFramework = await Framework.findOne({ id: framework });
      if (targetFramework) {
        targetFramework.concepts.push(concept._id as mongoose.Types.ObjectId);
        await targetFramework.save();
      }
    }

    return res.json({ concept });
  } catch (error) {
    console.error('Error updating concept:', error);
    return res.status(400).json({ error: 'Bad request' });
  }
});

// Delete concept
router.delete('/concepts/:id', auth, async (req, res) => {
  try {
    const concept = await Concept.findByIdAndDelete(req.params.id);
    if (!concept) {
      return res.status(404).json({ error: 'Not found' });
    }
    return res.json({ message: 'Concept deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Create admin user (for initial setup)
router.post('/setup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Bad request' });
    }

    const admin = new Admin({
      username,
      email,
      password,
      role: 'super-admin'
    });

    await admin.save();
    return res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    return res.status(400).json({ error: 'Bad request' });
  }
});

        // AI-powered concept generation
        router.post('/generate-concept', auth, async (req, res) => {
          try {
            const { concept, framework } = req.body;
            
            if (!concept || !framework) {
              return res.status(400).json({ error: 'Bad request' });
            }
            
            console.log(`🤖 Generating concept: ${concept} for ${framework}`);
            
            const conceptData = await aiService.generateConceptData(concept, framework);
            
            return res.json({ 
              success: true, 
              conceptData,
              message: 'Concept generated successfully'
            });
          } catch (error) {
            console.error('Error generating concept:', error);
            return res.status(500).json({ error: 'Server error' });
          }
        });
        
        // Get popular concepts for a framework
        router.get('/popular-concepts/:framework', auth, async (req, res) => {
          try {
            const { framework } = req.params;
            
            const popularConcepts = await aiService.searchPopularConcepts(framework);
            
            return res.json({ 
              success: true, 
              concepts: popularConcepts,
              framework
            });
          } catch (error) {
            console.error('Error fetching popular concepts:', error);
            return res.status(500).json({ error: 'Server error' });
          }
        });
        
        // Auto-create concept with AI generation
        router.post('/auto-create-concept', auth, async (req, res) => {
          try {
            const { concept, framework } = req.body;
            
            if (!concept || !framework) {
              return res.status(400).json({ error: 'Bad request' });
            }
            
            console.log(`🚀 Auto-creating concept: ${concept} for ${framework}`);
            
            // Generate concept data using AI
            const conceptData = await aiService.generateConceptData(concept, framework);
            
            // Create concept ID
            const conceptId = concept.toLowerCase().replace(/\s+/g, '-');
            
            // Create new concept
            const newConcept = new Concept({
              id: conceptId,
              title: conceptData.title,
              description: conceptData.description,
              metaphor: conceptData.metaphor,
              difficulty: conceptData.difficulty,
              estimatedTime: conceptData.estimatedTime,
              story: conceptData.story,
              framework: framework.toLowerCase()
            });
            
            await newConcept.save();
            
            // Add concept to framework
            const frameworkDoc = await Framework.findOne({ id: framework.toLowerCase() });
            if (frameworkDoc) {
              frameworkDoc.concepts.push(newConcept._id as any);
              await frameworkDoc.save();
            }
            
            return res.json({ 
              success: true, 
              concept: newConcept,
              message: 'Concept created successfully with AI-generated content'
            });
          } catch (error) {
            console.error('Error auto-creating concept:', error);
            return res.status(500).json({ error: 'Server error' });
          }
        });

        // Add concept to framework
        router.post('/frameworks/:frameworkId/concepts', auth, async (req, res) => {
          try {
            const { frameworkId } = req.params;
            const { conceptId } = req.body;
            
            if (!conceptId) {
              return res.status(400).json({ error: 'Bad request' });
            }
            
            // Find the framework
            const framework = await Framework.findOne({ id: frameworkId });
            if (!framework) {
              return res.status(404).json({ error: 'Not found' });
            }
            
            // Find the concept by id (not _id)
            const concept = await Concept.findOne({ id: conceptId });
            if (!concept) {
              return res.status(404).json({ error: 'Not found' });
            }
            
            // Check if concept is already in framework
            const conceptObjectId = concept._id as mongoose.Types.ObjectId;
            if (framework.concepts.some(id => id.toString() === conceptObjectId.toString())) {
              return res.status(400).json({ error: 'Bad request' });
            }
            
            // Add concept to framework
            framework.concepts.push(conceptObjectId);
            await framework.save();
            
            return res.json({ 
              success: true, 
              message: 'Concept added to framework successfully',
              framework
            });
          } catch (error) {
            console.error('Error adding concept to framework:', error);
            return res.status(500).json({ error: 'Server error' });
          }
        });

        // Remove concept from framework
        router.delete('/frameworks/:frameworkId/concepts/:conceptId', auth, async (req, res) => {
          try {
            const { frameworkId, conceptId } = req.params;
            
            // Find the framework
            const framework = await Framework.findOne({ id: frameworkId });
            if (!framework) {
              return res.status(404).json({ error: 'Not found' });
            }
            
            // Check if concept is in framework
            const conceptObjectId = new mongoose.Types.ObjectId(conceptId);
            if (!framework.concepts.some(id => id.toString() === conceptId)) {
              return res.status(400).json({ error: 'Bad request' });
            }
            
            // Remove concept from framework
            framework.concepts = framework.concepts.filter(
              (id: mongoose.Types.ObjectId) => id.toString() !== conceptId
            );
            await framework.save();
            
            return res.json({ 
              success: true, 
              message: 'Concept removed from framework successfully',
              framework
            });
          } catch (error) {
            console.error('Error removing concept from framework:', error);
            return res.status(500).json({ error: 'Server error' });
          }
        });

        // Enhanced popular concepts search with custom search
        router.post('/popular-concepts/:framework', auth, async (req, res) => {
          try {
            const { framework } = req.params;
            const { search } = req.body;
            
            let popularConcepts;
            if (search) {
              // Use AI to search for concepts based on custom search term
              popularConcepts = await aiService.searchPopularConcepts(framework, search);
            } else {
              // Get default popular concepts
              popularConcepts = await aiService.searchPopularConcepts(framework);
            }
            
            return res.json({ 
              success: true, 
              concepts: popularConcepts,
              framework
            });
          } catch (error) {
            console.error('Error fetching popular concepts:', error);
            return res.status(500).json({ error: 'Server error' });
          }
        });
        
        export default router; 