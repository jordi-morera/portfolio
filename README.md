# Portfolio — Jordi Morera

Portfolio estático con **Astro + TypeScript + Tailwind CSS 4**. Cada proyecto tiene una ficha con un *pitch* corto para recruiters y, debajo, su README sincronizado desde GitHub.

## Arrancar
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Cómo funciona
- `src/data/site.ts` — tus datos (email, GitHub, LinkedIn…).
- `src/data/projects.ts` — **la única fuente de verdad** de los proyectos. Añadir uno = añadir un objeto.
- `src/lib/readme.ts` — en build descarga `README.md` de `raw.githubusercontent.com`. Si falla (repo privado, sin red, sin subir), usa la copia de `src/readmes/<slug>.md`. Reescribe imágenes y enlaces relativos para que apunten al repo.
- `src/pages/projects/[slug].astro` — ficha: pitch + highlights + stack + demo + README.

## Despliegue
Ver [`DEPLOY_PLAN.md`](DEPLOY_PLAN.md).
