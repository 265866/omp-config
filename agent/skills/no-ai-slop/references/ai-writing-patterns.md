# AI-era prose cleanup notes

Use these notes for editing and review, not drafting. They help name concrete problems in prose: vague claims, missing actors, unsupported detail, formulaic structure, house-style misses, and citation risk. Do not label who wrote the text from style.

## Scope

Use this reference for prose in READMEs, commit messages, commit descriptions, PR and issue titles or bodies, code comments, docs, changelogs, papers, source-backed text, emails, posts, notes, complaints, and public writing. Code itself is exempt.

Protect direct quotes, source titles, legal names, code, configuration, and terms of art unless the user asks to rewrite them.

## Hard failures

Treat these as pasted tool artifacts or unverified source artifacts:

- `oaicite`
- `contentReference`
- `turn0search0`
- `grok_card`
- fake source IDs
- broken citation placeholders
- citations with missing or mismatched title, author, year, venue, DOI, or URL

Fix by removing the artifact and verifying the real source.

## Weak wording

One word is a copyedit note. A cluster is a rewrite target. Keep a word when it has a precise technical meaning in context, appears inside a direct quote or title, or is the term the source uses.

Examples:

- Keep: "The museum displayed a medieval tapestry."
- Rewrite: "The policy creates a tapestry of challenges."
- Better: "The policy creates three problems: higher filing costs, longer approval times, and no appeal process."

### Filler hedges and intensifiers

- `additionally`
- `furthermore`
- `moreover`
- `notably`
- `importantly`
- `significantly`
- `crucially`
- `particularly`
- `specifically`
- `essentially`
- `fundamentally`
- `certainly`
- `undoubtedly`
- `ultimately`
- `arguably`

### Weak verbs

- `delve`
- `underscore`
- `highlight`
- `emphasize`
- `showcase`
- `foster`
- `cultivate`
- `encompass`
- `garner`
- `bolster`
- `leverage`
- `spearhead`
- `pioneer`
- `navigate` used abstractly
- `harness`
- `streamline`
- `facilitate`
- `utilize`
- `employ` when `use` works
- `ensure` when `make sure` or a direct rewrite works
- `align with`
- `resonate with`
- `enhance`
- `feature` as a verb
- `exemplify`
- `unravel`

### Weak adjectives

- `pivotal`
- `crucial`
- `vibrant`
- `profound`
- `groundbreaking`
- `cutting-edge`
- `innovative`
- `robust`
- `seamless`
- `comprehensive`
- `meticulous`
- `intricate`
- `nuanced`
- `multifaceted`
- `invaluable`
- `indispensable`
- `holistic`
- `synergistic`
- `dynamic` used abstractly
- `rich` used abstractly
- `enduring`
- `renowned`
- `transformative`
- `palpable`
- `commendable`
- `fleeting`

### Weak nouns

- `landscape` used abstractly
- `tapestry`
- `interplay`
- `intricacies`
- `paradigm`
- `ecosystem` outside a technical context
- `synergy`
- `realm`
- `spectrum`
- `plethora`
- `myriad` as a noun
- `cornerstone`
- `linchpin`
- `bedrock`
- `underpinning`
- `solace`

## Stock phrases and openings

Cut these unless they are inside a direct quote or title:

- "In today's world"
- "In an era of"
- "It is important to note"
- "It is worth noting"
- "At its core"
- "In essence"
- "That being said"
- "In conclusion"
- "To sum up"
- "Let's dive in"
- "Here's the thing"
- "The bottom line"
- "Not just X, but Y"
- "It is not X. It is Y."
- "Whether you're X, Y, or Z"
- "serves as a testament to"
- "stands as"
- "nestled in the heart of"
- "a diverse array of"
- "a wide range of"
- "plays a vital/key/significant/crucial/pivotal role"
- "shaping the future of"
- "setting the stage for"
- "paving the way for"
- "at the forefront of"
- "the evolving landscape of"
- "indelible mark"
- "deeply rooted"
- "boasts a"
- "commitment to excellence"
- "Great question!"
- "That's an excellent point!"
- "Absolutely!"

Replace the phrase with the claim.

## Structure and flow patterns

### Abstract noun stacks

Rewrite sentences where nouns hide the actor and action.

Bad:

```text
The facilitation of implementation improved stakeholder alignment.
```

Better:

```text
The weekly email told managers what changed, who owned it, and when it was due.
```

### Trailing clause chains

Watch for polished sentence motion:

```text
..., highlighting X, reinforcing Y, creating Z.
```

Keep a clause only if it adds a real fact. Otherwise cut it or split it into a sentence with proof.

### Repeated section shape

Rewrite when several paragraphs use the same template:

```text
Topic sentence. Generic explanation. Broad consequence.
Topic sentence. Generic explanation. Broad consequence.
Topic sentence. Generic explanation. Broad consequence.
```

Use the evidence to decide the shape. A thin point can be one sentence. A detailed point can be two paragraphs.

### Rule of three

Do not default to three-item lists or adjective triplets. Use the number of items the content needs.

### Copulative avoidance

Do not replace every `is` with `serves as`, `represents`, `marks`, `stands as`, or `offers`. Sometimes the thing just is the thing.

