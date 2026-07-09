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

Never perform remote-mutating operations without explicit per-action approval.

Remote-mutating means anything that writes to the git platform or a remote repo: push, force-push, creating/moving/deleting remote branches, bookmarks, or tags, opening or editing PRs, issues, comments, or releases, and any `gh`/API call that writes. Treat "commit this" as commit-only authorization.

Read-only network operations need no approval: clone, fetch, pull, `jj git fetch`, incoming/log against a remote, and viewing PRs, issues, or CI status. Local operations of any kind (commits, rebases, local branches/bookmarks) are governed by normal task scope, not this rule.

Before an approved remote-mutating operation, state the exact command you intend to run unless the user already gave the exact operation to perform. When the user asks to push a jj commit to the current mainline, move the intended bookmark such as `main` to the commit and push that bookmark; don't use generated `push-*` bookmarks unless they explicitly ask for a PR branch.
