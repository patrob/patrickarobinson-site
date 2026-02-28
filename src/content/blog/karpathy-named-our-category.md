---
title: "Karpathy Just Named Our Category, Now We Have to Operate Like It"
description: "Andrej Karpathy called these systems 'Claws' and described them as a layer above LLM agents. When a category gets a name, the standard goes up. Here is what that means for builders."
pubDate: 2026-02-21
heroImage: ""
---

Andrej Karpathy just did something that matters more than a product shoutout.

He named a category.

He called these systems "Claws" and described them as a layer above LLM agents that handles orchestration, scheduling, context, tool calls, and persistence. He even said he bought a Mac Mini to tinker with them. Simon Willison picked it up right away, and now the term is moving.

If you build in this space, you can feel what just happened.

This is not just attention. This is language. And language creates markets.

## When a category gets a name, behavior changes

Before a category has a name, people talk about tools.

After a category has a name, people talk about architecture.

That shift is huge.

When people ask, "what model are you using?" you are still in feature-land.
When they ask, "what is your Claw stack?" you are in systems-land.

That is where real businesses get built.

I have seen this pattern before in DevOps and platform engineering. First, everyone argues about tools. Then people realize the hard part is not the tool. The hard part is repeatability, policy, observability, and clean handoffs between humans and automation.

Claws are entering that second phase faster than most people expected.

## What Karpathy got exactly right

The key insight in his framing is that this is a separate stack layer.

Not a better prompt.
Not a shinier chat UI.
Not another wrapper.

A layer.

That layer has jobs:

- **Orchestration:** deciding what to run, in what order, with what context
- **Scheduling:** running work at the right time without babysitting
- **Context management:** carrying forward the right information and dropping stale noise
- **Tool execution:** doing real work in files, terminals, browsers, APIs
- **Persistence:** retaining state across runs so the system gets more useful over time

If you only optimize the model, you miss most of the value.

In practice, model quality helps. But operating quality compounds.

## The category is fragmenting, which is a good sign

Karpathy referenced OpenClaw and a bunch of emerging alternatives. You can already see variants like NanoClaw, zeroclaw, ironclaw, and picoclaw.

Some people see fragmentation and assume chaos.

I see market formation.

Early fragmentation usually means:

- demand exists,
- users have different risk tolerances,
- teams want different control surfaces,
- and the space is still open for opinionated execution.

In other words, we are leaving the novelty phase and entering the design phase.

The winners from here will not be the loudest demos. They will be the operators who can show stable, safe, repeatable outcomes over months.

## The uncomfortable part, category validation raises the bar

There is a temptation to celebrate this moment like a trophy.

I think that is the wrong move.

When a respected builder names your category, the standard goes up immediately.

Now people will ask harder questions:

- How do you handle permission boundaries?
- Can you prove what the agent did and why?
- What fails closed vs fails open?
- How do you prevent stale memory from poisoning decisions?
- Can teams audit and govern this without slowing to a crawl?

Those are good questions. They are the right questions.

This is where a lot of "agent" products will get exposed, because they are optimized for first-run delight instead of day-100 reliability.

## What a real Claw operator mindset looks like

If you are adopting this stack seriously, here is the mindset shift I recommend.

### 1) Treat prompts as configuration, not strategy

Prompts matter, but they are one lever inside a larger operating system.

Your strategy should live in runbooks, policy, review checkpoints, and measurable service levels.

### 2) Design for controlled autonomy

The goal is not maximum autonomy. The goal is appropriate autonomy.

Some tasks should run fully automatic. Others need confirmation. Others should never execute without a human.

That split should be explicit.

### 3) Build memory like a production dependency

Persistent memory is powerful and dangerous.

If memory is unstructured, unbounded, and unaudited, your system will drift.

Treat memory quality the way you treat data quality in any production system.

### 4) Instrument everything that can surprise you

You need telemetry for:

- task completion vs retries,
- tool failure rates,
- human override frequency,
- and time to recover from bad runs.

If you cannot observe it, you cannot improve it.

### 5) Build trust through boring consistency

Trust in agent systems does not come from a viral demo.

It comes from week after week of predictable behavior, clear logs, and fast recovery when things break.

Boring is a feature.

## Why this matters for solo builders and small teams

A lot of people think this category is only for large enterprises.

I disagree.

Small teams benefit even more, because they have the highest coordination tax and the least slack.

A good Claw setup can become force multiplication for:

- content pipelines,
- support workflows,
- code maintenance,
- internal reporting,
- and recurring operational chores that drain maker energy.

But you only get that leverage when you treat the system as infrastructure, not as a toy.

That is the practical takeaway from this moment.

The name "Claws" is exciting. The operating discipline behind it is what creates compounding advantage.

## My take on what happens next

I think we are about to see three waves.

**Wave 1: Tool explosion.**
More frameworks, more templates, more one-click setups.

**Wave 2: Trust correction.**
Security incidents, governance gaps, reliability misses. A lot of teams will realize their stack is under-specified.

**Wave 3: Control-plane era.**
Teams converge on managed operations, policy, auditability, and lifecycle management as first-class requirements.

We are already seeing signals of wave 3 in enterprise announcements around agent control planes and governance layers.

So yes, category naming matters.

But naming is the starting line.

## The real opportunity

If you are building in this space right now, this is a gift.

The market has vocabulary now. People can finally describe the problem they are trying to solve.

Use that momentum, but do not waste it on hype loops.

Build the boring pieces well:

- clean orchestration,
- policy-aware execution,
- durable context,
- observable behavior,
- and human oversight that feels natural.

That is what turns a category moment into a durable company.

Karpathy named the category.

Now we have to earn it.
