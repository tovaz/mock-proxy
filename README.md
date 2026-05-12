# mock-proxy

Mock proxy server en TypeScript para interceptar rutas y devolver mocks por escenas.

## Uso

```bash
npm install
npm run serve -- --env renfe
npm run serve -- --env renfe --scenes no-trains
npm run serve -- --env renfe --scenes no-trains,error-500
```

## Añadir un nuevo environment

1. Crea `envs/<nombre>.env.ts` exportando `env`.
2. Crea `routes/<nombre>.routes.ts` exportando `routes: Route[]`.
3. Ejecuta con `--env <nombre>`.

## Añadir nuevas rutas

En el archivo `routes/<env>.routes.ts`, añade objetos `Route` con:

- `path`
- `method` (por defecto `POST`)
- `enabled`
- `scene` (por defecto `default`)
- `resolve` (`string` con ruta a JSON o función custom)

## Añadir nuevas escenas

1. Crea el JSON en `scenes/<env>/<scene>/...`.
2. Añade la ruta con `scene: '<scene>'`.
3. Arranca con `--scenes <scene>` para activarla.

La escena `default` siempre está activa.
