---
title: 'Implement Features'
weight: 20
---

Write code by following the ADR you created in the previous step. Don't try to build everything at once — go **feature by feature**.

## Step 1. Implement against the ADR

In the 💬 Claude Code chat, enter the following (`f1` is the first feature you converted into an ADR):

:::code{showCopyAction=true showLineNumbers=false language=text}
/adr-impl f1
:::

Claude will automatically:

1. Read the **Decision** in `docs/adr/f1/`
2. Write code that follows the decision
3. Reflect the changes in the dev server

::alert[If you ask for an implementation without an ADR in place, the PreToolUse hook may warn you and block progress. Make sure you've completed [Convert the PRD into ADRs](./prd-to-adr) first.]{type="info"}

## Step 2. Check the result in the browser

Open `http://localhost:3000` to inspect the result. If something looks off or you want to polish, request a tweak in plain language:

:::code{showCopyAction=true showLineNumbers=false language=text}
Make the payment button bigger and use the primary color.
:::

For small touches — styling, copy, micro-positioning — you can edit the code directly. For **bigger changes** (adding/removing a feature, changing a flow, structural changes), see the next page: [Evolving the PoC](./evolve-poc).

## Step 3. Move on to the next feature

Once F1 is solid, go back to [Convert the PRD into ADRs](./prd-to-adr) to create the ADR for `f2`, then come back here and run `/adr-impl f2`. Repeat the cycle: **PRD → ADR → Implement → Next feature.**

## The iteration loop

```
1. /feature-to-adr fN     — Convert the feature into an ADR (design memo)
2. Review and accept ADR  — Check the Decision and approve or edit
3. /adr-impl fN           — Write code following the ADR
4. Check the browser      — http://localhost:3000
5. Feedback / small edits — Ask in plain language
6. Move on                — Loop back with /feature-to-adr f(N+1)
```

::alert[If you stay in the same chat, context carries over — `/adr-impl f2` alone is enough.]{type="info"}

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
