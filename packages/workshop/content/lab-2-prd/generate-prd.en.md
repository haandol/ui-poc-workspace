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

## Things to keep in mind while writing the PRD

| Question                                  | Answer                                                                                                                                                                             |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| How thorough should the PRD be?           | Don't over-polish. The key is spinning the **PRD → implement → feedback** cycle fast. If the broad direction looks right, confirm and move on — adjust details during development. |
| Do I need to specify the tech stack?      | No. This workshop uses **Nuxt.js (Vue 3)**, and it's auto-detected from the project structure.                                                                                     |
| Which section matters most?               | **Section 3 (Demo scenarios)**. The AI agent predicts features from these scenarios, so the more specific you are about what the user does on each screen, the better.             |
| What if there are too many features?      | **Section 6** shows the full scope. The recommended count for a UI PoC is **5–7**. Remove extras with prompts like `"F8 won't be implemented in this PoC"`.                        |
| Do I have to write Sections 7–9 manually? | No. Once Section 6 is confirmed, the rest can be auto-generated (see Step 3 below).                                                                                                |

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

## Step 3. Write the PRD — Sections 1–6

In the 💬 Claude Code chat, ask Claude in plain English. Type up to `@docs/` and press **Tab** to autocomplete the PDF file name.

:::code{showCopyAction=true showLineNumbers=false language=text}
Read @docs/research.pdf and write an ALPS document for the UI PoC.
:::

::alert[With the `@` syntax, Claude Code reads the file directly. Typing `@docs/` and pressing Tab autocompletes the file name.]{type="info"}

Claude Code presents a draft for each section starting from Section 1, asking for your confirmation. Read and **confirm (or request changes)** to move to the next section. Confirm through Section 6 (feature list).

::alert[**Shortcut** — once you're comfortable, you can start the first message with `/alps-init`. It's a slash command from the [`alps-writer` plugin](https://github.com/haandol/alps-writer-mcp) that triggers the same flow more concisely. Plain English is enough to begin with.]{type="info"}

## Step 4. Write the PRD — Sections 7–9 (auto-generate)

Once Section 6 is confirmed, you can auto-generate the remaining sections. In the 💬 Claude Code chat, type:

:::code{showCopyAction=true showLineNumbers=false language=text}
Based on the current project structure and the PRD written so far, write sections 7-9 automatically.
:::

When all sections are confirmed, the ALPS document is saved as a `.alps.md` file in `docs/prd/`. Moving quickly takes about **10–15 minutes**; a thorough review takes **20–30 minutes**.

## Step 5. Inspect the generated PRD

Once the PRD is generated, review it in the 💬 Claude Code chat:

:::code{showCopyAction=true showLineNumbers=false language=text}
List the files in docs/prd/.
:::

Open the generated `.alps.md` file and look through it:

:::code{showCopyAction=true showLineNumbers=false language=text}
Summarize the Feature list in @docs/prd/XYZ.alps.md.
:::

::alert[The file name varies by service name. Type `@docs/prd/` and press Tab to autocomplete.]{type="info"}

Once the PRD is finalized, move on to the next lab. In Lab 3 you convert each PRD feature into an **ADR (design memo)** and then implement the code.
