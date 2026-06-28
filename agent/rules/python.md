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
