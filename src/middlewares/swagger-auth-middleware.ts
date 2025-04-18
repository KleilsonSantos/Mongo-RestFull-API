import Logger from '../config/logger';
import { Request, Response, NextFunction } from 'express';

// 🔐 Middleware for securing Swagger UI
const swaggerAuthMiddleware: (req: Request, res: Response, next: NextFunction) => void = (
  req,
  res,
  next,
) => {
  // 🛡️ Retrieve API key from request headers
  const apiKey = req.header('X-API-KEY');
  Logger.info('🔍 Middleware was triggered.');

  // 🔑 Get Swagger API key from environment variables
  const swaggerApiKey: string | undefined = process.env.SWAGGER_API_KEY;

  // 🚨 Check if API key is configured
  if (!swaggerApiKey) {
    Logger.error('❌ SWAGGER_API_KEY not found in environment variables');
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }

  // 🔓 Decode the stored API key (Base64 to ASCII)
  const sw = Buffer.from(swaggerApiKey, 'base64').toString('ascii');

  // ❌ Check if provided API key is missing or incorrect
  if (!apiKey || apiKey !== sw) {
    Logger.error('❌ Unauthorized Access to Swagger UI');
    res.status(403).json({ message: 'Unauthorized Access to Swagger UI' });
    return;
  }

  // ✅ Authorized access granted
  Logger.info('✅ Authorized Access to Swagger UI');

  next(); // ⏭️ Proceed to the next middleware or route handler
};

export default swaggerAuthMiddleware; // 📤 Export middleware
