---
title: 'Teaching AI to Fact-Check Itself'
description: 'How FAR Scale helps reduce hallucinations and improve AI research reliability'
pubDate: 'Oct 09 2025'
heroImage: '../../assets/hero-teaching-ai-fact-check.jpg'
---

I've been working with AI coding assistants for a while now, and I kept running into the same frustrating pattern: I'd ask Claude or another LLM to research something technical, get back what looked like a great answer, and then discover later that critical details were hallucinated or outdated. The problem wasn't that the AI was bad—it was that I had no systematic way to validate what it told me.

So I built something about it. Not a revolutionary framework, not the answer to AI reliability—just a practical methodology that's working for me. I call it FAR Scale: Findability, Accuracy, and Relevance.

## The Problem: When AI Research Fails You

Here's a real example. Recently, I needed to migrate a project from Node 20 to Node 22. Simple enough, right? I asked Claude to research the breaking changes and migration steps.

The response was detailed, confident, and... partially wrong. It mentioned several breaking changes that sounded plausible but weren't actually in the official migration guide. It cited best practices that were outdated. And crucially, it missed a few important deprecations that could have broken my production code.

The issue wasn't obvious until I manually cross-referenced the Node.js documentation. And that's when it hit me: **I was treating AI-generated research like gospel instead of treating it like research from a junior developer who needs their work validated.**

## Enter FAR Scale: A Simple Framework for AI Research Validation

FAR Scale is a three-part scoring system that forces AI to fact-check itself before presenting findings. Each finding gets scored 0-5 on three dimensions:

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

The beautiful thing about FAR Scale is that it leverages what LLMs are actually good at: **evaluation and comparison**.

LLMs struggle with factual recall—they'll confidently hallucinate details. But when you give them specific criteria and ask them to evaluate their own output against those criteria, they're surprisingly honest. They'll tell you "I can't find a source for this" or "This is based on my training data, not current documentation."

It's like having an AI that says, "I think the answer is X, but I'm only 60% confident because I can only find partial evidence in the docs." That's infinitely more useful than "The answer is definitely X" when X is wrong.

## How It Works: The Research Workflow

Here's the workflow I use with FAR Scale:

```
┌─────────────────────────────────────────────────────────────┐
│                    User asks research question               │
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
│  Only findings with F≥7, A≥7, R≥7 are presented             │
│  as "reliable"                                               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  Lower-scored findings are flagged with specific            │
│  concerns and confidence levels                              │
└─────────────────────────────────────────────────────────────┘
```

The critical step is the **self-scoring**. The AI must justify each score with evidence (or lack thereof). This forces it to confront gaps in its knowledge before presenting findings to you.

## A Real Example: Node 20 to Node 22 Migration

Let me show you what this looks like in practice. Here's the prompt I now use for research tasks:

```markdown
Research the breaking changes when migrating from Node 20 to Node 22.

For each finding, score it using FAR Scale:
- F (Factual): Can this be verified? Score 0-5.
- A (Actionable): How immediately can I act on this? Score 0-5.
- R (Relevant): How directly does this apply to my migration? Score 0-5.

Pass criteria: Factual ≥4, Actionable ≥3, Relevant ≥3, Mean ≥4.00

Format each finding as:
## Finding: [Brief title]
**FAR Score**: F: X/5, A: Y/5, R: Z/5, Mean: W.XX
**Status**: [Pass / Flag]

[Description with sources]

**Justification**: [Why these scores; what evidence exists or is missing]
```

Here's what I got back (abbreviated):

---

**Finding 1: ESM JSON Import Assertion Required**
- **FAR Score**: F: 4/5, A: 4/5, R: 5/5, Mean: 4.33
- **Status**: Pass

Node 22 requires explicit import assertions for JSON modules in ESM contexts. You must use `import data from './file.json' assert { type: 'json' }`.

**Justification**:
- *Factual*: Corroborated in official Node.js ESM documentation with code examples in multiple sections
- *Actionable*: Clear, low-friction plan - Search codebase for `.json` imports, add assertions; small PR
- *Relevant*: Bullseye - This will break existing ESM code on upgrade; directly blocks migration

