import dotenv from "dotenv";
import connect from "./config/db";
import { Logger } from "./config/logger";
import { router } from "./routers/router";
import { morganMiddleware } from "./middlewares/morgan-middleware";
import { generateToken, Payload, UserRole } from "./utils/generate-token";
import express, { Express, NextFunction, Request, Response } from "express";

// Load environment variables
dotenv.config();

const port: string | number = process.env.PORT || 3000;
const apiUrl: string | undefined = process.env.API_URL || "/api/v1";
const localhost: string | undefined = process.env.LOCALHOST || "localhost";

// Create Express app
const app: Express = express();

// Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Connect to MongoDB before starting server
connect()
  .then(() => {
    startServer();
  })
  .catch((error) => {
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);
app.use(apiUrl, router);

// Use main router
app.use(apiUrl, router);

// Function to start server
const startServer = (): void => {
  app.listen(port, () => {
    Logger.info(`🚀 Server running on ${localhost}:${port}${apiUrl}`);
    Logger.info(`🔑 Token: 
      ${generateToken({
        id: "123",
        email: "user@example.com",
        role: UserRole.ADMIN,
      })}`);
  });
};
