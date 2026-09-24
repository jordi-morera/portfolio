export type Category = 'Full-stack' | 'AI' | 'Backend' | 'Frontend';
export type DemoStatus = 'live' | 'mock' | 'planned';

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  /** 2-3 frases para recruiters: qué problema resuelve y qué demuestra */
  pitch: string;
  category: Category;
  stack: string[];
  highlights: string[];
  /** "usuario/repo" en GitHub. null si aún no está subido */
  repo: string | null;
  branch: string;
  readmePath?: string;
  demoUrl: string | null;
  demoStatus: DemoStatus;
  /** Nota corta que se muestra junto al botón de demo */
  demoNote?: string;
  /** Credenciales públicas de demo, si las hay */
  demoCredentials?: { user: string; password: string };
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'calma',
    name: 'Calma',
    tagline: 'Humanist emotional-wellbeing web app (Master’s thesis)',
    pitch:
      'A calm-technology web app for managing anxiety, stress and self-esteem: guided exercises, a private emotional journal, progress tracking and a therapist directory. Built end-to-end on AWS with infrastructure as code.',
    category: 'Full-stack',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'AWS Cognito', 'DynamoDB', 'AWS CDK', 'Playwright'],
    highlights: [
      'Auth with Amazon Cognito + JWT verification in middleware',
      'Serverless persistence on DynamoDB, infra defined with CDK',
      'E2E tests with Playwright',
    ],
    repo: 'jordimorerachamorro/tfm-calma-app',
    branch: 'main',
    demoUrl: null,
    demoStatus: 'planned',
    demoNote: 'Demo on Vercel with a shared demo account',
    featured: true,
  },
  {
    slug: 'harbor',
    name: 'Harbor',
    tagline: 'AI emotional-support & therapeutic intake platform',
    pitch:
      'A bridge toward professional help, not a replacement for it. Every message goes through a 4-layer AI orchestration pipeline — safety & risk detection, emotional-state understanding, therapeutic orchestration and response generation.',
    category: 'AI',
    stack: ['Python', 'FastAPI', 'Claude API', 'PostgreSQL + pgvector', 'Redis', 'Next.js 14', 'Docker'],
    highlights: [
      'Layered LLM orchestration with a dedicated safety layer',
      'Vector memory with pgvector',
      'Designed to never diagnose and to escalate to professionals',
    ],
    repo: 'jordimorerachamorro/harbor-ai',
    branch: 'main',
    demoUrl: null,
    demoStatus: 'planned',
    demoNote: 'Interactive demo with pre-recorded AI responses (no API cost)',
    featured: true,
  },
  {
    slug: 'diario-reflexivo',
    name: 'Diario Reflexivo',
    tagline: 'AI-assisted journal where Claude acts as a reflective mirror',
    pitch:
      'You write how you feel; Claude answers with powerful questions, emotional validation and detected thinking patterns (catastrophising, mind reading…). Local SQLite in dev, serverless Lambda + DynamoDB in production.',
    category: 'AI',
    stack: ['React', 'Vite', 'Python', 'Flask', 'Claude API', 'AWS Lambda', 'DynamoDB'],
    highlights: [
      'Prompt design grounded in humanistic psychology',
      'Same Flask app runs locally and on Lambda (aws-wsgi)',
      'Bilingual docs (ES / EN)',
    ],
    repo: 'jordimorerachamorro/diario-reflexivo',
    branch: 'main',
    demoUrl: null,
    demoStatus: 'planned',
    demoNote: 'Demo mode with realistic pre-recorded reflections',
    featured: true,
  },
  {
    slug: 'wellness-tracker',
    name: 'Emotional Wellness Tracker',
    tagline: 'Mood tracking with journaling, tags and visual analytics',
    pitch:
      'A lightweight React app to log daily mood (1–5), add notes and tags, and see trends over time. 100% client-side: data never leaves your browser.',
    category: 'Frontend',
    stack: ['React 19', 'TypeScript', 'Vite', 'CSS3', 'localStorage'],
    highlights: ['Zero-backend, privacy by design', 'Responsive UI', 'Deployable as a static site'],
    repo: null, // TODO: sube aws-project a GitHub y pon aquí 'jordimorerachamorro/<repo>'
    branch: 'main',
    demoUrl: null,
    demoStatus: 'planned',
    demoNote: 'Fully functional static demo on Vercel',
  },
  {
    slug: 'mytodolistapp',
    name: 'My To-Do List App',
    tagline: 'Full-stack Spring Boot 4 app with Thymeleaf UI + REST API',
    pitch:
      'A small but complete Spring Boot app: server-rendered UI and a REST API over the same domain, with JPA persistence and tests. Showcases clean Spring fundamentals on the latest stack (Java 25, Spring Framework 7).',
    category: 'Backend',
    stack: ['Java 25', 'Spring Boot 4.1', 'Spring Data JPA', 'H2', 'Thymeleaf', 'JUnit'],
    highlights: ['REST + server-rendered views on one domain', 'Latest Spring Boot 4 / Jakarta EE', 'Maven Wrapper, zero setup'],
    repo: 'jordimorerachamorro/mytodolistapp',
    branch: 'main',
    demoUrl: null,
    demoStatus: 'planned',
    demoNote: 'Free tier: first load may take ~1 min (server wakes up)',
  },
  {
    slug: 'book-service',
    name: 'Book Service',
    tagline: 'Clean Spring Boot microservice, ready to be audited by AI agents',
    pitch:
      'A reference microservice built with good practices — layered architecture, DTO records, global error handling, Spring Security and OpenAPI docs — designed as a target for AI-driven security, quality and architecture audits.',
    category: 'Backend',
    stack: ['Java 25', 'Spring Boot 3.5', 'Spring Security 6', 'Spring Data JPA', 'H2', 'OpenAPI / Swagger'],
    highlights: ['Explore the live API from Swagger UI', 'Records, pattern matching, text blocks', 'Uniform errors via @RestControllerAdvice'],
    repo: 'jordimorerachamorro/book-service',
    branch: 'main',
    demoUrl: null,
    demoStatus: 'planned',
    demoNote: 'Opens Swagger UI. Free tier: first load may take ~1 min',
    demoCredentials: { user: 'admin', password: 'admin123' },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
