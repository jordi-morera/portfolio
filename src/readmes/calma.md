# Calma - Your space for emotional wellbeing (Master's Thesis)

*[Leer en español](README.es.md)*

> **Master's Thesis - Web Application Development**

**Calma** is a web application designed with a humanistic approach to support users in managing their emotions. It offers practical tools for situations of anxiety, stress or low self-esteem, encouraging self-awareness and making it easier to connect with specialised therapists.

---

## 📌 1. Overview
This project combines modern web development technologies with "Calm Technology" principles (non-intrusive design). Its goal is to provide a safe and accessible space where users can:
*   Do guided emotional-management exercises (breathing, mindfulness).
*   Keep a private and secure **Emotional Journal**.
*   Track their progress and habits.
*   Browse a **Therapist Directory** of professionals.

## 🌟 2. Key Features
To meet the project's goals, the application offers the following key features:
*   **Authentication & Security:** Sign-up, login and password recovery. Private areas are protected with Supabase Auth and RLS.
*   **Guided Exercise Catalogue:** A library of exercises grouped by category (anxiety, stress, self-esteem) with step-by-step instructions.
*   **Private Emotional Journal:** A safe space where users can record their emotional state and personal thoughts every day.
*   **Profile & Progress Area:** History of completed exercises and management of personal data.
*   **Professional Directory:** A list of verified therapists, making it easier to seek professional help when needed.

## 🛠️ 3. Tech Stack
*   **Frontend**: [Next.js 16](https://nextjs.org/) (App Router, Server Components).
*   **Language**: TypeScript (strict typing for robustness).
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [Shadcn/ui](https://ui.shadcn.com/) (accessible, responsive design).
*   **Backend / Auth**: [Supabase](https://supabase.com/) (PostgreSQL, Auth Helpers, RLS).
*   **Validation**: [Zod](https://zod.dev/) (strictly typed server-side form validation).
*   **Testing**: [Playwright](https://playwright.dev/) (E2E tests).
*   **Extras**: PWA support (manifest), SEO optimised, code comments in Spanish.
*   **Deployment**: Vercel.

## 🔒 4. Security & Architecture
Security is a core pillar of **Calma**, given that it handles sensitive data:
*   **Middleware**: Private routes (`/profile`, `/journal`) are protected by `src/middleware.ts`, ensuring only authenticated users can access them.
*   **Row Level Security (RLS)**: PostgreSQL policies guarantee that each user can only read/write their own progress (`user_progress`), profile (`profiles`) and contact requests (`contact_requests`).
*   **Server-side Validation**: Centralised Zod schemas in `src/lib/schemas.ts` validate every form before touching the database. Logs never expose PII (emails, usernames).
*   **Authentication**: Secure session management via Supabase Auth (JWT).

## 🚀 5. Installation & Running

### Prerequisites
*   Node.js (v18 or later).
*   A Supabase account (with a project created).

### Steps
1.  **Clone the repository**:
    ```bash
    git clone <REPOSITORY_URL>
    cd tfm-calma-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure environment variables**:
    Create a `.env.local` file in the project root:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
    ```

4.  **Database**:
    Run the scripts in the `migrations/` folder, in numerical order, in the Supabase SQL Editor to create the tables and policies.

5.  **Run in development**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

## ✅ 6. Testing
The project includes an End-to-End (E2E) test suite with Playwright covering the critical flows (navigation, auth, loading).

Run the tests:
```bash
npx playwright test
```

## 📁 7. Project Structure
*   `src/app`: Routes and pages (App Router).
    *   `(auth)`: Login/Register.
    *   `exercises`: Catalogue and detail (with completion logic).
    *   `journal`: Private emotional journal (protected by RLS).
    *   `profile`: User's private area.
    *   `therapists`: Professional directory.
*   `src/components`: Reusable UI kit (Navbar, Cards, Alerts).
*   `src/lib`: Centralised Zod validation schemas (`schemas.ts`).
*   `src/utils`: Supabase clients (server, client, middleware).
*   `src/middleware.ts`: Security barrier for protected routes.
*   `migrations/`: Ordered SQL scripts to apply the schema in Supabase.
*   `tests/`: E2E tests.

## 📄 8. Presentation
The script and outline for the thesis defence presentation are in [SLIDES.md](./SLIDES.md) (in Spanish).

## 🌐 9. Deployment
Production URL (Demo): [https://tfm-calma-app.vercel.app](https://tfm-calma-app.vercel.app)
