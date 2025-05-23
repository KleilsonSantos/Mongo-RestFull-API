import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Logger from '../config/logger';
import UserModel from '../model/User';
import { Payload } from '../model/Payload.interface';
import { UserRole } from '../enum/user-role.enum';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;
const JWT_EXPIRES_IN: jwt.SignOptions['expiresIn'] = process.env
  .JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'];

if (!JWT_SECRET || !JWT_EXPIRES_IN) {
  Logger.error('❌ JWT_SECRET or JWT_EXPIRES_IN not found in environment variables');
  throw new Error('JWT_SECRET or JWT_EXPIRES_IN not found in environment variables');
}

const testErrorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error('This is a test error');
  next(error);
};

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
    const options: jwt.SignOptions = { expiresIn: JWT_EXPIRES_IN ?? '1h' };
    const token = jwt.sign(userData, JWT_SECRET, options);
    Logger.info('🔑 Generating JWT token:', token);

    Logger.info('✅ Creating user', user);
    res.status(201).json({ message: 'User created with success!', data: { user }, token: token });
  } catch (error) {
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

    Logger.info('✅ User updated:', user);
    res.status(200).json({ data: { user: user } });
  } catch (error) {
    next(error);
  }
};

// 👥 Get all users
const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (typeof req.body.email !== 'string') {
      res.status(400).json({ message: 'Email inválido.' });
    }

    const resultUser = Promise.resolve(UserModel.findOne({ email: { $eq: req.body.email } }));
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
      expiresIn: JWT_EXPIRES_IN,
    });

    Logger.info('🔑 Generating JWT token:', token);
    Logger.info('✅ Login successful');
    res.status(200).json({
      message: '✅ Login successful',
      token,
    });
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
  testErrorMiddleware,
};
