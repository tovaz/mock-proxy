import { Route } from '../../../../core/types';

export const routes: Route[] = [
  {
    path: '/van/RestInterfaceMD/getMDTrains',
    method: 'POST',
    enabled: true,
    scene: 'error-500',
    resolve: 'scenes/renfe/error-500/mocks/getMDTrains.json',
  },
];
