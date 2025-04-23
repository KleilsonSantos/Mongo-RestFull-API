import fs from 'fs';
import path from 'path';
import winston from 'winston';

// 🌍 Get environment variables
const env = process.env.NODE_ENV ?? 'development';
const isDevelopment = env === 'development';

// 📁 Ensure logs directory exists
const logDir = 'logs';
const ensureDirExists = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};
ensureDirExists(logDir);

// 🚦 Define log levels and colors
const levels = { error: 0, warn: 1, info: 2, http: 3, debug: 4 };
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
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);
const getFormat = (useColors = false) =>
  useColors
    ? winston.format.combine(winston.format.colorize({ all: true }), baseFormat)
    : baseFormat;

// 🚚 Define transports dynamically
const logLevels = ['error', 'debug', 'info', 'warn', 'http'];
const transports: winston.transport[] = logLevels.map(
  (level) =>
    new winston.transports.File({
      filename: path.join(logDir, `${level}.log`),
      level,
    }),
);
transports.push(new winston.transports.File({ filename: path.join(logDir, 'all.log') }));

if (isDevelopment) {
  transports.push(new winston.transports.Console({ format: getFormat(true) }));
}

// 🪵 Create Logger
const Logger = winston.createLogger({
  level: isDevelopment ? 'debug' : 'info',
  levels,
  format: baseFormat,
  transports,
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(logDir, 'exceptions.log') }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: path.join(logDir, 'rejections.log') }),
  ],
});

export default Logger;
