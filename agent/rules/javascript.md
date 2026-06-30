---
description: JavaScript, TypeScript, Node.js, and Bun tooling
globs:
  - "**/*.{js,jsx,ts,tsx,mjs,cjs}"
  - "package.json"
  - "bun.lock*"
  - "tsconfig*.json"
---

# JavaScript and TypeScript rules

## Bun is the only package manager

- **Never use `npm`, `yarn`, or `pnpm`.**
- **Always use `bun`** for JavaScript, TypeScript, and Node.js package management:
  - Installing dependencies: `bun install`
  - Adding packages: `bun add <package>`
  - Removing packages: `bun remove <package>`
  - Running scripts: `bun run <script>`
  - Running files: `bun <file>`
- If project documentation mentions another package manager, **still use `bun`**
  unless explicitly overridden by the user.

## Before committing

Run these Bun gates before committing. Prefer repository scripts when they exist. If a gate fails, fix the cause and re-run from that gate; do not disable, weaken, or skip checks to pass.

1. Dependencies: when dependency inputs changed, run `bun install` to update `bun.lock` or `bun.lockb`. Before committing, run `bun install --frozen-lockfile` to verify the lockfile is consistent.
2. Typecheck and build: run the configured scripts, usually `bun run typecheck` and `bun run build` when present. If both exist, run both.
3. Formatting: run the configured formatter or format check through Bun, usually `bun run format:check` or `bun run format`. If the formatter writes files, re-run the check and commit the formatted result.
4. Lint and static checks: run every configured check through Bun, usually `bun run lint` plus any `bun run check` or package-specific static-analysis script.
5. Tests: run the relevant tests through Bun, usually `bun test` or `bun run test`; include integration or end-to-end scripts when the change crosses those boundaries.
6. Lockfiles: leave `bun.lock` or `bun.lockb` changed only when dependency, package metadata, or toolchain changes require it.
