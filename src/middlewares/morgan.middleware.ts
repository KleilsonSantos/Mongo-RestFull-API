import morgan from 'morgan';
import Logger from '../config/logger';

// 🌍 Load environment variables from .env file

// 📝 Create a logger instance for HTTP requests
const stream: morgan.StreamOptions = {
  write: (message: string) => Logger.http(message), // 📡 Send log messages to the Logger
};

// 🔄 Function to skip logging in production environments
const skip = (): boolean => {
  const env = process.env.NODE_ENV ?? 'development'; // 🌎 Get environment variable
  return env !== 'development'; // ⏭️ Skip logs unless in development mode
};

// 📊 Define Morgan middleware for request logging
const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms', // 📜 Log format
  { stream, skip }, // 🔍 Use custom log stream and skipping logic
);

export { morganMiddleware }; // 📤 Export middleware for use in the app
