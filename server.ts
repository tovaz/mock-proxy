import express from 'express';
import { config } from './config';
import { loadEnvironment, loadRoutes } from './core/env-loader';
import { createProxyHandler } from './core/proxy';
import { createRouter, loadMockPayloads } from './core/router';
import { normalizeActiveScenes } from './core/scene-selector';

interface CliArgs {
  env?: string;
  scenes: string[];
}

const parseCliArgs = (): CliArgs => {
  const args = process.argv.slice(2);
  const parsed: CliArgs = { scenes: [] };

  for (let argIndex = 0; argIndex < args.length; argIndex += 1) {
    if (args[argIndex] === '--env') {
      parsed.env = args[argIndex + 1];
      argIndex += 1;
      continue;
    }

    if (args[argIndex] === '--scenes') {
      parsed.scenes = (args[argIndex + 1] ?? '')
        .split(',')
        .map((scene) => scene.trim())
        .filter(Boolean);
      argIndex += 1;
    }
  }

  return parsed;
};

const startServer = async (): Promise<void> => {
  const { env: cliEnv, scenes: cliScenes } = parseCliArgs();

  const usingDefaults = !cliEnv && cliScenes.length === 0;
  const envName = cliEnv ?? config.env;
  const baseScenes = cliScenes.length > 0 ? [...config.activeScenes, ...cliScenes] : config.activeScenes;

  if (usingDefaults) {
    console.log(`No CLI arguments provided; using defaults from config.ts (env: ${envName}, scenes: ${baseScenes.join(', ')})`);
  }

  const env = loadEnvironment(envName);
  const routes = loadRoutes(envName);
  const activeScenes = normalizeActiveScenes(baseScenes);
  const mockPayloads = await loadMockPayloads(routes);

  const app = express();
  app.use(createRouter({
    routes,
    activeScenes,
    proxyHandler: createProxyHandler(env),
    mockPayloads,
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

startServer().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
