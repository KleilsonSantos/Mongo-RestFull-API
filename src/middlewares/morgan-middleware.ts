import dotenv from "dotenv";
import morgan from "morgan";
import { Logger } from "../config/logger";

// Load environment variables from .env file
dotenv.config();

// Create a logger instance
const stream: morgan.StreamOptions = {
  write: (message: string) => Logger.http(message),
};

// Skip logging during development
const skip = (): boolean => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

// Define the morgan middleware
const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

export { morganMiddleware };
