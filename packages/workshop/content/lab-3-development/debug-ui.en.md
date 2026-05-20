---
title: 'Debug the UI'
weight: 30
---

When the screen doesn't look right, run the `/debug-ui` slash command and the AI opens the browser itself to diagnose and fix.

## How to invoke

In the 💬 Claude Code chat, type `/debug-ui` followed by what you want to check, in plain English.

| Situation             | Example prompt                                                          |
| --------------------- | ----------------------------------------------------------------------- |
| Check the screen      | `/debug-ui check how the screen looks right now`                        |
| Broken-looking layout | `/debug-ui check the page and fix what's broken`                        |
| Console / network     | `/debug-ui check for browser errors and fix them`                       |
| PRD/ADR alignment     | `/debug-ui visually compare the current page with PRD F1`               |
| Mobile responsiveness | `/debug-ui check how it looks on mobile`                                |
| Click/input flow      | `/debug-ui actually click the checkout button and tell me what happens` |

## Pre-meeting / pre-handoff check — PRD/ADR alignment

If you ask `/debug-ui visually compare the current page with PRD F1`, the AI returns a table like:

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

Then open `http://localhost:3001` in your browser, and run `/debug-ui use port 3001` once.

### AI says it can't open a browser

Make sure `chrome-devtools-mcp` shows `✔ enabled` under `/plugin` → Installed. If not, run `/reload-plugins` once.
