# Harbor

An AI-powered emotional support and therapeutic intake platform — a bridge toward professional help, not a replacement for it.

Harbor provides a psychologically informed conversational space for people experiencing anxiety, overwhelm, burnout, loneliness, mild depressive symptoms, or difficulty beginning formal therapy. It never diagnoses, never pretends to be human, and actively encourages professional care when appropriate.

---

## Architecture

Harbor is a layered AI orchestration system. Every user message passes through four sequential layers before a response is generated:

```
User Message
     │
     ▼
┌─────────────────────────────┐
│  Layer 1: Safety & Risk     │  classifiers + rules + behavioral signals
│  Detection                  │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  Layer 2: Emotional State   │  inferred states + identified emotional needs
│  Understanding              │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  Layer 3: Therapeutic       │  tone, strategy, pacing, depth selection
│  Orchestration Engine       │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│  Layer 4: LLM Response      │  constrained generation, grounded output
│  Generation                 │
└─────────────┬───────────────┘
              │
              ▼
         Harbor Response
```

The LLM never operates without guidance from the preceding layers. Harbor's value comes from the emotional architecture above the model, not the model itself.

---

## Product Pillars

- **Emotional Safety Over Engagement** — every decision is evaluated against emotional safety first
- **Psychological Integrity** — informed by humanistic psychology and trauma-informed practices
- **Radical Transparency** — Harbor discloses it is an AI and is honest about its limitations
- **Anti-Dependency Design** — actively works against overuse that substitutes for human connection
- **Emotional Data as Sacred** — user emotional data is treated as the most sensitive category of personal information

---

## Tech Stack

| Layer | Technology |
|---|---|
| Web frontend | React / Next.js / Tailwind CSS |
| Mobile | React Native |
| Backend API | Python / FastAPI |
| Database | PostgreSQL + pgvector |
| Cache & queues | Redis |
| AI orchestration | LangGraph |
| LLM provider | External API (Claude, GPT-4) |
| Infrastructure | Docker + cloud-native |

---

## Configuration

Key environment variables (set in `backend/.env`):

| Variable | Default | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | — | Required. Claude API key. |
| `DATABASE_URL` | `sqlite+aiosqlite:///./harbor_dev.db` | SQLAlchemy connection string. |
| `REDIS_URL` | `redis://localhost:6379` | Redis for session storage. Falls back to in-memory if unavailable. |
| `LLM_MODEL` | `claude-haiku-4-5-20251001` | Claude model used for response generation. |
| `GEOIP_DB_PATH` | *(empty)* | Optional path to a MaxMind GeoLite2-Country `.mmdb` file. Enables IP-based locale detection. Falls back to `Accept-Language` header if not set. See [Locale Detection](specs/08-locale-detection.md). |
| `DEMO_MODE` | `false` | Enables clinical transparency panel in the frontend. |

---

## Specs

| # | Document |
|---|---|
| 00 | [Overview](specs/00-overview.md) |
| 01 | [Safety & Risk Detection](specs/01-safety-layer.md) |
| 02 | [Emotional State Understanding](specs/02-emotional-understanding.md) |
| 03 | [Therapeutic Orchestration Engine](specs/03-orchestration-engine.md) |
| 04 | [LLM Response Generation](specs/04-llm-generation.md) |
| 05 | [Emotional Memory Architecture](specs/05-memory-system.md) |
| 06 | [UX Philosophy](specs/06-ux-philosophy.md) |
| 07 | [Ethics, Privacy & Compliance](specs/07-ethics-and-compliance.md) |
| 08 | [Locale Detection & Adaptation](specs/08-locale-detection.md) |
