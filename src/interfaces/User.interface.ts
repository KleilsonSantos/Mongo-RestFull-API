interface User {
  email: string; // 📧 User email (must be unique)
  password: string; // 🔒 User password
  role: string; // 🏷️ User role (admin or user)
}

export default User;
