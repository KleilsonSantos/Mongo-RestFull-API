import { Logger } from "../config/logger";
import { Request, Response, NextFunction } from "express";

const swaggerAuthMiddleware: (
  req: Request,
  res: Response,
  next: NextFunction
) => void = (req, res, next) => {
  const apiKey = req.header("X-API-KEY");
  Logger.info("🔍 Middleware was triggered.");

  const swaggerApiKey: string | undefined = process.env.SWAGGER_API_KEY;

  if (!swaggerApiKey) {
    Logger.error("❌ SWAGGER_API_KEY not found in environment variables");
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }

  const sw = Buffer.from(swaggerApiKey, "base64").toString("ascii");

  if (!apiKey || apiKey !== sw) {
    Logger.error("❌ Unauthorized Access to Swagger UI");
    res.status(403).json({ message: "Unauthorized Access to Swagger UI" });
    return;
  }

  Logger.info("✅ Authorized Access to Swagger UI");

  next();
};

export default swaggerAuthMiddleware;
