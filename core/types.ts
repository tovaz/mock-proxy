import { Request, Response } from 'express';

export type ResolverFn = (req: Request, res: Response, route: Route) => void;

export interface Route {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  enabled: boolean;
  scene?: string;
  resolve: string | ResolverFn;
}

export interface Environment {
  name: string;
  target: string;
  port?: number;
  changeOrigin?: boolean;
}

export interface ProxyConfig {
  env: Environment;
  routes: Route[];
  activeScenes: string[];
}
