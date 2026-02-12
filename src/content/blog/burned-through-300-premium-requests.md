---
title: 'I Burned Through 300 Premium Requests in 3 Days (Here''s What I Do Now)'
description: 'How I went from blowing through GitHub Copilot premium requests in days to using 8-12 per day and getting more done than ever.'
pubDate: 'Feb 11 2026'
tags: ['github-copilot', 'ai', 'developer-productivity', 'workflow']
draft: true
---

It started on a Monday.

I'd just upgraded to Copilot Pro — $10/month, 300 premium requests, access to Claude Sonnet, GPT 5.2, the works. It felt like getting handed the keys to a Ferrari. So naturally, I drove it like one.

"Hey Copilot, refactor this auth module." One request. "Actually, can you also update the tests?" Two. "Hmm, try it with middleware instead." Three. "Wait, the database schema changed." Four.

By Tuesday afternoon: 187 requests. Wednesday night: 294. Thursday morning: staring at a "you've reached your limit" banner with three and a half weeks left in my billing cycle.

The money wasn't the issue — ten bucks is nothing. What stung was realizing I'd been having *conversations* with the most expensive models on earth about things a free model could handle. I was using Opus to write boilerplate. Sonnet to answer questions I could've Googled. GPT 5.2 to iterate on half-baked ideas that weren't ready for a premium model.

I was the problem. And judging by the Copilot subreddit, I wasn't alone. "300 seemed like so many" is basically a support group at this point.

So I went down the rabbit hole. Every thread, every trick, every workflow the community had figured out. Three weeks later, I'm using 8-12 premium requests per day and getting *more* done than when I was burning through 50.

Here's everything that changed.

## The Subagent Trick (This One Changed Everything)

Here's what most people don't realize: when you send a prompt to Copilot in agent mode, that's one premium request. But every subagent that prompt spawns? Free. They don't count.

Let that sink in. A single prompt can kick off three research agents in parallel, two analysis agents, and an implementation agent — all for one request. People are reporting multi-hour autonomous coding sessions, entire feature implementations, massive refactors — one premium request.

The key is front-loading your work. Instead of saying "refactor this module" and going back and forth five times, you write a detailed plan in markdown, hand it to the agent, and tell it to break the plan into tasks and spawn subagents for each one. The agent handles it. You go get coffee. You come back to a PR.

Will this loophole last forever? Almost certainly not. But right now, it's the single most impactful optimization available.

## The Cursor Combo

This felt like cheating the first time I tried it:

1. Open your project in Cursor's free tier with Gemini 2.5 Flash (unlimited, free)
2. Have Gemini scan your codebase and generate a detailed `TODO.md` — step-by-step tasks, each written as a prompt
3. Iterate on the plan with Gemini until it's airtight. Ask questions. Refine. This costs nothing.
4. Switch to VS Code with Copilot. Select Claude Sonnet.
5. Tell Claude to scan the codebase and execute `TODO.md`

One premium request. The entire batch, executed.

The insight: Gemini 2.5 Flash is genuinely good at coding — better than GPT-4.1 mini for planning — and it's free on Cursor. You use the free model for messy, iterative thinking. The premium model only touches final execution.

## The Spec-First Workflow

Every follow-up message in a conversation is another premium request. Every "actually, I meant..." and "can you also..." is money walking out the door.

The fix is almost embarrassingly simple: stop improvising.

Before touching a premium model, write a mini-spec. What exactly do you want? Inputs, outputs, edge cases, files involved. Refine it with a free model — Grok, Gemini Flash, whatever. Get it crisp.

Then hand the polished spec to the premium model in one shot. One request instead of the ten you would've burned iterating.

## My Daily Budget System

Here's what I actually do now:

**Daily allocation: 10 requests** (300 ÷ 30). Some days I use 5, some days 15. It averages out.

**The rules:**

- **Free models first.** GPT-4.1 mini is unlimited. If the task doesn't *need* Sonnet, it doesn't *get* Sonnet.
- **Never iterate with premium.** Unsure what I want? I figure it out with a free model. Premium gets the final prompt.
- **Batch aggressively.** Related tasks → one plan → one subagent-powered session.
- **Use the coding agent for async work.** File a GitHub Issue, let Copilot's coding agent handle it. One request per session, regardless of complexity.

The mental shift: premium requests aren't for *thinking*. They're for *executing*. Do your thinking for free. When you know exactly what you want, that's when the premium model earns its keep.

---

Three weeks into this system, I'm at day 21 with 110 requests still banked. Building more, shipping faster, and I haven't hit a wall once.

The 300-request limit isn't a constraint. It's a *design* constraint. And like all good design constraints, it makes you better — if you let it.
