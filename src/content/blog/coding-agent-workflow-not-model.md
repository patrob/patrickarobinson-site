---
title: "Your Coding Agent Doesn't Need a Better Model. It Needs a Better Workflow."
description: "Five concrete workflow changes that matter more than which model you pick."
pubDate: "Feb 26 2026"
heroImage: "../../assets/coding-agent-workflow-hero.png"
tags: ["coding-agents", "developer-tools", "workflow", "AI"]
---

I've been coaching engineering teams on coding agents for a while now, and I keep hearing the same conversation. "We tried Copilot's coding agent, but it keeps producing slop." "We switched to Claude Code and it's not much better." "Maybe we just need to wait for a smarter model."

Every time, my response is the same: your model isn't the problem. Your workflow is.

The research backs this up. A [systematic study of 80 SWE-bench approaches](https://arxiv.org/abs/2408.04396) found that scaffolding dominates over model choice. When the [SWE-bench team held scaffolding constant](https://swebench.com) and compared frontier models head-to-head, Sonnet 4, GPT-5, and Gemini 2.5 Pro all clustered within a few points of each other. The model barely mattered. The workflow around it mattered enormously.

Here's what I actually do about it.

## Where I Got This Wrong

When I first started setting up coding agents, I let the agent write its own instruction files. It seemed efficient: who better to write the rules than the thing following them?

The results were bloated every time. Pages of instructions that restated things the model would already infer. Style guides that described defaults. Boundaries that were obvious. The instruction file looked thorough, but it was burning context window on information the agent already knew. Worse, the actually important rules got buried in noise.

I was optimizing the wrong layer entirely. The moment I started writing concise, opinionated instruction files myself, focused on the things the model couldn't infer (my specific commands, my repo's quirks, my actual boundaries), the same model started producing work I could actually ship.

## Five Scaffolding Changes You Can Make This Week

### 1. Write an Operating Manual, Not a Wish List

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

The key insight from [Anthropic's context engineering research](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview): context is a finite resource. Every token your agent spends figuring out your build system through trial and error is a token not spent on the actual task. Tell it upfront.

### 2. Add Verification Loops

This is the single most effective change I've made. Instead of letting the agent submit code and hoping it works, I make it check its own work before I ever see it.

The pattern is simple: after the agent writes code, it runs the linter. If the linter fails, it fixes the issues. Then it runs tests. If tests fail, it fixes those too. Only after everything passes does it create a PR.

A [2025 study on self-improving coding agents](https://arxiv.org/abs/2504.00519) showed that reflection loops alone boosted SWE-bench performance by 17 to 53 percent. I believe it. Before I added verification loops, maybe half the PRs my agents opened were merge-ready. After, it's closer to 80 percent.

In practice, I encode this directly in the instruction file:

```markdown
## Before Opening a PR
1. Run `npm run lint:fix` and commit any changes
2. Run `npm run test` and fix failures
3. If tests fail twice, stop and explain what's wrong
```

Step three matters. You want the agent to bail out rather than spiral into increasingly creative (and wrong) fixes.

### 3. Scope Tasks to One Thing

A [SWE-Bench Mobile study](https://arxiv.org/abs/2410.10400) tested 22 agent-model configurations and found up to a 6x performance gap from the same model in different scaffolds. One of the biggest factors? Task scope.

When I give an agent a GitHub issue that says "refactor the auth module and also update the API docs and fix that flaky test," it produces garbage. When I give it "fix the race condition in `auth/session.ts` where concurrent refresh tokens can corrupt the session store," it produces something I can review in five minutes.

I've started writing issues specifically for agents. One clear problem. Reproduction steps if applicable. Pointers to the relevant files. That's it.

### 4. Pre-Install Dependencies

This sounds trivial, but it's not. If your agent's environment doesn't have your dependencies installed, it will spend tokens (and time, and your money) figuring out how to install them. Or worse, it'll guess wrong and produce code that works against the wrong version.

I use devcontainers or Docker images with everything pre-installed. The agent starts with a working environment from the first command. No `npm install`, no virtual environment setup, no guessing at Python versions.

### 5. Close the PR Feedback Loop

The last change is about what happens after the agent opens a PR. Most teams review the PR, leave comments, and then manually fix whatever the agent got wrong. That's leaving value on the table.

Instead, I have the agent read review comments and push fixes. The cycle is: agent opens PR, human reviews, agent addresses feedback, human re-reviews. This turns the PR review into a conversation instead of a handoff.

The practical version: use your CI to post lint and test results as PR comments. Tag the agent on anything it needs to fix. Let it iterate.

## The Uncomfortable Implication

If scaffolding matters several times more than model selection, then the teams getting the best results aren't the ones with the biggest AI budgets. They're the ones with the most disciplined engineering practices.

That's actually good news. You don't need to wait for the next model release or negotiate a bigger API spend. You can start improving your coding agent's output today, with changes that take hours, not quarters.

Pick one of the five changes above, implement it this week, and measure the difference. I think you'll find that your "underperforming" model has been capable of much more all along. It just needed a better workflow to show it.
