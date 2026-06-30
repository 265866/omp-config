---
description: Go idioms, tooling, validation, and module hygiene
globs:
  - "**/*.go"
  - "go.mod"
  - "go.sum"
  - "go.work"
  - "go.work.sum"
---

# Go rules

## Idioms

- Write simple, explicit Go. Prefer small interfaces at consumers, clear error returns, and table-driven tests where they fit.
- Handle errors directly and add context at boundaries. Never discard errors with `_ = err`.
- Keep concurrency structured: propagate `context.Context`, close resources with `defer`, and avoid goroutine leaks.

## Before committing

Install these tools once if they are missing. Do not skip a gate because a tool is absent.

```sh
go install mvdan.cc/gofumpt@latest
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
go install golang.org/x/vuln/cmd/govulncheck@latest
```

Before committing, run and report every gate result in this order:

1. `go build ./...`
2. `gofumpt -l -w .`, then rerun `gofumpt -l .` and expect no output.
3. `go mod tidy`, then `git diff --exit-code go.mod go.sum`
4. `go vet ./...`
5. `golangci-lint run`
6. `go test -race -cover ./...`
7. `govulncheck ./...`

If a gate fails, fix the cause and re-run from that gate; do not disable, weaken, or skip checks to pass.

## Hard rules

- Never weaken or delete tests to pass a gate.
- Never add `_ = err` or `//nolint` to silence a real problem; fix the cause.
- For a genuine false positive, suppress it narrowly with `//nolint:<linter>` and a one-line justification.
- Keep `-race` on the full test gate.
- Report every gate result, including failures and constraints.