### Elegant variation

Do not cycle through synonyms to avoid repeating a word. Repetition is often clearer. Do not call a function "the function," "the method," and "the routine" in successive sentences when one term is clearer.

### Section summaries

Do not add a recap paragraph at the end of each section unless the reader needs a decision or next step.

### Didactic disclaimers

Do not open with "This document discusses...", "It should be noted that...", or "It's important to understand...". Start with the point.

### Challenges formula

Do not write "Despite its [positive], [subject] faces challenges such as..." when you can name the problem directly.

### Vague attribution

Do not write "experts argue," "observers note," or "industry reports suggest" without naming the source. Either cite the source or own the claim.

### Notability padding

Do not pad notability with media-coverage filler, such as "profiled in," "featured by," "active social media presence," or broad coverage claims. State facts about the subject, not how much attention it got.

### Promotional tone

Do not write press-release copy. If the prose could pass as tourism copy or a marketing blurb, state facts and cut the sell.

### Generic significance claims

Do not write about "broader importance," "enduring legacy," or "lasting impact" when the sentence could apply to any subject. If something matters, say how it matters.

## Formatting and Markdown

- Avoid em dashes in prose unless the user explicitly asks to keep them. Use commas, periods, colons, semicolons, or parentheses instead.
- Use straight quotes and apostrophes (`"` `'`), not curly quotes, in technical writing.
- Use sentence case in Markdown headings.
- Do not skip heading levels.
- Do not put a horizontal rule before a heading.
- Use bold for terms on first definition, definition-list lead-ins, or real emphasis. Do not bold phrases mid-sentence for decoration.
- Do not default to bold-header lists. Use prose when the content does not need enumeration.
- Do not leave placeholder text such as "[insert X here]," "[description]," or "TODO: expand."
- Do not use emoji in prose, docs, commit messages, or PR descriptions unless the user asks.

Also watch for repeated colon slogans:

```text
The truth: ...
The problem: ...
The reality: ...
```

One can work. A string of them reads packaged.

## Tone and rhythm

- Mix short sentences with longer ones when the thought needs it.
- Use contractions unless the user asks for formal tone.
- Prefer active voice and concrete subjects: "The parser handles X," not "X is handled by the parser."
- Keep useful rough edges. Do not polish every sentence to the same gloss.
- Do not over-qualify. If something is true, say it.
- Do not describe what you are about to do or what you just did.
- Use `we` or `let's` only when the audience is part of the action.
- Do not cite model or tool limits as a personal excuse. State the real constraint.
- Do not cushion every negative with a positive. If something is bad, say it.

## Technical prose

### Commit messages and PR descriptions

- Keep commit subjects short, under 72 characters.
- Keep commit subjects lowercase after the type prefix.
- Commit bodies explain why. The diff shows what changed.
- Use plain verbs in commits: `fix`, `add`, `change`, `remove`, `update`, `simplify`, `refactor`, `extract`, `inline`, `rename`, `move`, or `drop`.
- Avoid inflated commit verbs such as `enhance`, `streamline`, and `leverage`.
- Keep edit summaries and changeset descriptions terse.
- PR descriptions should say what changed and why. Do not write "This PR aims to enhance the overall developer experience by streamlining...".

### Code comments

- Comments explain why, not what.
- Do not narrate the code. `// Loop through the items` above a loop is noise.
- Do not add philosophical commentary. `// This is crucial for maintaining data integrity` does not explain the invariant.
- Keep comments terse. One short sentence or a sentence fragment is enough.

## Citation check

If a citation appears, verify four things:

1. The source exists.
2. The title, authors, year, and venue match.
3. The DOI or URL resolves when available.
4. The source supports the exact sentence.

If a tool supplied the citation, treat it as unverified until checked.

## Guardrails

Do not flag text just because it is simple, formal, short, translated, or formulaic. These can be normal in:

- English-learning prose
- academic assignments
- legal writing
- technical notes
- support replies
- templates
- forms
- abstracts
- direct quotes
- code and configuration

If the passage is clear, accurate, sourced, and genre-fit, do not damage it to dodge a heuristic.

## Source notes

- Juzek and Ward, COLING 2025, lexical overrepresentation: https://aclanthology.org/2025.coling-main.426/
- Doughman et al., COLING 2025, limits of style-based classification: https://aclanthology.org/2025.coling-main.288/
- Tufts, Zhao, and Li, NAACL Findings 2025, limits of automated classification claims: https://aclanthology.org/2025.findings-naacl.271/
- Saha and Feizi, ACL Findings 2025, edited and polished text: https://aclanthology.org/2025.findings-acl.1303/
- Liang et al., non-native writer false positives: https://pmc.ncbi.nlm.nih.gov/articles/PMC10382961/
- Mesbah 2026, reliability in academic contexts: https://link.springer.com/article/10.1007/s40979-026-00213-1
- Rallapalli et al. 2026, stylistic variation across models and genres: https://arxiv.org/abs/2604.14111
- Freeburg 2026, em dash and markdown training: https://arxiv.org/abs/2603.27006
- GhostCite 2026, citation hallucination: https://arxiv.org/html/2602.06718v2
