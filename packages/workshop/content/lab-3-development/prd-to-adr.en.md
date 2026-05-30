---
title: 'Convert the PRD into ADRs'
weight: 15
---

## Convert every feature into an ADR at once

In the 💬 Claude Code chat, run the command without arguments:

:::code{showCopyAction=true showLineNumbers=false language=text}
/feature-to-adr
:::

Claude will automatically:

1. Read **every feature (F1, F2, F3, …)** from PRD Section 7
2. Generate `docs/adr/<feature-id>/0001-…md` for each one in batch
3. Fill in **Decision, Alternatives, Consequences** for every ADR

::alert[ADR files are saved under `docs/adr/<feature-id>/`. You can open them directly in Finder/File Explorer or ask Claude _"show me the f1 ADR"_ if curious. **You don't need to read them to proceed** — the next page jumps straight into `/adr-impl`.]{type="info"}

## How PRD and ADR differ

The hardest part of agent-driven development is **translating business requirements into correct code.** The trick is breaking that translation into standardized abstraction layers, and **PRD vs. ADR sit at different layers in that pipeline.**

```mermaid
flowchart LR
    subgraph PO["Product Owner's territory"]
        direction LR
        Req[Requirement] --> Feat[Feature spec]
    end
    subgraph Dev["Developer's territory (AI agent)"]
        direction LR
        ADR[ADR<br/>Architecture decision] --> Code[Code<br/>Implementation]
    end
    Feat --> ADR

    classDef po fill:#fff3b0,stroke:#b58900,color:#5a3e00;
    classDef dev fill:#fde2e4,stroke:#a83232,color:#5a1414;
    classDef artifact fill:#ffffff,stroke:#666,color:#222;
    class PO po
    class Dev dev
    class Req,Feat,ADR,Code artifact
```

- **PRD — owned by the Product Owner / planner**: _"what to build and why"_, written in business language. Covers Requirement → Feature spec. You already wrote one in Lab 2.
- **ADR (Architecture Decision Record) — owned by the developer side**: a record of _"what structure was chosen and why"_ when building each feature. Implementation details (file paths, snippets, constants) live in the code itself; the ADR captures only the **reasoning (WHY), the alternatives considered, and the consequences** of the decision.

For a simple screen, you can get by without an ADR. But **as the feature count grows and the project gets more complex, separating PRD and ADR becomes essential.** When change requests come in after a demo, keeping _"what we agreed to build (PRD)"_ separate from _"why we made each decision (ADR)"_ lets you judge how far a new requirement reaches into existing decisions and keeps the cycle clean.

::alert[An ADR is ultimately a **technical decision record.** Non-developers don't need to write it themselves — **leave the authoring to an AI agent that knows development, then have it implement against those decisions.** The single command on this page converts every PRD feature into an ADR in one shot.]{type="info"}

```mermaid
flowchart LR
    subgraph Planner["Planner's territory"]
        PRD[("PRD<br/>What & why to build")]
    end
    subgraph Agent["Authored by the AI agent"]
        ADR[("ADR<br/>Why this decision<br/>Alternatives / Consequences")]
    end
    subgraph Code["Actual code"]
        Impl[("Code<br/>Implementation details<br/>files · functions · constants")]
    end
    PRD -->|/feature-to-adr| ADR
    ADR -->|/adr-impl| Impl
    Impl -.->|/adr-sync| ADR
```
