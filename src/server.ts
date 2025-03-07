import express from "express";
import dotenv from "dotenv";
import { morganMiddleware } from "./middlewares/morganMiddleware";
import { Logger } from "./config/loggers";

// Load environment variables
dotenv.config();

// Define port
const port = process.env.PORT || 3000;

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

// Initialize server on port
app.listen(process.env.PORT, () => {
  Logger.info(`Server is running on port ${port}`);
});
