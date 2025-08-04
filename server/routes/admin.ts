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
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    const token = generateToken(admin._id as string);
    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get admin profile
router.get('/profile', auth, async (req: any, res) => {
  res.json({ admin: req.admin });
});

// Get all frameworks with concepts (for admin dashboard)
router.get('/frameworks', auth, async (req, res) => {
  try {
    const frameworks = await Framework.find().populate('concepts');
    res.json({ frameworks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch frameworks' });
  }
});

// Get all concepts
router.get('/concepts', auth, async (req, res) => {
  try {
    const concepts = await Concept.find().sort({ createdAt: -1 });
    res.json({ concepts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch concepts' });
  }
});

// Get single concept
router.get('/concepts/:id', auth, async (req, res) => {
  try {
    const concept = await Concept.findById(req.params.id);
    if (!concept) {
      return res.status(404).json({ error: 'Concept not found' });
    }
    res.json({ concept });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch concept' });
  }
});

// Create new concept
router.post('/concepts', auth, async (req, res) => {
  try {
    const concept = new Concept(req.body);
    await concept.save();
    res.status(201).json({ concept });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create concept' });
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
      return res.status(404).json({ error: 'Concept not found' });
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

    res.json({ concept });
  } catch (error) {
    console.error('Error updating concept:', error);
    res.status(400).json({ error: 'Failed to update concept' });
  }
});

// Delete concept
router.delete('/concepts/:id', auth, async (req, res) => {
  try {
    const concept = await Concept.findByIdAndDelete(req.params.id);
    if (!concept) {
      return res.status(404).json({ error: 'Concept not found' });
    }
    res.json({ message: 'Concept deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete concept' });
  }
});

// Create admin user (for initial setup)
router.post('/setup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const admin = new Admin({
      username,
      email,
      password,
      role: 'super-admin'
    });

    await admin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create admin' });
  }
});

        // AI-powered concept generation
        router.post('/generate-concept', auth, async (req, res) => {
          try {
            const { concept, framework } = req.body;
            
            if (!concept || !framework) {
              return res.status(400).json({ error: 'Concept and framework are required' });
            }
            
            console.log(`🤖 Generating concept: ${concept} for ${framework}`);
            
            const conceptData = await aiService.generateConceptData(concept, framework);
            
            res.json({ 
              success: true, 
              conceptData,
              message: 'Concept generated successfully'
            });
          } catch (error) {
            console.error('Error generating concept:', error);
            res.status(500).json({ error: 'Failed to generate concept' });
          }
        });
        
        // Get popular concepts for a framework
        router.get('/popular-concepts/:framework', auth, async (req, res) => {
          try {
            const { framework } = req.params;
            
            const popularConcepts = await aiService.searchPopularConcepts(framework);
            
            res.json({ 
              success: true, 
              concepts: popularConcepts,
              framework
            });
          } catch (error) {
            console.error('Error fetching popular concepts:', error);
            res.status(500).json({ error: 'Failed to fetch popular concepts' });
          }
        });
        
        // Auto-create concept with AI generation
        router.post('/auto-create-concept', auth, async (req, res) => {
          try {
            const { concept, framework } = req.body;
            
            if (!concept || !framework) {
              return res.status(400).json({ error: 'Concept and framework are required' });
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
            
            res.json({ 
              success: true, 
              concept: newConcept,
              message: 'Concept created successfully with AI-generated content'
            });
          } catch (error) {
            console.error('Error auto-creating concept:', error);
            res.status(500).json({ error: 'Failed to create concept' });
          }
        });
        
        export default router; 