import express from 'express';
import { config } from './config';
import { loadEnvironment, loadRoutes } from './core/env-loader';
import { createProxyHandler } from './core/proxy';
import { createRouter } from './core/router';
import { normalizeActiveScenes } from './core/scene-selector';

interface CliArgs {
  env?: string;
  scenes: string[];
}

const parseCliArgs = (): CliArgs => {
  const args = process.argv.slice(2);
  const parsed: CliArgs = { scenes: [] };

  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--env') {
      parsed.env = args[index + 1];
      index += 1;
      continue;
    }

    if (args[index] === '--scenes') {
      parsed.scenes = (args[index + 1] ?? '')
        .split(',')
        .map((scene) => scene.trim())
        .filter(Boolean);
      index += 1;
    }
  }

  return parsed;
};

const startServer = (): void => {
  const { env: envName, scenes: cliScenes } = parseCliArgs();

  if (!envName) {
    throw new Error('Missing required argument: --env <environment-name>');
  }

  const env = loadEnvironment(envName);
  const routes = loadRoutes(envName);
  const activeScenes = normalizeActiveScenes([...config.activeScenes, ...cliScenes]);

  const app = express();
  app.use(createRouter({
    routes,
    activeScenes,
    proxyHandler: createProxyHandler(env),
  }));

  const port = env.port ?? 3000;
  const enabledRoutes = routes.filter((route) => route.enabled).length;
  const disabledRoutes = routes.length - enabledRoutes;

  app.listen(port, () => {
    console.log(`Active environment: ${env.name}`);
    console.log(`Proxy target: ${env.target}`);
    console.log(`Active scenes: ${activeScenes.join(', ')}`);
    console.log(`Routes: ${enabledRoutes} enabled / ${disabledRoutes} disabled`);
    console.log(`Mock proxy server running on http://localhost:${port}`);
  });
};

startServer();
