---
title: 'Building a UI PoC with AI — Claude Code on Bedrock Workshop for Non-Developers'
weight: 0
---

A workshop where non-developers (PMs, product planners) turn a service idea into a working web UI PoC using nothing but AI tools.

![Workshop overview](/static/images/workshop-overview.jpg)

In this workshop you will use **Claude Code**, running on top of **Amazon Bedrock**, to go from deep research → PRD authoring → web prototype development — without writing code by hand.

> **Key idea**: In this workshop you work with AI tools **as if you were having a conversation**. If anything is unclear along the way, just ask the AI.

## Why a non-developer builds a UI PoC

When a planner conveys intent only through docs and wireframes, _"where this button lives, how it actually looks, whether the flow feels natural"_ rarely lands cleanly. Developers end up asking "what did you mean here?", and planners only realize _"oh, that's not what I wanted"_ once they see something running. That back-and-forth is one of the biggest schedule drains on a project.

The PoC you build in this workshop is **not a customer-facing demo** — it's an **internal communication tool**. When a non-developer brings a working screen into a review or a handoff meeting:

- Intent travels as a **clickable screen** instead of text, so ambiguity disappears
- Engineers review the **PoC alongside the ADR** instead of imagining what the PRD means, which cuts estimation time
- The _"once we built it, it felt wrong"_ class of late discoveries gets caught **before engineering work begins**

### What will I learn?

By completing this workshop you will learn how to:

1. Install an AI coding assistant (Claude Code) on your laptop and connect helper tools to build a smart workspace
2. Chat with AI to research a service idea and turn it into a planning document optimized for agent-driven development
3. Build a working web screen prototype by showing the AI your screen — without writing code yourself

## Target audience

**Level 200** — designed for PMs, product planners, and designers with no coding background.

- People who want to quickly visualize their own service ideas
- People who want to learn an AI-powered prototyping workflow
- **Expected duration**: ~8 hours total (~4 hours for install + research, ~4 hours for PRD + build)

### Prerequisites

You can take this workshop without any programming knowledge.

1. A service idea you would like to turn into a PoC (a quick note is enough; the more detail, the better)
2. A personal laptop (Mac or Windows)
3. A terminal app (Mac: Ghostty or the built-in Terminal; Windows: PowerShell)
4. AWS account and Amazon Bedrock access (provided by the workshop facilitator)
5. Amazon QuickSuite access (used for the research step; provided by the facilitator)

### AWS Account Requirements and Costs

**At a workshop event**: the facilitator provides the AWS account. You will not incur costs.

**Self-hosted**: Amazon Bedrock API calls will incur charges. After finishing the workshop, follow the [Cleanup section](./cleanup/) to delete the resources.

> **Tip**: Whenever you are stuck or curious, ask the AI.
> Feature priorities, user scenarios, screen layouts, competitor comparisons — anything is fair game.
