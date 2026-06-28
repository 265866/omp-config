---
description: Rust idioms, performance, allocation, and error-handling preferences
globs:
  - "**/*.rs"
  - "Cargo.toml"
  - "Cargo.lock"
---

# Rust rules

## Idioms

- Use the type system to encode invariants instead of relying on comments or runtime checks.
- Prefer borrowing over ownership when the callee doesn't need to keep the value.
- Avoid unnecessary `clone`, `to_string`, `collect`, boxing, and heap allocation.
- Use iterators when they keep the code clear. Use explicit loops when they avoid allocation, early-exit cleanly, or make ownership easier to read.
- Keep public APIs explicit about ownership, lifetimes, and error cases.

## Error handling

- Return `Result` for recoverable failure.
- Use specific error types or attach context where the caller needs it.
- Don't panic for input, I/O, network, configuration, or user-controlled errors.
- Avoid `unwrap` and `expect` in production paths unless the invariant is proven nearby.
- Panics are fine for tests and impossible states that would mean a programmer bug.

## Performance

- Treat allocation, copying, locking, and data layout as design choices.
- Mention meaningful performance or allocation costs when recommending an approach.
- Prefer simple code until the hot path or data size makes the cost real.
- Benchmark only when the performance risk is real or the trade-off isn't clear from the code.

## Tooling

Use the repository's Cargo commands and scripts. For final checks, follow `testing.md` and `post-implementation.md`.
