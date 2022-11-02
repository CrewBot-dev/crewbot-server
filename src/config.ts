import { readFileSync } from 'fs';
import yaml = require('yaml');

type ConfigType = {
  listenPort: number;
  environment: 'production' | 'development';
};

export const Config: Readonly<ConfigType> = (() => {
  const fileContents = readFileSync('./config.yaml').toString('utf-8');
  const configObject = yaml.parse(fileContents) as ConfigType;

  // Config should be immutable.
  return Object.freeze(configObject);
})();
