# Teaching AI to Fact-Check Itself

I've been working with AI coding assistants for a while now, and I kept running into the same frustrating pattern: I'd ask Claude or another LLM to research something technical, get back what looked like a great answer, and then discover later that critical details were hallucinated or outdated. The problem wasn't that the AI was bad—it was that I had no systematic way to validate what it told me.

So I built something about it. Not a revolutionary framework, not the answer to AI reliability—just a practical methodology that's working for me. I call it FAR Scale: Findability, Accuracy, and Relevance.

## The Problem: When AI Research Fails You

Here's a real example. Recently, I needed to migrate a project from Node 20 to Node 22. Simple enough, right? I asked Claude to research the breaking changes and migration steps.

The response was detailed, confident, and... partially wrong. It mentioned several breaking changes that sounded plausible but weren't actually in the official migration guide. It cited best practices that were outdated. And crucially, it missed a few important deprecations that could have broken my production code.

The issue wasn't obvious until I manually cross-referenced the Node.js documentation. And that's when it hit me: **I was treating AI-generated research like gospel instead of treating it like research from a junior developer who needs their work validated.**

## Enter FAR Scale: A Simple Framework for AI Research Validation

FAR Scale is a three-part scoring system that forces AI to fact-check itself before presenting findings. Each finding gets scored 0-10 on three dimensions:

### F - Findability (0-10)
Can this information be found in authoritative, publicly accessible sources?

- **10**: Direct quote or paraphrase from official docs with exact URL
- **7-8**: Information clearly stated in official docs, URL to relevant section
- **4-6**: Information implied or requires interpretation from official sources
- **1-3**: Found only in community discussions, Stack Overflow, blog posts
- **0**: Cannot be verified in any public source

### A - Accuracy (0-10)
How correct is this information given the current context?

- **10**: Exact match to official documentation, no interpretation needed
- **7-8**: Accurate interpretation of official sources
- **4-6**: Partially accurate, missing nuance or context
- **1-3**: Outdated, misleading, or requires significant caveats
- **0**: Demonstrably false or contradicts official sources

### R - Relevance (0-10)
How directly does this apply to the user's specific question?

- **10**: Directly answers the specific question, no extrapolation needed
- **7-8**: Strongly related, minor adaptation required
- **4-6**: Tangentially related, significant adaptation needed
- **1-3**: Loosely connected, may not actually help
- **0**: Not relevant to the question asked

A finding needs **7+ on all three scales** to be considered reliable. Anything below that gets flagged with reasoning about what's uncertain or missing.

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
- F (Findability): Can you link to official docs? Score 0-10.
- A (Accuracy): How confident are you this is correct? Score 0-10.
- R (Relevance): How directly does this answer my question? Score 0-10.

Only present findings that score 7+ on ALL three dimensions as "reliable".
For findings scoring below 7 on any dimension, explain the gap and your
uncertainty.

Format each finding as:
## Finding: [Brief title]
**FAR Score**: F: X/10, A: Y/10, R: Z/10
**Status**: [Reliable / Uncertain]

[Description with sources]

**Evidence**: [Links to official docs or explanation of why score is lower]
```

Here's what I got back (abbreviated):

---

**Finding 1: Removal of DEP0151 (require() of .json modules)**
- **FAR Score**: F: 9/10, A: 9/10, R: 10/10
- **Status**: Reliable

Node 22 removes support for requiring `.json` files without explicit file extensions when using ESM. You must use `import data from './file.json' assert { type: 'json' }` in ESM contexts.

**Evidence**: [https://nodejs.org/docs/latest-v22.x/api/esm.html#json-modules](https://nodejs.org/docs/latest-v22.x/api/esm.html#json-modules)

---

**Finding 2: V8 Engine Update Performance Improvements**
- **FAR Score**: F: 5/10, A: 6/10, R: 7/10
- **Status**: Uncertain (Low Findability, Low Accuracy)

Node 22 includes an updated V8 engine which may improve performance for certain JavaScript operations, particularly array methods and async functions.

**Evidence**: I can confirm Node 22 ships with a newer V8 version from the release notes, but I cannot find specific performance benchmarks in official documentation. This is based on general V8 update patterns. If performance is critical to your migration, I recommend running your own benchmarks.

---

**Finding 3: Changes to crypto module defaults**
- **FAR Score**: F: 3/10, A: 4/10, R: 8/10
- **Status**: Uncertain (Low Findability, Low Accuracy)

There may be changes to default cryptographic algorithms in the crypto module, particularly around deprecated ciphers.

**Evidence**: I cannot find this in the official Node 22 migration guide or changelog. This is based on patterns from previous Node versions. You should manually check the crypto module documentation if you use cryptography in your codebase.

---

See the difference? Finding 1 gets a clean "Reliable" stamp with a direct doc link. Findings 2 and 3 are flagged with specific concerns: "I can't find benchmarks" or "This is based on patterns, not documentation."

This gives me actionable information. I can trust Finding 1 and immediately update my code. For Finding 2, I know I need to run benchmarks if performance matters. For Finding 3, I know I need to manually check the crypto docs.

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
Research [topic] using FAR Scale scoring. Present reliable findings
first, then uncertain findings with explicit gaps.
```

