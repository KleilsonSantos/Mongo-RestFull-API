import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Logger } from "../config/logger";
import { Request, Response, NextFunction } from "express";
import { Payload } from "../model/Payload.interface";

// Load environment variables
dotenv.config();

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const secret: string | undefined = process.env.JWT_SECRET;
  const token: string | undefined = req
    .header("Authorization")
    ?.replace("Bearer ", "");

  if (!token) {
    Logger.error(`❌ Unauthorized - Missing token`);
    res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  if (!secret) {
    Logger.error(`❌ JWT_SECRET is not defined in environment variables.`);
    res
      .status(500)
      .json({ message: "Internal server error: missing JWT secret" });
  }

  try {
    if (typeof token !== "string" || typeof secret !== "string") {
      throw new Error("JWT_SECRET is not a valid string");
    }

    const decoded = jwt.verify(token, secret);

    req.user = decoded as Payload; //⚠️ Certified user
    next(); // ✅ Call next middleware or route handler
  } catch (error) {
    Logger.error(`❌ JWT verification error: ${error}`);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export default authMiddleware;
