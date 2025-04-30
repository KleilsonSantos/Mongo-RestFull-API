import mongoose from 'mongoose';
import Logger from '../../config/logger';
import { connect, disconnect } from '../../config/db';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('../../config/logger', () => ({
  error: jest.fn(),
  info: jest.fn(),
}));

describe('🔌 MongoDB Connection', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  describe('connect()', () => {
    it('✅ should connect to MongoDB successfully', async () => {
      (mongoose.connect as jest.Mock).mockResolvedValue('mockConnection');

      process.env.MONGODB_URI = 'mongodb://localhost:27017/testdb';
      const connection = await connect();

      expect(mongoose.connect).toHaveBeenCalledWith('mongodb://localhost:27017/testdb', {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      expect(Logger.info).toHaveBeenCalledWith('✅🔗 Connected to MongoDB database successfully.');
      expect(connection).toBe('mockConnection');
    });

    it('❌ should throw an error if MONGODB_URI is not defined', async () => {
      delete process.env.MONGODB_URI;

      await expect(connect()).rejects.toThrow('MONGODB_URI is required but not provided.');
      expect(Logger.error).toHaveBeenCalledWith(
        '❌ MONGODB_URI is not defined in environment variables.',
      );
      expect(mongoose.connect).not.toHaveBeenCalled();
    });

    it('❌ should throw error if mongoose.connect fails', async () => {
      process.env.MONGODB_URI = 'mongodb://localhost:27017/testdb';
      const mockError = new Error('Connection failed');
      (mongoose.connect as jest.Mock).mockRejectedValue(mockError);

      await expect(connect()).rejects.toThrow('Connection failed');

      expect(mongoose.connect).toHaveBeenCalledWith('mongodb://localhost:27017/testdb', {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      expect(Logger.error).toHaveBeenCalledWith(
        '❌ Database connection error: Error: Connection failed',
      );
    });
  });

  describe('disconnect()', () => {
    it('✅ should disconnect successfully', async () => {
      (mongoose.disconnect as jest.Mock).mockResolvedValue(undefined);

      await disconnect();

      expect(mongoose.disconnect).toHaveBeenCalled();
      expect(Logger.info).toHaveBeenCalledWith(
        '✅🔗 Disconnected from MongoDB database successfully.',
      );
    });

    it('❌ should log error if mongoose.disconnect fails', async () => {
      const mockError = new Error('Disconnection failed');
      (mongoose.disconnect as jest.Mock).mockRejectedValue(mockError);

      await disconnect();
      expect((Logger.error as jest.Mock).mock.calls[0][0]).toEqual(
        expect.stringContaining(`❌ Database disconnection error`),
      );
    });
  });
});
