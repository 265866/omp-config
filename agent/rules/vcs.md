---
description: Version control policy, delegation, and remote safety
---

# Version control rules

Keep this file as detailed VCS policy. The short remote-safety guard belongs in sticky `RULES.md`.

## Defaults

- Delegate non-trivial VCS work to `task` with an explicit VCS role, such as "VCS history specialist", unless the runtime provides a real VCS specialist.
- Follow the repo's commit style; if none is clear, use conventional commits from `commit-naming.md`.

## Scope

VCS work includes status inspection, diffs, commits, commit splitting, squashing, rebasing, bookmarks, conflicts, PR prep, fetch, push, and recovery.

## Non-interactive safety

- Never run commands that open an editor, TUI, diff editor, or prompt.
- Always pass `-m` or `--stdin` where a message may be needed.

## Remote safety

Never perform remote operations without explicit per-action approval.

This includes push, fetch, pull, remote bookmark work, remote tags, and any networked VCS sync. Treat "commit this" as commit-only authorization.

Before an approved remote operation, state the exact command you intend to run unless the user already gave the exact push/fetch operation to perform. When the user asks to push a jj commit to the current mainline, move the intended bookmark such as `main` to the commit and push that bookmark; don't use generated `push-*` bookmarks unless they explicitly ask for a PR branch.
