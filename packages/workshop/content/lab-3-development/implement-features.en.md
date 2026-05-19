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

## Request a feature implementation

In the 💬 Claude Code chat, ask in plain English. Type `@docs/prd/` and press **Tab** to pick the PDF file.

:::code{showCopyAction=true showLineNumbers=false language=text}
Implement F1 from @docs/prd/XYZ.alps.md.
:::

Claude will:

1. Read the F1 spec from your PRD
2. **Show you a short "design memo" of what it plans to build, and ask you to confirm**
3. Once confirmed, write the code and update the dev server

Reply "OK" or "go ahead" to confirm; otherwise describe the change in plain language — e.g., "move the button to the top." Check the result at `http://localhost:3000`.

::alert[The design memo is a "Decision" note. Just check that the Decision matches what you have in mind — you don't need to understand every section.]{type="info"}

## The iteration loop

Build one feature at a time in a loop:

```
1. Request a feature
   └─ "Implement F1 from @docs/prd/XYZ.alps.md."

2. Approve the design memo
   └─ "OK" or request edits

3. Check the result in the browser
   └─ http://localhost:3000

4. Feedback / edit requests
   └─ "Change the button color to blue."

5. Once you're happy, move to the next feature
   └─ "Implement F2."
```

::alert[If you stay in the same conversation, you can skip the PRD path — `"Implement F2."` is enough; the previous PRD is reused.]{type="info"}

::alert[**Shortcut** — once you're comfortable, you can call the same flow with slash commands: `/feature-to-adr f1` to draft the design memo, then `/adr-impl f1` to build it. See the [`alps-writer` plugin](https://github.com/haandol/alps-writer-mcp) docs for details.]{type="info"}

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
