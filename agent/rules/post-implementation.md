---
description: Final validation, formatting, conditional version and lockfile, and commit workflow
---

# Post-implementation workflow

After implementation, run the applicable final sequence before committing. Each step should use project-local commands and the domain rules in this directory.

## 1. Behavior check

Run the narrowest test or scenario that proves the change works. Use `testing.md` for coverage expectations and evidence rules.

If a runnable check can't be run, state the constraint and what was skipped. Don't claim coverage the check didn't provide.

## 2. Build, lint, and format

Use the repository's configured commands first. Apply language-specific rules from `go.md`, `javascript.md`, `python.md`, and `rust.md` when those stacks are involved.

Fix real warnings before moving on. Keep formatter-only changes separate when they are separable.

## 3. Version and dependency updates

Version bumps are conditional. Change a version only when the user asked for a release/version change, the package metadata must change for the implementation, or the repository's release process requires it.

Regenerate lockfiles only when dependencies, package metadata, or the toolchain require it.

## 4. Review

For non-trivial implementation work, follow `reviewer.md`. Fix real findings, then re-check the affected area.

## 5. Commit prep

Use `commit-naming.md` for message shape and atomicity. For non-trivial VCS work, follow `vcs.md` and delegate to `task` with a VCS role unless a real VCS specialist exists.

Remote operations still require explicit per-action approval.
