import { Route } from '../../../../core/types';
import { getMDFaresResolver } from '../resolvers/getMDFares';

export const routes: Route[] = [
  {
    path: '/van/RestInterfaceMD/getMDTrains',
    method: 'POST',
    enabled: true,
    scene: 'default',
    resolve: 'scenes/renfe/default/mocks/getMDTrains.json',
  },
  {
    path: '/van/RestInterfaceMD/getMDFares',
    method: 'POST',
    enabled: true,
    scene: 'default',
    resolve: getMDFaresResolver,
  },
  {
    path: '/van/RestInterfaceMD/getMDPrice',
    method: 'POST',
    enabled: false,
    scene: 'default',
    resolve: 'scenes/renfe/default/mocks/getMDPrice.json',
  },
];
