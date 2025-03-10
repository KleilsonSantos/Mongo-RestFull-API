import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Logger } from "../config/logger";
import { UserModel } from "../model/User";
import { UserRole } from "../enum/UserRole.enum";
import { Payload } from "../model/Payload.interface";
import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Get JWT_SECRET and JWT_EXPIRES_IN from environment variables
const JWT_SECRET: string | undefined = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN: string | undefined = process.env.JWT_EXPIRES_IN || "1h";

// Check if JWT_SECRET and JWT_EXPIRES_IN are defined
if (!JWT_SECRET || !JWT_EXPIRES_IN) {
  Logger.error(
    "❌ JWT_SECRET or JWT_EXPIRES_IN not found in environment variables"
  );
  throw new Error(
    "JWT_SECRET or JWT_EXPIRES_IN not found in environment variables"
  );
}

// Create a new user
const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, role } = req.body;
    Logger.info(`🔑 Create User`);

    // Validate user data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      Logger.error("❌ Validation errors:", errors.array());
      res.status(400).json({ errors: errors.array() });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email }).lean();
    if (existingUser) {
      Logger.info("✅ User already exists", existingUser);
      res.status(400).json({ message: "User already exists" });
    }

    // Hash password before saving it
    const hashedPassword = await bcrypt.hash(password, 12);

    const userData = {
      email,
      password: hashedPassword,
      role,
    };

    // Create user
    const user = await UserModel.create(userData);

    Logger.info("✅ Creating user", user);
    res
      .status(201)
      .json({ message: "User created with success!", data: { user } });
  } catch (error) {
    next(error);
  }
};

// Login user
const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    Logger.info("🔑 Login started");

    if (!email || !password) {
      Logger.error("❌ Email and password are required");
      res.status(400).json({ message: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user || !user.password) {
      Logger.error("❌ User or password not found");
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const payload: Payload = {
      id: user.id!,
      email: user.email!,
      role: user.role! as UserRole,
    };

    const isMatch = await bcrypt.compare(password, user!.password);
    if (!isMatch) {
      Logger.error("❌ Invalid email or password");
      res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: Number(JWT_EXPIRES_IN),
    });

    Logger.info("✅ Login successful");

    res.status(200).json({
      message: "✅ Login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId).lean();

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    Logger.info("✅ Getting User by id", user);

    res.status(200).json({ data: { user } });
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.id;
    const userData = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(userId, userData);

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    }

    const user = await UserModel.findById(userId).lean();

    Logger.info("✅ Movie updated:", user);

    res.status(200).json({ data: { user: user } });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userRole = req.body;
    if (userRole.role !== UserRole.ADMIN) {
      Logger.error("❌ Access denied, role mismatch. Only admins are allowed.");
      res.status(403).json({
        message: "Access denied, role mismatch. Only admins are allowed.",
      });
    }

    const users = await UserModel.find();
    if (users.length === 0) {
      Logger.error("❌ No users found");
      res.status(404).json({ message: "No users found" });
    }

    Logger.info("✅ Users found");

    res.status(200).json({ data: { users } });
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(String(userId)).lean();

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    await UserModel.findByIdAndDelete(userId);

    Logger.info("✅ User deleted:", user);

    res
      .status(200)
      .json({ message: "User deleted successfully", data: { user } });
  } catch (error) {
    next(error);
  }
};

export {
  createUser,
  userLogin,
  getUserById,
  updateUserById,
  getAllUsers,
  deleteUserById,
};
