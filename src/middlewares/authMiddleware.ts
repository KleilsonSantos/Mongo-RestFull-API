import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Logger } from "../config/logger";
import { Request, Response, NextFunction } from "express";
//import "../types/express";

// Load environment variables
dotenv.config();

interface DecodedUser {
  id: string;
  email: string;
  role: string;
}

// Define the interface for the authenticated request
//declare global {
//  namespace Express {
//   interface Request {
//      user?: any;
//    }
//  }
//}

// Middleware function
const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  //const token = req.headers.authorization?.split(' ')[1];
  const secret: string | undefined = process.env.JWT_SECRET;
  const token: string | undefined = req
    .header("Authorization")
    ?.replace("Bearer ", "");

  if (!token) {
    Logger.error(`❌ Unauthorized - Missing token`);
    return;
    //res.status(401).json({ message: "Unauthorized" });
  }

  if (!secret) {
    Logger.error(`❌ JWT_SECRET is not defined in environment variables.`);
    return;
    //res
    //.status(500)
    //.json({ message: "Internal server error: missing JWT secret" });
  }

  try {
    const decoded = jwt.verify(token, secret) as DecodedUser;
    req.user = decoded; //⚠️ Certified user
    next(); // ✅ Call next middleware or route handler
  } catch (error) {
    Logger.error(`❌ JWT verification error: ${error}`);
    return;
    //res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export default authMiddleware;
