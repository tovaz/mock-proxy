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

Define rutas por escenario en `scenes/<env>/<scene>/routes/routes.ts` y luego impórtalas en `routes/<env>.routes.ts`.

Cada escenario puede usar:

- `path`
- `method` (por defecto `POST`)
- `enabled`
- `scene` (por defecto `default`)
- `resolve`:
  - `string` con ruta a `scenes/<env>/<scene>/mocks/<archivo>.json`
  - función importada desde `scenes/<env>/<scene>/resolvers/<archivo>.ts`

## Añadir nuevas escenas

1. Crea `scenes/<env>/<scene>/mocks/` y añade tus JSON.
2. Si necesitas lógica custom, crea `scenes/<env>/<scene>/resolvers/`.
3. Crea `scenes/<env>/<scene>/routes/routes.ts` con las rutas de ese escenario.
4. Importa ese `routes.ts` desde `routes/<env>.routes.ts`.
5. Arranca con `--scenes <scene>` para activarla.

La escena `default` siempre está activa.
