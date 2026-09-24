# Calma - Tu espacio de gestión emocional

**Calma** es una aplicación web diseñada con un enfoque humanista para acompañar a los usuarios en la gestión de sus emociones. Ofrece herramientas prácticas para situaciones de ansiedad, estrés o baja autoestima, facilitando el autoconocimiento y la conexión con terapeutas especializados.

---

## 📌 1. Descripción General
Este proyecto integra tecnologías modernas de desarrollo web con principios de "Calm Technology" (diseño no intrusivo). Su objetivo es proporcionar un espacio seguro y accesible donde los usuarios puedan:
*   Realizar ejercicios guiados de gestión emocional (respiración, mindfulness).
*   Mantener un **Diario Emocional** privado y seguro.
*   Registrar su progreso y hábitos.
*   Consultar un **Directorio de Terapeutas** profesionales.

## 🌟 2. Funcionalidades Principales
Para cumplir con los objetivos del proyecto, la aplicación ofrece las siguientes características clave:
*   **Autenticación y Seguridad:** Registro, inicio de sesión y recuperación de contraseñas. Acceso protegido a áreas privadas mediante Amazon Cognito y control de acceso a nivel de aplicación.
*   **Catálogo de Ejercicios Guiados:** Biblioteca de ejercicios categorizados (ansiedad, estrés, autoestima) con instrucciones paso a paso.
*   **Diario Emocional Privado:** Espacio seguro donde el usuario puede registrar diariamente su estado emocional y pensamientos íntimos.
*   **Área de Perfil y Progreso:** Seguimiento del historial de ejercicios completados y gestión de datos personales.
*   **Directorio de Profesionales:** Listado de terapeutas verificados para facilitar la búsqueda de ayuda profesional si el usuario lo requiere.

