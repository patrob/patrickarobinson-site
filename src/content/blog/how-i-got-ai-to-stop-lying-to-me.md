---
title: 'How I Got AI to Stop Lying to Me'
description: 'How FAR Scale helps reduce hallucinations and improve AI research reliability'
pubDate: 'Oct 09 2025'
heroImage: '../../assets/hero-ai-stop-lying.png'
---

I've been working with AI coding assistants for a while now, and I kept running into the same frustrating pattern: I'd ask Claude or another LLM to research something technical, get back what looked like a great answer, and then discover later that critical details were hallucinated or outdated. The problem wasn't that the AI was bad—it was that I had no systematic way to validate what it told me.

So I built something about it. Not a revolutionary framework, not the answer to AI reliability—just a practical methodology that's working for me in my own projects. I call it FAR Scale: Factual, Actionable, and Relevant.

## The Problem: When AI Research Fails You

In my experience, here's a pattern I've encountered repeatedly. Recently, I needed to understand specific deprecations in the Node 22 release that could affect production code. I asked Claude to research the breaking changes and migration steps.

The response was detailed, confident, and... partially wrong. It mentioned several breaking changes that sounded plausible but weren't actually in the official migration guide. It cited best practices that were outdated. And crucially, it missed a few deprecations documented in the official Node.js changelog that I only caught when manually cross-referencing.

That's when it hit me: **I was treating AI-generated research like gospel instead of treating it like research from a junior developer who needs their work validated.**

## Enter FAR Scale: A Simple Framework for AI Research Validation

The approach is simple: after the AI completes research, you validate each finding by asking three questions. Can this be verified? Can I act on it immediately? Is it actually relevant to what I asked?

Score each question from 0-5. Only findings that pass a quality threshold get trusted.

I've documented FAR Scale in the [RPI Strategy framework](https://github.com/patrob/rpi-strategy) as a validation methodology I'm developing for research findings. Here's how the scoring works:

### F - Factual (0-5)
Can this information be verified and proven?

- **5**: Strongly verified - Minimal repro + automated failing test; root cause identified
- **4**: Corroborated - Deterministic repro; multiple environments; call graph aligns
- **3**: Provisionally credible - Partial repro; stack trace matches; one failing test
- **2**: Single-source, weak provenance - One screenshot/log snippet; indirect evidence
- **1**: Rumor - Hearsay in chat/issue; no repro, logs, or code references
- **0**: Fabricated - Contradicts code/architecture; no artifacts; synthetic/edited logs

### A - Actionable (0-5)
How immediately can you act on this information?

- **5**: Immediate, high-leverage - One-liner fix; can open PR in < 60 minutes
- **4**: Clear, low-friction plan - Stepwise fix plan; known owner; small PR possible
- **3**: Concrete next step exists - Specific file/function to probe; can add logs/tests
- **2**: Directional, heavy lift - Hypothesis exists; requires significant environment work
- **1**: Vague/long-term only - Needs large refactor; unclear ownership
- **0**: No action possible - No repro, no hypothesis, no access

### R - Relevant (0-5)
How directly does this apply to your specific question or problem?

- **5**: Bullseye for now - Directly unblocks critical path; measurable customer impact
- **4**: Core + timely - Blocks ticket; within team ownership
- **3**: On-theme - Within component; affects acceptance criteria
- **2**: Adjacent/general interest - Related subsystem behavior
- **1**: Tangential - Neighboring area; theoretical risk, low priority
- **0**: Off-topic - Unrelated subsystem; no impact on acceptance criteria

A finding needs **Factual ≥4, Actionable ≥3, Relevant ≥3** with a **mean score ≥4.00** to be considered reliable. Anything below that gets flagged with reasoning about what's uncertain or missing.

## The Key Insight: AI as Judge

Here's what I've observed makes this approach work for me: LLMs struggle with factual recall, but when you give them specific criteria and structured rubrics, they can perform useful self-evaluation. This seems especially true when validation happens in a separate context from the research itself.

