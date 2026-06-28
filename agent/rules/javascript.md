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
