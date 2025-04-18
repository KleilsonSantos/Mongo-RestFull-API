import jwt from 'jsonwebtoken';
import Logger from '../config/logger';
import { Payload } from '../model/Payload.interface';
import { UserRole } from '../enum/user-role.enum';

// 🌱 Load environment variables from .env file

// ⚠️ Check if JWT_SECRET and JWT_EXPIRES_IN are defined in the environment
if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
  Logger.error('❌ JWT_SECRET or JWT_EXPIRES_IN not found in environment variables');
  throw new Error('JWT_SECRET or JWT_EXPIRES_IN not found in environment variables');
}

// 🔐 Extract JWT_SECRET and JWT_EXPIRES_IN from environment variables
const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
const JWT_EXPIRES_IN: string | undefined = process.env.JWT_EXPIRES_IN || '1h';

// 🚨 Double-check the presence of JWT_SECRET and JWT_EXPIRES_IN (redundant but safe)
if (!JWT_SECRET || !JWT_EXPIRES_IN) {
  Logger.error('❌ JWT_SECRET or JWT_EXPIRES_IN not found in environment variables');
  throw new Error('JWT_SECRET or JWT_EXPIRES_IN not found in environment variables');
}

// 🧾 Function to generate a JWT token with a given payload and expiration time
const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: Number(JWT_EXPIRES_IN) });
};

// 🚀 Export the token generator and related types
export { generateToken, UserRole };
