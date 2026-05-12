---
title: 'Generate the PRD'
weight: 10
---

Use Claude Code together with the `alps-writer` MCP server to produce a PRD from the research PDF.

## What is an ALPS document?

ALPS (Agentic Lean Product Spec) is the PRD format used in this workshop. It has 9 sections:

| Section       | Title                     | Contents                                                   |
| ------------- | ------------------------- | ---------------------------------------------------------- |
| **Section 1** | Product overview          | Vision, target users, core problem, solution strategy      |
| **Section 2** | MVP goals                 | Hypotheses and 2–5 measurable goals to validate            |
| **Section 3** | Demo scenarios            | Core user journeys that validate the MVP goals             |
| **Section 4** | High-level architecture   | System diagram and tech stack                              |
| **Section 5** | Design spec               | Key screen layouts and screen-to-screen flow               |
| **Section 6** | Requirements summary      | Feature list (F1, F2...) with priority and dependencies    |
| **Section 7** | Per-feature detailed spec | User story, user flow, and acceptance criteria per feature |
| **Section 8** | MVP metrics               | How to collect data and decide success/failure             |
| **Section 9** | Out of scope              | Features excluded from the MVP, roadmap, tech debt         |

::alert[For UI-only PoCs, Section 4 (architecture) and Section 8 (metrics) may be auto-simplified or skipped. It's normal if those sections end up empty.]{type="info"}

## Step 1. Confirm the research PDF is in place

Make sure the `research.pdf` you produced earlier is inside the project's `docs/` folder. If the file only exists in your backup location (e.g., `Documents/ui-poc/research.pdf`), copy it into **`Desktop > ui-poc-workspace > docs`** now.

```
Desktop/ui-poc-workspace/
└── docs/research.pdf    ← it must live here
```

::alert[If the file name contains non-ASCII characters or spaces, rename it to `research.pdf` — Claude Code may not pick it up otherwise.]{type="warning"}

## Step 2. Start Claude Code

Run Claude Code from the project folder. In your 💻 terminal:

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
cd ~/Desktop/ui-poc-workspace && claude
:::

:::
:::tab{label="Windows (PowerShell)"}

:::code{showCopyAction=true showLineNumbers=false language=powershell}
cd "$([Environment]::GetFolderPath('Desktop'))\ui-poc-workspace"
claude
:::

:::
::::

::alert[If Claude Code is already running in the project folder, skip this step. You can tell it's running if you see the 💬 chat with a blinking cursor.]{type="info"}

## Step 3. Ask for the PRD

In the 💬 Claude Code chat, type the following. Type up to `@docs/` and press **Tab** to autocomplete the PDF file name.

:::code{showCopyAction=true showLineNumbers=false language=text}
Read @docs/research.pdf and write an ALPS document for the UI PoC.
:::

::alert[With the `@` syntax, Claude Code reads the file directly. Typing `@docs/` and pressing Tab autocompletes the file name.]{type="info"}

The ALPS document is **not** produced all at once. Claude Code walks you through Section 1 to Section 9 **section by section**, presenting a draft and asking for your confirmation. You must read and **confirm (or request changes)** before it moves to the next section.

::alert[For a UI PoC, speed matters more than perfection. The goal is to **write fast → implement → get feedback** in tight cycles. If the broad direction looks right, confirm and move on — you can always adjust details during development.]{type="info"}

When all sections are confirmed, the ALPS document is saved as a `.alps.md` file in `docs/prd/`. Moving quickly takes about **10–15 minutes**; a thorough review takes **20–30 minutes**.

## Step 4. Inspect the generated PRD

Once the PRD is generated, review it in the 💬 Claude Code chat:

:::code{showCopyAction=true showLineNumbers=false language=text}
List the files in docs/prd/.
:::

Open the generated `.alps.md` file and look through it:

:::code{showCopyAction=true showLineNumbers=false language=text}
Summarize the Feature list in @docs/prd/XYZ.alps.md.
:::

::alert[The file name varies by service name. Type `@docs/prd/` and press Tab to autocomplete.]{type="info"}

::alert[If you set up the Airtable integration, progress is recorded automatically as ALPS sections save — Section 1 → `PRD-START`, Section 6 (feature list) → `PRD-FEATURES`, final export → `PRD-DONE`.]{type="info"}
