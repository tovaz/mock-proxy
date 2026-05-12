import { Route } from '../core/types';

export const routes: Route[] = [
  {
    path: '/van/RestInterfaceMD/getMDTrains',
    method: 'POST',
    enabled: true,
    scene: 'default',
    resolve: 'scenes/renfe/default/getMDTrains.json',
  },
  {
    path: '/van/RestInterfaceMD/getMDTrains',
    method: 'POST',
    enabled: true,
    scene: 'no-trains',
    resolve: 'scenes/renfe/no-trains/getMDTrains.json',
  },
  {
    path: '/van/RestInterfaceMD/getMDTrains',
    method: 'POST',
    enabled: true,
    scene: 'error-500',
    resolve: 'scenes/renfe/error-500/getMDTrains.json',
  },
  {
    path: '/van/RestInterfaceMD/getMDFares',
    method: 'POST',
    enabled: true,
    scene: 'default',
    resolve: (_req, res) => {
      res.status(200).json({ fares: [], custom: true });
    },
  },
  {
    path: '/van/RestInterfaceMD/getMDPrice',
    method: 'POST',
    enabled: false,
    scene: 'default',
    resolve: 'scenes/renfe/default/getMDPrice.json',
  },
];
