import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Logger from '../config/logger';
import UserModel from '../model/User';
import { Payload } from '../model/Payload.interface';
import { UserRole } from '../enum/user-role.enum';
import { Request, Response, NextFunction } from 'express';

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

if (!JWT_SECRET || !JWT_EXPIRES_IN) {
  Logger.error('❌ JWT_SECRET or JWT_EXPIRES_IN not found in environment variables');
  throw new Error('JWT_SECRET or JWT_EXPIRES_IN not found in environment variables');
}

// 👤 Create a new user
const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, role } = req.body;
    // 📝 Validate user data
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   Logger.error('❌ Validation errors:', errors.array());
    //   res.status(400).json({ errors: errors.array() });
    //   return;
    // }

    // 🔍 Check if user already exists
    const resultExistingUser = Promise.resolve(UserModel.findOne({ email }));
    const existingUser = await resultExistingUser;

    if (existingUser) {
      Logger.info('✅ User already exists', existingUser);
      res.status(400).json({ message: 'User already exists' });
      return;
    }
    // 🔒 Hash password before saving it
    const hashedPassword = await bcrypt.hash(password, 12);

    const userData = {
      email,
      password: hashedPassword,
      role,
    };

    // 💾 Create user
    const user = await UserModel.create(userData);

    Logger.info('✅ Creating user', user);
    res.status(201).json({ message: 'User created with success!', data: { user } });
  } catch (error) {
    Logger.error('❌ Error creating user', error);
    res.status(500).json({ message: '❌ Internal Server Error' });
    next(error);
  }
};

// 👤 Get user by ID
const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.id;
    const resultUser = Promise.resolve(UserModel.findById(userId).lean());
    const user = await resultUser;

    if (!user) {
      Logger.error('❌ User not found');
      res.status(404).json({ message: 'User not found' });
      return;
    }

    Logger.info('✅ Getting User by id', user);

    res.status(200).json({ data: { user } });
  } catch (error) {
    next(error);
  }
};

// 🔄 Update user by ID
const updateUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.id;
    const userData = req.body;

    const resolveUpdatedUser = Promise.resolve(UserModel.findByIdAndUpdate(userId, userData));
    const updatedUser = await resolveUpdatedUser;

    if (!updatedUser) {
      Logger.error('❌ User not found');
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const resolveUser = Promise.resolve(UserModel.findById(userId).lean());
    const user = await resolveUser;

    Logger.info('✅ Movie updated:', user);
    res.status(200).json({ data: { user: user } });
  } catch (error) {
    Logger.error('❌ Error updating user', error);
    res.status(500).json({ message: '❌ Internal Server Error' });
    next(error);
  }
};

// 👥 Get all users
const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const resultUser = Promise.resolve(UserModel.findOne({ email: req.body.email }));
    const user = await resultUser;

    if (user?.role !== UserRole.ADMIN) {
      Logger.error('❌ Access denied, role mismatch. Only admins are allowed.');
      res.status(403).json({
        message: 'Access denied, role mismatch. Only admins are allowed.',
      });
      return;
    }

    const resultUsers = Promise.resolve(UserModel.find());
    const users = await resultUsers;

    if (users.length === 0) {
      Logger.error('❌ No users found');
      res.status(404).json({ message: 'No users found' });
      return;
    }

    Logger.info('✅ Users found');
    res.status(200).json({ data: { users } });
  } catch (error) {
    Logger.error('❌ Error getting users', error);
    res.status(500).json({ message: '❌ Internal Server Error' });
    next(error);
  }
};

// 🗑️ Delete user by ID
const deleteUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.id;
    const resultUser = Promise.resolve(UserModel.findById(String(userId)).lean());
    const user = await resultUser;

    if (!user) {
      Logger.error('❌ User not found');
      res.status(404).json({ message: 'User not found' });
      return;
    }

    Promise.resolve(UserModel.findByIdAndDelete(userId));

    Logger.info('✅ User deleted:', user);

    res.status(200).json({ message: 'User deleted successfully', data: { user } });
  } catch (error) {
    Logger.error('❌ Error deleting user', error);
    res.status(500).json({ message: '❌ Internal Server Error' });
    next(error);
  }
};

// 🚪 Login user
const userLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    Logger.info('🔑 Login started');

    if (!email || !password) {
      Logger.error('❌ Email and password are required');
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const resultUser = Promise.resolve(UserModel.findOne({ email }));
    const user = await resultUser;

    if (!user || !user.password) {
      Logger.error('❌ User or password not found');
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const payload: Payload = {
      id: user.id,
      email: user.email,
      role: user.role as UserRole,
    };

    // 🔑 Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      Logger.error('❌ Invalid email or password');
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // 🎫 Generate JWT token
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: Number(JWT_EXPIRES_IN),
    });

    Logger.info('✅ Login successful');
    res.status(200).json({
      message: '✅ Login successful',
      token,
    });
  } catch (error) {
    Logger.error('❌ Error logging in', error);
    next(error);
  }
};

export { createUser, userLogin, getUserById, updateUserById, getAllUsers, deleteUserById };
