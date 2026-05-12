import { Route } from './types';

const DEFAULT_SCENE = 'default';
const DEFAULT_METHOD = 'POST';

export const normalizeActiveScenes = (scenes: string[] = []): string[] => {
  const normalized = new Set<string>(
    scenes
      .map((scene) => scene.trim())
      .filter(Boolean),
  );

  normalized.add(DEFAULT_SCENE);

  return Array.from(normalized);
};

const getRouteScene = (route: Route): string => route.scene ?? DEFAULT_SCENE;
const getRouteMethod = (route: Route): string => (route.method ?? DEFAULT_METHOD).toUpperCase();

export const selectRoute = (routes: Route[], requestPath: string, requestMethod: string, activeScenes: string[]): Route | undefined => {
  const activeSceneSet = new Set(normalizeActiveScenes(activeScenes));
  const normalizedMethod = requestMethod.toUpperCase();

  const matchingRoutes = routes.filter((route) => {
    return route.path === requestPath
      && route.enabled
      && getRouteMethod(route) === normalizedMethod
      && activeSceneSet.has(getRouteScene(route));
  });

  const nonDefaultRoute = matchingRoutes.find((route) => getRouteScene(route) !== DEFAULT_SCENE);
  return nonDefaultRoute ?? matchingRoutes.find((route) => getRouteScene(route) === DEFAULT_SCENE);
};
