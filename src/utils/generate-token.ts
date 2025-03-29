import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Logger } from '../config/logger';
import { Payload } from '../model/Payload.interface';
import { UserRole } from '../enum/user-role.enum';

// Load environment variables
dotenv.config();

// Check if JWT_SECRET and JWT_EXPIRES_IN are defined
if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
  Logger.error(
    '❌ JWT_SECRET or JWT_EXPIRES_IN not found in environment variables',
  );
  throw new Error(
    'JWT_SECRET or JWT_EXPIRES_IN not found in environment variables',
  );
}

// Get JWT_SECRET and JWT_EXPIRES_IN from environment variables
const JWT_SECRET: string | undefined = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN: string | undefined = process.env.JWT_EXPIRES_IN || '1h';

if (!JWT_SECRET || !JWT_EXPIRES_IN) {
  Logger.error(
    '❌ JWT_SECRET or JWT_EXPIRES_IN not found in environment variables',
  );
  throw new Error(
    'JWT_SECRET or JWT_EXPIRES_IN not found in environment variables',
  );
}

// Generate a JWT token
const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: Number(JWT_EXPIRES_IN) });
};

export { generateToken, Payload, UserRole };
