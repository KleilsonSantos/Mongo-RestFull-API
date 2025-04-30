import app from '../../app';
import request from 'supertest';
import Logger from '../../config/logger';
import { startServer } from '../../server/server';
import { connect, disconnect } from '../../config/db'; // ajuste caminho real
import { generateMockToken } from '../mocks/validate-token.mock';

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
  let server: any;
  let exitSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    exitSpy = jest.spyOn(process, 'exit').mockImplementation((() => {}) as any);
  });

  afterEach(async () => {
    if (server && server.close) {
      await new Promise((resolve) => server.close(resolve));
    }
    exitSpy.mockRestore();
  });

  it('✅ should connect to database and log success message', async () => {
    (connect as jest.Mock).mockResolvedValue(true);

    server = await startServer();
    await new Promise((resolve) => server.once('listening', resolve));

    expect(connect).toHaveBeenCalled();
    expect(Logger.info).toHaveBeenCalledWith(expect.stringContaining('🚀 Server running on'));
    expect(exitSpy).not.toHaveBeenCalled();
  });

  it('❌ should log error, disconnect, and exit if connect fails', async () => {
    const error = new Error('Connection failed');
    (connect as jest.Mock).mockRejectedValue(error);

    server = await startServer();

    expect(connect).toHaveBeenCalled();
    expect(Logger.error).toHaveBeenCalledWith('❌ Failed to connect to MongoDB:', error);
    expect(disconnect).toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it('✅ should return OK for /health', async () => {
    const response = await request(app).get('/api/v1/metrics');

    expect(response.status).toBe(200);
  });
});
