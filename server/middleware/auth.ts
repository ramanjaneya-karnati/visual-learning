import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';

interface AuthRequest extends Request {
  admin?: any;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const admin = await Admin.findById(decoded.adminId).select('-password');
    
    if (!admin || !admin.isActive) {
      return res.status(401).json({ error: 'Invalid token or inactive account.' });
    }

    req.admin = admin;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

export const generateToken = (adminId: string): string => {
  return jwt.sign({ adminId }, JWT_SECRET, { expiresIn: '24h' });
}; 