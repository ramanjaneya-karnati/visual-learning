import mongoose, { Schema, Document } from 'mongoose';

export interface IConcept extends Document {
  id: string;
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

const ConceptSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  metaphor: { type: String, required: true },
  difficulty: { 
    type: String, 
    required: true, 
    enum: ['beginner', 'intermediate', 'advanced'] 
  },
  estimatedTime: { type: String, required: true },
  story: {
    title: String,
    scene: String,
    problem: String,
    solution: String,
    characters: { type: Schema.Types.Mixed },
    mapping: { type: Schema.Types.Mixed },
    realWorld: String
  }
}, {
  timestamps: true
});

export default mongoose.model<IConcept>('Concept', ConceptSchema); 