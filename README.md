# Sistema de diseño

Una sola forma de diseñar para todas las apps: la misma letra, los mismos grises y los mismos componentes. Cada app tiene su propio color.

**Guía:** https://design-system-rose-chi.vercel.app. Ahí está cada pieza funcionando, con las reglas, qué apps la usan y qué trajo cada versión.

## Apps que lo usan

pay, outfit, wine, LOOP y bookmarks. La página **Apps** de la guía dice qué versión tiene cada una, qué piezas usa y qué le falta.

## Usarlo en una app

1. En el `package.json` de la app, con la última versión publicada:

   ```json
   "@agustincairone/design-system": "github:agustincairone/design-system#vX.Y.Z"
   ```

   El `package-lock.json` tiene que anotarlo como `git+https://github.com/...`. Si npm escribe `git+ssh://`, Vercel no lo puede bajar.

2. En el CSS de la app, el tema y el color de la app:

   ```css
   @import "@agustincairone/design-system/theme.css";
   @import "@agustincairone/design-system/brands/pay-tracker.css";
   ```

3. Cada pieza se importa por su camino:

   ```tsx
   import { Button } from "@agustincairone/design-system/components/ui/button"
   ```

La sección **Cómo usarlo** de la guía tiene los pasos completos: el viewport, la barra de abajo y el manifest.

## Cómo está armado

| Carpeta | Qué hay |
|---|---|
| `src/components/` | Las piezas, que son lo que reciben las apps. `ui/` tiene las básicas, `controls/` las de elegir y mover valores, `cards/` las fichas y `audio/` las de LOOP. |
| `src/index.css` | El tema: colores, letras, espacios y utilidades. |
| `src/brands.ts` | El color de cada app, en claro y en oscuro. |
| `src/guide/` | La guía. Cada sección está en su propio archivo en `sections/`. `apps.ts` tiene las apps, `versions.ts` las versiones y `usage.json` lo que usa cada app. |
| `registry/ds/` | Copia de las piezas para instalar con shadcn. |
| `lib/` | Lo que se publica para las apps. Lo genera `npm run build:lib`: no se edita a mano. |
| `scripts/` | `build-lib.mjs` arma `lib/`; `usage.mjs` anota qué usa cada app. |

## Publicar una versión

1. Cambiar la pieza en `src/components/` y copiarla igual en `registry/ds/`. Si hace falta, anotarla en `registry.json`.
2. Revisar y armar:

   ```sh
   npx tsc --noEmit -p tsconfig.app.json
   npx shadcn build
   npm run build:lib
   ```

3. Sumar la versión arriba de todo en `src/guide/versions.ts`.
4. Con el OK del dueño: pasar a `main`, crear el tag `vX.Y.Z` y subir los dos. La guía se publica sola en Vercel.
5. En cada app: cambiar la versión en `package.json`, correr `npm install` y revisar el lockfile (https). Después, en esta carpeta, correr `npm run usage` para que la guía sepa qué usa cada una.

Nada va a producción (main, tags o Vercel) sin el OK del dueño para ese cambio.
