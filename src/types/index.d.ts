// 🌍 This declaration merges with the existing Express namespace globally
// 🧠 It allows TypeScript to recognize custom properties on the Express Request object
declare global {
  namespace Express {
    interface Request {
      // 👤 Optional 'user' property added to the Request object
      // ✅ This is typically set after successful authentication (e.g., from a JWT middleware)
      user?: User;
    }
  }
}
