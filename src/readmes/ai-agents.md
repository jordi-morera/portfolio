# AI Agents

Two practical agents that automate the software delivery workflow, built with **Claude** and the **Anthropic tool-use API** — no agent framework, just an explicit tool loop that is easy to read, test and extend.

| Agent | What it does |
|---|---|
| [**PR Review Agent**](pr_review/) | Reviews a Pull Request diff against its Acceptance Criteria and produces a Markdown report with issues by severity and AC coverage |
| [**Jira to PR Agent**](jira_to_pr/) | Orchestrates the full cycle from a Jira ticket to a Pull Request: ticket → branch → implementation → commit → PR → Confluence page |

## PR Review Agent

Reviews code along two dimensions:

1. **Code quality** — Clean Code, readability, optimisation (N+1 queries, complexity), Python best practices, security (hardcoded secrets, unvalidated input, injection).
2. **Functionality** — every Acceptance Criterion is marked `COVERED`, `PARTIAL` or `MISSING`.

The agent decides by itself when it needs more context and calls tools to get it: `read_file`, `run_linter` (flake8), `get_git_log` and `search_pattern`.

```bash
cd pr_review
python agent.py --diff ../examples/example.diff --ac ../examples/example_ac.md
```

`examples/` contains a deliberately flawed Flask endpoint (hardcoded secret, password leaked in the response, N+1 query, missing auth) and its Acceptance Criteria, so you can see what the agent catches.

## Jira to PR Agent

An **orchestrator + sub-agent** design. The orchestrator follows six steps, each one a tool:

```
get_jira_ticket → create_git_branch → implement_feature → commit_changes → create_bitbucket_pr → create_confluence_page
     (Jira)            (git)          (coding sub-agent)       (git)            (Bitbucket)             (Confluence)
```

- `implement_feature` is itself an agent with its own tool loop (`list_directory`, `read_file`, `write_file`, `run_command`), capped at 25 iterations.
- Jira descriptions in **Atlassian Document Format** are converted to Markdown, and Acceptance Criteria are found in custom fields or in the description (English or Spanish headings).
- Commits follow **Conventional Commits**; PRs use a standard template (changes, how to test, ACs, technical notes).
- `--dry-run` runs everything except the push and the real PR creation.

```bash
cp .env.example .env   # Jira, Bitbucket and Confluence credentials
python jira_to_pr/agent.py --ticket PROJ-123 --dry-run
```

## Design choices

- **Explicit tool loop over frameworks** — the agent loop is short and fully visible: call the model, run the requested tools, feed back the results, stop on `end_turn`.
- **Tools return data, never raise** — every tool returns `{"error": ...}` instead of throwing, so the model can reason about failures and continue with the remaining steps.
- **Fail fast on configuration** — missing environment variables are reported all at once, with a hint for each one.
- **Pure functions are unit-tested** — ADF parsing, branch-name normalisation and AC extraction are covered by tests that need no network or API keys.

## Project structure

```
ai-agents/
├── pr_review/        # PR Review Agent (agent loop, tools, report generator)
├── jira_to_pr/       # Jira to PR orchestrator + coding sub-agent
├── shared/           # Centralised configuration (.env loading and validation)
├── examples/         # Sample diff and Acceptance Criteria
└── tests/            # Unit tests
```

## Setup

```bash
python -m venv .venv && source .venv/bin/activate
pip install anthropic requests python-dotenv pytest
cp .env.example .env
```

## Tests

```bash
pytest tests -v
```
