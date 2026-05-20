---
title: 'Debug the UI'
weight: 30
---

When the screen doesn't look right, ask the AI in plain language and it will open the browser itself to diagnose and fix.

## Ask the AI to look at the screen

In the 💬 Claude Code chat:

| Situation             | Example prompt                                                 |
| --------------------- | -------------------------------------------------------------- |
| Check the screen      | "How does the screen look right now?"                          |
| Broken-looking layout | "Check the page and fix what's broken."                        |
| Console / network     | "Check if there are any browser errors and fix them."          |
| PRD/ADR alignment     | "Visually compare the current page with PRD F1."               |
| Mobile responsiveness | "How does it look on mobile?"                                  |
| Click/input flow      | "Actually click the checkout button and tell me what happens." |

::alert[Short prompts like "take a look", "screenshot it", or "something looks weird — what's wrong?" are enough.]{type="info"}

## Pre-meeting / pre-handoff check — PRD/ADR alignment

If you ask _"visually compare the current page with PRD F1"_, the AI returns a table like:

```
| Item              | Expected (PRD/ADR) | Current screen | Result |
| ----------------- | ------------------ | -------------- | ------ |
| Checkout label    | "Place order"      | "Place order"  | ✅     |
| Option picker UI  | Dropdown           | Cards          | ❌     |
| Primary color     | #2563eb            | #1d4ed8        | ⚠️     |
```

Run this once before an internal meeting or before handing off to engineering — it catches the **PRD-vs-screen mismatches that otherwise eat hours of follow-up alignment.**

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

### AI says it can't open a browser

Make sure `chrome-devtools-mcp` shows `✔ enabled` under `/plugin` → Installed. If not, run `/reload-plugins` once.
