import path from 'path';
import { promises as fs } from 'fs';

async function getPackageVersion(): Promise<string> {
  try {
    const packageJsonPath = path.resolve('package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8')) as {
      version: string;
    };
    return packageJson.version;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse package.json: ${error.message}`);
    }
    throw new Error('Failed to parse package.json: Unknown error');
  }
}

async function readSonarProperties(filePath: string): Promise<string> {
  try {
    const resolvedPath = path.resolve(filePath);
    const exists = await fs
      .access(resolvedPath)
      .then(() => true)
      .catch(() => false);

    return exists ? await fs.readFile(resolvedPath, 'utf8') : '';
  } catch (error: unknown) {
    throw new Error(`Failed to read sonar properties: ${error}`);
  }
}

function updateSonarProjectVersion(content: string, version: string): string {
  const versionRegex = /^sonar\.projectVersion=.*$/m;
  if (versionRegex.exec(content)) {
    return content.replace(versionRegex, `sonar.projectVersion=${version}`);
  }
  return content + `\nsonar.projectVersion=${version}`;
}

async function writeSonarProperties(filePath: string, content: string): Promise<void> {
  try {
    await fs.writeFile(filePath, content, 'utf8');
  } catch (error: unknown) {
    throw new Error(`Failed to write sonar properties: ${error}`);
  }
}

async function synchronizeSonarVersion(): Promise<void> {
  const sonarPropertiesPath = path.resolve('sonar-project.properties');
  const version = await getPackageVersion();
  let sonarProperties = await readSonarProperties(sonarPropertiesPath);
  sonarProperties = updateSonarProjectVersion(sonarProperties, version);
  await writeSonarProperties(sonarPropertiesPath, sonarProperties);
}

export {
  getPackageVersion,
  readSonarProperties,
  updateSonarProjectVersion,
  writeSonarProperties,
  synchronizeSonarVersion,
};
