import { Logger } from '../config/logger';
import { Request, Response, NextFunction } from 'express';

// 🚨 Error handling middleware
const errorHandles = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 💥 Log unhandled errors
  Logger.error('Unhandled error:', err);
  // ⚠️ Send generic 500 Internal Server Error response
  res.status(500).json({ message: 'Internal Server Error' });
  // ✅ Continue to the next middleware or error handler
  next();
};

export { errorHandles };