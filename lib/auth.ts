import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { User } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'tilago_jwt_secret_key';

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Compare password
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT token
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

// Verify JWT token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Get current user from token
export const getCurrentUser = (): User | null => {
  try {
    const token = cookies().get('auth-token')?.value;
    if (!token) return null;
    
    const decoded = verifyToken(token);
    if (!decoded) return null;
    
    return decoded.user as User;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Middleware to check if user is authenticated
export const requireAuth = (): User | null => {
  return getCurrentUser();
};

// Middleware to check if user is admin
export const requireAdmin = (): User | null => {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') {
    return null;
  }
  return user;
};