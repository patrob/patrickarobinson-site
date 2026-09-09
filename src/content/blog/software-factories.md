---
title: "Software Factories: From Vibe Coding to a Machine That Ships While You Sleep"
description: "Notes and links from Alamo Agents, Night One. The talk in writing, plus every link and source."
pubDate: "Sep 08 2026"
heroImage: "../../assets/software-factories-hero.jpg"
---

<!-- Slides: /slides/software-factories.pdf · Talk: https://www.youtube.com/watch?v=angmcGqg-C8 -->

Tonight was Night One of [Alamo Agents](https://alamoagents.org), a San Antonio meetup for people building agent systems. Thank you to [Alamo Tech Collective](https://alamotechcollective.com) for hosting us at Zelifcam on San Pedro. We're going to do this monthly: show up, demo what you're building, compare notes, leave with better ideas than you walked in with.

I gave the first talk, on Software Factories. [Watch the talk](https://www.youtube.com/watch?v=angmcGqg-C8). This post is the talk in writing, plus every link I mentioned. If you were there and scanned the QR code, welcome. If you weren't, here's what you missed.

## All the engineering

We've renamed the same thing about seven times in eighteen months.

It was **vibe coding**, where you accept every diff and never read it. Then **prompt engineering**, because the words matter. Then **context engineering**, because the stuff around the words matters more. Then **agentic engineering**, once we gave the model tools and a loop. Then **loop engineering** and **graph engineering**, once the loop had state and branches. And now **harness engineering**, which is the name for everything that isn't the model.

I joke that we rename it every six months so we can feel like we're not behind. But the thing underneath keeps getting more real. Every rename moves the human one step further from the keystroke and one step closer to designing the system that types.

The end of that road has a name, and it's an old one.

## "Factory" is a dirty word

If you've worked in product for a while, "factory" sounds like an insult. John Cutler wrote [12 Signs You're Working in a Feature Factory](https://cutle.fish/blog/12-signs-youre-working-in-a-feature-factory/) in 2016. A developer friend of his said he was "just sitting in the factory, cranking out features, and sending them down the line." No measurement. Success theater around shipping. No connection to outcomes.

That insult stuck. The word is older than the insult, though, and it's coming back with a different meaning.

## Three eras of the software factory

**1968.** Two people reached for the word in the same year. R.W. Bemer, an engineer at General Electric, wrote a position paper urging GE to build a "software factory" with standardized tools and a database for management control. His words: "a software factory should be a programming environment residing upon and controlled by a computer." At the NATO software engineering conference, M.D. McIlroy argued that modular programs opened the way to mass-produced software components, and he used the word "factory" too. Michael Cusumano calls Bemer's paper the industry's first working definition.

**1969.** Hitachi opened its Software Works, the first real facility to wear the label (Japanese *kojo*, "factory" or "works"). Standardized process came first, tooling for reuse came after. Per Cusumano's data, projects delivered late to QA fell from over 72% in 1970 to a low of 6.9% in 1974, then held around 12% for the next decade. NEC, Toshiba, and Fujitsu followed through the late 1970s. Cusumano documented all of it in [*IEEE Software*](https://ieeexplore.ieee.org/document/1430446/) in 1989 and in [*Japan's Software Factories*](https://academic.oup.com/book/52424) in 1991.

**1975–78.** The American attempt. System Development Corporation built the first US facility called a factory and copyrighted the name "The Software Factory." About ten projects ran through it. Then it collapsed. The tools weren't portable, program managers preferred to build their own, and the factory sat idle. Cusumano notes SDC influenced the Japanese programs. The label failed in America and worked in Japan, and the difference was process discipline, not tooling. Hold that thought.

**2004.** Microsoft revived the term with Jack Greenfield and Keith Short's [*Software Factories*](https://dl.acm.org/doi/10.5555/983189): domain-specific languages, templates, and patterns you assemble into applications from a product line. Greenfield's definition: "a development environment configured to support the rapid development of a specific type of application." It shipped as DSL Tools in the Visual Studio 2005 SDK and as the patterns & practices Guidance Automation Toolkit plus named factories. GAT/GAX was patterns & practices guidance, not a shipping product, and both lines were later discontinued. The DSL work survives as the Modeling SDK.

**2026.** The word came back a third time, and this time the factory workers are agents. OpenAI published [Harness Engineering](https://openai.com/index/harness-engineering/) in February. Anthropic published [Harness Design for Long-Running Application Development](https://www.anthropic.com/engineering/harness-design-long-running-apps) in March. Both describe the same shape: agents plan, build, verify, and ship continuously, and humans define intent and set the guardrails.

Here's the definition I use:

> A Software Factory is a repeatable, observable pipeline that takes an intent and turns it into verified, reviewed, mergeable, working software, with the human at the gates.

The difference from a feature factory is in two words: *observable* and *gates*. The factory measures itself, and the human still owns the why.

## How I got here

### January: build the tool first (wrong)

I started [ai-sdlc](https://github.com/patrob/ai-sdlc) on January 9, 2026. Model-agnostic story-to-PR orchestration: a Kanban of stories (Refine → Research → Plan → Implement → Review → PR), a `/grill-me` intake step, `--continue` resume, a `--watch` daemon, epics in git worktrees, TDD mode. It had the right shape. About 300 commits later, I paused it around late June.

The mistake was building the tool before I had the habit. I hadn't done the loop by hand enough times to know what to automate.

### Spring and summer: notice the habit

By summer I realized I was doing the same thing on almost every change:

1. **Research** the idea.
2. **Break it into user stories** using [INVEST](https://www.agilealliance.org/glossary/invest/) (Independent, Negotiable, Valuable, Estimable, Small, Testable), Gherkin acceptance criteria (Given / When / Then), and vertical slicing down to the smallest deliverable value.
3. **Run my `/ship-it` skill**, which starts with `/grill-me`, implements with TDD inside a verify loop (build, lint, test, and don't advance until all three pass), runs a code-review subagent and fixes what it finds until it's clean, opens a draft PR, watches CI and PR comments and fixes those too, and marks the PR ready for review once everything is green.
4. **A human approves.** Me, someone else, or an AI reviewer I've configured to auto-approve.

I was the loop. Every step was a skill I invoked in the same order. The human was the scheduler.

### July 7: the bash script

I asked Claude to codify it. I got a 668-line bash script at `~/.local/bin/factory`. Its BUILD step was literally `claude /ship-it`.

It was great for about three to five days. The first factory events on [Sound Buddy](https://soundbuddy.online) land on July 7. Then reality showed up: parallel work needs worktrees, paused and failed runs need to resume, usage caps mean the factory has to learn to wait, I wanted it on more than one machine, and nobody wants to maintain a giant bash script.

Somewhere in there I found out this thing had a name. I was doing harness engineering. I was building a software factory.

### July 9–11 to now: the rewrite

[on-par/software-factory](https://github.com/on-par/software-factory) is the engine, a Node and TypeScript monorepo. The first commit was 60 files and about +7,100 lines, with the bash original kept in `legacy/` for one week. Today it's about 545 commits, 561 PRs, 742 issues, and 85 architecture decision records, most of them written by the factory about itself.

The [factory control plane](https://factory.onpardev.com) is the hosted UI for that engine. It started August 28. About 108 commits, with about 60 in the two days before the talk. It's a web app / PWA that talks to one or more machines running the factory daemon, so I can start a run from my phone and close the browser. The factory helped build its own control plane.

The dogfood target for all of it is Sound Buddy, a Mac app for church sound engineers that grades a recording and recommends EQ fixes. Local-only, no cloud. (I'm a Lean TECHniques consultant coaching teams on AI and agent frameworks, founder of On PAR Dev, and a church front-of-house sound volunteer, which is why the demo app is about church audio.)

## Anatomy of the factory

**Input.** A GitHub issue. The queue is GitHub labels: `factory:queued`, `factory:in-progress`, `factory:parked`, plus `factory:lane:*` and `factory:claimed-by:<host-pid>`.

**Pipeline.** PLAN → BUILD → CHECK → SHIP ("boss-worker-checker"). A boss model reads the issue and the product's constitution, freezes a plan, and picks a route (claude / codex / opencode). A cheaper worker implements the frozen plan in its own git worktree. Checkers run: compile, tests (`scripts/verify.sh`), lint, links, accessibility, design smells, plus any custom checkers the constitution declares. If a check fails, the work goes back for rework, up to three rounds. If the same failure repeats, the run is marked stuck and escalated to me. Otherwise it's parked. If everything passes, the factory opens a draft PR with "Closes #N", watches CI, and flips it to ready for review. Squash-merge only with an explicit flag.

**Constitution.** Every product gets a `.factory/constitution.md` that the factory enforces on plan, build, and check. Sound Buddy's includes this line: "a change that damages a paying customer's trust is a failed change, regardless of whether the tests pass."

**Harnesses.** The factory drives the CLIs you already pay for: Claude Code, Codex, OpenCode, and local Ollama. A router picks per tier (boss / worker / checker / triage) and fails over.

**Lanes.** Parallel worktrees, each with its own leased port so end-to-end suites don't collide.

**Control surface.** One hosted control plane, many machines. Each machine runs `factoryd` plus an outbound worker. Credentials never leave the machine. You enroll a computer with a one-time code, pick a repo and an issue, choose a route, and start the run. Work board: Backlog / Queued / In Progress / Blocked-Parked / Done.

**Observability.** Every run writes `events.ndjson` and `costs.jsonl`. Those roll up into merge rate, rework rate, cost per PR, and cycle time.

One honest footnote: the engine doesn't yet read or resolve PR review comments. That step still lives in my hand-run `/ship-it` skill.

## The numbers

These are from Sound Buddy between July 7 and tonight. They're my numbers, on my app, with my constitution. Yours will differ. The point is that you can measure it, which is the whole difference from a feature factory.

| Metric | Value |
|---|---|
| Merged PRs | 672 |
| PRs that closed a factory issue | 502 |
| Merge rate | 74% |
| Fully autonomous rate | 73% |
| Human intervention rate | 1.2% |
| Rework rate | 16% |
| Median cycle time | 27 minutes |
| Cost per merged PR (mean / median) | $5.26 / $0.12 |
| Total model spend | about $818 |
| Peak concurrent lanes | 6 |

## What broke

- Parallel worktrees collided on shared files. Collision rework is down to about 1%.
- Resuming paused and failed runs was the number one reason to leave bash.
- Usage caps. A supervisor waits for headroom; a watchdog parks everything at 75%.
- Big issues. About 8% of runs hit the size gate and got escalated. INVEST's "Small" is load-bearing.
- The checker is the most valuable role and the most expensive one.
- Retries by cause: checker 88, timeout 68, failover 27. Timeouts are the boring killer.

## What I learned

1. **Do the loop by hand until it's boring.** Then automate that loop, not the one you imagine.
2. **The verify loop is the product.** Gating on build, lint, and test is what turns vibes into a factory.
3. **Write the constitution first.** Rules the machine can enforce beat rules in a wiki. SDC had the tools and no process, and the factory sat idle. Hitachi had the process first.
4. **Measure, or it's a feature factory.** Merge rate, rework rate, cost per PR, cycle time.
5. **Humans move to the gates.** Intent goes in through the issue and the grilling. Approval comes out at the PR.
6. **Bash is a great prototype and a terrible product.**

## The takeaway

> You already have a factory. It's you, running the same skills in the same order. Write it down. Make it verify itself. Put yourself at the gates.

## Keep up

For the next Alamo Agents meetup, watch [alamoagents.org](https://alamoagents.org) or the [Luma calendar](https://luma.com/alamo-agents). Want to demo sometime? Email me at patrick@onpardev.com.

## Links

- Alamo Agents: [alamoagents.org](https://alamoagents.org) · [RSVP on Luma](https://luma.com/alamo-agents)
- Alamo Tech Collective: [alamotechcollective.com](https://alamotechcollective.com)
- Talk video: [YouTube](https://www.youtube.com/watch?v=angmcGqg-C8)
- Slides: [Download PDF](/slides/software-factories.pdf)
- Engine: [github.com/on-par/software-factory](https://github.com/on-par/software-factory)
- Factory control plane: [factory.onpardev.com](https://factory.onpardev.com) (login required; the app repo stays private)
- Where it started: [github.com/patrob/ai-sdlc](https://github.com/patrob/ai-sdlc)
- Sound Buddy: [soundbuddy.online](https://soundbuddy.online)
- On PAR Dev: [onpardev.com](https://onpardev.com)

## Sources

- R.W. Bemer, "Position Papers for Panel Discussion: The Economics of Program Production," *Information Processing 68*, North-Holland, 1969, pp. 1626–1627 (presented 1968)
- M.D. McIlroy, "Mass Produced Software Components," in Naur & Randell (eds.), *Software Engineering: Report on a Conference Sponsored by the NATO Science Committee*, 1969, pp. 151–155
- M.A. Cusumano, "The Software Factory: A Historical Interpretation," *IEEE Software* 6(2), March 1989, pp. 23–30, [DOI 10.1109/MS.1989.1430446](https://ieeexplore.ieee.org/document/1430446/)
- M.A. Cusumano, *Japan's Software Factories: A Challenge to U.S. Management*, Oxford University Press, 1991
- M.A. Cusumano, "The Software Factory: An Entry for the Encyclopedia of Software Engineering," MIT Sloan WP#BPS-3268-91, March 1991: [PDF](https://www.gregorystrachta.com/resources/Touchstones/swp-3268-23661042.pdf)
- J. Greenfield and K. Short, *Software Factories: Assembling Applications with Patterns, Models, Frameworks, and Tools*, Wiley, 2004, ISBN 0-471-20284-3: [ACM](https://dl.acm.org/doi/10.5555/983189)
- J. Greenfield, "The Case for Software Factories," MSDN Architecture Journal, July 2004: [MSDN](https://learn.microsoft.com/en-us/previous-versions/aa480032(v=msdn.10))
- J. Cutler, "12 Signs You're Working in a Feature Factory," 2016: [cutle.fish](https://cutle.fish/blog/12-signs-youre-working-in-a-feature-factory/)
- A. Karpathy, "vibe coding," February 2025
- OpenAI, "Harness Engineering: Leveraging Codex in an Agent-First World," February 2026
- Anthropic, "Harness Design for Long-Running Application Development," March 2026
- Agile Alliance, [INVEST](https://www.agilealliance.org/glossary/invest/)
