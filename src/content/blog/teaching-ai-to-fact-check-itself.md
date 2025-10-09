---
title: 'Teaching AI to Fact-Check Itself'
description: 'How FAR Scale helps reduce hallucinations and improve AI research reliability'
pubDate: 'Oct 09 2025'
heroImage: '../../assets/hero-teaching-ai-fact-check.jpg'
---

I've been working with AI coding assistants for a while now, and I kept running into the same frustrating pattern: I'd ask Claude or another LLM to research something technical, get back what looked like a great answer, and then discover later that critical details were hallucinated or outdated. The problem wasn't that the AI was bad—it was that I had no systematic way to validate what it told me.

So I built something about it. Not a revolutionary framework, not the answer to AI reliability—just a practical methodology that's working for me. I call it FAR Scale: Factual, Actionable, and Relevant.

## The Problem: When AI Research Fails You

Here's a real example. Recently, I needed to migrate a project from Node 20 to Node 22. Simple enough, right? I asked Claude to research the breaking changes and migration steps.

The response was detailed, confident, and... partially wrong. It mentioned several breaking changes that sounded plausible but weren't actually in the official migration guide. It cited best practices that were outdated. And crucially, it missed a few important deprecations that could have broken my production code.

The issue wasn't obvious until I manually cross-referenced the Node.js documentation. And that's when it hit me: **I was treating AI-generated research like gospel instead of treating it like research from a junior developer who needs their work validated.**

## Enter FAR Scale: A Simple Framework for AI Research Validation

FAR Scale is a three-part scoring system that forces AI to fact-check itself before presenting findings. Each finding gets scored 0-5 on three dimensions:

