import winston from "winston";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const env: string = process.env.NODE_ENV || "development";
const isDevelopment: boolean = env === "development";

// Define log levels
const level = (condition: boolean) => (condition ? "debug" : "info");

// Define log format
winston.addColors({
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
});

// Define log levels
const levels: { [key: string]: number } = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  };

const format: winston.Logform.Format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports: winston.transport[] = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: "logs/all.log" }),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new winston.transports.File({
    filename: "logs/debug.log",
    level: "debug",
  }),
  new winston.transports.File({
    filename: "logs/info.log",
    level: "info",
  }),
  new winston.transports.File({
    filename: "logs/warn.log",
    level: "warn",
  }),
  new winston.transports.File({
    filename: "logs/http.log",
    level: "http",
  }),
];

const Logger: winston.Logger = winston.createLogger({
  level: level(isDevelopment),
  levels,
  format,
  transports,
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/rejections.log" }),
  ],
});

export { Logger };
