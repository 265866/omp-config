---
name: source-first-docs
description: Use for current or version-specific package, import, SDK, framework, CLI, and API questions where docs may be stale, source behavior matters, or implementation hits dependency uncertainty. Delegates source research to a subagent so the main thread stays clean.
---

# Source First Docs

Use this skill when the answer depends on current, version-specific, or source-backed behavior for a package, import, SDK, framework, CLI, API, or public repo. Use it both for direct user questions and when implementation/debugging uncovers dependency uncertainty.

Common triggers:

- The user asks how to use a package, import, method, hook, SDK, CLI, or framework feature.
- The user says docs may be stale, missing, wrong, or outdated.
- The user asks what changed between versions.
- The user asks whether a package supports a feature.
- The user asks for behavior that should be verified from source, types, tests, examples, or release notes.
- While implementing, debugging, or reviewing, the agent is unsure how a dependency's current API works.
- The installed dependency version is newer, older, or different from the agent's remembered docs.
- Source, types, examples, release notes, or docs appear to disagree.
- The agent needs to verify an import path, export, config option, event name, method signature, error shape, or CLI flag before continuing.
- The user says "use source", "check the repo", "from the source", "fresh docs", or "latest docs".

## Goal

Keep noisy research out of the main thread. The main agent should identify the exact question and delegate source lookup to a focused subagent. The main thread should receive only a compact, cited answer.

## Main-thread workflow

1. **Define the lookup.** Identify the package/import/repo, the exact behavior in question, and any user-specified version.
2. **Resolve the version.** Use an explicit user-specified version first. Otherwise, if working inside a project, inspect package manifests and lockfiles only as needed to find the installed version.
3. **Delegate the research.** Use `source-docs-researcher` when available. If it is not available, use `librarian` with the same contract.
4. **Pass a tight prompt.** Include the package/repo, relevant version, exact question, and any local files that establish context. Do not send broad project context.
5. **Synthesize only the result.** Use the subagent's answer, citations, version notes, and caveats. Do not paste raw logs, source dumps, or tool traces.

## Source priority

Use sources in this order:

1. The version the user explicitly named.
2. The exact installed package version from the user's repo.
3. The latest stable release.
4. Main branch or unreleased source only when the user asks for latest/unreleased behavior or no release source is available.

For JavaScript and TypeScript packages:

1. Check `package.json` and lockfiles for the installed version.
2. Use npm registry metadata to find the repository and published tarball.
3. Prefer the published package contents for runtime exports, import paths, bundled types, and public API shape.
4. Use upstream repo source, tests, examples, docs, and release notes for behavior and context.
5. Do not assume the default branch matches the installed package.

For other ecosystems, apply the same rule: prefer the exact installed artifact or release tag before default-branch docs.

## Delegation prompt shape

Use a prompt like this:

```text
Investigate this package/API question source-first and read-only.

Question: <exact user question>
Package/repo: <name or URL>
Relevant version: <installed/user-specified/latest and how known>
Local context: <only the files/imports that matter>

Rules:
- Keep research out of the main thread.
- Prefer exact package artifact/release source over default branch.
- Inspect source, type definitions, tests, examples, official repo docs, and release notes before web docs.
- Avoid Stack Overflow, blogs, random tutorials, and browser search unless source/official material fails.
- Do not modify files.
- Do not run install/build/test commands unless explicitly asked.
- Public `git clone` or `git fetch` into a temp/cache research directory is allowed for source lookup. Do not run pushes, PR operations, or upstream-changing commands unless explicitly approved.

Return:
1. Short answer.
2. Version/source inspected.
3. Evidence with file paths, URLs, and line references where available.
4. Minimal usage example with complete imports when relevant.
5. Caveats or uncertainty.
```

## Remote source handling

Prefer direct reads of package metadata, published package artifacts, GitHub files, and official source URLs. Public `git clone` or `git fetch` is allowed when direct reads are not enough, but only as read-only source retrieval into a temp/cache directory outside the user's repo.

Respect remote and upstream safety:

- Clone or fetch only public repos or package sources needed for the current lookup.
- Put clones under a temp/cache path such as `~/.cache/omp/source-first-docs`, never inside the user's working tree.
- Do not clone or fetch private repos or credentialed URLs without explicit approval.
- Do not fetch, pull, or otherwise sync inside the user's working tree as part of this workflow.
- Do not run pushes, PR operations, or any upstream-changing command unless explicitly approved.
- Never push, open PRs, modify remotes, or change upstream state from this workflow.

## What to avoid

- Do not answer source-sensitive package questions from model memory alone.
- Do not do broad web research in the main thread.
- Do not use Stack Overflow as API truth.
- Do not use stale docs when source, types, tests, examples, or release notes are available.
- Do not let the subagent return long context dumps.
- Do not add dependencies, install packages, run package scripts, or change project files just to answer a docs question.

## Final answer expectations

When the user asked a direct usage question, answer directly and cite the source-backed basis.

Include:

- The relevant package/version or repo/commit when known.
- The concrete usage or behavior.
- A small code example with imports when useful.
- Version caveats if docs/source differ.
- A short note when source lookup could not prove the answer.

Do not over-explain the research process unless the uncertainty matters.
