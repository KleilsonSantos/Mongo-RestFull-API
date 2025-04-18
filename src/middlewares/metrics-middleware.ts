import client from 'prom-client';
import Logger from '../config/logger';
import { Request, Response, NextFunction } from 'express';

// 📊 Initialize HTTP request counter metric
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total', // 🔢 Metric name
  help: 'Total number of HTTP requests', // ℹ️ Description
  labelNames: ['method', 'route', 'status'], // 🏷️ Labels for categorization
});

// 🧠 Initialize memory usage gauge metric
const memoryUsageGauge = new client.Gauge({
  name: 'memory_usage_bytes', // 📏 Metric name
  help: 'Memory usage in bytes', // ℹ️ Description
});

// ⏳ Initialize HTTP request duration histogram
const httpRequestDurationHistogram = new client.Histogram({
  name: 'http_request_duration_seconds', // ⏱️ Metric name
  help: 'Duration of HTTP requests in seconds', // ℹ️ Description
  labelNames: ['method', 'route', 'status'], // 🏷️ Labels
  buckets: [0.1, 0.5, 1, 5, 10], // 📊 Duration buckets
});

// 🛠 Middleware to collect HTTP request metrics
export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now(); // ⏳ Capture request start time

  res.on('finish', () => {
    const duration = (Date.now() - startTime) / 1000; // ⏱️ Calculate duration in seconds

    Logger.info(
      `📡 Request: ${req.method} ${req.originalUrl} | Status: ${res.statusCode} | Duration: ${duration}s`,
    );

    // 📊 Increment HTTP request counter
    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path ?? req.path,
      status: res.statusCode,
    });

    // ⏳ Record HTTP request duration
    httpRequestDurationHistogram.observe(
      {
        method: req.method,
        route: req.route?.path ?? req.path,
        status: res.statusCode,
      },
      duration,
    );
  });

  next(); // 🚀 Proceed to next middleware
};

// 🔄 Periodically update memory usage metric
if (process.env.NODE_ENV !== 'test') {
  setInterval(() => {
    const memoryUsage = process.memoryUsage().heapUsed; // 🧠 Get heap memory usage
    memoryUsageGauge.set(memoryUsage); // 📊 Update metric
  }, 5000); // ⏲️ Every 5 seconds
}
