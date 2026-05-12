import fs from 'node:fs';
import path from 'node:path';
import { Environment, Route } from './types';

const loadModule = <T>(filePath: string, exportName: string): T => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const moduleExports = require(filePath);

  if (!(exportName in moduleExports)) {
    throw new Error(`Missing export "${exportName}" in ${filePath}`);
  }

  return moduleExports[exportName] as T;
};

export const loadEnvironment = (envName: string): Environment => {
  const filePath = path.resolve(process.cwd(), 'envs', `${envName}.env.ts`);
  return loadModule<Environment>(filePath, 'env');
};

export const loadRoutes = (envName: string): Route[] => {
  const filePath = path.resolve(process.cwd(), 'routes', `${envName}.routes.ts`);
  return loadModule<Route[]>(filePath, 'routes');
};