FAR Scale is documented in the [RPI Strategy framework](https://github.com/patrob/rpi-strategy) as a validation methodology I've been developing for research findings.

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

Here's what makes FAR Scale work: LLMs struggle with factual recall, but they're surprisingly good at self-evaluation. When you give them specific criteria and ask them to evaluate their own output, they'll honestly say "I can't find a source for this" or "This is based on my training data, not current documentation."

It's the difference between "The answer is definitely X" and "I think the answer is X, but I'm only 60% confident because I can only find partial evidence in the docs." The latter is infinitely more useful.

## How It Works: The Research Workflow

Here's the workflow I use with FAR Scale:

```
┌─────────────────────────────────────────────────────────────┐
│                    User asks research question              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  AI conducts research (docs search, web search, etc.)       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  AI generates findings and SELF-SCORES each finding         │
│  against FAR Scale criteria                                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  Only findings with F≥4, A≥3, R≥3, Mean≥4.00 pass          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  Lower-scored findings are flagged with specific            │
│  concerns and confidence levels                             │
└─────────────────────────────────────────────────────────────┘
```

The critical step is the **self-scoring**. The AI must justify each score with evidence (or lack thereof). This forces it to confront gaps in its knowledge before presenting findings to you.

## A Real Example: Validating Astro 5 Migration Research

Let me show you what this looks like in practice. Here's what I did when I needed to understand the impact of upgrading to Astro 5.

### The Critical Insight: Separate Research from Validation

The most important thing I learned about FAR Scale is this: **it's not for conducting research—it's for validating research that's already been done.** The workflow requires two distinct contexts:

1. **Research Context**: AI gathers information, explores documentation, makes connections
2. **Validation Context**: Fresh AI instance scores the research findings objectively

Why separate contexts? Because if the AI that conducted the research also scores it, you get confirmation bias. The AI will rationalize its own findings and inflate scores. A clean validation context prevents this.

### Phase 1: Research (First Context)

I started a conversation and asked Claude to research Astro 5 breaking changes, compatibility considerations, and migration requirements for my specific tech stack (Node 22, Vitest, TypeScript). No FAR Scale scoring yet—just pure research.

Claude dug through the Astro 5 release notes, compatibility matrices, GitHub discussions, and related tooling documentation. It produced a comprehensive set of findings about what would need to change.

### Phase 2: Context Clear (Critical Step)

Here's where it gets interesting. I didn't ask the same AI to score its own work. Instead, I started a completely fresh conversation—new context, no memory of the research phase.

This context separation is what makes FAR Scale effective. The validator has no stake in defending the research.

### Phase 3: Validation (Second Context)

In the fresh context, I provided the raw research findings and asked for FAR Scale validation. I used this prompt:

```markdown
Validate these research findings using the FAR Scale rubric from:
https://github.com/patrob/rpi-strategy/blob/main/docs/scales/far-scale.md

Score each finding on Factual (0-5), Actionable (0-5), Relevant (0-5)
using the full rubric criteria.

Pass criteria: F≥4, A≥3, R≥3, Mean≥4.00

Be objective. Score based on evidence, not optimism.
```

Here's what came back from our real validation:

---

**Finding: Astro 5 is compatible with Node 22**
- **FAR Score**: F: 5/5, A: 5/5, R: 5/5, Mean: 5.00
- **Status**: Pass (Perfect Score)

Astro 5 officially supports Node 22. The migration is straightforward with no breaking changes for Node 22 environments.

**Why This Scored High**:
- Verified in multiple official sources (release notes, compatibility matrix, CI configuration)
- Immediately actionable (can upgrade with confidence)
- Directly answers the core migration question
- Later confirmed: Zero changes required, tests passed in CI

---

**Finding: Import attributes syntax (not assertions) required**
- **FAR Score**: F: 4/5, A: 5/5, R: 4/5, Mean: 4.33
- **Status**: Pass

Node 22 and Astro 5 support the newer import attributes syntax. While import assertions are being phased out, this is a breaking change only if you're actively using the older syntax.

**Why This Scored Well**:
- Factual: Corroborated in Node.js and TC39 documentation
- Actionable: Clear migration path if needed
- Relevant: Important to know, but only affects projects using JSON imports
- Later confirmed: Not used in my codebase, no changes needed

---

**Finding: Vitest compatibility with caveat about performance monitoring**
- **FAR Score**: F: 3/5, A: 3/5, R: 4/5, Mean: 3.33
- **Status**: Pass (Lowest Score)

Vitest works with Astro 5 and Node 22, but watch for potential performance differences in test execution. The research suggested monitoring test run times.

**Why This Scored Lower**:
- Factual: No specific issues documented, based on general compatibility
- Actionable: Vague recommendation (just "watch for issues")
- Relevant: On-theme but not specific to my implementation
- Later confirmed: Tests passed, but this remains the finding I'm least confident about

---

### The Key Difference: High Scores vs. Low Scores

Notice the pattern:

**Perfect score (5.00)**: Zero ambiguity. Verified in official sources. No caveats. Turned out to require zero code changes.

**Good score (4.33)**: Well-documented breaking change, but with a clear scope. Didn't affect my project, but good to know about.

**Passing but weakest (3.33)**: Vague recommendation without specific evidence. This is the finding I'd manually verify or monitor over time.

All three passed FAR Scale thresholds, but the scores told me exactly which findings to trust immediately versus which to keep an eye on.

### What This Workflow Gave Me

When I ran the migration, the FAR scores were predictive. The perfect-score finding required no changes. The import attributes finding was accurate but irrelevant to my code. The Vitest finding remains something I'm watching, but hasn't caused issues yet.

The two-context approach—research in one conversation, validation in another—gave me objective scores I could trust because the validator wasn't defending the research.

## Limitations and Honest Caveats

FAR Scale isn't magic. The real limitations:

**Only as good as available documentation.** If official docs are sparse, you'll get low Factual scores. That's useful information, but it doesn't create knowledge that doesn't exist.

**Still requires critical thinking.** A passing FAR score doesn't mean blindly implement. You still need to understand if it fits your context.

**Some subjectivity in scoring.** I've found consistency matters more than precision—as long as the AI is consistently honest about uncertainty and provides clear justification, the exact number matters less.

## Try It Yourself: A Starter Template

The complete, up-to-date FAR Scale rubric is maintained at [github.com/patrob/rpi-strategy](https://github.com/patrob/rpi-strategy/blob/main/docs/scales/far-scale.md).

If you want to experiment with FAR Scale, here's a simple template to get started:

```markdown
I need you to research: [YOUR QUESTION]

Use FAR Scale scoring for all findings:

F (Factual): Can this be verified and proven?
  5 = Strongly verified (minimal repro + automated test; root cause identified)
  4 = Corroborated (deterministic repro; multiple environments)
  3 = Provisionally credible (partial repro; stack trace matches)
  2 = Single-source, weak provenance (one screenshot/log snippet)
  1 = Rumor (hearsay; no repro, logs, or code references)
  0 = Fabricated (contradicts code/architecture)

A (Actionable): How immediately can I act on this?
  5 = Immediate, high-leverage (one-liner fix; PR in <60 min)
  4 = Clear, low-friction plan (stepwise fix; small PR possible)
  3 = Concrete next step exists (specific file/function to probe)
  2 = Directional, heavy lift (hypothesis exists; significant work)
  1 = Vague/long-term only (needs large refactor)
  0 = No action possible (no repro, no hypothesis)

R (Relevant): How directly does this apply to my question?
  5 = Bullseye for now (directly unblocks critical path)
  4 = Core + timely (blocks ticket; within ownership)
  3 = On-theme (within component; affects criteria)
  2 = Adjacent/general interest (related subsystem)
  1 = Tangential (neighboring area; low priority)
  0 = Off-topic (unrelated subsystem)

Pass criteria: F≥4, A≥3, R≥3, Mean≥4.00

Format:
## Finding: [Title]
FAR Score: F: X/5, A: Y/5, R: Z/5, Mean: W.XX
Status: [Pass/Flag]
[Description]
Justification: [Why these scores; what evidence exists or is missing]
```

## Final Thoughts

AI coding assistants are powerful tools, but they're not magic. They hallucinate. They get things wrong. They confidently present outdated information.

FAR Scale doesn't fix hallucinations—it surfaces them. It turns "I think this is right" into "Here's what I'm confident about and here's what I'm uncertain about."

That's not revolutionary. But it's practical, it's working for me, and it's made my AI-assisted development workflow significantly more reliable.

Give it a try. Adapt it to your needs. And if you find ways to improve it, let me know.

---

*This post is part of my ongoing exploration of practical AI-assisted development workflows. Not looking for the perfect solution—just building what works.*
