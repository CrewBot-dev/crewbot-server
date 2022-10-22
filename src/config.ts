import { readFileSync } from 'fs';
import json5 = require('json5');
import logger from './logger';

type ConfigType = {
  listenPort: number;
  environment: 'production' | 'development';
};

/**
 * Reads a config file from disk.
 * @param path the path to read config from
 * @returns a Config
 */
const loadConfig = (path: string) => {
  const fileContents = readFileSync(path).toString('utf-8');
  const loadedConfig = json5.parse<ConfigType>(fileContents);

  logger.level = loadedConfig.environment === 'development' ? 'debug' : 'info';

  return loadedConfig;
};

export const Config = loadConfig('./config.json5');
