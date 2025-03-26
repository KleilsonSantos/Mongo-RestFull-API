import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import winston from 'winston';

// ⚙️ Load environment variables
dotenv.config();

// 🌍 Get environment variables
const env = process.env.NODE_ENV || 'development';
const isDevelopment = env === 'development';

// 📁 Create logs directory if not exists
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// 🚦 Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// 🎨 Define log level colors
winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'cyan',
});

// 📝 Define log format
const baseFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// 🚚 Define transports
const transports: winston.transport[] = [
  new winston.transports.File({ filename: path.join(logDir, 'all.log') }),
  new winston.transports.File({
    filename: path.join(logDir, 'error.log'),
    level: 'error',
  }),
  new winston.transports.File({
    filename: path.join(logDir, 'debug.log'),
    level: 'debug',
  }),
  new winston.transports.File({
    filename: path.join(logDir, 'info.log'),
    level: 'info',
  }),
  new winston.transports.File({
    filename: path.join(logDir, 'warn.log'),
    level: 'warn',
  }),
  new winston.transports.File({
    filename: path.join(logDir, 'http.log'),
    level: 'http',
  }),
];

// 💻 Add console transport only for development with colorized output
winston.addColors({
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "cyan",
});

// Define log format
const baseFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Define transports
const transports: winston.transport[] = [
  new winston.transports.File({ filename: path.join(logDir, "all.log") }),
  new winston.transports.File({ filename: path.join(logDir, "error.log"), level: "error" }),
  new winston.transports.File({ filename: path.join(logDir, "debug.log"), level: "debug" }),
  new winston.transports.File({ filename: path.join(logDir, "info.log"), level: "info" }),
  new winston.transports.File({ filename: path.join(logDir, "warn.log"), level: "warn" }),
  new winston.transports.File({ filename: path.join(logDir, "http.log"), level: "http" }),
];

// Add console transport only for development with colorized output
if (isDevelopment) {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }), // Apply colors
        baseFormat,
      ),
    }),
  );
}

// 🪵 Create Logger
const Logger = winston.createLogger({
  level: isDevelopment ? 'debug' : 'info',
  levels,
  format: baseFormat,
  transports,
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, 'exceptions.log'),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, 'rejections.log'),
    }),
  ],
});

export { Logger };
