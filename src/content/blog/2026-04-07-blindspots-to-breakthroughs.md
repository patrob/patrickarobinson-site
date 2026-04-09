---
title: Blindspots to Breakthroughs
date: 2026-04-07
pubDate: 2026-04-07T00:00:00Z
description: How losing access to my AI agents forced me to rebuild something better — and what I learned about the difference between using AI as a tool versus running AI as a team.
tags: [ai, agents, openclaw, workflow]
---

Friday afternoon. I was packing up for the weekend when Boris Cherny, the creator of Claude Code, posted about an email from Anthropic. The message was clear: starting tomorrow, Pro and Max subscriptions would no longer work with OpenClaw and other third-party agent tools.

By Monday morning, my entire agent stack went dark.

The blog writer stopped. The research agent stopped. Shield, my security auditor, went silent. Even my health coach — which had been helping me lose weight for a month — stopped sending workout recommendations.

Everything stopped at once.

I spent the next day or two scrambling. I switched to Copilot's GPT-4o Mini temporarily while I evaluated options. I started testing GLM-5. I pulled Qwen3.5 397B off the shelf and ran it locally via Ollama. Nothing felt quite right. I love Claude Code. I am a fan of Anthropic. I just wish we could have kept using Max subscriptions for agent work.

But that constraint forced me to confront something I had been avoiding.

## The Real Problem

I was treating AI like a chat window. Open, ask, close. The interaction ends there. Nothing persists. Nothing compounds.

The agents that had been working for me — the ones that lost 4-5 pounds off my frame, that caught security vulnerabilities before they blew up, that published five blog posts while I slept — those agents were not chatbots. They were a team.

And I had been managing them like tools.

Here is what changed when I started thinking about AI as a team instead of a tool.

## Three Unlocks

### Unlock 1: From Chatbot to Coach

The health coach agent tracks what I eat through prompts at breakfast, lunch, and dinner. It caps my daily intake based on targets. It uses a SQLite database to store common meals and recipes I use.

One afternoon, I pulled into Chipotle and asked what to order. The agent recommended a double chicken bowl with fajita veggies and lettuce, no rice. Pinto black beans. Red tomatillo salsa and fresh tomato salsa. No cheese. It hit my protein macros while keeping calories in check.

Another time, I was at Eric's Tacos, a place my wife and I have gone to since before we started dating. I took a picture of the menu and sent it to the agent. It recommended the mini taco plate with carnitas on smart corn tortillas, plus a full-sized bistec taco for extra protein. I had never ordered those before. They became my new go-to order.

The agent also sends workout recommendations Monday through Friday before I hit the gym. When I arrive, a new workout is waiting. It organizes by legs, push, pull, with Friday as a catch-up day for anything I missed. If I only have 20 minutes, it gives me a shortened version. If I have extra time, it adds two or three bonus exercises.

A chatbot answers questions. A coach notices patterns.

**The shift:** Stop asking AI for advice. Start giving it context and let it notice what you miss.

### Unlock 2: Daily Research → Insights

My research agent scans RSS, Twitter, Hacker News, and papers every morning. The briefing arrives at 6 AM sharp.

One morning, the LiteLLM supply chain breach and Axios vulnerabilities showed up in my briefing before they blew up across the internet. I told Shield to investigate. It scanned our conversations for potential leaks, checked our config for security vulnerabilities, and audited our package dependencies. The audit found nothing. But I knew before most of my colleagues did.

Shield runs a full audit about once a week. When it finds something, it gives me a mitigation plan. Not just "here is a problem." Here is what to do about it.

The research agent also feeds into blog creation. When something significant comes through, I can ask it to draft a post or social content. I am not trying to be a news caster. But when I learn about something early, I can speak to it intelligently with colleagues and on social media.

A chatbot waits for you to ask. A research agent brings you what matters.

**The shift:** Stop doom-scrolling for signal. Give AI a beat and let it bring you what matters.

### Unlock 3: Knowledge That Grows

Andrej Karpathy recently described a pattern I have been using. A persistent wiki that the LLM reads and writes. Raw data goes in. Compiled knowledge comes out.

I have a nightly job that transcribes YouTube videos from creators I follow. It pulls from an RSS feed, downloads new videos, transcribes them locally, and saves the transcripts. It posts key takeaways to two Discord channels I maintain, one for business content and one for tech.

Those transcripts feed directly into the LLM wiki. The wiki grows every night while I sleep.

The LLM can reason against the knowledge base. As it expands, the agent pits new knowledge against existing knowledge to find conflicts and verify sources. I use Obsidian as the frontend. The LLM maintains all the data. I rarely touch it directly.

A chatbot forgets everything when you close the tab. A knowledge base remembers and grows.

**The shift:** Stop treating chat history as memory. Build something that compounds.

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

The rebuild forced me to make my agent stack model-agnostic. Now the agents do not care who is thinking for them. The architecture matters more than the model.

I switched to Copilot's GPT-4o Mini temporarily while I evaluated options. I am testing GLM-5 and running Qwen3.5 397B locally via Ollama. I do not want to pay hundreds of dollars for GPT-4o usage when these alternatives work well enough.

## The Breakthrough

The blindspot is thinking AI is a tool you use. The breakthrough is realizing AI is a team you manage.

One agent coaches your health. One researches your field. One maintains your knowledge base. One writes your content. One handles your security.

They do not wait for prompts. They have workflows. They run 24/7. They bring you results, not just responses.

## Your Turn

You do not need to wait for permission. You do not need a perfect setup. You need to start.

Pick one thing you do every day that drains your attention. Meal planning. Morning research. Security audits. Knowledge management. Pick one.

Give it to an agent. Not as a chat. As a workflow.

Let it run 24/7. Let it notice patterns you miss. Let it bring you results instead of responses.

That is the shift from blindspots to breakthroughs. Not better models. Better architecture. And a team that works for you while you sleep.

---

**Read more:** [Your Coding Agent Doesn't Need a Better Model. It Needs a Better Workflow.](/blog/coding-agent-workflow-not-model/)