They'll honestly say "I can't find a source for this" or "This is based on my training data, not current documentation."

It's the difference between "The answer is definitely X" and "I think the answer is X, but I'm only 60% confident because I can only find partial evidence in the docs." The latter is infinitely more useful.

## How It Works: The Research Workflow

So how do you actually use this in practice? Here's the workflow I use:

**Phase 1: [Research](https://github.com/patrob/rpi-strategy/blob/main/docs/phases/Research.md) (First Conversation)**
1. Ask your research question
2. AI conducts research using docs, web search, etc.
3. AI generates findings and saves them to a file

**Phase 2: Validation (Fresh Conversation)**
1. Start a completely new conversation with a fresh AI instance
2. Give it the research findings file
3. The fresh AI scores each finding against FAR Scale criteria
4. Only findings with F≥4, A≥3, R≥3, Mean≥4.00 pass
5. Lower-scored findings get flagged with gaps identified

The critical step is the **context separation**. A fresh AI instance validates the research without any stake in defending it. In my experience, this prevents confirmation bias and forces objective scoring with evidence justification.

## Limitations and Honest Caveats

FAR Scale isn't magic. The real limitations:

**Only as good as available documentation.** If official docs are sparse, you'll get low Factual scores. That's useful information, but it doesn't create knowledge that doesn't exist.

**Still requires critical thinking.** A passing FAR score doesn't mean blindly implement. You still need to understand if it fits your context.

**Some subjectivity in scoring.** In my experience, consistency matters more than precision—as long as the AI is consistently honest about uncertainty and provides clear justification, the exact number matters less.

## Try It Yourself: The Two-Context Workflow

The complete, up-to-date FAR Scale rubric is maintained at [github.com/patrob/rpi-strategy](https://github.com/patrob/rpi-strategy/blob/main/docs/scales/far-scale.md).

Here are the exact prompts I use:

### Template 1: Research Prompt (Context 1)

```markdown
I need you to research: [YOUR QUESTION]

Please gather information from official documentation, release notes,
and reliable sources. Focus on:
- Specific technical details
- Breaking changes or migration requirements
- Compatibility considerations
- Concrete examples where available

Save your findings to a file so I can validate them separately.
```

### Template 2: Validation Prompt (Context 2 - Fresh Conversation)

```markdown
Validate these research findings using the FAR Scale rubric from:
https://github.com/patrob/rpi-strategy/blob/main/docs/scales/far-scale.md

Score each finding on Factual (0-5), Actionable (0-5), Relevant (0-5)
using the full rubric criteria.

Pass criteria: F≥4, A≥3, R≥3, Mean≥4.00

Be objective. Score based on evidence, not optimism.

Format each finding as:
## Finding: [Title]
FAR Score: F: X/5, A: Y/5, R: Z/5, Mean: W.XX
Status: [Pass/Flag]
[Description]
Justification: [Why these scores; what evidence exists or is missing]
```

The key is using these templates in **separate conversations**. Don't let the AI that did the research score itself.

## Final Thoughts

Here's what I've observed changes when you can better trust AI research: you stop second-guessing every answer. You stop manually cross-referencing documentation for hours. You can delegate research more confidently because you know low-scoring findings will get flagged. The AI becomes less like a source of truth and more like a research assistant who actually tells you when they're unsure.

AI coding assistants are powerful tools, but they're not magic. They hallucinate. They get things wrong. They confidently present outdated information.

What I built with FAR Scale doesn't fix hallucinations—it surfaces them. It turns "I think this is right" into "Here's what I'm confident about and here's what I'm uncertain about."

That's not revolutionary. But it's practical, it's working for me, and it's made my AI-assisted development workflow significantly more reliable.

Give it a try. Adapt it to your needs. And if you find ways to improve it, let me know.

---

*This post is part of my ongoing exploration of practical AI-assisted development workflows. Not looking for the perfect solution—just building what works.*
