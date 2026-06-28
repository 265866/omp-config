---
name: no-ai-slop
description: Edits or reviews prose to remove generic AI-era phrasing, vague claims, filler transitions, over-polished structure, and unsupported detail. Use for editing emails, posts, notes, docs, complaints, public prose, and source-backed text.
---

# No AI Slop

Use this skill as an editing or review pass. Do not guess who wrote a passage from style. Name the editable problem: vague claim, missing actor, unsupported number, fake citation, repeated structure, tone mismatch, or filler.

For longer lists, edge cases, and source notes, read `skill://no-ai-slop/references/ai-writing-patterns.md`.

## Rewrite rules

1. **Say the actual thing.** Replace vague claims with the actor, action, date, count, cost, source, or mechanism when it matters.
   - Bad: "This change had a major impact on users."
   - Better: "The login change locked out users who had SMS disabled."

2. **Cut filler openers.** Remove phrases that delay the point.
   - Bad: "In today's world, clear communication is important."
   - Better: "Say what changed, who is affected, and what happens next."

3. **Remove fake drama.** Headings and openers should describe the subject, not tease it.
   - Bad: "The Hidden Cost of Convenience"
   - Better: "Subscription fees after the trial ends"

4. **Replace abstract nouns with people doing things.** Watch for stacks like implementation, optimization, alignment, enhancement, utilization, transformation.
   - Bad: "The implementation of improved communication practices enables better alignment."
   - Better: "Post the change, name the owner, and give the deadline."

5. **Break polished clause chains.** Rewrite trailing motion that adds no proof.
   - Bad: "The update improves onboarding, creating a smoother experience and reinforcing trust."
   - Better: "The update removes the phone-number field from signup. New users only need email and password."

6. **Use numbers only when they help.** Do not add fake precision. If a factual claim depends on scale, add the real count, price, date, or source.

7. **Verify citations.** If a source, quote, statute, DOI, title, author, or date appears, check that it exists and supports the sentence. Clean formatting is not proof.

8. **Keep house punctuation.** Avoid em dashes in prose unless the user explicitly asks to keep them. Use commas, periods, colons, semicolons, or parentheses instead. Name the style problem rather than guessing from punctuation.

9. **Protect exact text.** Do not rewrite direct quotes, source titles, legal names, code, configuration, or terms of art unless the user asks.

10. **Preserve the user's intent.** Make the prose clearer and more specific. Do not add cheerleading, fake warmth, slang, typos, or forced quirks to fake a casual voice.

## Self-check

Before returning prose:

1. Remove filler openers and AI-era stock transitions.
2. Replace hollow claims with checkable details where available.
3. Check for repeated paragraph templates and too-even sentence rhythm.
4. Check abstract noun stacks and trailing `-ing` clause chains.
5. Verify any citation or quoted claim you touched.
6. Confirm the edit still sounds like the user and fits the genre.
7. Do not label who wrote the text from style.
