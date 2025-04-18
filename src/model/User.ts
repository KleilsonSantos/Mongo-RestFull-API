import { model, Schema } from 'mongoose';

// 👤 Interface for User model

// 🏗️ Define User Schema
const userSchema = new Schema(
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
const UserModel = model('User', userSchema);

export default UserModel; // 📤 Export User model and interface