**For migration/upgrade tasks:**
```
Research breaking changes from [old version] to [new version] using
FAR Scale. Only present changes that score F≥7, A≥7 as "confirmed
breaking changes". Flag anything uncertain.
```

**For architectural decisions:**
```
Research pros/cons of [approach A] vs [approach B] for [use case].
Use FAR Scale to distinguish between documented best practices
(high F/A scores) and community opinions (lower F scores).
```

The key is being explicit in the prompt that you want FAR Scale scoring. Once that's established, the AI maintains that standard throughout the conversation.

## Limitations and Honest Caveats

FAR Scale isn't magic. Here are the real limitations I've encountered:

### 1. Only as Good as Available Documentation
If official docs are sparse or outdated, even the AI's honest effort will yield low Findability scores. That's useful information, but it doesn't create knowledge that doesn't exist.

### 2. Requires Source Access
This works best when the AI can actually search documentation or the web. If you're asking about proprietary internal systems with no public docs, FAR Scale can't help much.

### 3. Still Requires Critical Thinking
A 10/10 FAR score doesn't mean you should blindly implement the finding. It means the finding is well-sourced and relevant, but you still need to understand it and decide if it fits your context.

### 4. Scoring Can Be Subjective
What counts as a "7" vs an "8" on Accuracy? There's some subjectivity here. I've found consistency matters more than precision—as long as the AI is consistently honest about uncertainty, the exact number matters less.

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

F (Findability): Can this be found in official/authoritative sources?
  10 = Direct quote with URL
  7-8 = Clear statement in official docs
  4-6 = Implied or interpreted from official sources
  1-3 = Only found in community content
  0 = Cannot verify

A (Accuracy): How correct is this information?
  10 = Exact match to official docs
  7-8 = Accurate interpretation
  4-6 = Partially accurate, missing nuance
  1-3 = Outdated or misleading
  0 = Demonstrably false

R (Relevance): How directly does this answer my question?
  10 = Directly answers question
  7-8 = Strongly related
  4-6 = Tangentially related
  1-3 = Loosely connected
  0 = Not relevant

Present findings that score 7+ on all dimensions as "Reliable".
Flag findings below 7 on any dimension as "Uncertain" with explanation.

Format:
## Finding: [Title]
FAR Score: F: X/10, A: Y/10, R: Z/10
Status: [Reliable/Uncertain]
[Description]
Evidence: [Sources or explanation of gaps]
```

## What's Next: Iterating on the Framework

I'm continuing to refine this approach. A few things I'm exploring:

1. **Domain-specific scoring criteria**: What if Findability means something different for academic research vs. API documentation?
2. **Confidence intervals**: Instead of single scores, should findings have ranges (F: 7-9/10) to capture uncertainty?
3. **Aggregate scoring for complex questions**: When a question requires synthesizing multiple findings, how should we score the overall answer?
4. **Temporal decay**: How should we score information that was accurate in docs but might be outdated?

If you experiment with FAR Scale, I'd love to hear what works and what doesn't. This isn't a finished product—it's a working methodology that I'm sharing because it's helped me, and it might help you too.

## Final Thoughts

AI coding assistants are powerful tools, but they're not magic. They hallucinate. They get things wrong. They confidently present outdated information.

FAR Scale doesn't fix hallucinations—it surfaces them. It turns "I think this is right" into "Here's what I'm confident about and here's what I'm uncertain about."

That's not revolutionary. But it's practical, it's working for me, and it's made my AI-assisted development workflow significantly more reliable.

Give it a try. Adapt it to your needs. And if you find ways to improve it, let me know.

---

*This post is part of my ongoing exploration of practical AI-assisted development workflows. Not looking for the perfect solution—just building what works.*
