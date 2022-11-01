import { parse } from 'yaml';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

export const getConfig = (type?: string) => {
  const environment = getEnv();
  const yamlPath = path.join(process.cwd(), `./.config/.${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file);
  if (type) {
    return config[type];
  }
  return config;
};
