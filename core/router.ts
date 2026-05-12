import fs from 'node:fs/promises';
import path from 'node:path';
import { RequestHandler } from 'express';
import { selectRoute } from './scene-selector';
import { Route } from './types';

interface RouterOptions {
  routes: Route[];
  activeScenes: string[];
  proxyHandler: RequestHandler;
}

export const createRouter = ({ routes, activeScenes, proxyHandler }: RouterOptions): RequestHandler => {
  return async (req, res, next) => {
    const route = selectRoute(routes, req.path, req.method, activeScenes);

    if (!route) {
      proxyHandler(req, res, next);
      return;
    }

    if (typeof route.resolve === 'function') {
      route.resolve(req, res, route);
      return;
    }

    const filePath = path.resolve(process.cwd(), route.resolve);

    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      res.json(JSON.parse(fileContent));
    } catch {
      if (!res.headersSent) {
        res.status(500).json({
          error: 'Failed to resolve mock response',
          path: route.resolve,
        });
      }
    }
  };
};
