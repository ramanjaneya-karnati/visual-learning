import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { generateSalt, hashPassword, verifyPassword } from '../utils/passwordSecurity';

export interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
  salt?: string;
  role: 'admin' | 'super-admin';
  isActive: boolean;
  lastLogin?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AdminSchema: Schema = new Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    minlength: 3
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  salt: {
    type: String,
    required: false
  },
  role: { 
    type: String, 
    enum: ['admin', 'super-admin'], 
    default: 'admin' 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  lastLogin: { 
    type: Date 
  }
}, {
  timestamps: true
});

// Hash password before saving
AdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    // Generate a secure salt and hash the password
    const salt = generateSalt();
    const hashedPassword = hashPassword(this.password as string, salt);
    
    // Store both the hash and salt
    this.password = hashedPassword;
    this.salt = salt;
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
AdminSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return verifyPassword(candidatePassword, this.salt, this.password);
  } catch (error) {
    return false;
  }
};

export default mongoose.model<IAdmin>('Admin', AdminSchema); 