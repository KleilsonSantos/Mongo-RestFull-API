import * as jwt from 'jsonwebtoken';
import Logger from '../config/logger';
import { Payload } from '../model/Payload.interface';
import { UserRole } from '../enum/user-role.enum';

// 🔐 Extract JWT_SECRET from environment variables
const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;
const JWT_EXPIRES_IN: jwt.SignOptions['expiresIn'] = process.env
  .JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'];

// ⚠️ Check if JWT_SECRET is defined in the environment
if (!JWT_SECRET || !JWT_EXPIRES_IN) {
  Logger.error('❌ JWT_SECRET or JWT_EXPIRES_IN not found in environment variables');
  throw new Error('JWT_SECRET or JWT_EXPIRES_IN not found in environment variables');
}

// 🧾 Function to generate a JWT token with a given payload and expiration time
const generateToken = (payload: Payload): string => {
  const options: jwt.SignOptions = { expiresIn: JWT_EXPIRES_IN ?? '1h' };
  return jwt.sign(payload, JWT_SECRET, options);
};

// 🚀 Export the token generator and related types
export { generateToken, UserRole };
