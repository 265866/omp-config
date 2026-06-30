---
description: Python environment and tooling
globs:
  - "**/*.py"
  - "pyproject.toml"
  - "uv.lock"
  - "requirements*.txt"
---

# Python rules

## UV is the only Python executor

- **Never invoke `python` or `python3` directly** unless the user explicitly
  requires it.
- **Always use `uv`, `uv run`, or `uvx`** for Python tasks:
  - Running project commands: `uv run <command>`
  - One-off CLI tools: `uvx <tool>`
  - Dependency management: `uv add` / `uv remove` (in uv-managed projects)
  - Installing packages: `uv pip install` (when appropriate)
- **Do not create or activate manual virtual environments** unless explicitly
  requested.

## Before committing

Run these gates through `uv` before committing. If a gate fails, fix the cause and re-run from that gate; do not disable, weaken, or skip checks to pass.

1. Dependencies and locks: run the project's locked install or lock check, usually `uv sync --locked` or `uv lock --check`. If dependencies changed, update the lock with the project's uv workflow and commit only the required lockfile or requirements changes.
2. Formatting: run the configured formatter through `uv run`, usually `uv run ruff format --check .` or `uv run black --check .` when those tools are already configured. If the formatter writes files, re-run the check and commit the formatted result.
3. Lint and static checks: run configured checks through `uv run`, usually `uv run ruff check .` plus any repository lint script.
4. Type checks: when configured, run the type checker through `uv run`, usually `uv run mypy .`, `uv run pyright`, or the repository script.
5. Tests: run the relevant tests through `uv run`, usually `uv run pytest`; include broader suites when the change crosses package or integration boundaries.
6. Lockfile hygiene: do not regenerate or commit `uv.lock` or requirements churn unless dependencies, package metadata, or the toolchain require it.
