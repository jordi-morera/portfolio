# Plan de despliegue (100% gratuito)

Objetivo: que cada ficha del portfolio tenga un botón **Live demo** que funcione siempre, sin coste y sin exponer tu API key.

| # | Proyecto | Dónde | Tipo de demo | Esfuerzo |
|---|----------|-------|--------------|----------|
| 0 | **Portfolio** (este repo) | AWS S3 + CloudFront | Estático (Astro) | 1 h |
| 1 | Diario Reflexivo | Vercel (solo frontend) | Mock: respuestas de Claude pregrabadas | 1–2 h |
| 2 | Harbor | Vercel (solo `frontend/web`) | Mock: conversación guionizada | 2–3 h |
| 3 | Calma (TFM) | Vercel | Real, con cuenta demo en Cognito + DynamoDB (free tier AWS) | 1–2 h |
| 4 | My To-Do List App | Render (Docker, free) | Real (H2 en memoria) | 30 min |
| 5 | Book Service | Render (Docker, free) | Real, entra directo a Swagger UI | 30 min |

> Orden recomendado: 0 → 4 → 5 → 1 → 2 → 3. Primero lo que es "gratis de verdad" en tiempo, luego lo que requiere tocar código.

---

## 0. Portfolio → S3 + CloudFront
Es la web que ven los recruiters: que sea HTTPS. Un bucket S3 "website" a pelo solo sirve HTTP y Chrome lo marca como *No seguro*. Por eso: **S3 privado + CloudFront con OAC**.

1. **Bucket** privado (bloqueo de acceso público activado). No actives "static website hosting".
2. **CloudFront**: origen = el bucket con *Origin Access Control*; *Default root object* `index.html`; redirect HTTP→HTTPS. Acepta la bucket policy que te propone la consola.
3. **CloudFront Function** (viewer request) con `infra/cloudfront-index-rewrite.js`. Sin ella, `/projects/calma/` da 403, porque CloudFront no busca `index.html` en subcarpetas.
4. **Error pages**: 403 y 404 → `/404.html` (opcional, si añades `src/pages/404.astro`).
5. Pon la URL de CloudFront (o tu dominio) en `site` de `astro.config.mjs`.
6. Desplegar a mano: `./deploy.sh <bucket> <distribution-id>`.
7. **CI (recomendado)**: `.github/workflows/deploy.yml` despliega en cada push a `main` y además cada lunes, para refrescar los README. Configura en GitHub:
   - Secret `AWS_DEPLOY_ROLE_ARN`: rol IAM con *trust* al OIDC de GitHub (`token.actions.githubusercontent.com`), limitado a tu repo, y permisos solo sobre `s3:ListBucket/GetObject/PutObject/DeleteObject` del bucket y `cloudfront:CreateInvalidation` de la distribución.
   - Variables `AWS_REGION`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`.
8. **Dominio propio (opcional)**: Route 53 o tu registrador + certificado ACM **en us-east-1** (obligatorio para CloudFront).
9. **Coste**: con el tráfico de un portfolio, céntimos al mes (el dominio aparte). Pon igualmente una *AWS Budget alert* de 1–2 €.

> Extra: esto es tu primera experiencia *real* en AWS con S3, CloudFront, IAM/OIDC y CI/CD. Merece una ficha propia en el portfolio o una línea en el CV.

## 1. Diario Reflexivo → Vercel con modo demo
El backend necesita Claude + DynamoDB, así que para la demo pública se despliega **solo el frontend** con una API simulada.
- Añade `VITE_DEMO_MODE=true` y, en `App.jsx`, si está activo, sustituye `fetch(API_BASE…)` por un pequeño `demoApi.js`:
  - `entries` guardadas en `localStorage`.
  - `/reflect` devuelve una de 4–5 reflexiones pregrabadas **reales** (genéralas tú una vez con Claude) con un `setTimeout` de ~1,5 s para que se sienta vivo.
- Muestra un banner: *"Demo mode — AI responses are pre-recorded. Run locally with your API key for live reflections."*
- En Vercel: *Root Directory* = `frontend`, variable `VITE_DEMO_MODE=true`.

## 2. Harbor → Vercel con modo demo
Postgres + pgvector + Redis + Claude no caben en ningún free tier de forma fiable. Enseña el frontend con un guion:
- En `frontend/web`, crea una ruta API de Next (`/api/demo-chat`) o un mock en cliente que devuelva respuestas pregrabadas **incluyendo los metadatos de cada capa** (riesgo detectado, estado emocional, estrategia elegida). Eso es lo que vende Harbor: que se vea la orquestación, no solo el texto.
- Idea potente para recruiters: un panel lateral "Under the hood" que muestre qué decidió cada una de las 4 capas.
- En Vercel: *Root Directory* = `frontend/web`.

## 3. Calma → Vercel + AWS free tier
Ya tienes Cognito, DynamoDB y CDK. Cognito (hasta 10k MAU en el plan Lite/Essentials, revisa condiciones) y DynamoDB on-demand con tráfico de portfolio salen a coste ~0.
- Despliega la infra con CDK (`infra/`) si no está ya.
- Crea un **usuario demo** (`demo@calma.app` / contraseña pública) y publícalo en la ficha (`demoCredentials`).
- Variables de entorno en Vercel: región, User Pool ID, Client ID, tabla DynamoDB y credenciales IAM de **mínimo privilegio** (solo esas tablas).
- Pon una *AWS Budget alert* a 1 € para dormir tranquilo.
- Opcional: un cron semanal que limpie las entradas del diario del usuario demo.

## 4 y 5. Spring Boot (To-Do y Book Service) → Render
Vercel no ejecuta Java. Render tiene plan gratuito para web services con Docker; el servicio se duerme tras ~15 min sin tráfico y tarda ~1 min en despertar (ya lo avisa la ficha). Alternativa: Koyeb free (1 instancia, 512 MB).

Añade este `Dockerfile` en la raíz de cada repo:

```dockerfile
FROM eclipse-temurin:25-jdk AS build
WORKDIR /app
COPY . .
RUN ./mvnw -q -DskipTests package || mvn -q -DskipTests package

FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75 -XX:+UseSerialGC -Xss512k"
EXPOSE 8080
CMD ["sh", "-c", "java $JAVA_OPTS -Dserver.port=${PORT:-8080} -jar app.jar"]
```

- `book-service` no trae Maven Wrapper: genera uno (`mvn -N wrapper:wrapper`) o cambia la imagen de build a `maven:3-eclipse-temurin-25`.
- Render → *New Web Service* → repo → Runtime *Docker* → plan *Free*.
- **Book Service**: pon `demoUrl` apuntando a `/swagger-ui.html`. Es la mejor demo posible de una API.
- **Seguridad**: desactiva la consola H2 en producción (`spring.h2.console.enabled=false` en un perfil `prod`). En Book Service, `admin/admin123` es aceptable solo porque es H2 en memoria sin datos reales.
- Semilla de datos: un `data.sql` o `CommandLineRunner` con 5–10 libros/tareas para que la demo no salga vacía.
- Opcional: un ping cada 10 min (cron-job.org o UptimeRobot) evita el arranque en frío, pero consume horas del free tier; con dos servicios aún cabe.

---

## Checklist por proyecto (cuando lo despliegues)
- [ ] URL pública funcionando
- [ ] `src/data/projects.ts` → `demoUrl`, `demoStatus` (`live` o `mock`)
- [ ] README del repo con enlace a la demo arriba del todo y un GIF/captura
- [ ] Sin secretos en el repo (`.env` en `.gitignore`)
