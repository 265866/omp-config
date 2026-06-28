---
name: everyday-writing
description: Writes and edits everyday prose so it sounds direct, specific, and natural without fake polish, marketing tone, or AI-era filler. Use for emails, posts, notes, replies, complaints, explanations, and casual public writing.
---

# Everyday Writing

Use this skill when the user wants normal prose: emails, posts, replies, notes, complaints, product feedback, issue reports, or explanations. The goal is not a famous person's voice. The goal is clear writing that sounds like a real person with a real point.

## Core rules

1. **Say the point first.** Do not warm up with context unless the reader needs it.
2. **Use contractions.** Prefer "I'm," "can't," "don't," and "that's" unless the user asks for formal tone.
3. **Keep the user's stance.** Preserve irritation, restraint, uncertainty, humor, or bluntness. Do not sand everything into customer-service voice.
4. **Cut fake warmth.** Avoid "I hope this finds you well," "happy to help," and cheerleading unless the user would actually say it.
5. **Cut fake drama.** No movie-trailer headings, forced punch lines, or grand claims.
6. **Use concrete detail when it helps.** Dates, prices, counts, names, screenshots, order numbers, and steps are useful in complaints and explanations. Do not add numbers just to sound specific.
7. **Prefer plain words.** Use "use" instead of "utilize," "help" instead of "facilitate," and "show" instead of "demonstrate" unless the formal word is the exact word.
8. **Keep useful rough edges.** A short sentence, fragment, or direct phrase can be right. Do not polish the life out of the draft.
9. **Do not impersonate.** Do not write as a public person. Borrow only general mechanics: direct claims, proof, plain words, and rhythm.

## Use available review agents

For substantial prose edits, public writing, or anything the user may send to someone else, use the available prose review agents instead of doing every pass in the main thread:

- `grammar-reviewer` checks grammar, spelling, punctuation, agreement, unclear references, and sentence-level readability.
- `phrasing-flow-reviewer` checks generic phrasing, fake polish, repeated structure, weak flow, tone drift, and over-smoothed patterns.
- `source-checker` checks citations, quotes, URLs, dates, numbers, names, legal claims, and source-backed claims. Use it only when the prose makes factual or source-dependent claims.

Run independent review agents in parallel when the text is long enough to justify it. For tiny rewrites, do the edit directly and keep the response concise.

## Common rewrites

### Email

Bad:

```text
I wanted to reach out regarding the issue I experienced with the service and express my concerns about the overall experience.
```

Better:

```text
I'm writing because the appointment was missed twice, and nobody called either time.
```

### Complaint

Bad:

```text
This has been a frustrating experience and I would appreciate a resolution at your earliest convenience.
```

Better:

```text
I paid for overnight shipping on June 4. The package arrived June 9. Please refund the shipping charge.
```

### Explanation

Bad:

```text
The update improves the onboarding flow and creates a better user experience.
```

Better:

```text
The update removes two signup fields: phone number and company size. New users only need email and password.
```

### Reply

Bad:

```text
Thank you for sharing your perspective. I completely understand where you're coming from.
```

Better:

```text
I get why you'd read it that way. My issue is with the refund policy, not the support person who answered the ticket.
```

## Tone choices

Pick the least fancy tone that fits.

- **Casual:** short, direct, contractions, mild fragments allowed.
- **Firm:** dates, facts, request, deadline if real.
- **Formal:** clean grammar, fewer fragments, still no filler.
- **Public post:** one clear claim, one or two concrete examples, no throat-clearing.

## Self-check

Before returning prose:

1. Does the first sentence say why the reader is here?
2. Did you preserve the user's actual point?
3. Did you add anything the user did not imply?
4. Did you remove fake warmth and fake drama?
5. Are the details real, useful, and not decorative?
6. Would a normal person send this without feeling embarrassed?
