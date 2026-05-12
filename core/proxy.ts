import { RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Environment } from './types';

export const createProxyHandler = (env: Environment): RequestHandler => {
  return createProxyMiddleware({
    target: env.target,
    changeOrigin: env.changeOrigin ?? true,
  }) as unknown as RequestHandler;
};
