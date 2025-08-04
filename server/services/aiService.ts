import axios from 'axios';

interface AIConceptData {
  title: string;
  description: string;
  metaphor: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  story?: {
    title: string;
    scene: string;
    problem: string;
    solution: string;
    characters: Record<string, string>;
    mapping: Record<string, string>;
    realWorld: string;
  };
}

interface ConceptSearchResult {
  concept: string;
  framework: string;
  description: string;
  features: string[];
  difficulty: string;
  useCases: string[];
}

class AIService {
  private openaiApiKey: string | undefined;
  private anthropicApiKey: string | undefined;

  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
    this.anthropicApiKey = process.env.ANTHROPIC_API_KEY;
  }

  private async callOpenAI(prompt: string): Promise<string> {
    if (!this.openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert web development educator who creates engaging, easy-to-understand content for developers.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to fetch from OpenAI API');
    }
  }

  private async callAnthropic(prompt: string): Promise<string> {
    if (!this.anthropicApiKey) {
      throw new Error('Anthropic API key not configured');
    }

    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: 'claude-3-sonnet-20240229',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        },
        {
          headers: {
            'x-api-key': this.anthropicApiKey,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01'
          }
        }
      );

      return response.data.content[0].text;
    } catch (error) {
      console.error('Anthropic API error:', error);
      throw new Error('Failed to fetch from Anthropic API');
    }
  }

  private async searchConceptInfo(concept: string, framework: string): Promise<ConceptSearchResult> {
    try {
      const prompt = `
        Provide detailed information about ${concept} in ${framework} framework. Include:
        1. A clear description of what it is
        2. Key features and capabilities
        3. Difficulty level (beginner/intermediate/advanced)
        4. Common use cases
        5. Latest updates or improvements
        
        Format the response as JSON with these fields:
        {
          "description": "clear description",
          "features": ["feature1", "feature2", "feature3"],
          "difficulty": "beginner/intermediate/advanced",
          "useCases": ["use case 1", "use case 2"]
        }
      `;

      let aiResponse: string;
      
      // Try OpenAI first, fallback to Anthropic
      try {
        aiResponse = await this.callOpenAI(prompt);
      } catch (error) {
        console.log('OpenAI failed, trying Anthropic...');
        aiResponse = await this.callAnthropic(prompt);
      }

      // Parse the AI response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          concept,
          framework,
          description: parsed.description || `Latest ${concept} features in ${framework}`,
          features: parsed.features || ['Enhanced performance', 'Better developer experience'],
          difficulty: parsed.difficulty || 'intermediate',
          useCases: parsed.useCases || ['Building scalable applications']
        };
      }

      // Fallback to mock data if parsing fails
      return {
        concept,
        framework,
        description: `Latest ${concept} features in ${framework} for modern web development`,
        features: ['Enhanced performance', 'Better developer experience', 'Improved type safety'],
        difficulty: 'intermediate',
        useCases: ['Building scalable applications', 'Server-side rendering']
      };

    } catch (error) {
      console.error('Error searching concept info:', error);
      // Return mock data as fallback
      return {
        concept,
        framework,
        description: `Latest ${concept} features in ${framework} for modern web development`,
        features: ['Enhanced performance', 'Better developer experience'],
        difficulty: 'intermediate',
        useCases: ['Building scalable applications']
      };
    }
  }

  private async generateMetaphorWithAI(concept: string, framework: string): Promise<string> {
    try {
      const prompt = `
        Create a creative and engaging metaphor for ${concept} in ${framework} framework. 
        The metaphor should be relatable and help developers understand the concept easily.
        Make it fun and memorable, like comparing it to everyday activities or objects.
        
        Return only the metaphor, no additional text.
      `;

      let aiResponse: string;
      
      try {
        aiResponse = await this.callOpenAI(prompt);
      } catch (error) {
        aiResponse = await this.callAnthropic(prompt);
      }

      return aiResponse.trim();
    } catch (error) {
      console.error('Error generating metaphor with AI:', error);
      return this.generateMetaphor(concept, framework);
    }
  }

  private async generateStoryWithAI(concept: string, framework: string, features: string[]): Promise<any> {
    try {
      const prompt = `
        Create an engaging interactive story for learning ${concept} in ${framework}.
        Include these elements:
        - Title: A catchy title
        - Scene: A relatable setting
        - Problem: A challenge that needs solving
        - Solution: How the concept solves the problem
        - Characters: Map story characters to programming concepts
        - Mapping: Connect story elements to technical features
        - RealWorld: How this applies to actual programming
        
        Format as JSON:
        {
          "title": "Story title",
          "scene": "Setting description",
          "problem": "Challenge description",
          "solution": "Solution description",
          "characters": {"character1": "programming concept1", "character2": "programming concept2"},
          "mapping": {"story element1": "technical feature1", "story element2": "technical feature2"},
          "realWorld": "Real-world application"
        }
      `;

      let aiResponse: string;
      
      try {
        aiResponse = await this.callOpenAI(prompt);
      } catch (error) {
        aiResponse = await this.callAnthropic(prompt);
      }

      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      return this.generateStory(concept, framework, features);
    } catch (error) {
      console.error('Error generating story with AI:', error);
      return this.generateStory(concept, framework, features);
    }
  }

  private generateMetaphor(concept: string, framework: string): string {
    const metaphors = {
      'next.js': 'Like upgrading from a bicycle to a high-speed train with smart navigation!',
      'react': 'Like having a master chef who can cook any dish with the right ingredients!',
      'angular': 'Like a well-organized kitchen where every tool has its perfect place!',
      'vue': 'Like a friendly restaurant where everything is intuitive and welcoming!',
      'typescript': 'Like having a smart assistant who catches mistakes before they happen!',
      'node.js': 'Like a powerful engine that can handle any road condition!',
      'mongodb': 'Like a flexible storage system that adapts to any data shape!',
      'postgresql': 'Like a reliable bank vault that keeps your data safe and organized!'
    };

    const key = framework.toLowerCase();
    return metaphors[key as keyof typeof metaphors] || 
           `Like discovering a new tool that makes ${concept} development easier and more efficient!`;
  }

  private generateStory(concept: string, framework: string, features: string[]): any {
    const storyTemplates = {
      'next.js': {
        title: 'The Smart City Transportation System',
        scene: 'A city upgrading its transportation infrastructure to handle modern needs.',
        problem: 'Old transportation methods are slow and inefficient for today\'s demands.',
        solution: 'Implement a smart transportation system with multiple routes and real-time updates.',
        characters: {
          'city': 'Your Application',
          'transportation': 'Next.js Features',
          'routes': 'API Routes',
          'stations': 'Pages',
          'passengers': 'Users'
        },
        mapping: {
          'routing': 'Smart route planning',
          'ssr': 'Pre-built stations',
          'api': 'Transportation hubs',
          'optimization': 'Efficient scheduling'
        },
        realWorld: 'Building fast, scalable applications with server-side rendering and API routes'
      },
      'react': {
        title: 'The Master Chef\'s Kitchen',
        scene: 'A professional kitchen where chefs create amazing dishes efficiently.',
        problem: 'Chefs need to coordinate and share ingredients while maintaining quality.',
        solution: 'Create a well-organized kitchen with specialized tools and clear communication.',
        characters: {
          'kitchen': 'React Application',
          'chef': 'Component',
          'ingredients': 'Props',
          'recipes': 'Hooks',
          'dishes': 'UI Elements'
        },
        mapping: {
          'components': 'Specialized cooking stations',
          'hooks': 'Kitchen tools',
          'state': 'Ingredient storage',
          'props': 'Recipe sharing'
        },
        realWorld: 'Building reusable components and managing application state efficiently'
      }
    };

    const key = framework.toLowerCase();
    const template = storyTemplates[key as keyof typeof storyTemplates];
    
    if (template) {
      return {
        ...template,
        realWorld: `Latest ${concept} features in ${framework}: ${features.join(', ')}`
      };
    }

    // Default template
    return {
      title: `The ${concept} Workshop`,
      scene: `A workshop where developers learn to use ${concept} in ${framework}.`,
      problem: `Developers struggle with understanding ${concept} and its benefits.`,
      solution: `Create a comprehensive learning environment with hands-on examples.`,
      characters: {
        'workshop': `${framework} Application`,
        'instructor': `${concept} Features`,
        'students': 'Developers',
        'tools': 'Development Tools'
      },
      mapping: {
        'features': 'Workshop tools',
        'benefits': 'Learning outcomes',
        'implementation': 'Hands-on practice'
      },
      realWorld: `Implementing ${concept} in ${framework} for better development experience`
    };
  }

  public async generateConceptData(concept: string, framework: string): Promise<AIConceptData> {
    try {
      console.log(`🤖 Generating AI content for: ${concept} in ${framework}`);
      
      // Search for concept information using AI
      const searchResult = await this.searchConceptInfo(concept, framework);
      
      // Generate metaphor using AI
      const metaphor = await this.generateMetaphorWithAI(concept, framework);
      
      // Generate story using AI
      const story = await this.generateStoryWithAI(concept, framework, searchResult.features);
      
      // Determine difficulty based on concept complexity
      const difficulty = this.determineDifficulty(concept, searchResult.features);
      
      // Estimate time based on complexity
      const estimatedTime = this.estimateTime(difficulty);
      
      return {
        title: `${concept} in ${framework}`,
        description: searchResult.description,
        metaphor,
        difficulty,
        estimatedTime,
        story
      };
    } catch (error) {
      console.error('Error generating concept data:', error);
      throw new Error('Failed to generate concept data');
    }
  }

  private determineDifficulty(concept: string, features: string[]): 'beginner' | 'intermediate' | 'advanced' {
    const advancedKeywords = ['advanced', 'complex', 'enterprise', 'scalable', 'optimization'];
    const intermediateKeywords = ['intermediate', 'moderate', 'standard', 'common'];
    
    const conceptLower = concept.toLowerCase();
    const featuresLower = features.map(f => f.toLowerCase());
    
    const allText = `${conceptLower} ${featuresLower.join(' ')}`;
    
    if (advancedKeywords.some(keyword => allText.includes(keyword))) {
      return 'advanced';
    } else if (intermediateKeywords.some(keyword => allText.includes(keyword))) {
      return 'intermediate';
    } else {
      return 'beginner';
    }
  }

  private estimateTime(difficulty: string): string {
    const timeEstimates = {
      beginner: '15 min',
      intermediate: '25 min',
      advanced: '40 min'
    };
    
    return timeEstimates[difficulty as keyof typeof timeEstimates] || '20 min';
  }

  public async searchPopularConcepts(framework: string): Promise<string[]> {
    try {
      const prompt = `
        List the most popular and trending concepts/features in ${framework} framework.
        Focus on the latest features, important concepts, and commonly used patterns.
        Return only a JSON array of concept names, no additional text.
        Example: ["Concept 1", "Concept 2", "Concept 3"]
      `;

      let aiResponse: string;
      
      try {
        aiResponse = await this.callOpenAI(prompt);
      } catch (error) {
        aiResponse = await this.callAnthropic(prompt);
      }

      const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Fallback to mock data
      return this.getMockPopularConcepts(framework);
    } catch (error) {
      console.error('Error fetching popular concepts with AI:', error);
      return this.getMockPopularConcepts(framework);
    }
  }

  private getMockPopularConcepts(framework: string): string[] {
    const popularConcepts = {
      'next.js': [
        'App Router',
        'Server Components',
        'Turbopack',
        'Middleware',
        'Image Optimization',
        'Internationalization'
      ],
      'react': [
        'Concurrent Features',
        'Suspense',
        'Server Components',
        'Hooks',
        'Context API',
        'Virtual DOM'
      ],
      'angular': [
        'Standalone Components',
        'Signals',
        'Control Flow',
        'Deferrable Views',
        'Dependency Injection',
        'Change Detection'
      ],
      'vue': [
        'Composition API',
        'Teleport',
        'Suspense',
        'Fragments',
        'Reactivity',
        'Custom Directives'
      ]
    };

    return popularConcepts[framework.toLowerCase() as keyof typeof popularConcepts] || [];
  }
}

export default new AIService(); 