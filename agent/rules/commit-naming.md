---
description: Commit message shape and atomic commit rules
---

# Commit naming convention

Use conventional commits unless the repository history clearly uses another style.

## Shape

```text
<type>(<scope>): <subject>
```

- `type`: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`, `style`, `perf`, `build`, or `ci`
- `scope`: optional module, crate, package, or area name
- `subject`: imperative mood, lowercase after the type prefix, no trailing period, under about 72 chars

Examples:

- `feat(network_list): add contains handle`
- `fix(utils): treat country codes as case-insensitive`
- `refactor(utils): introduce shared cidr set`
- `chore(deps): bump tokio`
- `test(network_list): cover ipv6 wildcard match`

## Atomicity

Commit small and often. Don't accumulate changes that later need hunk-level surgery.

Each commit should be:

- one logical change
- self-contained enough to review independently
- tested for the touched area when practical

## Body and trailers

Most commits don't need a body. Add one only when the reason is non-obvious. Explain why; the diff shows what changed.

Do not invent trailers. Add a trailer only when the repository already requires one or the user asks for it. If a trailer is needed, follow the repository's existing spelling and order exactly.

No `Co-Authored-By`, no `Generated with`, no emojis.
