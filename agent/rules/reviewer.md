---
description: Fresh-context review requirements for non-trivial implementation work
---

# Review rules

Non-trivial implementation work needs a separate fresh-context review before the task is called done.

## Review protocol

1. After a non-trivial change, spawn `reviewer` or a role-specific `task` when the review needs tools or a narrower specialty.
2. The reviewer must not be the same agent that wrote the change.
3. Fix real findings, then re-check the affected area.
4. If a finding is dismissed, explain why it doesn't apply.

Never self-approve in the same active context. Reviewer output is advice; the orchestrator owns the final call.

## What reviewers check

- correctness against the original request
- edge cases and boundary behavior
- missed requirements
- fit with repo style and user preferences
- unnecessary abstractions or AI slop
- performance costs that matter
- security issues: injection, auth, permission checks, data leaks
- test coverage for happy path, edges, and regressions

## When formal review can be skipped

- one-line fixes
- doc typos or formatting-only edits
- small renames with narrow scope
- adding a single short comment

Even then, verify the result directly when practical.
