---
title: Blindspots to Breakthroughs
date: 2026-04-07
pubDate: 2026-04-07T00:00:00Z
description: What running AI agents 24/7 actually taught me about moving from chatbot thinking to persistent agent teams.
tags: [ai, agents, openclaw, workflow]
---

Friday afternoon. I was wrapping up for the weekend when Boris Cherny, the creator of Claude Code, posted about an email from Anthropic. The message was clear: starting tomorrow, Pro and Max subscriptions would no longer work with OpenClaw and other third-party agent tools.

By Monday morning, my entire agent stack went dark. The blog writer, the research agent, the security auditor, the health coach. Everything stopped at once.

That crisis forced me to confront something I had been avoiding. I was treating AI like a chat window. Open, ask, close. The real breakthrough happened when I stopped thinking about AI as a tool I use and started thinking about it as a team that works for me.

## The Blindspot

Most people use AI as a chatbot. You open a chat, ask a question, get an answer, and close the tab. The interaction ends there. Nothing persists. Nothing compounds.

The breakthrough is treating AI as a persistent team. Agents that run 24/7, working on your behalf, building knowledge and taking action while you sleep.

This shift changed everything. Not because the models got better. Because the architecture changed.

## Three Unlocks

### Unlock 1: From Chatbot to Coach

A dedicated agent with memory and context about your body and goals. It knows your patterns better than you do because it is paying attention when you are not.

I lost four or five pounds in the first month. Not because I got more disciplined. Because the agent noticed patterns I was missing.

It tracks what I eat through prompts at breakfast, lunch, and dinner. It caps my daily intake based on targets. It uses a SQLite database to store common meals and recipes I use.

Here is a real example. I pulled into Chipotle and asked what to order. The agent recommended a double chicken bowl with fajita veggies and lettuce, no rice. Pinto black beans. Red tomatillo salsa and fresh tomato salsa. No cheese. It hit my protein macros while keeping calories in check.

Another time, I was at Eric's Tacos, a place my wife and I have gone to since before we started dating. I took a picture of the menu and sent it to the agent. It recommended the mini taco plate with carnitas on smart corn tortillas, plus a full-sized bistec taco for extra protein. I had never ordered those before. They became my new go-to order.

The agent also sends workout recommendations Monday through Friday before I hit the gym. When I arrive, a new workout is waiting. It organizes by legs, push, pull, with Friday as a catch-up day for anything I missed. If I only have 20 minutes, it gives me a shortened version. If I have extra time, it adds two or three bonus exercises.

A chatbot answers questions. A coach notices patterns.

### Unlock 2: Daily Research → Insights

A research agent scans RSS, Twitter, Hacker News, and papers every morning. You wake up to curated signal instead of doom-scrolling.

My briefing arrives at 6 AM sharp. It includes trending stories, relevant research, and patterns detected across sources.

Here is a specific example. The LiteLLM supply chain breach and Axios vulnerabilities showed up in my 6 AM briefing before they blew up across the internet. I told my security agent, Shield, to investigate. It scanned our conversations for potential leaks, checked our config for security vulnerabilities, and audited our package dependencies. The audit found nothing. But I knew before most of my colleagues did.

Shield runs a full audit about once a week. When it finds something, it gives me a mitigation plan. Not just "here is a problem." Here is what to do about it.

The research agent also feeds into blog creation. When something significant comes through, I can ask it to draft a post or social content. I am not trying to be a news caster. But when I learn about something early, I can speak to it intelligently with colleagues and on social media.

A chatbot waits for you to ask. A research agent brings you what matters.

### Unlock 3: Knowledge That Grows

Andrej Karpathy recently described a pattern I have been using. A persistent wiki that the LLM reads and writes. Raw data goes in. Compiled knowledge comes out.

The workflow:

1. **Ingest** — Source documents, articles, papers, repos, datasets
2. **Curate** — LLM summarizes and categorizes
3. **Query** — Ask complex questions against the wiki
4. **Update** — LLM enhances the wiki with new connections
5. **Loop** — Knowledge compounds instead of disappearing into chat history

I have a nightly job that transcribes YouTube videos from creators I follow. It pulls from an RSS feed, downloads new videos, transcribes them locally, and saves the transcripts. It posts key takeaways to two Discord channels I maintain, one for business content and one for tech.

Those transcripts feed directly into the LLM wiki. The wiki grows every night while I sleep.

The LLM can reason against the knowledge base. As it expands, the agent pits new knowledge against existing knowledge to find conflicts and verify sources. I use Obsidian as the frontend. The LLM maintains all the data. I rarely touch it directly.

A chatbot forgets everything when you close the tab. A knowledge base remembers and grows.

## Stories from the Trenches

### The Blog Pipeline

Five posts published using a multi-agent workflow:

**Research** → Agents source material and extract claims
**Writing** → Agents draft with explicit structure
**Review** → Human approves with specific feedback
**Publish** → PR created, reviewed, merged, deployed

Agents need workflows. Not super prompts.

### Not Just Work

Social posts in packs. Three to five at a time, adapted for X and LinkedIn from each blog post. I use the agents to come up with the posts, not just post them.

Bedtime stories for my boys. Luke is 4. Graham is almost 2. The workflow: OpenClaw generates a story about bravery, patience, or sharing. We curate it together. Then the agent creates image generation prompts, runs the images, and compiles everything into a PDF storybook. We have actual books now, not just text messages.

This is not automation for efficiency. This is automation for presence.

## What the Anthropic Change Taught Me

When Anthropic blocked OAuth Pro and Max plans from agent SDKs, I had to rebuild. API keys still work. Personal subscriptions through OAuth do not.

The rebuild forced me to make my agent stack model-agnostic. I switched to Copilot's GPT-4o Mini temporarily while I evaluated options. I am testing GLM-5 and running Qwen3.5 397B locally via Ollama. I do not want to pay hundreds of dollars for GPT-4o usage when these alternatives work well enough.

I love Claude Code. I am a fan of Anthropic. I just wish we could have kept using Max subscriptions for agent work. But the constraint pushed me toward something better.

Now the agents do not care who is thinking for them. The architecture matters more than the model.

## The Breakthrough

The blindspot is thinking AI is a tool you use. The breakthrough is realizing AI is a team you manage.

One agent coaches your health. One researches your field. One maintains your knowledge base. One writes your content. One handles your security.

They do not wait for prompts. They have workflows. They run 24/7. They bring you results, not just responses.

That is the shift from blindspots to breakthroughs. Not better models. Better architecture.

---

**Read more:** [Your Coding Agent Doesn't Need a Better Model. It Needs a Better Workflow.](/blog/coding-agent-workflow-not-model/)
