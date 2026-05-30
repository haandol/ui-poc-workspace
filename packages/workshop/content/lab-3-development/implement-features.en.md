---
title: 'Implement Features'
weight: 20
---

Write code by following the ADR you created in the previous step. Don't try to build everything at once — go **feature by feature**.

::alert[**Build the main screen at `/` (the root page).** That's the screen you saw when the dev server first started, it's the app's entry point, and it's the URL (`http://localhost:3000`) you'll share in the final demo. When you implement the first feature, this default screen is **overwritten** with your PoC — there's no need to create a separate route like `/dashboard`. (Only add a new route when you genuinely need a secondary screen that branches off the main flow, e.g. a detail or settings page.)]{type="info"}

## Step 1. Implement against the ADR

In the 💬 Claude Code chat (`f1` is the first feature ID in your PRD):

:::code{showCopyAction=true showLineNumbers=false language=text}
/adr-impl f1
:::

Claude proceeds in this flow:

1. **Reads the ADR** — pulls the Decision from `docs/adr/f1/`
2. **Proposes a change plan** — shows a short _"here's what I'll build"_ plan and asks you to approve
3. **Writes the code** — once approved, edits files; Hot Reload pushes changes to the browser automatically

## Step 2. Approve the change plan

Confirm the plan matches your intent.

- Looks right → "OK" or "go ahead"
- Off → reply in plain language (e.g., _"use a dropdown for the payment options instead of cards"_)

::alert[Polishing the plan now is faster than coding and rewriting later. The most common non-developer mistake is _"let's just build it and see"_ — once code is in place, changing the flow means updating the ADR first, which costs more time.]{type="info"}

## Step 3. Check the result in the browser

Open `http://localhost:3000` to inspect the result. To polish, ask in plain language:

:::code{showCopyAction=true showLineNumbers=false language=text}
Make the payment button bigger and use the primary color.
:::

**Small touches** — styling, copy, micro-positioning — can be edited in code directly. For **bigger changes** (adding/removing a feature, changing a flow, structural changes), see [Evolving the PoC](./evolve-poc).

## Step 4. Move on to the next feature

Once F1 is solid, run the next feature the same way:

:::code{showCopyAction=true showLineNumbers=false language=text}
/adr-impl f2
:::

ADRs for every feature were already drafted by `/feature-to-adr`, so **you don't need to revisit the PRD → ADR step.** Just keep running `/adr-impl` for F1 → F2 → F3 …

::alert[**Forgot which feature is still pending?** Run `/adr-impl` with no arguments — it lists every ADR still in `Proposed` (unimplemented) state and asks which one to build. You can pick one (`f1`) or several (`1,2` or `f1, f2`) at once.]{type="info"}

## The iteration loop

```
1. /adr-impl fN         — read ADR, propose plan, write code
2. Approve the plan     — "OK" or request edits
3. Check the browser    — http://localhost:3000
4. Feedback / small edits — Ask in plain language
5. Next feature         — /adr-impl f(N+1)
```

## Tips for edit requests

The more specific your request, the better.

| Bad                    | Good                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| "Something feels off." | "Reduce the sidebar menu font size to 14px and tighten the spacing between items to 8px." |
| "Change the design."   | "Switch the whole app to dark mode."                                                      |
| "Add some data."       | "Create 10 sample users with name, email, and signup date."                               |

## Handy prompts

| Situation              | Example prompt                                                     |
| ---------------------- | ------------------------------------------------------------------ |
| Build the main screen  | "Build the main screen (`/`) as a dashboard."                      |
| Add a secondary screen | "Add a detail page reachable from the main screen and link to it." |
| Edit the top menu      | "Add a logo and navigation to the top menu."                       |
| Add sample data        | "Create 10 sample users with name, email, and signup date."        |
| Change styles          | "Switch the whole app to dark mode."                               |
| Add a chart            | "Show monthly revenue as a bar chart."                             |
| Change layout          | "Use a sidebar on the left and main content on the right."         |
| Fix an error           | "Fix this error: [paste the error message]"                        |
| Feature review         | "Summarize the user scenarios for this feature."                   |
| Competitor comparison  | "Compare the current screen to a similar competitor's."            |

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
