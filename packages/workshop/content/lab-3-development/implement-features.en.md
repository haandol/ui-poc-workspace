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

In the Claude Code prompt, type the following. Type `@docs/prd/` and press **Tab** to pick the file.

:::code{showCopyAction=true showLineNumbers=false language=text}
Read @docs/prd/XYZ.alps.md and implement F1.
:::

Claude Code will analyze the PRD and write the code. When it's done, inspect the result in the browser.

## The iteration loop

Build one feature at a time in a loop:

```
1. Request a feature implementation
   └─ "Read @docs/prd/XYZ.alps.md and implement F1."

2. Check the result in the browser
   └─ http://localhost:3000

3. Feedback / edit requests
   └─ "Change the button color to blue."

4. Once you're happy, move to the next feature
   └─ "Implement F2."
```

::alert[If you stay in the same conversation, you can skip the file path — just say `"Implement F2."`.]{type="info"}

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

## Automatic progress sharing

If you set up the Airtable integration, Claude Code records your progress automatically in Lab 3:

- When you start implementing your first feature → `SCAFFOLD-DONE`
- After each feature is implemented and reported → `F1-DONE`, `F2-DONE`, …
- When you announce the demo is ready → `DEMO-READY`

Duplicates are filtered out automatically. To opt out for the session, say "stop sharing progress".
