---
title: "AI Doesn't Build the Pyramid. It Stretches the One Already There."
description: "Everyone gets faster with AI. Only the people who already had judgment get better. The data says AI amplifies existing engineering discipline, it doesn't create it."
pubDate: "Jul 06 2026"
tags: ["AI", "developer-productivity", "engineering-culture", "data"]
---

I've been coaching teams through AI adoption for a while now, and the same pattern keeps showing up. Some developers pick up AI tools and start producing 4x, 5x, even 10x their previous output. Others produce more code than ever and somehow ship less. Same tools. Same access. Wildly different outcomes.

I kept looking for the explanation in the tooling. Maybe the high performers used better prompts, or had the right model, or configured their agent differently. None of that held up. The explanation isn't about AI at all. It's about what was already there before AI showed up.

The data backs this up. And when you stack the evidence, it forms a pyramid.

## The Pyramid

Three tiers. Wide at the bottom, narrow at the top. Width is the share of builders. Height is the judgment applied per unit of output.

**The base: Gold Rush.** Most builders. Prompt and pray. Shipping to sell, not to solve. Nine in ten developers now reach for AI tools, but the artifacts pile up faster than anyone maintains them. In 2024, copy-pasted code outran refactored code for the first time on record, and blocks with five or more duplicated lines jumped eightfold. The 2026 follow-up is worse: duplication up 81% over 2023, refactored code down to 3.8% of changed lines, maintenance of old code down 74%. Trust tracks the mess. 46% of developers distrust accuracy. Only 3% report high trust.

**The middle: Practitioners.** Smaller group. These are the people refining their craft, writing copilot instructions, building verification loops. But even here, the seams show. In a controlled trial by METR, experienced developers were 19% slower with AI while believing they'd gone 20% faster. They predicted 24% faster walking in. Same tools. Same people. A 39-point gap between feeling and fact.

Telemetry confirms the local high: individuals complete 21% more tasks and merge 98% more pull requests, while organization-level delivery stays flat. Speed at the keyboard, no gain in the system.

**The top: Compounders.** Small group. Heavy AI users out-produce non-users by 4 to 10x. But here's the part that reframes everything: most of that gap predates AI. Measured against their own past selves, heavy users gained a more modest 25%. AI didn't mint the unicorns. It amplified who they already were.

DORA's 2025 finding is the same mechanism at team scale: AI is a multiplier of existing conditions. It strengthens high-performing teams and exposes weakness in fragmented ones. The top achievers accelerate. The bottom watch dysfunction intensify.

## What I've Seen On Teams

I coached a team last quarter that fit this pyramid almost perfectly. Three developers were clearly in the compounder tier. They'd been senior engineers for years, had strong testing discipline, understood their architecture cold. They picked up AI tools and their output jumped. Not because AI taught them engineering, but because AI gave their existing engineering a bigger lever.

Two more were practitioners. They got faster at the keyboard, merged more PRs, felt productive. But when we looked at delivery at the sprint level, nothing had changed. They were doing more work, but the work wasn't moving the product forward faster. The perception gap was real and measurable.

The rest were in the gold rush. More code, more churn, more duplication. They shipped features that broke in production because nobody owned the output. The AI generated it, they accepted it, and the bill came due two sprints later.

Same team. Same tools. Same sprint. Three completely different outcomes based on what people brought to the table before AI entered the picture.

## The Reframe

Most of the discourse around AI productivity asks the wrong question. "Does AI make developers better?" is a question that assumes AI is the independent variable. It isn't. The independent variable is the engineering and product discipline that existed before AI arrived. AI is the dependent variable. It amplifies whatever foundation you bring to it.

This is why the "AI makes everyone 10x faster" narrative falls apart under measurement. It makes everyone faster at generating code. But delivered quality, the kind that actually moves a product forward, scales with something else entirely. Systems thinking. Product discipline. Engineering rigor. The things that take years to build and can't be prompted into existence.

The METR study makes this painfully clear. Experienced developers felt 20% faster and were actually 19% slower. They had the skills to use AI well, but the task required judgment that AI couldn't provide, and the AI overhead slowed them down. The speed was real at the generation level. It just didn't survive contact with the actual problem.

## What Actually Moves You Up

If the pyramid is about amplification rather than skill acquisition, then moving up requires strengthening the foundation, not the AI usage. Four things I've seen work:

**Write the test before the prompt.** The spec is the leverage, not the generation. If you can't describe what success looks like in a test, you can't evaluate whether the AI's output is correct. Teams that test-first with AI produce fewer bugs and less rework. The test is the contract. The generation is just a faster way to satisfy it.

**Review the diff, not the vibe.** If you can't explain what changed in a PR, you can't own it. I've watched developers approve AI-generated PRs because the tests passed, without understanding the implementation. That's not review. That's faith. Review means you can explain every line and justify every change.

**Delete more than you generate.** Volume is the trap. Subtraction is the skill. The gold rush tier is defined by accumulation: more code, more duplication, more surface area to maintain. The compounder tier is defined by leverage: less code doing more work, with AI handling the typing and humans owning the architecture.

**Own the architecture, delegate the typing.** Judgment doesn't outsource. The developers getting 4 to 10x output gains aren't using AI to make architectural decisions. They're using it to execute against architectures they already understand. The thinking is theirs. The typing is the machine's.

## The Honest Caveat

Telemetry finds no evidence that mature organizations are immune to AI-driven quality decay. Even the compounders are producing more duplication and less refactoring than they did before AI. The amplification effect lifts their output, but it doesn't make them immune to the systemic pressures that AI introduces into every codebase.

Read the pyramid as amplification, not immunity. The people at the top are there because their foundation was strong before AI arrived. If they stop maintaining that foundation, the same gravity that pulls everyone else down will eventually pull them down too.

## What This Means For Teams

If you're coaching a team or running an engineering org, stop measuring AI adoption. Start measuring the foundation. Are tests written before prompts? Are PRs reviewed at the diff level? Is the codebase getting smaller or bigger? Is architecture owned by humans or delegated to machines?

The teams that score well on those questions will compound their gains with AI. The teams that score poorly will generate more slop, feel faster, and ship the same amount. The pyramid isn't a ranking of AI skill. It's a ranking of engineering discipline, amplified.

AI didn't build the pyramid. It stretched the one already there. The base gets wider and sloppier. The peak gets faster. The differentiator is judgment, and judgment was always the thing.

---

*I'm documenting what actually works with AI-assisted development at [patrickarobinson.com](https://patrickarobinson.com). No hype, just patterns I've validated with teams I coach.*