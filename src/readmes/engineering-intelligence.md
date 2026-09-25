# Engineering Intelligence

> An AI agent that turns engineering tickets into **validated, evidence-backed specifications before any code is written**.

Most AI coding tools jump straight to implementation. Engineering Intelligence deliberately does the opposite: it investigates, specifies, critiques and validates the work first — and hands a human-approved spec to implementation only when the uncertainty is gone.

```
WHAT + WHY        (understand, investigate, specify)
     before
HOW + DO          (implement)
```

## Core features

- **Spec-first agent** — an `EngineeringAgent` that reasons about requirements and bugs under explicit engineering principles (evidence over assumptions; facts, assumptions and unknowns kept separate).
- **Skill contracts** — 10 reusable skills that encode the methodology, each with purpose, inputs, outputs, rules and failure handling.
- **Declarative workflows** — ordered, auditable steps for `requirement` and `bug` work items, with a quality gate: a spec reaches `READY_FOR_IMPLEMENTATION` only after research, critique and validation; a critical uncertainty results in `BLOCKED`, never an invented answer.
- **Structured output contract** — a versioned YAML schema for Engineering Specifications (requirements, acceptance criteria, evidence, confidence levels, critiques).
- **Evaluation-first mindset** — metrics defined up front (research accuracy, root-cause accuracy, unsupported assumptions, human corrections, token usage…), so the agent is judged on correctness, not on convincing-looking documents.
- **Read-only by design** — the system never modifies code, tickets or branches.
- **Tested foundation** — unit tests for the agent, configuration, schema and workflows; the LLM client is injectable for testing.

## System boundaries

### System 1 — Engineering Intelligence (WHAT + WHY) · *this repository*
Understands Jira tickets, researches documentation and repositories, identifies requirements and root causes, produces evidence-backed specifications, critiques and validates them, and requires human approval before implementation. **It never modifies source code.**

### System 2 — Engineering Execution (HOW + DO) · *out of scope for now*
Consumes an approved specification and performs implementation, tests, static analysis, self-review, pull request creation and Jira updates.

## Skills

| Skill | Purpose |
|---|---|
| `jira-analysis` | Parse a Jira work item (requirement or bug) into structured context |
| `confluence-research` | Discover and extract related documentation |
| `repository-research` | Ground the work item in the actual codebase |
| `requirements-analysis` | Derive clear, testable requirements |
| `technical-analysis` | Assess feasibility, constraints, dependencies and risks |
| `bug-investigation` | Capture symptoms, reproduce, gather evidence |
| `root-cause-analysis` | Identify the root cause, backed by evidence and a confidence level |
| `specification-writing` | Produce a spec that conforms to the schema |
| `specification-critique` | Surface gaps, contradictions and unsupported assumptions |
| `specification-validation` | Confirm evidence is sound and critical unknowns are resolved |

## Workflows

| Workflow | Steps |
|---|---|
| **Requirement** | analyze ticket → discover documentation → research repository → define requirements → technical analysis → create spec → critique → validate |
| **Bug** | analyze ticket → discover documentation → investigate bug → research repository → identify root cause → propose solution → create spec → critique → validate |

## Target architecture

```
Jira → Agent → Research (Confluence, Repository) → Evidence → Specification
     → Critic → Validation → Human Approval → System 2
```

## Current status

This is an early, deliberately minimal foundation. Today the runnable part is an `EngineeringAgent` that composes the system prompt (`prompts/system.md`) with a user question and calls an LLM through a thin client. The skills, workflows, schema and evaluation strategy define the methodology the agent will execute as integrations (Jira, Confluence, repositories) are added — without rewriting the core.

## Project structure

```
src/            Core Python code (agent, LLM client, config, entry point)
skills/         Skill contracts (methodology for each capability)
prompts/        Prompt templates (system.md)
schemas/        Structured contracts (engineering-spec.yaml)
workflows/      Workflow definitions (requirement.yaml, bug.yaml)
specs/          Output location for produced specifications
evaluations/    Evaluation strategy and metrics
runs/           Execution run logs
tests/          Unit tests
```

## Setup

Requires Python 3.12+.

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env   # then add your OPENAI_API_KEY
```

## Run

```bash
python -m src.main "How should we investigate an intermittent 500 on the checkout endpoint?"
```

Without an API key, the application prints a clear configuration error and exits.

## Tests

```bash
pytest
```

## License

MIT
