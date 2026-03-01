---
title: "Your Coding Agent Doesn't Need a Better Model. It Needs a Better Workflow."
description: "Scaffolding dominates model choice for coding agents. Here are five practical changes that made my agents actually useful."
pubDate: "Feb 26 2026"
heroImage: "../../assets/coding-agent-workflow-hero.png"
tags: ["coding-agents", "developer-tools", "workflow", "AI"]
---

A few months ago I was coaching a dev team that had one very vocal skeptic. His take: AI needed more babysitting than it was worth. He'd tried GitHub Copilot, gotten mediocre results, and written the whole thing off.

We didn't argue with him. Instead, we showed him how to set up copilot instructions, walked him through better tooling to interface with Copilot's agent, and gave him a methodical way to prompt that reduced the rework noticeably. Within a few weeks, the skeptic had converted into a power user. He wasn't complaining about babysitting anymore. He was asking questions like when to use premium models versus non-premium. Same model. Same codebase. Same developer. The difference was entirely workflow.

The research tells the same story. A [systematic study of 80 SWE-bench approaches](https://arxiv.org/abs/2506.17208) found that scaffolding dominates over model choice. When the [SWE-bench team held scaffolding constant](https://swebench.com) and compared frontier models head-to-head, Sonnet 4, GPT-5, and Gemini 2.5 Pro all clustered within a few points of each other. The model barely matters. The workflow around it matters enormously.

Here are five concrete changes that made the difference.

## 1. Scope Tasks to One Thing

A [SWE-Bench Mobile study](https://arxiv.org/abs/2602.09540) tested 22 agent-model configurations and found up to a 6x performance gap from the same model in different scaffolds. One of the biggest factors? Task scope.

When I give an agent a GitHub issue that says "refactor the auth module and also update the API docs and fix that flaky test," it produces garbage. When I give it "fix the race condition in `auth/session.ts` where concurrent refresh tokens can corrupt the session store," it produces something I can review in five minutes.

I've started writing issues specifically for agents. One clear problem. Reproduction steps if applicable. Pointers to the relevant files. That's it.

This is the fastest change you can make. You don't need to touch any tooling. Just write better issues.

## 2. Write an Operating Manual, Not a Wish List

Your `agents.md` (or `CLAUDE.md`, or whatever your tool calls it) is the single highest-leverage file in your repo. But most of them read like vague wish lists.

[GitHub analyzed over 2,500 repositories](https://github.blog/changelog/2025-06-18-agents-md-guidelines-for-coding-agents/) with these files and found a clear split. The repos getting consistent results shared specific traits: executable commands with exact flags, real code examples instead of prose descriptions, and explicit three-tier boundaries (always do, ask first, never touch).

Here's what a good one looks like in practice:

```markdown
## Commands
- Test: `npm run test -- --coverage`
- Lint: `npm run lint:fix`
- Build: `npm run build`

## Boundaries
- ALWAYS: run tests before committing
- ASK FIRST: changes to database schemas
- NEVER: modify CI pipeline files
```

Compare that to "Please follow best practices and write clean code." One gives the agent something to execute. The other gives it nothing.

The key insight from [Anthropic's prompt engineering guidance](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview): context is a finite resource. Every token your agent spends figuring out your build system through trial and error is a token not spent on the actual task. Tell it upfront.

## 3. Add Verification Loops

This is the single most effective change I've made. Instead of letting the agent submit code and hoping it works, I make it check its own work before I ever see it.

The pattern is simple: after the agent writes code, it runs the linter. If the linter fails, it fixes the issues. Then it runs tests. If tests fail, it fixes those too. Only after everything passes does it create a PR.

A [2025 study on self-improving coding agents](https://arxiv.org/abs/2504.15228) showed that reflection loops alone boosted SWE-bench performance by 17 to 53 percent. I believe it. Before I added verification loops, maybe half the PRs my agents opened were merge-ready. After, it's closer to 80 percent. That's a gut estimate, not a measured metric, but the difference was obvious in review load.

In practice, I encode this directly in the instruction file:

```markdown
## Before Opening a PR
1. Run `npm run lint:fix` and commit any changes
2. Run `npm run test` and fix failures
3. If tests fail twice, stop and explain what's wrong
```

Step three matters. You want the agent to bail out rather than spiral into increasingly creative (and wrong) fixes.

## 4. Close the PR Feedback Loop

Most teams review agent PRs, leave comments, and then manually fix whatever the agent got wrong. That's leaving value on the table.

Instead, I have the agent read review comments and push fixes. The cycle is: agent opens PR, human reviews, agent addresses feedback, human re-reviews. This turns the PR review into a conversation instead of a handoff.

The practical version: use your CI to post lint and test results as PR comments. Tag the agent on anything it needs to fix. Let it iterate.

Paired with verification loops, this means most agent PRs converge in one or two review cycles. The agent catches the mechanical stuff itself; you focus review on design and intent.

## 5. Pre-Install Dependencies

This sounds trivial, but it's not. If your agent's environment doesn't have your dependencies installed, it will spend tokens (and time, and your money) figuring out how to install them. Or worse, it'll guess wrong and produce code that works against the wrong version.

I use devcontainers or Docker images with everything pre-installed. The agent starts with a working environment from the first command. No `npm install`, no virtual environment setup, no guessing at Python versions.

## The Real Takeaway

If scaffolding matters several times more than model selection, the teams getting the best results aren't the ones with the biggest AI budgets. They're the ones with the most disciplined engineering practices.

You don't need to wait for the next model release. Pick one of these five changes, implement it this week, and measure the difference. I think you'll find that your "underperforming" model has been capable of much more all along. It just needed a better workflow to show it.
