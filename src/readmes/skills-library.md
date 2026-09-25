# Spring Boot + GenAI Engineering Skills

A portable library of **42 engineering skills** that makes an AI coding assistant (e.g. Claude Code) reason like a senior Spring Boot + Generative AI engineer inside any codebase. The repo also includes a small **API security agent** that uses a service's OpenAPI contract to plan security tests.

## Why

An AI coding agent is only as good as the judgement it applies. Out of the box it writes plausible code, but it doesn't reliably ask *"should this be an agent at all?"*, *"where's the N+1?"* or *"what happens when the LLM returns garbage?"*.

This library encodes that judgement as small, composable skills. Each one says **when to use it, when not to**, how to reason through the problem, what good and bad look like, and how to **validate** the result before calling the work done.

## What's inside

| Area | Skills |
|---|---|
| **AI / LLM** | LLM integration fundamentals, structured output, prompt engineering, RAG architecture, chunking & retrieval, agent architecture, tool design, agent memory, LLM evaluation, AI security, AI cost management |
| **Architecture** | Clean / hexagonal architecture, domain-driven design, architecture decision-making |
| **Spring & APIs** | Spring Boot fundamentals, configuration & profiles, REST API design, validation & error handling |
| **Data & messaging** | JPA / Hibernate patterns, transactions & locking, event-driven architecture |
| **Security** | Spring Security fundamentals, API security (OWASP API Top 10, SSRF) |
| **Testing** | Spring Boot testing strategy, Testcontainers, testing non-deterministic LLM behaviour |
| **Operations** | Structured logging & tracing, AI observability, resilience & fault tolerance, LLM performance, containerization & CI/CD |
| **Engineering workflow** | Repository exploration, architecture discovery, code review, safe repository changes, bug investigation |
| **Integrations** | External API clients & resilience, Anthropic, OpenAI |
| **Meta** | Skill discovery, skill creation, skill review — the library maintains itself |

The full inventory, dependency chains and skill template are in [`skills/README.md`](skills/README.md).

## Design principles

- **Deterministic over agentic, by default.** Prefer a fixed workflow to an autonomous agent whenever it solves the problem reliably. Use an agent only when the sequence of steps can't be known in advance.
- **LLM output is untrusted input.** Every AI skill treats model output as data to validate, never as a trusted instruction or fact.
- **Narrow activation.** Each skill states when *not* to use it, so the agent applies the right skill instead of all of them.
- **Validation as an exit checklist.** Every skill ends with concrete checks before the work is considered done.
- **Reusable, not project-specific.** No company, database or cloud account is hardcoded; vendor specifics live in `integrations/`.

## How to use it

Copy `skills/` into a Spring Boot repository (or reference it from your assistant's configuration) and point the agent at `skills/README.md`. A typical flow for adding an LLM-backed endpoint:

```
repository-exploration → architecture-discovery → rest-api-design
  → llm-integration-fundamentals → prompt-engineering → structured-output
  → llm-testing-strategies → ai-security → code-review
```

## API security agent (`fuzzer_agent.py`)

A deliberately simple **deterministic pipeline** (not an agent loop, following the library's own advice):

1. Downloads the target's **OpenAPI contract** (Springdoc's `/v3/api-docs`) and extracts the endpoints. If it can't fetch or parse the contract, it fails loudly instead of inventing data.
2. Asks an LLM, acting as a senior pentester, to **draft a security test plan** for those routes.
3. Produces a **Markdown report** with the endpoints to monitor and the inputs to validate.

It pairs naturally with [Book Service](https://github.com/jordi-morera/book-service), a Spring Boot microservice built to be audited by AI agents.

```bash
pip install -r requirements.txt
export OPENAI_API_KEY=...
# with a Spring Boot service running on http://localhost:8080
python fuzzer_agent.py
```

> The agent only *plans* the tests and reports on them. It doesn't send attack traffic, so it's safe to point at a local service.
