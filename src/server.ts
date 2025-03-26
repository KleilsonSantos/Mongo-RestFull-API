import dotenv from 'dotenv';
import { connect } from './config/db';
import { Logger } from './config/logger';
import { router } from './routers/router';
import { morganMiddleware } from './middlewares/morgan-middleware';
import { generateToken, UserRole } from './utils/generate-token';
import express, { Express, NextFunction, Request, Response } from 'express';
import { metricsMiddleware } from './middlewares/metrics-middleware';

// 📌 Load environment variables from .env file
dotenv.config();

// Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// 🌍 Get environment variables
const port: string | number = process.env.PORT || 3000;
const apiUrl: string | undefined = process.env.API_URL || '/api/v1';
const localhost: string | undefined = process.env.LOCALHOST || 'localhost';

// 🚀 Create an Express application
export const app: Express = express();

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
    Logger.error('❌ Database connection error:', error);
    process.exit(1); // 🔄 Exit process if the database connection fails
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
      id: '123',
      email: 'user@example.com',
      role: UserRole.ADMIN,
    })}`);
  });
};
