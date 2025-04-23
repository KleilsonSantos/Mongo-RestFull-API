jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    access: jest.fn(),
    writeFile: jest.fn(),
  },
}));

import { promises as fs } from 'fs';
import {
  getPackageVersion,
  readSonarProperties,
  updateSonarProjectVersion,
  writeSonarProperties,
  synchronizeSonarVersion,
} from '../../utils/package-sonar-sync';

describe('📦 Package Sonar Sync Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPackageVersion', () => {
    it('✅ should return package version from package.json', async () => {
      const mockPackageJson = { version: '1.0.0' };
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockPackageJson));

      const version = await getPackageVersion();

      expect(fs.readFile).toHaveBeenCalledWith(expect.any(String), 'utf8');
      expect(version).toBe('1.0.0');
    });

    it('❌ should throw error when package.json is invalid', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('invalid json');

      await expect(getPackageVersion()).rejects.toThrow('Failed to parse package.json');
    });

    it('❌ should throw error when package.json is not found', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));

      await expect(getPackageVersion()).rejects.toThrow(
        'Failed to parse package.json: File not found',
      );
    });
    it('❌ should handle string error', async () => {
      const mockError = 'Unexpected string error';
      (fs.readFile as jest.Mock).mockRejectedValue(mockError);

      await expect(getPackageVersion()).rejects.toThrow(
        'Failed to parse package.json: Unknown error',
      );
    });
    it('❌ should handle numeric error', async () => {
      const mockError = 404;
      (fs.readFile as jest.Mock).mockRejectedValue(mockError);

      await expect(getPackageVersion()).rejects.toThrow(
        'Failed to parse package.json: Unknown error',
      );
    });
  });

  describe('readSonarProperties', () => {
    it('✅ should return file content when file exists', async () => {
      const mockContent = 'sonar.projectKey=test';
      (fs.access as jest.Mock).mockResolvedValue(undefined);
      (fs.readFile as jest.Mock).mockResolvedValue(mockContent);

      const content = await readSonarProperties('sonar-project.properties');

      expect(fs.access).toHaveBeenCalledWith(expect.any(String));
      expect(fs.readFile).toHaveBeenCalledWith(expect.any(String), 'utf8');
      expect(content).toBe(mockContent);
    });

    it('✅ should return empty string when file does not exist', async () => {
      (fs.access as jest.Mock).mockRejectedValue(new Error('File not found'));

      const content = await readSonarProperties('sonar-project.properties');

      expect(fs.access).toHaveBeenCalledWith(expect.any(String));
      expect(fs.readFile).not.toHaveBeenCalled();
      expect(content).toBe('');
    });
    it('❌ should handle string error', async () => {
      (fs.access as jest.Mock).mockRejectedValue(new Error('Failed to read sonar properties'));

      const result = await readSonarProperties('sonar-project.properties');
      expect(result).toBe('');
    });

    it('❌ should throw error when readFile fails', async () => {
      (fs.access as jest.Mock).mockResolvedValue(undefined);
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('Read failed'));

      await expect(readSonarProperties('sonar-project.properties')).rejects.toThrow(
        'Failed to read sonar properties: Error: Read failed',
      );
    });
  });

  describe('updateSonarProjectVersion', () => {
    it('✅ should update existing version', () => {
      const content = 'sonar.projectVersion=1.0.0\nother=value';
      const newVersion = '2.0.0';

      const result = updateSonarProjectVersion(content, newVersion);

      expect(result).toBe('sonar.projectVersion=2.0.0\nother=value');
    });

    it('✅ should add version if not exists', () => {
      const content = 'other=value';
      const newVersion = '1.0.0';

      const result = updateSonarProjectVersion(content, newVersion);

      expect(result).toBe('other=value\nsonar.projectVersion=1.0.0');
    });
  });

  describe('writeSonarProperties', () => {
    it('✅ should write content to file', async () => {
      const content = 'sonar.projectVersion=1.0.0';
      const filePath = 'sonar-project.properties';

      await writeSonarProperties(filePath, content);

      expect(fs.writeFile).toHaveBeenCalledWith(filePath, content, 'utf8');
    });

    it('❌ should throw error when write fails', async () => {
      const content = 'sonar.projectVersion=1.0.0';
      const filePath = 'sonar-project.properties';
      (fs.writeFile as jest.Mock).mockRejectedValue(new Error('Write failed'));

      await expect(writeSonarProperties(filePath, content)).rejects.toThrow(
        'Failed to write sonar properties: Error: Write failed',
      );
    });
  });

  describe('synchronizeSonarVersion', () => {
    it('✅ should synchronize version successfully', async () => {
      const mockVersion = '1.0.0';
      const mockContent = 'sonar.projectKey=test';
      const updatedContent = 'sonar.projectKey=test\nsonar.projectVersion=1.0.0';

      (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify({ version: mockVersion }));
      (fs.access as jest.Mock).mockResolvedValue(undefined);
      (fs.readFile as jest.Mock).mockResolvedValueOnce(mockContent);
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      await synchronizeSonarVersion();

      expect(fs.writeFile).toHaveBeenCalledWith(expect.any(String), updatedContent, 'utf8');
    });

    it('❌ should throw error when getPackageVersion fails', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('Read failed'));

      await expect(synchronizeSonarVersion()).rejects.toThrow(
        'Failed to parse package.json: Read failed',
      );
    });
  });
});
