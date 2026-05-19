---
title: 'Convert the PRD into ADRs'
weight: 15
---

If the PRD is the big picture of "what to build", an **ADR (Architecture Decision Record)** is a **short design memo of "how to build it"** that we write right before each feature.
We create one ADR per feature first, then write code against that ADR.

::alert[The term ADR may sound unfamiliar, but in practice it's just _"a one-page note that captures why and how we'll build this feature."_ The AI fills it in automatically, so there's no documentation overhead.]{type="info"}

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
