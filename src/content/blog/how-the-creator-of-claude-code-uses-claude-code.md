---
title: 'How the Creator of Claude Code Uses Claude Code'
description: 'Key workflow patterns from Boris Cherny that can transform how you work with AI coding assistants'
pubDate: 'Jan 07 2026'
tags: ['claude-code', 'ai', 'developer-productivity', 'workflow']
heroImage: '../../assets/hero-boris-claude-code-workflow.png'
draft: false
---

Imagine having a small team of AI developers working in parallel, each tackling a different task, while you coordinate from your phone during lunch. Sound far-fetched? That's exactly how Boris Cherny, the creator of Claude Code, works every day.

Recently, Boris shared his workflow on X, and it got me thinking about how these patterns apply to the teams I coach and my own side projects. What follows is a summary of his approach, a quick cheat sheet to his methods, and some of my own thoughts from the trenches. Here's the original thread:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Been getting a lot of Qs on how I use <a href="https://twitter.com/ClaudeCode">@ClaudeCode</a>. Here&#39;s my personal setup...</p>&mdash; Boris Cherny (@bcherny) <a href="https://x.com/bcherny/status/2007179832300581177">June 4, 2025</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Here are the patterns that stood out.

## Run Multiple Sessions in Parallel

This was the biggest mindset shift for me. Boris runs about 5 Claude Code sessions locally in his terminal, numbered for easy tracking. But here's where it gets interesting: he also runs another 5-10 sessions in the browser at `claude.ai/code`, and can even start sessions from his phone to check throughout the day.

The key insight? Each session often has its own git checkout (separate worktrees or clones), so they don't step on each other. It's like having multiple developers, each with their own workspace, all making progress simultaneously.

## Plan First, Then Let It Fly

Boris uses a two-phase approach: start in **Plan mode** (typically `shift+tab` twice) to sketch out the intent and get alignment on what needs to happen. Once the plan is solid, switch to **auto-accept edits** and let Claude implement in one shot.

This separates thinking from doing. You stay in control of the "what" and "why" while delegating the "how" to AI.

## Share Team Knowledge in CLAUDE.md

Here's something that compounds over time: maintain a `CLAUDE.md` file in each repo, checked into git. When Claude makes a mistake or misunderstands a pattern, add it to the file. Now every future session (and every teammate) benefits from that lesson.

Boris's team even tags `@.claude` on PRs to automatically update the file via GitHub actions. Team learnings sync automatically.

## Verification is the Secret Sauce

This one resonated deeply. Boris emphasizes giving Claude a way to **verify its own work**: start the server, run tests, check UI via browser extensions, simulate on devices. Good feedback loops can 2-3x your output quality.

**My take:** Smaller feedback loops beat one big PR at the end. This isn't new wisdom. [Extreme Programming](https://amzn.to/4purZqs) taught us this decades ago, and [*Accelerate*](https://amzn.to/4swMhCk) by Nicole Forsgren, Jez Humble, and Gene Kim digs into the research behind it. I've seen this play out repeatedly with the teams I coach. Big PRs create bottlenecks, especially in larger organizations where review cycles can stretch for days. If AI helps you ship smaller, validated chunks more frequently, you're not just moving faster, you're reducing risk and keeping the team unblocked.

For long-running tasks, Boris mentions using plugins like [ralph-loop](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-loop) (inspired by [Geoffrey Huntley's blog post](https://ghuntley.com/ralph/)) that help Claude self-verify through background agents and stop hooks. Autonomous, long-running agents are still pretty new territory. There's no silver bullet here, but the idea of AI working while you sleep is compelling. I'd say it tends to work better when you have small, well-defined tasks that you trust AI to handle, grouped together with clear validation gates.

The AI becomes dramatically more reliable when it can check its own answers rather than just generating and hoping.

## Use the Best Model

Boris prefers **Opus 4.5 with thinking** for everything. Better tool use, fewer corrections needed. The time saved from not fixing mistakes outweighs any speed difference from smaller models.

**Grain of salt:** This advice comes from someone who works at the company that makes the model. That doesn't make it wrong, but it's worth noting. In my experience, the "best" model depends on your budget, your task complexity, and how much you're willing to babysit the output. For quick tasks, smaller models work fine. For complex multi-file changes, the investment in a more capable model often pays off.

## The Philosophy That Ties It Together

Two principles stood out from Boris's approach:

1. **Claude Code works well vanilla.** You don't need elaborate customization to be productive. Start simple, add complexity only when you need it.

2. **There's no single correct workflow.** Tailor your setup to how you actually work and what your toolchain needs. Boris's patterns are inspiration, not prescription.

And one principle I'd add from my own experience:

3. **Even though AI writes the code, you own the outcome.** The AI isn't going to be on call at 2am when production breaks. It won't explain the architecture to new team members or defend the design decisions in a review. You will. Treat AI-generated code with the same scrutiny you'd give a PR from any teammate. Understand it, test it, own it.

## Try This Today

Pick one pattern from this list and try it for a day:

- Open a second Claude Code session while your first one runs
- Start your next task in Plan mode before accepting any edits
- Add one "lesson learned" to your project's `CLAUDE.md`
- Give Claude a verification step: "Run the tests after making changes"

The future of development isn't about AI replacing us. It's about developers who learn to orchestrate AI effectively. Boris's workflow shows what's possible when you treat Claude Code less like a chatbot and more like a team you're leading.

---

*Based on [Boris Cherny's thread on X](https://x.com/bcherny/status/2007179832300581177), with my own commentary from coaching engineering teams and experimenting with these approaches in my spare time. There's plenty more that engineers and engineering leaders might add, but hopefully this gives you a solid starting point.*

*Some links in this article are affiliate links.*
