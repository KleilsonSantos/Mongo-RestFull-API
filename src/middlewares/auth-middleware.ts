import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Logger } from '../config/logger';
import { Payload } from '../model/Payload.interface';
import { Request, Response, NextFunction } from 'express';

// ⚙️ Load environment variables
dotenv.config();

interface CustomRequest extends Request {
  user?: Payload;
}

// 🔐 Authentication middleware
const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): void => {
  // 🔑 Retrieve JWT secret from environment variables
  const secret: string | undefined = process.env.JWT_SECRET;
  // 🎫 Extract token from Authorization header
  const token: string | undefined = req
    .header('Authorization')
    ?.replace('Bearer ', '');

  // 🚫 Check for missing token
  if (!token) {
    Logger.error(`❌ Unauthorized - Missing token`);
    res.status(401).json({ message: 'Unauthorized - Missing token' });
    return; // 🛑 Stop further execution
  }

  // ⚠️ Check if JWT secret is defined
  if (!secret) {
    Logger.error(`❌ JWT_SECRET is not defined in environment variables.`);
    res
      .status(500)
      .json({ message: 'Internal server error: missing JWT secret' });
    return; // 🛑 Stop further execution
  }

  try {
    // 🔍 Verify token and decode payload
    if (typeof token !== 'string' || typeof secret !== 'string') {
      throw new Error('JWT_SECRET is not a valid string');
    }

    const decoded = jwt.verify(token, secret);

    // 👤 Assign decoded payload to request user property
    req.user = decoded as Payload; // ⚠️ Certified user
    next(); // ✅ Call next middleware or route handler
  } catch (error) {
    // ❌ Handle JWT verification errors
    Logger.error(`❌ JWT verification error: ${error}`);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

export default authMiddleware;