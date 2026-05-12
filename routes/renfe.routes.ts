import { Route } from '../core/types';
import { routes as defaultRoutes } from '../scenes/renfe/default/routes/routes';
import { routes as noTrainsRoutes } from '../scenes/renfe/no-trains/routes/routes';
import { routes as error500Routes } from '../scenes/renfe/error-500/routes/routes';

export const routes: Route[] = [
  ...defaultRoutes,
  ...noTrainsRoutes,
  ...error500Routes,
];
