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

## Step 1. Start Claude Code

Run Claude Code from the project folder.

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
cd ~/Desktop/ui-poc-workspace
claude
:::

:::
:::tab{label="Windows (PowerShell)"}

:::code{showCopyAction=true showLineNumbers=false language=powershell}
cd "$([Environment]::GetFolderPath('Desktop'))\ui-poc-workspace"
claude
:::

:::
::::

## Step 2. Ask for the PRD

In the Claude Code prompt, type the following. Type up to `@docs/` and press **Tab** to autocomplete the PDF file name.

:::code{showCopyAction=true showLineNumbers=false language=text}
Read @docs/research.pdf and write an ALPS document for the UI PoC.
:::

::alert[With the `@` syntax, Claude Code reads the file directly. Typing `@docs/` and pressing Tab autocompletes the file name.]{type="info"}

The ALPS document is **not** produced all at once. Claude Code walks you through Section 1 to Section 9 **section by section**, presenting a draft and asking for your confirmation. You must read and **confirm (or request changes)** before it moves to the next section.

::alert[Read each section carefully and, if the content does not match your intent, ask for specific edits. The clearer this step, the better Lab 3 development will go.]{type="warning"}

When all sections are confirmed, the ALPS document is saved as a `.alps.md` file in `docs/prd/`. Because this is interactive, it takes roughly **20–30 minutes**.

## Step 3. Inspect the generated PRD

Once the PRD is generated, review it:

:::code{showCopyAction=true showLineNumbers=false language=text}
List the files in docs/prd/.
:::

Open the generated `.alps.md` file and look through it:

:::code{showCopyAction=true showLineNumbers=false language=text}
Summarize the Feature list in @docs/prd/XYZ.alps.md.
:::

::alert[The file name varies by service name. Type `@docs/prd/` and press Tab to autocomplete.]{type="info"}

::alert[If you set up the Airtable integration, progress is recorded automatically as ALPS sections save — Section 1 → `PRD-START`, Section 6 (feature list) → `PRD-FEATURES`, final export → `PRD-DONE`.]{type="info"}
