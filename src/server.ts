import dotenv from "dotenv";
import mongoose from "mongoose";
import connect from "./config/db";
import { router } from "./routers/router";
import { Logger } from "./config/loggers";
import { morganMiddleware } from "./middlewares/morganMiddleware";
import express, { NextFunction, Request, Response } from "express";

// Load environment variables
dotenv.config();

const localhost: string | undefined = process.env.LOCALHOST || "localhost";
const port: string | number = process.env.PORT || 3000;
const apiUrl: string | undefined = process.env.API_URL || "/api/v1";

// Create Express app
const app = express();

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
const startServer = () => {
  app.listen(port, () => {
    Logger.info(`🚀 Server running on ${localhost}:${port}${apiUrl}`);
  });
};