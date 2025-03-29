import dotenv from 'dotenv';
import { Logger } from './config/logger';
import { router } from './routers/router';
import { morganMiddleware } from './middlewares/morgan-middleware';
import { metricsMiddleware } from './middlewares/metrics-middleware';
import { connect, disconnect } from './config/db';
import { generateToken, UserRole } from './utils/generate-token';
import express, { Express, NextFunction, Request, Response } from 'express';

// 📌 Load environment variables from .env file
dotenv.config();

// 🚀 Create an Express application
export const app: Express = express();

// Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// 🌍 Get environment variables
const port: string | number = process.env.PORT ?? 3000;
const apiUrl: string | undefined = process.env.API_URL ?? '/api/v1';
const localhost: string | undefined = process.env.LOCALHOST ?? 'localhost';

// 🛑 Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error('❌ Unhandled error:', err);
  res.status(500).json({ message: '⚠️ Internal Server Error' });
  next();
});

// 🔌 Connect to MongoDB before starting the server
connect()
  .then(() => {
    startServer();
  })
  .catch((error) => {
    disconnect();
    process.exit(1);
  });

// 🛠️ Middleware setup
app.use(express.json()); // 📄 Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // 🔄 Parse URL-encoded data
app.use(metricsMiddleware); // 📊 Collect and expose metrics
app.use(morganMiddleware); // 📜 Log HTTP requests
app.use(apiUrl, router); // 🌐 Use main router for API endpoints

// 🎯 Function to start the server
const startServer = (): void => {
  app.listen(port, () => {
    Logger.info(`🚀 Server running on ${localhost}:${port}${apiUrl}`);
    Logger.info(`🔑 Token generated: 
      ${generateToken({
      id: process.env.DEFAULT_ID!,
      email: process.env.DEFAULT_EMAIL!,
      role: UserRole.ADMIN,
    })}`);
  });
};
