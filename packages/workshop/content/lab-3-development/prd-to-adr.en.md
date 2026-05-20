---
title: 'Convert the PRD into ADRs'
weight: 15
---

**PRD vs. ADR**

- **PRD** — a planner's view: **"what to build and why"** — the requirements
- **ADR (Architecture Decision Record)** — a developer's view: **the architectural decisions made while building the feature** — what structure was chosen and why. Implementation details (file paths, code snippets, constants) live in the code itself; the ADR captures only the **reasoning (WHY), the alternatives considered, and the consequences** of the decision.

For a simple screen, you can get by without an ADR. But **as the feature count grows and the project gets more complex, separating PRD and ADR becomes essential.** When change requests come in after a demo, keeping _"what we agreed to build (PRD)"_ separate from _"why we made each decision (ADR)"_ lets you judge how far a new requirement reaches into existing decisions and keeps the cycle clean.

::alert[An ADR is ultimately a **technical decision record.** Non-developers don't need to write it themselves — **leave the authoring to an AI agent that knows development, then have it implement against those decisions.** The single command on this page handles authoring, review, and acceptance of the ADR end-to-end.]{type="info"}

![PRD · ADR · code relationship](/static/images/lab-3/prd-adr-code.svg)

## Step 1. Convert the first feature into an ADR

In the 💬 Claude Code chat, enter the following (`f1` is the first feature ID defined in your PRD):

:::code{showCopyAction=true showLineNumbers=false language=text}
/feature-to-adr f1
:::

Claude will automatically:

1. Read the F1 spec from PRD Section 7
2. Create `docs/adr/f1/0001-…md`
3. Fill in **Decision (how we'll build it), Alternatives, Consequences (impact)**

## Step 2. Review and accept the ADR

You only need to read the **Decision** section of the generated ADR. The rest is AI-generated reasoning to support that decision.

- Looks right → "OK, promote it to Accepted."
- Off → reply in plain language: "Use a dropdown instead of cards for payment."

Once approved, the ADR's Status flips from `Proposed` → `Accepted` and we're ready for the next step (implementation).

::alert[ADR files are saved under `docs/adr/<feature-id>/`. You can open them directly in Finder/File Explorer, or simply ask Claude _"show me the f1 ADR."_]{type="info"}

## Step 3. Repeat for the other features

Apply the same flow to F2, F3, … defined in the PRD. **Don't convert all features at once — finish implementing one feature before moving on to the next ADR.** This page and the next one (feature implementation) are intended to be done in alternation.
