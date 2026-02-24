---
title: "Agentic Engineering Needs Pattern Libraries, Not Prompt Folklore"
description: "The real leverage in coding agents isn't which model writes your code. It's whether you have repeatable patterns for how agents fit into your engineering workflow."
pubDate: 2026-02-24
heroImage: "../../assets/pattern-libraries-hero.jpg"
---

The coding agent debate keeps circling the wrong question. Every week someone asks: which agent is best? Claude Code or Cursor? Copilot or Windsurf? It's the wrong frame entirely.

The real leverage isn't which model writes your code. It's whether you have repeatable patterns for how agents fit into your engineering workflow.

## Code Is Cheap Now. Validation Isn't.

Simon Willison recently published a structured guide to what he's calling "agentic engineering patterns." One of his core observations landed hard for me: writing code is cheap now. The bottleneck moved.

He's right. I've been running coding agents in production for months, and the cost of generating code dropped to near zero. What didn't drop? The cost of verifying that code is correct, safe, and actually solves the problem you intended.

This is the shift most teams haven't internalized. They optimize for generation speed while their validation pipeline is still manual, inconsistent, or nonexistent.

## Prompt Folklore vs. Engineering Patterns

Right now, most agent-assisted development runs on what I'd call prompt folklore. Someone discovers a trick that works. They share it on X. A hundred developers copy it without understanding why it worked or when it breaks.

That's not engineering. That's cargo culting.

What we actually need are pattern libraries. Documented, repeatable workflows that survive model churn and work across tools. Patterns like:

**Scoped task decomposition.** Before you hand anything to an agent, break the work into atomic units with clear acceptance criteria. "Build the login page" is a vibe. "Add a POST /auth/login endpoint that validates email format, checks bcrypt hash, returns a JWT with 24h expiry, and returns 401 for invalid credentials" is a task an agent can actually nail.

**Red/green TDD loops.** Simon highlights this one, and it's been my most reliable pattern. Write a failing test first. Let the agent make it pass. Review the diff. Repeat. The test is your specification and your verification in one artifact. In practice, this catches regressions within minutes instead of hours. When I skip this step, I spend more time reviewing generated code than I saved generating it.

**Runtime guardrails.** Your agent will confidently make changes that break things it doesn't know about. Linting, type checking, and test suites that run automatically after every agent-generated change aren't optional. They're the minimum viable safety net.

**Review checkpoints.** Not every agent output deserves a detailed code review. But every agent output needs a checkpoint where a human decides: merge, revise, or discard. The pattern isn't "review everything line by line." It's "establish clear gates and enforce them consistently."

## Why This Matters More Than Model Selection

I swapped my primary coding model three times in the last six months. Went from Opus to Sonnet 4.6, experimented with Qwen for lightweight tasks, circled back. Each time, my patterns transferred cleanly. The scoped tasks still worked. The TDD loops still caught regressions. The review gates still held.

Know what didn't transfer? The prompt tricks. Every model has different context window behavior, different instruction-following quirks, different failure modes. The prompts that worked perfectly with one model produced garbage with the next.

This is why investing in patterns beats investing in prompts. Patterns are model-agnostic. They encode your engineering standards, not your model's preferences.

## The Real Gap: Teams Don't Have Playbooks

Most teams adopting coding agents are doing it ad hoc. One developer figures out a workflow, never writes it down, and the next developer starts from scratch. What these teams need is an internal pattern library. Not a wiki page of "cool prompts." A documented set of workflows that answer specific questions:

- How do we scope work for agent-assisted development?
- What's our test-first workflow for agent-generated code?
- When does a human review happen, and what are the review criteria?
- How do we handle agent-generated code that passes tests but violates our architecture patterns?
- What's our rollback procedure when agent output breaks staging?

If you can't answer those questions for your team, you're running on folklore. And folklore doesn't scale.

## Start With an Audit, Not a Migration

Here's the practical move. Before you evaluate another coding agent, before you migrate from Copilot to Claude Code or vice versa, audit your current workflow for pattern gaps.

Take your last five agent-assisted PRs. For each one, ask:

1. Was the task scoped before the agent touched it, or did you wing it?
2. Did tests exist before the agent wrote code, or were tests added after?
3. Was there a defined review checkpoint, or did the PR go straight to merge?
4. If the agent's output had a bug, how long did it take to catch it?

If the answers make you uncomfortable, that's your real bottleneck. Not the model. Not the tool. The patterns.

## The Maturity Curve

Vibe coding produces impressive spikes. You can ship a prototype in an afternoon. That's genuinely useful for exploration. But production engineering needs consistency, not spikes.

The maturity curve for agentic engineering looks like this: folklore, then personal workflows, then team playbooks, then organizational patterns. Most developers are somewhere between stages one and two. The teams that reach stage three and four will ship faster and more reliably than anyone optimizing which model to use.

Simon's guide is a signal that the field is starting to formalize. That's a good thing. The sooner we treat agentic engineering as a discipline with documented patterns rather than a collection of tricks, the sooner it becomes genuinely reliable.

Stop debating models. Start documenting patterns. If you want a solid starting point, [Simon Willison's agentic engineering guide](https://simonwillison.net/2026/Feb/23/agentic-engineering-patterns/) is the best formalization I've seen so far.
