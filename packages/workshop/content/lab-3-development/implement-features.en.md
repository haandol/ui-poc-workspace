---
title: 'Implement Features'
weight: 20
---

Implement the PRD's features one at a time. Don't try to build everything at once — go **feature by feature**.

## How to find the file name

Use whichever method is easiest:

- **Finder (Mac) / File Explorer (Windows)**: open `Desktop > ui-poc-workspace > docs > prd` and look for the `.alps.md` file.
- **Ask Claude Code directly**: `List the files in docs/prd/.`
- **Tab autocomplete**: type `@docs/prd/` and press Tab to autocomplete the file name.

## Two-step feature flow

This workshop uses the [`alps-writer` Claude Code plugin](https://github.com/haandol/alps-writer-mcp) to build each feature as **Feature → ADR → code**. An ADR (Architecture Decision Record) is a short design memo for "how to build this feature" — the plugin drafts it from the PRD automatically.

```
PRD Feature (F1)
      │
      ▼  /feature-to-adr f1     ← Step 1: draft the ADR
ADR docs/adr/0001-f1-*.md
      │
      ▼  /adr-impl f1            ← Step 2: write code that follows the ADR
done
```

### Step 1. Draft the ADR (`/feature-to-adr`)

In the 💬 Claude Code chat, pick whichever style you prefer. Type `@docs/prd/` and press **Tab** to pick the file.

**Option A — Slash command (recommended)**

:::code{showCopyAction=true showLineNumbers=false language=text}
Read @docs/prd/XYZ.alps.md and run /feature-to-adr f1.
:::

**Option B — Natural language**

:::code{showCopyAction=true showLineNumbers=false language=text}
Read @docs/prd/XYZ.alps.md and let's start with F1 — draft the ADR first.
:::

::alert[Plain English works too. The plugin will follow the `/feature-to-adr` flow automatically. Slash commands are shorter and more deterministic once you get used to them.]{type="info"}

Either way, Claude will:

1. Find F1 in PRD Section 7 and analyze it
2. Create a draft at `docs/adr/0001-f1-*.md`
3. Show you the ADR (Status / Context / Decision / Consequences) and **ask for confirmation**

If it looks right, reply "OK" or "go ahead". If not, request changes in plain language — e.g., "Change F1's data model to X."

::alert[You don't need to understand every section on first read. Just check that the **Decision** section matches your intent.]{type="info"}

### Step 2. Implement the code (`/adr-impl`)

Once the ADR is settled, in the same chat use whichever style you prefer.

**Option A — Slash command**

:::code{showCopyAction=true showLineNumbers=false language=text}
/adr-impl f1
:::

**Option B — Natural language**

:::code{showCopyAction=true showLineNumbers=false language=text}
Implement F1 following the ADR we just confirmed.
:::

Claude writes the code following the ADR's Decision; the dev server picks it up. Check the result at `http://localhost:3000`.

## The iteration loop

Build one feature at a time in a loop:

```
1. Draft the ADR
   └─ "Read @docs/prd/XYZ.alps.md and run /feature-to-adr f1."

2. Review and approve the ADR
   └─ Check the Decision section → "OK" or request edits

3. Implement the code
   └─ "/adr-impl f1"

4. Check the result in the browser
   └─ http://localhost:3000

5. Feedback / edit requests
   └─ "Change the button color to blue."

6. Once you're happy, move to the next feature
   └─ "/feature-to-adr f2"  →  "/adr-impl f2"
```

::alert[If you stay in the same conversation, you can skip the PRD path — just `/feature-to-adr f2` is enough; the previous PRD is reused.]{type="info"}

::alert[**If a change diverges from the ADR mid-implementation**: say "this part needs to differ from the ADR" and Claude will update the ADR before changing the code. Or after the fact, run `/adr-sync f1` to detect and resolve drift between code and ADR.]{type="info"}

## Tips for edit requests

The more specific your request, the better.

| Bad                    | Good                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| "Something feels off." | "Reduce the sidebar menu font size to 14px and tighten the spacing between items to 8px." |
| "Change the design."   | "Switch the whole app to dark mode."                                                      |
| "Add some data."       | "Create 10 sample users with name, email, and signup date."                               |

## Handy prompts

| Situation             | Example prompt                                              |
| --------------------- | ----------------------------------------------------------- |
| Add a page            | "Create a dashboard page."                                  |
| Edit the top menu     | "Add a logo and navigation to the top menu."                |
| Add sample data       | "Create 10 sample users with name, email, and signup date." |
| Change styles         | "Switch the whole app to dark mode."                        |
| Add a chart           | "Show monthly revenue as a bar chart."                      |
| Change layout         | "Use a sidebar on the left and main content on the right."  |
| Fix an error          | "Fix this error: [paste the error message]"                 |
| Feature review        | "Summarize the user scenarios for this feature."            |
| Competitor comparison | "Compare the current screen to a similar competitor's."     |

::alert[Feel free to ask the AI anything while you develop — e.g., "How does a user move through this screen?", "What key metrics should the dashboard show?", "How does this layout look on mobile?", "Can we present this feature in a card layout like competitor X?" etc.]{type="info"}

## (Optional) Image generation

The project includes an **Asset Generator MCP** that lets the AI create images for you. Generated images are saved to `packages/web/public/` automatically, so you can use them on your pages right away.

Example prompts:

| Situation            | Example prompt                                            |
| -------------------- | --------------------------------------------------------- |
| Hero banner          | "Create a hero banner image for the landing page."        |
| Logo / icon          | "Generate a minimalist app logo."                         |
| Background image     | "Make an abstract gradient background for the dashboard." |
| Sample profile photo | "Generate 4 avatar images for user profiles."             |
| Product mockup       | "Create a latte photo for the coffee shop menu screen."   |

::alert[Image generation uses an external API (fal.ai) and requires network access. It may take 2–3 minutes depending on image size.]{type="warning"}
