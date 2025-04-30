import Logger from '../config/logger';
import { checkVersionMismatch } from '../utils/check-package-version';

export async function runAsyncPackageVersion() {
  try {
    await checkVersionMismatch();
  } catch (error) {
    Logger.error('❌ Failed running function:', error);
  }
}

if (require.main === module || process.env.TEST_MAIN == 'true') {
  runAsyncPackageVersion();
}
