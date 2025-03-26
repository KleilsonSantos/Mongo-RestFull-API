import { model, Schema } from 'mongoose';

// 👤 Interface for User model
interface User {
  email: string;  // 📧 User email (must be unique)
  password: string; // 🔒 User password
  role: string; // 🏷️ User role (admin or user)
}

// 🏗️ Define User Schema
const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true }, // 📧 Email (required & unique)
    password: { type: String, required: true }, // 🔐 Password (required)
    role: { type: String, enum: ['admin', 'user'], default: 'user' }, // 👑 Role (default: user)
  },
  {
    timestamps: true, // ⏳ Automatically adds createdAt & updatedAt fields
  },
);

// 🗄️ Create User model
const UserModel = model<User>('User', userSchema);

export { UserModel, User }; // 📤 Export User model and interface
