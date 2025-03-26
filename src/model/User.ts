import { model, Schema, Document } from "mongoose";

// Interface for User
interface IUser extends Document {
  email: string;
  password: string;
  role: string;
}

// Define User Schema
const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  {
    timestamps: true,
  }
);

// Remove password from response
userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

// Create User model
const UserModel = model<IUser>("User", userSchema);

export { UserModel, IUser };
