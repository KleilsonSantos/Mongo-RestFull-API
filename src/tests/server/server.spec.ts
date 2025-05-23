import app from '../../app';
import Logger from '../../config/logger';
import mongoose from 'mongoose';
import { startServer } from '../../server/server';
import { generateMockToken } from '../mocks/validate-token.mock';
import { connect, disconnect } from '../../config/db'; // ajuste caminho real

jest.mock('../../app', () => {
  const originalModule = jest.requireActual('../../app');
  return {
    ...originalModule,
    listen: jest.fn().mockImplementation((port, cb) => {
      cb(); // chama o callback para simular start
      connect();
      Logger.info(`🚀 Server running on http://localhost:${port}`);
      return { close: jest.fn() };
    }),
    get: jest.fn((path, cb) => {
      cb({}, { status: jest.fn().mockReturnThis(), send: jest.fn() });
    }),
    set: jest.fn((path, cb) => {
      cb({}, { status: jest.fn().mockReturnThis(), send: jest.fn() });
    }),
    address: jest.fn(() => ({
      port: 7000,
    })),
  };
});

jest.mock('../../config/db', () => ({
  connect: jest.fn().mockResolvedValue(true),
  disconnect: jest.fn(),
  Error: jest.fn(),
}));

jest.mock('../../config/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

const token = generateMockToken();

describe('🚀 Server Startup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await disconnect();
  });

  it('✅ should connect and start server successfully', async () => {
    await startServer();

    expect(connect).toHaveBeenCalled();
    expect(app.listen).toHaveBeenCalled();
    expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('🚀 Server running'));
  });

  it('💥 should handle connection error and exit', async () => {
    const error = new Error('Connection failed');
    (connect as jest.Mock).mockRejectedValue(error);
    const processExit = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);

    try {
      await startServer();
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe('exit');
      } else {
        throw e;
      }
    }
    expect(Logger.error).toHaveBeenCalledWith('❌ Failed to connect to MongoDB:', error);
    expect(disconnect).toHaveBeenCalled();
    expect(processExit).toHaveBeenCalledWith(1);
  });
});
