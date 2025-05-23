import { startServer } from './server';

if (require.main === module || process.env.TEST_MAIN === 'true') {
  startServer();
}