import Logger from '../config/logger';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

// 🚨 Enhanced Error Handling Middleware
const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorId = Date.now();
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  // 💥 Log error details including request metadata
  Logger.error(`❌ Error ID: ${errorId} | ${req.method ?? 'UNKNOWN'} ${req.path ?? 'UNKNOWN'}`, {
    message: err.message,
    stack: err.stack,
  });

  // ⚠️ Send informative error response while avoiding exposure of sensitive details
  res.status(statusCode).json({
    errorId,
    message: statusCode === 500 ? 'Internal Server Error' : err.message,
    timestamp: new Date().toISOString(),
  });

  next();
};

export { errorMiddleware };
