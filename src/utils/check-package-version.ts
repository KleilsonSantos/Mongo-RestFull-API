import path from 'path';
import simpleGit from 'simple-git';
import Logger from '../config/logger';
import { promises as fs } from 'fs';
import { ErrorHandler } from '../shared/errors/ErrorHandler';

export async function getCurrentVersion(): Promise<string> {
  try {
    const packageJsonPath = path.resolve('package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));

    if (!packageJson.version) {
      Logger.error('❌ Version not found in package.json');
      throw new Error('Version not found in package.json');
    }

    Logger.info(`📦 Current version: ${packageJson.version}`);
    return packageJson.version;
  } catch (error: unknown) {
    Logger.error('❌ Failed to read or parse package.json', (error as Error).message);
    throw new Error(`Failed to read or parse package.json: ${(error as Error).message}`);
  }
}

export async function getCommittedVersion(): Promise<string> {
  try {
    const git = simpleGit();
    const content = await git.show(['HEAD:package.json']);
    const packageJson = JSON.parse(content);

    if (!packageJson.version) {
      Logger.error('❌ Version not found in last commit');
      throw new Error('Version not found in last commit');
    }

    Logger.info(`📦 Committed version: ${packageJson.version}`);
    return packageJson.version;
  } catch (error: unknown) {
    Logger.error('❌ Error fetching version from last commit', (error as Error).message);
    throw new Error(`Error fetching version from last commit: ${(error as Error).message}`);
  }
}

export async function checkVersionMismatch(): Promise<void> {
  try {
    const currentVersion = await getCurrentVersion();
    const committedVersion = await getCommittedVersion();

    if (currentVersion === committedVersion) {
      Logger.error(
        `❌ The version in package.json (${currentVersion}) has not been updated.\n` +
          `➡️ Please update it using: npm version [patch|minor|major]`,
      );
      process.exit(1);
    }

    Logger.info('✅ Version has been updated. Proceeding with commit.');
  } catch (error: unknown) {
    ErrorHandler.handle(error, true);
    process.exit(1);
  }
}
