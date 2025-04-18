import fs from 'fs';

function getPackageVersion(): string {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8')) as { version: string };
    return packageJson.version;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse package.json: ${error.message}`);
    }
    throw new Error('Failed to parse package.json: Unknown error');
  }
}

function readSonarProperties(filePath: string): string {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function updateSonarProjectVersion(content: string, version: string): string {
  const versionRegex = /^sonar\.projectVersion=.*$/m;
  if (content.match(versionRegex)) {
    return content.replace(versionRegex, `sonar.projectVersion=${version}`);
  }
  return content + `\nsonar.projectVersion=${version}`;
}

function writeSonarProperties(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content, 'utf8');
}

const sonarPropertiesPath = 'sonar-project.properties';
const version = getPackageVersion();
let sonarProperties = readSonarProperties(sonarPropertiesPath);
sonarProperties = updateSonarProjectVersion(sonarProperties, version);
writeSonarProperties(sonarPropertiesPath, sonarProperties);

export { getPackageVersion, readSonarProperties, updateSonarProjectVersion, writeSonarProperties };
