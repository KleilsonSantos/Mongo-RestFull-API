import './config/load-env';
import Logger from './config/logger';
import setupSwagger from './config/swagger';
import { router } from './routers/router';
import { morganMiddleware } from './middlewares/morgan-middleware';
import express, { NextFunction, Request, Response } from 'express';

// 🌍 Get environment variables
const apiUrl: string | undefined = process.env.API_URL ?? '/api/v1';

// 🚀 Create an Express application
const app = express();

// 🛠️ Middleware setup
app.use(express.json()); // 📄 Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // 🔄 Parse URL-encoded data
app.use(morganMiddleware); // 📜 Log HTTP requests
app.use(apiUrl, router); // 🌐 Use main router for API endpoints

// 🔐 Load secrets
//loadSecrets();

// 📊 Swagger
setupSwagger(app);

// ⚠️ Global Middleware error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error('🔥 Global error handler:', err);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

export default app;
