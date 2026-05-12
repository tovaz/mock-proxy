export interface Config {
  env: string;
  activeScenes: string[];
}

/**
 * Default server configuration.
 * These values are used when no --env or --scenes CLI arguments are provided.
 * Override at startup with: npm run serve -- --env <name> --scenes <scene1,scene2>
 */
export const config: Config = {
  env: 'renfe',
  activeScenes: ['default'],
};
