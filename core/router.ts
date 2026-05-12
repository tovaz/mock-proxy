import fs from 'node:fs/promises';
import path from 'node:path';
import { RequestHandler } from 'express';
import { selectRoute } from './scene-selector';
import { Route } from './types';

interface RouterOptions {
  routes: Route[];
  activeScenes: string[];
  proxyHandler: RequestHandler;
  mockPayloads: Map<string, unknown>;
}

export const loadMockPayloads = async (routes: Route[]): Promise<Map<string, unknown>> => {
  const payloads = new Map<string, unknown>();

  const responseFiles = Array.from(
    new Set(
      routes
        .filter((route): route is Route & { resolve: string } => route.enabled && typeof route.resolve === 'string')
        .map((route) => route.resolve),
    ),
  );

  await Promise.all(responseFiles.map(async (responseFile) => {
    const filePath = path.resolve(process.cwd(), responseFile);
    const fileContent = await fs.readFile(filePath, 'utf8');
    payloads.set(responseFile, JSON.parse(fileContent));
  }));

  return payloads;
};

export const createRouter = ({ routes, activeScenes, proxyHandler, mockPayloads }: RouterOptions): RequestHandler => {
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

    const payload = mockPayloads.get(route.resolve);

    if (payload === undefined) {
      res.status(500).json({
        error: 'Failed to resolve mock response',
        path: route.resolve,
      });
      return;
    }

    res.json(payload);
  };
};