**Evidence**: [https://nodejs.org/docs/latest-v22.x/api/esm.html#json-modules](https://nodejs.org/docs/latest-v22.x/api/esm.html#json-modules)

---

**Finding 2: V8 Engine Update Performance Improvements**
- **FAR Score**: F: 2/5, A: 2/5, R: 2/5, Mean: 2.00
- **Status**: Flag (Below thresholds)

Node 22 includes an updated V8 engine which may improve performance for certain JavaScript operations.

**Justification**:
- *Factual*: Single-source, weak provenance - Release notes mention V8 update but no specific performance data
- *Actionable*: Directional, heavy lift - Would need to set up benchmarks across Node versions to verify
- *Relevant*: Adjacent/general interest - Nice to know, but doesn't affect migration success

**Evidence**: Mentioned in release notes, but I cannot find reproducible performance benchmarks in official documentation. If performance is critical, run your own benchmarks.

---

**Finding 3: Deprecated crypto.DEFAULT_ENCODING Removed**
- **FAR Score**: F: 1/5, A: 1/5, R: 3/5, Mean: 1.67
- **Status**: Flag (Below thresholds)

There may be changes to deprecated constants in the crypto module.

**Justification**:
- *Factual*: Rumor - Based on deprecation patterns from Node 18→20, not found in Node 22 docs
- *Actionable*: Vague/long-term only - Would need to audit entire crypto module usage without specific guidance
- *Relevant*: On-theme - Would affect migration if true, but unverified

**Evidence**: I cannot find this in the official Node 22 migration guide or changelog. This is speculative based on historical patterns. Manually check crypto module documentation if you use it.

---

See the difference? Finding 1 passes all thresholds with a 4.33 mean—actionable and verified. Findings 2 and 3 are flagged for low Factual scores: one lacks benchmarks, the other is purely speculative.

This gives me actionable information. I can trust Finding 1 and immediately create a PR. Finding 2 is interesting but not blocking. Finding 3 tells me to manually audit crypto usage, but I don't treat it as confirmed.

## Why This Works: Three Key Reasons

### 1. Forces Explicit Source Attribution
When the AI has to score Findability, it can't hand-wave about "best practices" without backing it up. Either there's a link to official docs or there isn't.

### 2. Surfaces Uncertainty Early
Instead of discovering hallucinations after acting on them, you see uncertainty flags upfront. This changes AI research from "verify everything" to "verify low-confidence findings."

### 3. Maintains AI Utility
This isn't about crippling the AI or only allowing it to quote docs verbatim. Lower-scored findings are still valuable—they just come with appropriate caveats. Sometimes a 5/10 Findability finding from Stack Overflow is exactly what you need, as long as you know that's what it is.

## Practical Implementation: How I Use This Daily

I've integrated FAR Scale into my development workflow through a custom Claude project. Here's my typical usage pattern:

**For technical research questions:**
```
Research [topic] using FAR Scale scoring. Present findings that pass
(F≥4, A≥3, R≥3, Mean≥4.00) first, then flagged findings with explicit gaps.
```

**For migration/upgrade tasks:**
```
Research breaking changes from [old version] to [new version] using
FAR Scale. Only present changes that pass all thresholds as "confirmed
breaking changes". Flag anything uncertain with justification.
```

**For architectural decisions:**
```
Research pros/cons of [approach A] vs [approach B] for [use case].
Use FAR Scale to distinguish between well-verified best practices
(high Factual scores) and community opinions (lower Factual scores).
```

The key is being explicit in the prompt that you want FAR Scale scoring. Once that's established, the AI maintains that standard throughout the conversation.

## Limitations and Honest Caveats

FAR Scale isn't magic. Here are the real limitations I've encountered:

### 1. Only as Good as Available Documentation
If official docs are sparse or outdated, even the AI's honest effort will yield low Findability scores. That's useful information, but it doesn't create knowledge that doesn't exist.

### 2. Requires Source Access
This works best when the AI can actually search documentation or the web. If you're asking about proprietary internal systems with no public docs, FAR Scale can't help much.

### 3. Still Requires Critical Thinking
A passing FAR score doesn't mean you should blindly implement the finding. It means the finding is well-verified, actionable, and relevant, but you still need to understand it and decide if it fits your context.

### 4. Scoring Can Be Subjective
What counts as a "4" vs a "5" on Factual? There's some subjectivity here. I've found consistency matters more than precision—as long as the AI is consistently honest about uncertainty and provides clear justification, the exact number matters less.

## What About Other Validation Approaches?

You might be thinking, "Why not just use tools like retrieval-augmented generation (RAG) or citation-based systems?" Fair question.

**RAG systems** are excellent when you have a well-defined corpus of documents. But they require setup, infrastructure, and work best with static internal knowledge bases. FAR Scale works with any public information and requires no infrastructure—just a well-crafted prompt.

**Citation-based systems** (like Perplexity or Bing Chat) are great for showing sources. But they often don't score the quality or relevance of those sources. A citation to a random blog post looks the same as a citation to official docs. FAR Scale explicitly distinguishes these.

Think of FAR Scale as a lightweight, prompt-based approach that bridges the gap between "raw LLM" and "fully-engineered RAG system." It's not better than RAG for all use cases—it's more accessible for solo developers or small teams who just need better research validation today.

## The Broader Implication: Changing How We Use AI

Here's what I think is really interesting about this approach: **It changes the relationship between human and AI from "master/servant" to "researcher/reviewer."**

When I ask an AI to research something without validation, I'm implicitly trusting it to be right. When it hallucinates, I feel betrayed or frustrated.

But when I ask an AI to research something *and* score its own confidence, I'm treating it like a junior researcher who's doing their best but needs oversight. When it says "I'm not sure about this," I'm not frustrated—I'm grateful for the honesty.

This mental shift has made me both more productive with AI and less frustrated by its limitations.

## Try It Yourself: A Starter Template

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

## What's Next: Iterating on the Framework

I'm continuing to refine this approach. A few things I'm exploring:

1. **Domain-specific scoring criteria**: What if Factual means something different for academic research vs. bug reports?
2. **Confidence intervals**: Instead of single scores, should findings have ranges (F: 3-4/5) to capture uncertainty?
3. **Aggregate scoring for complex questions**: When a question requires synthesizing multiple findings, how should we score the overall research?
4. **Temporal decay**: How should we score information that was accurate in docs but might be outdated?

If you experiment with FAR Scale, I'd love to hear what works and what doesn't. This isn't a finished product—it's a working methodology that I'm sharing because it's helped me, and it might help you too.

## Final Thoughts

AI coding assistants are powerful tools, but they're not magic. They hallucinate. They get things wrong. They confidently present outdated information.

FAR Scale doesn't fix hallucinations—it surfaces them. It turns "I think this is right" into "Here's what I'm confident about and here's what I'm uncertain about."

That's not revolutionary. But it's practical, it's working for me, and it's made my AI-assisted development workflow significantly more reliable.

Give it a try. Adapt it to your needs. And if you find ways to improve it, let me know.

---

*This post is part of my ongoing exploration of practical AI-assisted development workflows. Not looking for the perfect solution—just building what works.*
