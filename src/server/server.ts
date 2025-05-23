import '../config/load-env';
import http from 'http';
import app from '../app';
import Logger from '../config/logger';
import { connect, disconnect } from '../config/db';

const port: string | number = process.env.PORT ?? 3000;
const localhost: string | undefined = process.env.LOCALHOST ?? 'http://localhost';

export const startServer = async (): Promise<http.Server> => {
  try {
    await connect();
    const server = app.listen(port, () => {
      Logger.info(`🚀 Server running on ${localhost}:${port}`);
    });

    return server;
  } catch (error) {
    Logger.error('❌ Failed to connect to MongoDB:', error);
    await disconnect();
    process.exit(1);
  }
};
