import mongoose, { Schema, Document } from 'mongoose';

export interface IFramework extends Document {
  id: string;
  name: string;
  concepts: mongoose.Types.ObjectId[];
}

const FrameworkSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  concepts: [{ type: Schema.Types.ObjectId, ref: 'Concept' }]
}, {
  timestamps: true
});

export default mongoose.model<IFramework>('Framework', FrameworkSchema); 