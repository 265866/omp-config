---
description: Orchestrator-first delegation rules and sub-agent routing defaults
---

# Delegation rules

The main session is an orchestrator. It keeps context clean, routes work, and combines results.

## Work directly when

- the task is a trivial single-step operation
- the user asks a small clarification or lookup
- a known small file needs to be read
- orchestration glue is needed: launching agents, tracking status, or summarizing outcomes
- the user explicitly asks for no delegation

## Delegate when

- the task touches multiple files
- implementation is non-trivial
- debugging needs causal tracing
- code needs review or behavioral verification
- broad search would pollute the main context
- SDK, API, or framework behavior needs documentation checks
- test design matters
- VCS state, commits, history, branches/bookmarks, or PR prep are involved

## Routing defaults

Use native OMP agents by their current names:

- `explore`: read-only codebase search, broad file discovery, and "where is X" lookups
- `plan`: architecture, sequencing, or cross-cutting design
- `designer`: UI and UX implementation or review
- `reviewer`: fresh-context review after non-trivial code changes
- `librarian`: SDK, API, framework, library, or CLI documentation checks
- `oracle`: hard debugging, senior engineering review, architecture second opinions, or hands-on implementation when the task calls for it
- `task`: coding, VCS, testing, debugging, QA, migrations, and other work that needs tools; give it an explicit role such as "VCS history specialist" or "Testing strategy specialist"
- `quick_task`: small mechanical edits or narrow data collection only
- `commit-agent`: local-only VCS commit specialist; inspects changes, splits atomic commits, stages exact hunks, and commits without pushing
- `grammar-reviewer`: spelling, grammar, punctuation, and sentence-level readability
- `phrasing-flow-reviewer`: generic phrasing, weak flow, repeated structure, and tone drift
- `source-checker`: citations, quotes, URLs, dates, numbers, names, legal claims, and source-backed claims

Do not use old model-tier aliases or stale agent names. If no specialist fits, use `task` with a precise role.

## Parallel delegation

Run independent agents in parallel when their scopes don't overlap. Give each one:

- a specific, testable goal
- only the context it needs
- constraints that matter for the task
- the expected output shape
- a length cap when appropriate

Long-running builds, tests, and broad checks should run in the background when the tool supports it.

## Synthesis

Don't paste raw agent output. Return the conclusion, evidence, trade-offs, and next action. If agents disagree, say why and choose a path.
