---
title: 'Coding Agents Need Workflows, Not Super Prompts'
description: 'The practical prompting workflow I use with coding agents: FAR, FACTS, and a verify/fix loop that keeps me honest'
pubDate: 'Feb 23 2026'
tags: ['ai', 'coding-agents', 'workflow', 'prompting']
---

Most teams think coding-agent quality comes from better prompts.
I think it comes from better workflow discipline.

Prompts matter, but the real gains for me came from a repeatable loop: draft, verify, fix, repeat.

Here is the one I keep coming back to.

## The core shift: from one-shot prompting to a feedback loop

A lot of AI disappointment comes from a simple mismatch. We ask a model for a polished final answer in one pass, then expect it to hold up in real code.

Sometimes it does. Often it needs another loop.

What works better for me is this:

1. Ask for a focused first pass
2. Score and stress test the output
3. Verify against reality
4. Fix gaps
5. Repeat until confidence is high enough for the decision at hand

That is not flashy. But it is practical.

## The two frameworks I use together: FAR and FACTS

I use two lightweight frameworks to keep things consistent.

### FAR for output quality

FAR is my quality check for any agent output:

- **Factual**: Is it grounded in evidence I can verify?
- **Actionable**: Can I do something concrete with it right now?
- **Relevant**: Does it directly help the problem I am solving?

If something reads well but scores weakly on Factual, I treat it as a draft, not a decision.

### FACTS for plan validation

After planning, I validate the plan with FACTS:

- **Feasibility**: Can we actually execute this with our current constraints?
- **Atomic tasks**: Are tasks broken into one clear action each?
- **Clarity**: Is each step unambiguous to a human and an agent?
- **Testable**: Can each task be verified with concrete checks?
- **Scoped properly**: Is the plan tight enough to ship without sprawl?

In my experience, FACTS catches vague or bloated plans. FAR pressure tests research quality before planning starts.

## The 20/20/60 split that keeps me out of trouble

When I look at successful coding-agent sessions, they often follow a rough time split:

- **20% prompt and setup**
- **20% generation and exploration**
- **60% verification, integration, and correction**

That 60% is where most value gets created.

It is where I compare suggestions against the real codebase, run tests, inspect edge cases, and tighten assumptions. If I skip that phase, I usually pay for it later.

## A real example: an 18.5-hour migration

Recently I ran a large migration with coding-agent support. Total effort was about 18.5 hours.

The first pass looked solid, but verification caught multiple implementation gaps before merge, which is exactly why this loop pays for itself.

The first drafts looked great quickly. But the real progress came from the verify/fix loop:

- validating each major change path
- catching hidden coupling in older modules
- reworking generated patches that were directionally right but implementation-wrong
- rerunning tests and checks after every meaningful batch

No heroics. Just disciplined iteration.

I am not claiming this approach always reduces total time. But it has often reduced rework and improved confidence for me, especially on high-blast-radius changes.

## What this looks like in practice

When I start a coding-agent session, I try to keep it simple:

1. Define the task with FACTS
2. Ask for a first draft, not a final answer
3. Score draft quality with FAR
4. Verify claims and changes in the actual environment
5. Feed corrections back into the next prompt
6. Stop when risk is acceptable, not when the output sounds confident

The last line matters. Confidence in wording is not the same thing as confidence in outcomes.

## Common failure mode to watch

The most expensive mistake I see is over-trusting elegant output.

If an agent gives me clean reasoning plus clean code, I still assume there are blind spots until verification says otherwise. This mindset alone has saved me from shipping brittle fixes more than once.

## Final thought

If you are using coding agents in production, try running one week with FAR + FACTS + a strict verify/fix loop.
Then compare rework and review friction against your normal process.
If you do it, send me what changed. I want to compare notes.
