import { Route } from '../../../../core/types';

export const routes: Route[] = [
  {
    path: '/van/RestInterfaceMD/getMDTrains',
    method: 'POST',
    enabled: true,
    scene: 'no-trains',
    resolve: 'scenes/renfe/no-trains/mocks/getMDTrains.json',
  },
];
