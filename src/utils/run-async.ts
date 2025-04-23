import Logger from '../config/logger';
import { synchronizeSonarVersion } from './package-sonar-sync';

export async function runAsync() {
  try {
    await synchronizeSonarVersion();
  } catch (error) {
    Logger.error('❌ Failed running function:', error);
  }
}

if (require.main === module || process.env.TEST_MAIN == 'true') {
  runAsync();
}
