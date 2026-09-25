export type Category = 'Full-stack' | 'AI' | 'Backend' | 'Frontend' | 'AI Engineering';
/** 'none' = proyecto sin demo (librerías, agentes CLI): se muestran los enlaces de `links` en su lugar */
export type DemoStatus = 'live' | 'mock' | 'planned' | 'none';
export type Group = 'featured' | 'ai-engineering' | 'more';

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
  /** Ruta del README a mostrar. Por defecto 'README.md'. Convención: README.md en inglés, README.es.md en castellano */
  readmePath?: string;
  /** Secciones del README (texto del encabezado ##) que no se muestran en el portfolio */
  readmeHideSections?: string[];
  demoUrl: string | null;
  demoStatus: DemoStatus;
  /** Nota corta que se muestra junto al botón de demo */
  demoNote?: string;
  /** Credenciales públicas de demo, si las hay */
  demoCredentials?: { user: string; password: string };
  featured?: boolean;
  /** Sección de la portada. Si no se indica: 'featured' si featured=true, si no 'more' */
  group?: Group;
  /** Enlaces destacados (p.ej. 'Browse the skills') para proyectos sin demo */
  links?: { label: string; href: string }[];
  /** Slugs de proyectos relacionados, se muestran al final de la ficha */
  related?: string[];
}

export const projects: Project[] = [
  {
    slug: 'calma',
    name: 'Calma',
    tagline: 'Humanist emotional-wellbeing web app (Master’s thesis)',
    pitch:
      'A calm-technology web app for managing anxiety, stress and self-esteem: guided exercises, a private emotional journal, progress tracking and a therapist directory. Security by design: Row Level Security in PostgreSQL and server-side validation on every form.',
    category: 'Full-stack',
    stack: ['Next.js 16', 'React 19', 'Shadcn/ui', 'Zod', 'TypeScript', 'Tailwind CSS 4', 'Supabase', 'Playwright'],
    highlights: [
      'Supabase Auth + Row Level Security: each user only sees their own data',
      'Centralised Zod validation, no PII in logs',
      'E2E tests with Playwright',
    ],
    repo: 'jordi-morera/tfm-calma-app',
    branch: 'main',
    demoUrl: 'https://tfm-calma-app.vercel.app',
    demoStatus: 'live',
    demoNote: 'Live on Vercel. Sign up with any email to explore the private area',
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
    repo: 'jordi-morera/harbor-ai',
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
    repo: 'jordi-morera/diario-reflexivo',
    branch: 'main',
    readmeHideSections: ['How to explain this in an interview'],
    demoUrl: null,
    demoStatus: 'planned',
    demoNote: 'Demo mode with realistic pre-recorded reflections',
    featured: true,
  },
  {
    slug: 'skills-library',
    name: 'Spring Boot + GenAI Skills Library',
    tagline: '42 engineering skills that make an AI coding agent reason like a senior engineer',
    pitch:
      'A portable capability system for AI coding assistants such as Claude Code. Each skill encodes senior engineering judgement for Spring Boot + GenAI codebases: when to apply it, when not to, how to reason through the problem and how to validate the result. It covers architecture, security, testing, RAG, agents, LLM evaluation and cost.',
    category: 'AI Engineering',
    stack: ['Claude Code', 'Agent Skills', 'Spring Boot', 'LLMs', 'RAG', 'AI Agents', 'Python', 'LangChain'],
    highlights: [
      'Deterministic workflows over autonomous agents, by default',
      'LLM output treated as untrusted input in every AI skill',
      'Self-maintaining: meta-skills to discover, create and review skills',
    ],
    repo: 'jordi-morera/springboot-ai-agents',
    branch: 'main',
    demoUrl: null,
    demoStatus: 'none',
    links: [
      { label: 'Browse the skills', href: 'https://github.com/jordi-morera/springboot-ai-agents/tree/main/skills' },
    ],
    related: ['book-service', 'engineering-intelligence'],
    group: 'ai-engineering',
  },
  {
    slug: 'engineering-intelligence',
    name: 'Engineering Intelligence',
    tagline: 'Spec-first AI agent: validated specifications before any code is written',
    pitch:
      'Most AI coding tools jump straight to implementation. This agent does the opposite: it investigates a ticket, writes an evidence-backed specification, critiques and validates it, and only then hands it to implementation. A critical uncertainty results in BLOCKED, never an invented answer.',
    category: 'AI Engineering',
    stack: ['Python 3.12', 'OpenAI API', 'Agent Skills', 'YAML contracts', 'pytest'],
    highlights: [
      '10 skill contracts + declarative requirement and bug workflows',
      'Versioned spec schema: facts, assumptions and unknowns kept separate',
      'Evaluation metrics defined up front; read-only by design',
    ],
    repo: 'jordi-morera/engineering-intelligence',
    branch: 'main',
    demoUrl: null,
    demoStatus: 'none',
    links: [
      { label: 'See the skill contracts', href: 'https://github.com/jordi-morera/engineering-intelligence/tree/main/skills' },
      { label: 'See the spec schema', href: 'https://github.com/jordi-morera/engineering-intelligence/blob/main/schemas/engineering-spec.yaml' },
    ],
    related: ['skills-library', 'ai-agents'],
    group: 'ai-engineering',
  },
  {
    slug: 'ai-agents',
    name: 'AI Agents: PR Review & Jira to PR',
    tagline: 'Tool-using Claude agents that automate code review and the ticket-to-PR cycle',
    pitch:
      'Two agents built directly on the Anthropic tool-use API, without a framework. The PR Review Agent checks a diff for code quality and Acceptance Criteria coverage. The Jira to PR Agent orchestrates the full cycle: it reads the ticket, creates the branch, delegates the code to a coding sub-agent, commits, opens the PR and documents it in Confluence.',
    category: 'AI Engineering',
    stack: ['Python', 'Claude API', 'Tool use', 'Jira API', 'Bitbucket API', 'Confluence API', 'pytest'],
    highlights: [
      'Orchestrator + coding sub-agent with a bounded tool loop',
      'AC coverage report: COVERED / PARTIAL / MISSING',
      'Tools return errors as data so the agent can recover',
    ],
    repo: 'jordi-morera/ai-agents',
    branch: 'main',
    demoUrl: null,
    demoStatus: 'none',
    links: [
      { label: 'See the example PR it reviews', href: 'https://github.com/jordi-morera/ai-agents/blob/main/examples/example.diff' },
    ],
    related: ['engineering-intelligence', 'skills-library'],
    group: 'ai-engineering',
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
    repo: 'jordi-morera/mytodolistapp',
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
    repo: 'jordi-morera/book-service',
    branch: 'main',
    demoUrl: null,
    demoStatus: 'planned',
    demoNote: 'Opens Swagger UI. Free tier: first load may take ~1 min',
    demoCredentials: { user: 'admin', password: 'admin123' },
    related: ['skills-library'],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const groupOf = (p: Project): Group => p.group ?? (p.featured ? 'featured' : 'more');
export const byGroup = (g: Group) => projects.filter((p) => groupOf(p) === g);
