import path from 'path';
import simpleGit from 'simple-git';
import Logger from '../../config/logger';
import { promises as fs } from 'fs';
import { ErrorHandler } from '../../shared/errors/ErrorHandler';
import {
  getCurrentVersion,
  getCommittedVersion,
  checkVersionMismatch,
} from '../../utils/check-package-version';

jest.mock('simple-git');

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}));

jest.mock('../../config/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

jest.mock('../../shared/errors/ErrorHandler', () => ({
  ErrorHandler: {
    handle: jest.fn(),
  },
}));

const mockedGitShow = jest.fn();
(simpleGit as jest.Mock).mockReturnValue({
  show: mockedGitShow,
});

describe('📦 Version Checker', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
    jest.restoreAllMocks();
  });

  describe('getCurrentVersion', () => {
    it('✅ should return version from package.json', async () => {
      const version = '1.0.0';
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify({ version }));

      const result = await getCurrentVersion();

      expect(fs.readFile).toHaveBeenCalledWith(path.resolve('package.json'), 'utf8');
      expect(Logger.info).toHaveBeenCalledWith(`📦 Current version: ${version}`);
      expect(result).toBe(version);
    });

    it('❌ should throw error if package.json has no version', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify({}));

      await expect(getCurrentVersion()).rejects.toThrow('Version not found in package.json');
      expect(Logger.error).toHaveBeenCalledWith('❌ Version not found in package.json');
    });

    it('❌ should throw error if reading package.json fails', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('Read failed'));

      await expect(getCurrentVersion()).rejects.toThrow(
        'Failed to read or parse package.json: Read failed',
      );
      expect(Logger.error).toHaveBeenCalledWith(
        '❌ Failed to read or parse package.json',
        'Read failed',
      );
    });
  });

  describe('getCommittedVersion', () => {
    it('✅ should return version from last commit', async () => {
      const version = '1.0.0';
      mockedGitShow.mockResolvedValue(JSON.stringify({ version }));

      const result = await getCommittedVersion();

      expect(mockedGitShow).toHaveBeenCalledWith(['HEAD:package.json']);
      expect(Logger.info).toHaveBeenCalledWith(`📦 Committed version: ${version}`);
      expect(result).toBe(version);
    });

    it('❌ should throw error if last commit has no version', async () => {
      mockedGitShow.mockResolvedValue(JSON.stringify({}));

      await expect(getCommittedVersion()).rejects.toThrow('Version not found in last commit');
      expect(Logger.error).toHaveBeenCalledWith('❌ Version not found in last commit');
    });

    it('❌ should throw error if fetching commit fails', async () => {
      mockedGitShow.mockRejectedValue(new Error('Git error'));

      await expect(getCommittedVersion()).rejects.toThrow(
        'Error fetching version from last commit: Git error',
      );
      expect(Logger.error).toHaveBeenCalledWith(
        '❌ Error fetching version from last commit',
        'Git error',
      );
    });
  });

  describe('checkVersionMismatch', () => {
    let exitSpy: jest.SpyInstance;

    beforeEach(() => {
      exitSpy = jest.spyOn(process, 'exit').mockImplementation(((code?: number) => {
        throw new Error(`Process exited with code ${code}`);
      }) as never);
    });

    afterEach(() => {
      exitSpy.mockRestore();
    });

    it('❌ should exit process if versions match', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify({ version: '1.0.0' }));
      mockedGitShow.mockResolvedValue(JSON.stringify({ version: '1.0.0' }));

      await expect(checkVersionMismatch()).rejects.toThrow('Process exited with code 1');

      expect(Logger.error).toHaveBeenCalledWith(
        expect.stringContaining('❌ The version in package.json (1.0.0) has not been updated.'),
      );
      expect(exitSpy).toHaveBeenCalledWith(1);
    });

    it('✅ should log success if versions are different', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify({ version: '1.0.1' }));
      mockedGitShow.mockResolvedValue(JSON.stringify({ version: '1.0.0' }));

      await checkVersionMismatch();

      expect(Logger.info).toHaveBeenCalledWith(
        '✅ Version has been updated. Proceeding with commit.',
      );
      expect(exitSpy).not.toHaveBeenCalled();
    });

    it('❌ should handle errors and exit process if any error occurs', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('Read error'));

      await expect(checkVersionMismatch()).rejects.toThrow('Process exited with code 1');

      expect(ErrorHandler.handle).toHaveBeenCalled();
      expect(exitSpy).toHaveBeenCalledWith(1);
    });
  });
});
