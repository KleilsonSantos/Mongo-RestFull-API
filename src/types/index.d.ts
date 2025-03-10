import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any; // ou um tipo mais específico, ex: `user?: { id: string; role: string }`
    }
  }
}
