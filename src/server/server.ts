import '../config/load-env';
import app from '../app';
import Logger from '../config/logger';

import { connect, disconnect } from '../config/db';

// 🌍 Get environment variables
const port: string | number = process.env.PORT ?? 3000;
const localhost: string | undefined = process.env.LOCALHOST ?? 'http://localhost';

app.listen(port, async () => {
  try {
    await connect();
    Logger.info(`🚀 Server running on ${localhost}:${port}`);
  } catch (error) {
    Logger.error('❌ Failed to connect to MongoDB:', error);
    await disconnect();
    process.exit(1);
  }
});
