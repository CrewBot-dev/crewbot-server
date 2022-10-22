import { readFileSync } from 'fs';
import json5 = require('json5');

type Config = {
  listenPort: number;
};

const loadConfig = (path: string) => {
  const fileContents = readFileSync(path).toString('utf-8');
  return json5.parse<Config>(fileContents);
};

export const Config = loadConfig('./config.json5');
