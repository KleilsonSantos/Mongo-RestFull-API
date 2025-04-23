declare global {
  namespace Express {
    interface Request {
      // 👤 Optional 'user' property added to the Request object
      // ✅ This is typically set after successful authentication (e.g., from a JWT middleware)
      user?: User;
    }
  }
}
