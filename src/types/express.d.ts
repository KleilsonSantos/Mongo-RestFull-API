// 🌐 This declaration extends the Express Request interface globally.
// It allows you to safely access `req.user` in your middleware or route handlers
// after authenticating the user and attaching user info to the request object.

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string; // 🆔 Unique identifier of the authenticated user
        role: string; // 🛡️ Role of the user (e.g., admin, user) for permission checks
      };
    }
  }
}
