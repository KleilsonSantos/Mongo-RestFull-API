//import { JwtPayload } from "jsonwebtoken";

//declare module "express-serve-static-core" {
//  interface Request {
//    user?: string | JwtPayload;
//  }
//}
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}
