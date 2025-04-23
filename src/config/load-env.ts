import dotenv from 'dotenv';
import Logger from './logger';

const NODE_ENV = process.env.NODE_ENV ?? 'development';
const envPath = `.env.${NODE_ENV}`;

const result = dotenv.config({
  path: envPath,
});

result.error
  ? Logger.error(`❌ Failed to load environment from ${envPath}`)
  : Logger.info(`✅ Loaded environment from: ${envPath}`);

export default process.env;
