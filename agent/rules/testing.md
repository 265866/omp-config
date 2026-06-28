---
description: Test expectations, TDD defaults, and verification evidence rules
---

# Testing rules

Code doesn't ship untested unless there is a clear constraint and the user is told.

## Coverage expectation

Every meaningful code change should add or update tests for:

- the happy path
- at least one edge case: empty, null, boundary, invalid, or constraint violation
- the regression point or module boundary that could break again

If a change is purely mechanical and existing tests cover it, say which tests were run.

## Test design

- Don't mock what can be integration-tested cheaply.
- Don't add mocks, fakes, simulators, clock/network substitutes, or other stand-ins without approval. If a real dependency can't run cheaply, state the constraint and ask before adding a substitute.
- For bug fixes, prefer a failing test first, then the fix, then the passing test.
- For non-trivial coverage design, use `task` with a testing role. Use `reviewer` or a role-specific `task` for an independent review of test adequacy.

## Stack runners

Use the project's own scripts first. If none exist:

- Rust: `cargo test` or a narrower `cargo test -p <crate>` when the workspace is heavy
- Python: `uv run pytest -v`
- JavaScript/TypeScript: `bun test` or `bun run test`
- Go: `go test ./...`

Bun is the Node package manager. uv is the Python executor.

## UI changes

Type checks and unit tests are not enough for visual work. Run the UI when feasible, inspect it in a browser or emulator, and use screenshots when visual correctness matters.

## Evidence

Never claim tests pass without output from the command. If tests can't run, state why and what was skipped.