## 🛠️ 3. Stack Tecnológico
*   **Frontend**: [Next.js 16](https://nextjs.org/) (App Router, Server Components).
*   **Lenguaje**: TypeScript (Tipado estricto para mayor robustez).
*   **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) + [Shadcn/ui](https://ui.shadcn.com/) (Diseño accesible y responsive).
*   **Backend / Auth**: Amazon Cognito (auth) + Amazon DynamoDB (datos), vía AWS SDK v3.
*   **Validación**: [Zod](https://zod.dev/) (Validación de formularios en servidor con tipado estricto).
*   **Testing**: [Playwright](https://playwright.dev/) (Pruebas E2E).
*   **Extras**: Soporte PWA (Manifest), SEO optimizado, i18n (Código comentado en español).
*   **Despliegue**: AWS App Runner (imagen Docker publicada en Amazon ECR).

## 🔒 4. Seguridad y Arquitectura
La seguridad es un pilar fundamental en **Calma**, dado el tratamiento de datos sensibles:
*   **Middleware**: Protección de rutas privadas (`/profile`, `/journal`) mediante `src/middleware.ts`, asegurando que solo usuarios autenticados accedan.
*   **Control de acceso a nivel de aplicación**: DynamoDB no tiene un equivalente a RLS, así que cada Server Action deriva el `userId` de la sesión de Cognito verificada (nunca de datos enviados por el cliente) y lo usa como partition key en cada lectura/escritura de progreso, perfil y entradas de diario.
*   **Validación en Servidor**: Esquemas Zod centralizados en `src/lib/schemas.ts` validan todos los formularios antes de interactuar con la base de datos. Los logs nunca exponen PII (emails, nombres de usuario).
*   **Autenticación**: Gestión de sesiones segura vía Amazon Cognito (JWT en cookies httpOnly).

## 🚀 5. Instalación y Ejecución

### Requisitos Previos
*   Node.js v20.x.
*   Cuenta de AWS con un User Pool de Cognito y una tabla de DynamoDB desplegados (ver `infra/`).

### Pasos
1.  **Clonar el repositorio**:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd calma-app
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**:
    Crea un archivo `.env.local` en la raíz:
    ```env
    AWS_REGION=eu-west-1
    COGNITO_USER_POOL_ID=tu_user_pool_id
    COGNITO_CLIENT_ID=tu_app_client_id
    DYNAMODB_TABLE_NAME=calma-app
    ```
    Las credenciales de AWS no se configuran por variable de entorno: en local se usan las credenciales de tu CLI/SSO (`aws configure`), y en despliegue el rol IAM asociado al servicio (App Runner).

4.  **Infraestructura**:
    El User Pool de Cognito y la tabla de DynamoDB se definen como código en `infra/` (AWS CDK). Despliega con:
    ```bash
    cd infra && npm install && npx cdk deploy
    ```

5.  **Ejecutar en desarrollo**:
    ```bash
    npm run dev
    ```
    Visita [http://localhost:3000](http://localhost:3000).

## ✅ 6. Testing
El proyecto cuenta con una suite de pruebas End-to-End (E2E) con Playwright para verificar los flujos críticos (Navegación, Auth, Carga).

Ejecutar tests:
```bash
npx playwright test
```

## 📁 7. Estructura del Proyecto
*   `src/app`: Rutas y páginas (App Router).
    *   `(auth)`: Login/Register.
    *   `exercises`: Catálogo y detalle (con lógica de completado).
    *   `journal`: Diario emocional privado (protegido por RLS).
    *   `profile`: Área privada del usuario.
    *   `therapists`: Directorio de profesionales.
*   `src/components`: UI Kit reutilizable (Navbar, Cards, Alerts).
*   `src/lib`: Esquemas de validación Zod centralizados (`schemas.ts`).
*   `src/utils`: Clientes de Cognito y DynamoDB, sesión y middleware de auth.
*   `src/middleware.ts`: Barrera de seguridad para rutas protegidas.
*   `infra/`: Stack de AWS CDK que define el User Pool de Cognito y la tabla de DynamoDB.
*   `migrations/` y `db_schema.sql`: esquema histórico de Postgres/Supabase (ya no usado en producción, se conserva como referencia).
*   `tests/`: Tests E2E.

## 🌐 8. Despliegue

La aplicación se despliega en **AWS App Runner** a partir de una imagen Docker (build multi-stage con `output: "standalone"` de Next.js), publicada en Amazon ECR. El pipeline de CI/CD (`.github/workflows/deploy.yml`) construye y sube la imagen a ECR en cada push a `main`; App Runner tiene el auto-despliegue activado, por lo que despliega automáticamente la nueva imagen.

### Build y ejecución local con Docker
```bash
docker build -t calma-app .

docker run -p 3000:3000 \
  -e AWS_REGION=eu-west-1 \
  -e COGNITO_USER_POOL_ID=tu_user_pool_id \
  -e COGNITO_CLIENT_ID=tu_app_client_id \
  -e DYNAMODB_TABLE_NAME=calma-app \
  calma-app
```

> Estas variables ya no son `NEXT_PUBLIC_*`: solo se leen en el servidor, por lo que solo hace falta inyectarlas en tiempo de ejecución (`-e`), no en el build.

### Health check
La ruta `/api/health` expone un endpoint de estado (`{"status":"ok"}`) usado por el health check de App Runner.

### Configuración en AWS (resumen)
*   **ECR**: repositorio `calma-app` con la imagen construida.
*   **App Runner**: servicio con origen "Container registry" → ECR, auto-deploy activado, health check en `/api/health`, variables de entorno `AWS_REGION`, `COGNITO_USER_POOL_ID`, `COGNITO_CLIENT_ID`, `DYNAMODB_TABLE_NAME`.
*   **Rol de instancia de App Runner**: necesita permisos `dynamodb:GetItem/PutItem/DeleteItem/Query` sobre la tabla y `cognito-idp:InitiateAuth/SignUp/ConfirmSignUp/ForgotPassword/ConfirmForgotPassword/ChangePassword/GlobalSignOut` sobre el User Pool — sin claves de acceso estáticas.
*   **IAM**: rol OIDC para GitHub Actions con permisos mínimos sobre el repositorio ECR (sin claves de acceso estáticas).
*   **Cognito + DynamoDB**: aprovisionados vía `infra/` (AWS CDK).
*   **Dominio propio** (opcional): Route53 + ACM.
