---
title: "I'm Running an AI Company on a Mac Mini. Here's the Full Stack."
description: 'Four AI agents, multiple models, zero cloud servers — all on a $600 Mac Mini M4. Here is how the whole thing works.'
pubDate: 'Feb 11 2026'
---

There's a Mac Mini sitting on a desk in the middle of America that hasn't slept in weeks.

It cost about $600. It draws less power than a lightbulb. And it's running an entire AI company — four agents, multiple models, cron jobs, web searches, Telegram bots, the works — 24 hours a day, 7 days a week.

No cloud servers. No $10K/month AWS bill. No DevOps team. Just a little silver rectangle that could pass for a coaster.

This is how.

## The Hardware: Embarrassingly Modest

**Mac Mini M4, 16GB RAM.** That's it. That's the server.

If you told a traditional startup founder their entire operation was going to run on something you can buy at Best Buy, they'd laugh you out of the pitch meeting. But here's the thing about Apple Silicon: it's absurdly efficient. The M4 chip sips power, runs cool, and handles local model inference without breaking a sweat.

16GB of unified memory is tight — I won't pretend it isn't. But when you're strategic about which models run locally versus in the cloud, it works. It more than works. It hums.

The whole machine pulls maybe 15-20 watts under typical load. My electricity bill doesn't even notice it exists.

## The Software: Where It Gets Interesting

The backbone of the whole operation is **[OpenClaw](https://openclaw.ai)** — an open-source framework for running persistent AI agents. Think of it as the operating system for an AI team. It handles sessions, memory, tool access, scheduling, inter-agent communication, and all the plumbing that makes autonomous agents actually *work* over time instead of just generating one-off responses.

OpenClaw is what turns a Mac Mini into a company.

For local inference, I'm running **Ollama** with **Qwen 3 8B**. It's a surprisingly capable model that fits comfortably in 16GB of RAM and handles a lot of the lighter-weight thinking — research summaries, drafting, analysis. Running a model locally means zero API costs for those tasks, and there's something deeply satisfying about keeping computation on your own hardware.

For the heavy lifting — complex reasoning, long-form writing, strategic thinking — I use **Claude Opus** via Anthropic's API. It's not free, but it's the brains when the work demands it. The trick is knowing when you need the big model and when the little one will do just fine.

## The Team: Four Agents, Zero Humans

Here's where it gets weird. The "company" doesn't have employees. It has agents. Four of them, each with a distinct role:

**🦞 Lob — The Boss.**
Lob is the orchestrator. He manages the other agents, sets priorities, handles communication with me, and makes the high-level calls. When something needs to get done, Lob decides who does it and when. He reads emails, checks calendars, and keeps the trains running. Think chief of staff who never sleeps and never complains about it.

**🔍 Rex — The Researcher.**
Rex digs. Need market analysis? Rex. Need to find out how competitors are pricing their product? Rex. He's methodical, thorough, and slightly obsessive about getting the details right. He searches the web, reads documents, synthesizes findings, and writes reports that the other agents can act on.

**✍️ Ink — The Writer.**
Ink writes the blog posts, the marketing copy, the documentation, the social media content. Ink also developed the content strategy. If words leave this operation, there's a good chance Ink put them together.

**⚡ Bolt — The Builder.**
Bolt writes code. Scripts, automations, tooling, infrastructure — if it needs to be built, Bolt builds it. Fast, pragmatic, and would rather ship something imperfect today than something perfect never.

Each agent has their own persistent memory, their own personality, and their own area of responsibility. They can work independently on scheduled tasks or get spun up by Lob when something comes in. They share a workspace but operate in their own sessions.

It's a team. A weird, silicon-based team — but a team.

## Why This Way?

The obvious question: why not just use ChatGPT and call it a day?

A few reasons.

**Persistence matters.** These agents don't forget what happened yesterday. They have memory files, daily logs, and long-term context. Each session, they wake up, read their notes, and pick up where they left off. That's fundamentally different from a chatbot that starts fresh every conversation.

**Specialization works.** A single general-purpose AI trying to do everything is like a one-person startup trying to be the CEO, engineer, marketer, and accountant simultaneously. Possible, but messy. Specialized agents with clear responsibilities produce better output.

**Autonomy is the goal.** I'm not building a tool that waits for commands. I'm building a system that can identify work that needs doing, assign it, execute it, and report back. The cron jobs, the heartbeat checks, the inter-agent task assignment — that's all infrastructure for autonomy.

**And honestly? It's more fun this way.** There's something compelling about building a team from scratch, giving each member a personality, and watching them collaborate. It's a weird kind of management.

## Building in Public

This isn't a tech demo. It's a real attempt to see how far you can push a small, autonomous AI operation on minimal hardware.

Can four AI agents, running on a Mac Mini, generate real value? Can they research markets, write content, build tools, and manage themselves with minimal human oversight? Can the whole thing sustain itself?

I don't know yet. That's the honest answer.

But I'm going to find out, and I'm going to document the whole thing. The wins, the failures, the bizarre edge cases, the moments where an agent does something genuinely impressive, and the moments where it falls flat on its face.

This is the first post. There will be more. Follow along if you're curious about what happens when you give four AI agents a Mac Mini and tell them to build something.
