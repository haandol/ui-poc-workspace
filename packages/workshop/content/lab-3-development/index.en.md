---
title: 'Lab 3: Build the UI PoC'
weight: 40
---

In this lab you turn the PRD into a working web UI. We move feature by feature in **PRD → ADR → code** order, and the same cycle absorbs every change request that comes back from internal reviews or engineering handoff.

## Why a non-developer builds a UI PoC

When a planner conveys intent only through docs and wireframes, _"where this button lives, how it actually looks, whether the flow feels natural"_ rarely lands cleanly. Developers end up asking "what did you mean here?", and planners only realize _"oh, that's not what I wanted"_ once they see something running. That back-and-forth is one of the biggest schedule drains on a project.

The PoC you build in this lab is **not a customer-facing demo** — it's an **internal communication tool**. When a non-developer brings a working screen into a review or a handoff meeting:

- Intent travels as a **clickable screen** instead of text, so ambiguity disappears
- Engineers review the **PoC alongside the ADR** instead of imagining what the PRD means, which cuts estimation time
- The _"once we built it, it felt wrong"_ class of late discoveries gets caught **before engineering work begins**

**What you'll do in this lab:**

1. Start the dev server
2. Convert each PRD feature into an ADR (design memo) — `/feature-to-adr fN`
3. Implement the code that follows the ADR — `/adr-impl fN`
4. Handle change requests after the demo — update the ADR for big changes, fix code directly for small ones, run `/adr-sync` when drift accumulates

**Expected duration**: 100 minutes

::alert[**ADR (Architecture Decision Record)** — a one-page design memo we write before each feature. Claude fills it in automatically, so there's no documentation overhead. It becomes the anchor that keeps the demo → feedback → change cycle clean. The [`alps-writer` Claude Code plugin](https://github.com/haandol/alps-writer-mcp) handles this flow automatically.]{type="info"}
