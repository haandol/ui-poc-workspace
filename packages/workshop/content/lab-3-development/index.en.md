---
title: 'Lab 3: Build the UI PoC'
weight: 40
---

In this lab you turn the PRD into a working web UI. We move feature by feature in **PRD → ADR → code** order, and the same cycle absorbs every change request that comes back from internal reviews or engineering handoff.

**What you'll do in this lab:**

1. Start the dev server
2. Convert each PRD feature into an ADR (design memo) — `/feature-to-adr fN`
3. Implement the code that follows the ADR — `/adr-impl fN`
4. Handle change requests after each review or handoff — update the ADR for big changes, fix code directly for small ones, run `/adr-sync` when drift accumulates

**Expected duration**: 100 minutes

::alert[**ADR (Architecture Decision Record)** — a one-page design memo we write before each feature. Claude fills it in automatically, so there's no documentation overhead. It becomes the anchor that keeps the review → feedback → change cycle clean. The `adr-writer` plugin from the [`alps-writer` marketplace](https://github.com/haandol/alps-writer-plugins) handles this flow automatically.]{type="info"}
