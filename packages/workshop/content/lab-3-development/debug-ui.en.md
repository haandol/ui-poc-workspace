---
title: 'Debug the UI'
weight: 30
---

When the screen doesn't look right, ask the AI to **look at the actual browser instead of guessing** to diagnose and fix the issue. The project ships a `debug-ui` skill that drives the `chrome-devtools-mcp` plugin to do this end-to-end.

## What the debug-ui skill does for you

When the skill triggers, the AI automatically:

1. **Grabs the page** — opens `localhost:3000` and waits until rendering settles
2. **Captures a screenshot + accessibility snapshot** — both the visual and the structural view
3. **Inspects console / network** — error messages, failed API calls
4. **Reports the cause in one line, then fixes** — no guess-patches; the fix follows the actual signal
5. **Re-captures after the fix** — confirms the change took effect, reports the result

## Ask the AI to look at the screen

Just describe what you want in plain language and the skill will trigger.

| Situation             | Example prompt                                                 |
| --------------------- | -------------------------------------------------------------- |
| Check the screen      | "How does the screen look right now?"                          |
| Broken-looking layout | "Check the page and fix what's broken."                        |
| Console / network     | "Check if there are any browser errors and fix them."          |
| PRD/ADR alignment     | "Visually compare the current page with PRD F1."               |
| Mobile responsiveness | "How does it look on mobile?"                                  |
| Click/input flow      | "Actually click the checkout button and tell me what happens." |

::alert[Short prompts like "take a look", "screenshot it", or "something looks weird — what's wrong?" are enough. The skill handles the capture and diagnosis for you.]{type="info"}

## Prerequisites

Two things must be in place (both are already set up by the workshop):

1. **Dev server is running** — you've started `pnpm dev:web` in a separate terminal tab. The AI will not start the dev server itself.
2. **chrome-devtools plugin is connected** — under `/plugin` → Installed, `chrome-devtools-mcp` should be `✔ enabled`. If not, see [Verify MCP Servers](/getting-started/verify-mcp).

## Why PRD/ADR alignment checks matter

If you ask _"visually compare the current page with PRD F1"_, the AI returns a table like:

```
| Item              | Expected (PRD/ADR) | Current screen | Result |
| ----------------- | ------------------ | -------------- | ------ |
| Checkout label    | "Place order"      | "Place order"  | ✅     |
| Option picker UI  | Dropdown           | Cards          | ❌     |
| Primary color     | #2563eb            | #1d4ed8        | ⚠️     |
```

Running this once right before a demo prevents **walking into a demo without realizing a mismatch is on screen**.

## Common troubleshooting

### Browser not picking up changes

Force a cache refresh:

- **Mac**: `Cmd + Shift + R`
- **Windows**: `Ctrl + Shift + R`

If that doesn't work, in the 💻 dev server tab (tab 1) press `Ctrl + C` to stop, then rerun:

:::code{showCopyAction=true showLineNumbers=false language=bash}
pnpm dev:web
:::

### Port conflict

If port 3000 is already in use, in your 💻 terminal set the `PORT` environment variable to run on a different port.

::::tabs
:::tab{label="Mac"}

:::code{showCopyAction=true showLineNumbers=false language=bash}
PORT=3001 pnpm dev:web
:::

:::
:::tab{label="Windows (PowerShell)"}

:::code{showCopyAction=true showLineNumbers=false language=powershell}
$env:PORT=3001; pnpm dev:web
:::

:::
::::

Then open `http://localhost:3001` in your browser, and tell the AI once: _"debug on port 3001."_

### Skill not triggering?

Make sure `chrome-devtools-mcp` shows `✔ enabled` under `/plugin` → Installed. If not, run `/reload-plugins` once.
